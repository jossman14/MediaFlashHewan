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



(lib.Bitmap14 = function() {
	this.initialize(img.Bitmap14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2807,1.4233,0.533,0.533,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2807,-6.9042,0.533,0.533,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.9042}},{t:this.shape,p:{y:1.4233}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.3042}},{t:this.shape,p:{y:3.0233}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.3042}},{t:this.shape,p:{y:7.0233}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49.1);


// stage content:
(lib.materi3 = function(mode,startPosition,loop) {
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
		 
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuTujuan.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// base
	this.btnMenuTujuan = new lib.btnMenuKI();
	this.btnMenuTujuan.name = "btnMenuTujuan";
	this.btnMenuTujuan.setTransform(885.85,504.8);
	new cjs.ButtonHelper(this.btnMenuTujuan, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2F3542").s().p("AgIAJQgDgEAAgFQAAgEADgDQADgEAFAAQAGAAADAEQADADAAAEQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape.setTransform(232.575,347.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2F3542").s().p("AgbBlQAQgNAKgaQAJgbABghIAAgCQAAgXgGgTQgDgTgIgQQgJgPgKgJIAEgMQAOAJAMARQAMATAHAWQAGAXAAAYQAAAYgGAWQgGAWgNASQgMATgOAHg");
	this.shape_1.setTransform(225.4,342.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2F3542").s().p("AgrA9QgQgUAAgiIAAgOQAAgVAHgRQAJgRAOgIQAOgJARAAQAaAAAPAOQAPAOACAYIgVAAQgCgTgJgIQgJgIgRAAQgSAAgLAOQgLAPAAAbIAAAOQAAAZAKAPQALAQASAAQARAAAJgIQAKgIACgTIAVAAQgDAYgPAOQgPANgaAAQgbAAgRgTg");
	this.shape_2.setTransform(215.15,341.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2F3542").s().p("AAPBOIAAgkIhHAAIAAgMIBFhrIAWAAIAABnIAWAAIAAAQIgWAAIAAAkgAAMguIgsBIIAvAAIAAhMg");
	this.shape_3.setTransform(201.7,341.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2F3542").s().p("AgCBXQgZglAAgyQAAgYAGgWQAHgXAMgSQAMgSAOgIIAEAOQgPALgKAaQgKAYAAAfIgBAIQAAApAPAfQAJASAMAKIgEAMQgOgHgMgTg");
	this.shape_4.setTransform(192.275,342.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2F3542").s().p("AgQBUIAAhkIgSAAIAAgPIASAAIAAgMQAAgTAKgKQAKgLARAAQAIAAAGACIgBAQIgKgBQgLAAgEAGQgGAGAAAKIAAANIAZAAIAAAPIgZAAIAABkg");
	this.shape_5.setTransform(179.05,340.575);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(172.225,341.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2F3542").s().p("AgDBBQgGgIgBgPIAAhHIgVAAIAAgPIAVAAIAAgcIAUAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHADADQACAEAHAAIAKgCIAAAQQgIACgIAAQgNAAgGgIg");
	this.shape_7.setTransform(165.6,341.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_8.setTransform(156.35,343.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABiIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_9.setTransform(145.575,340.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_10.setTransform(136.575,341.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_11.setTransform(127.825,343.025);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_12.setTransform(115.625,343.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2F3542").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQAMgPAWAAQAZAAAIATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_13.setTransform(99.95,343.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_14.setTransform(84.025,343.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABiIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_15.setTransform(72.925,340.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2F3542").s().p("AgOAUQAKgOAAgOIAAgSIATAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_16.setTransform(878.95,309.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2F3542").s().p("AgPBUIAAhkIgTAAIAAgPIATAAIAAgMQgBgTALgKQAJgLARAAQAIAAAGACIgBAQIgLgBQgJAAgFAGQgGAGAAAKIAAANIAZAAIAAAPIgZAAIAABkg");
	this.shape_17.setTransform(873.65,301.175);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_18.setTransform(866.825,301.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_19.setTransform(860.2,302.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_20.setTransform(850.95,303.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAJgPATAAQAFAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_21.setTransform(841.85,303.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_22.setTransform(831.275,303.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2F3542").s().p("AgdBEIgBANIgSAAIAAikIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAcgMAQQgMAQgVAAQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_23.setTransform(819.075,301.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_24.setTransform(806.65,303.725);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2F3542").s().p("AgJBSIAAikIATAAIAACkg");
	this.shape_25.setTransform(798.025,301.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_26.setTransform(789.075,303.725);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBDg");
	this.shape_27.setTransform(777.975,301.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2F3542").s().p("AgOAUQAKgOABgOIAAgSIASAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_28.setTransform(745.65,309.925);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2F3542").s().p("AgPBUIAAhkIgTAAIAAgPIATAAIAAgMQgBgTALgKQAJgLARAAQAIAAAGACIgBAQIgLgBQgKAAgEAGQgGAGAAAKIAAANIAZAAIAAAPIgZAAIAABkg");
	this.shape_29.setTransform(740.35,301.175);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_30.setTransform(733.525,301.625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_31.setTransform(726.9,302.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_32.setTransform(717.65,303.725);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_33.setTransform(706.025,303.725);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAJgPATAAQAFAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_34.setTransform(696.95,303.625);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBDg");
	this.shape_35.setTransform(687.825,301.3);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2F3542").s().p("AgOAUQAKgOAAgOIAAgSIATAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_36.setTransform(655.5,309.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_37.setTransform(647.975,303.725);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_38.setTransform(639.675,301.625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQABAHADADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_39.setTransform(633.05,302.425);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_40.setTransform(627.125,301.625);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAJgPASAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_41.setTransform(621.3,303.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBDg");
	this.shape_42.setTransform(612.175,301.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_43.setTransform(579.2,303.625);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_44.setTransform(572.225,301.625);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBDg");
	this.shape_45.setTransform(564.725,301.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_46.setTransform(555.725,301.625);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQAMgPAVABQAVgBAMARQAMAPAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQAOAAAIgMQAJgKAAgWQAAgUgJgLQgIgLgOAAQgSAAgJAPg");
	this.shape_47.setTransform(547.1,305.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_48.setTransform(537.55,303.625);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_49.setTransform(527.575,303.725);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#2F3542").s().p("AgdBEIgBANIgSAAIAAikIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAcgMAQQgMAQgVAAQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_50.setTransform(515.725,301.4);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_51.setTransform(479.725,303.625);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_52.setTransform(467.65,303.725);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgVIAAhKIAUAAIAABKQAAAaAWAAQAVABAIgSIAAhTIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_53.setTransform(455.575,303.85);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQAMgPAVABQAVgBAMARQAMAPAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQAOAAAIgMQAJgKAAgWQAAgUgJgLQgIgLgOAAQgSAAgJAPg");
	this.shape_54.setTransform(443.6,305.85);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2F3542").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQAMgPAWAAQAZAAAIATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_55.setTransform(427.55,303.625);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_56.setTransform(411.9,303.725);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#2F3542").s().p("AA+A7IAAhLQAAgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgIAQIAABUIgTAAIAAhzIASAAIABANQAMgPAXAAQAYAAAHATQAGgJAJgFQAKgFANAAQAlAAACAoIAABNg");
	this.shape_57.setTransform(396.3,303.625);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_58.setTransform(380.975,303.725);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBDg");
	this.shape_59.setTransform(370.225,301.3);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_60.setTransform(334.325,303.625);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgPAOgSAAQgRAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_61.setTransform(322.25,303.725);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBDg");
	this.shape_62.setTransform(311.475,301.3);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_63.setTransform(299.075,303.625);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_64.setTransform(287,303.725);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#2F3542").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgNgQQgMgQAAgcQAAgbAMgQQANgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_65.setTransform(274.65,305.925);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_66.setTransform(262.625,303.625);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_67.setTransform(250.55,303.725);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#2F3542").s().p("AgdBEIgBANIgSAAIAAikIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAcgMAQQgMAQgVAAQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_68.setTransform(238.675,301.4);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#2F3542").s().p("AA+A7IAAhLQAAgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgIAQIAABUIgTAAIAAhzIASAAIABANQAMgPAXAAQAYAAAHATQAGgJAJgFQAKgFANAAQAlAAACAoIAABNg");
	this.shape_69.setTransform(222.6,303.625);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_70.setTransform(207.275,303.725);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#2F3542").s().p("AgYBNQgMgGgGgJIAKgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgMgQQgNgQAAgcQAAgbANgQQAMgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMAOAAQASAAAJgSIAAg0QgJgQgSAAQgOAAgIALg");
	this.shape_71.setTransform(194.95,305.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_72.setTransform(182.925,303.625);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_73.setTransform(171.175,303.725);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#2F3542").s().p("AA9A7IAAhLQABgNgGgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgHAQIAABUIgVAAIAAhzIATAAIABANQANgPAVAAQAYAAAIATQAGgJAKgFQAJgFAMAAQAmAAABAoIAABNg");
	this.shape_74.setTransform(155.6,303.625);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgHAAQgOAAgFgIg");
	this.shape_75.setTransform(118.5,302.425);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_76.setTransform(109.25,303.725);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQANgPAUABQAVgBAMARQAMAPAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQAOAAAIgMQAJgKgBgWQABgUgJgLQgIgLgOAAQgSAAgJAPg");
	this.shape_77.setTransform(97.35,305.85);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_78.setTransform(84.95,303.725);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgBQAAgbANgQQAMgQAVAAQATAAAMAOIAAg9IAUAAIAACkIgSAAIgBgMQgMAPgUAAQgVAAgMgRgAgUgIQgIAKAAAWQAAAVAIALQAIALAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIALg");
	this.shape_79.setTransform(72.525,301.4);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_80.setTransform(875.15,264.325);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#2F3542").s().p("AgDBBQgHgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQABAHADADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgGgIg");
	this.shape_81.setTransform(865.25,263.025);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_82.setTransform(858.85,264.225);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_83.setTransform(848.875,264.325);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_84.setTransform(837.225,264.325);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2F3542").s().p("AgOAUQAKgOABgOIAAgSIASAAIAAAPQAAALgFAKQgFALgHAGg");
	this.shape_85.setTransform(819.8,270.525);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_86.setTransform(815.325,262.225);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_87.setTransform(806.925,264.325);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_88.setTransform(795.225,264.225);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_89.setTransform(783.15,264.325);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_90.setTransform(774.05,264.225);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_91.setTransform(764.075,264.325);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#2F3542").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_92.setTransform(755.475,261.9);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_93.setTransform(746.525,264.325);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#2F3542").s().p("AgDBBQgGgIgBgPIAAhHIgVAAIAAgPIAVAAIAAgcIAUAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQAEAEAGAAIAJgCIAAAQQgHACgIAAQgNAAgGgIg");
	this.shape_94.setTransform(736.3,263.025);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_95.setTransform(717.675,264.225);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_96.setTransform(705.6,264.325);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#2F3542").s().p("AgjBDQgNgRAAgaIAAgCQAAgZANgRQAMgQAVAAQATAAAMAOIAAg9IAUAAIAAClIgSAAIgBgNQgMAPgUAAQgVAAgMgRgAgUgHQgIAJAAAWQAAAVAIALQAIALAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_97.setTransform(693.175,262);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_98.setTransform(671.875,264.225);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_99.setTransform(659.8,264.325);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgPAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAIAAAJgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_100.setTransform(647.85,264.325);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAilIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBEg");
	this.shape_101.setTransform(637.075,261.9);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_102.setTransform(625.075,264.325);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#2F3542").s().p("AgwBRIAAifIASAAIABANQAMgPAVgBQAVABAMAQQAMAPAAAdIAAABQAAAZgMARQgMAQgVAAQgUAAgMgNIAAA3gAgcgvIAAA2QAJAQASAAQANAAAJgMQAIgKAAgWQAAgTgIgMQgJgLgNAAQgSgBgJARg");
	this.shape_103.setTransform(613.2,266.45);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_104.setTransform(601.125,264.325);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAilIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBEg");
	this.shape_105.setTransform(590.375,261.9);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2F3542").s().p("AgOAUQAKgOAAgOIAAgSIATAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_106.setTransform(572.25,270.525);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_107.setTransform(567.775,262.225);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#2F3542").s().p("AgjBDQgNgRAAgaIAAgCQAAgZANgRQAMgQAVAAQATAAAMAOIAAg9IAUAAIAAClIgSAAIgBgNQgMAPgUAAQgVAAgMgRgAgUgHQgIAJAAAWQAAAVAIALQAIALAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_108.setTransform(558.625,262);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgUIAAhLIAUAAIAABKQAAAbAWAAQAVAAAIgRIAAhUIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_109.setTransform(546.575,264.45);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#2F3542").s().p("AgdBEIgBAOIgSAAIAAilIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAbgMAQQgMAQgVABQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgXQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_110.setTransform(534.625,262);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_111.setTransform(503.525,264.225);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_112.setTransform(491.45,264.325);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAilIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBEg");
	this.shape_113.setTransform(480.675,261.9);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#2F3542").s().p("AAaBTIAAhOQAAgLgGgGQgGgGgLAAQgJAAgHAFQgIAGgEAHIAABTIgUAAIAAilIAUAAIAAA/QANgQAVAAQAkAAABAoIAABOg");
	this.shape_114.setTransform(468.325,261.9);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgUIAAhLIAUAAIAABKQAAAbAWAAQAVAAAIgRIAAhUIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_115.setTransform(456.125,264.45);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#2F3542").s().p("AgdBEIgBAOIgSAAIAAilIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAbgMAQQgMAQgVABQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgXQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_116.setTransform(444.175,262);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2F3542").s().p("AA9A7IAAhLQAAgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQAMgPAWAAQAYAAAJATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_117.setTransform(428.1,264.225);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgUIAAhLIAUAAIAABKQAAAbAWAAQAVAAAIgRIAAhUIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_118.setTransform(412.325,264.45);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_119.setTransform(400.225,264.225);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_120.setTransform(388.475,264.325);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#2F3542").s().p("AA+A7IAAhLQAAgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgHAQIAABUIgUAAIAAhzIASAAIABANQAMgPAXAAQAYAAAHATQAGgJAJgFQAKgFANAAQAlAAACAoIAABNg");
	this.shape_121.setTransform(372.9,264.225);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#2F3542").s().p("AgOAUQAKgOABgOIAAgSIASAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_122.setTransform(351.45,270.525);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2F3542").s().p("AgxBOIAAibIBiAAIAAARIhNAAIAAAyIBDAAIAAAQIhDAAIAAA3IBOAAIAAARg");
	this.shape_123.setTransform(343.925,262.325);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#2F3542").s().p("AA5BOIAAg9IAChAIgzB9IgPAAIg0h9IADBAIAAA9IgVAAIAAibIAbAAIAyB+IAzh+IAbAAIAACbg");
	this.shape_124.setTransform(327.55,262.325);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#2F3542").s().p("AgJBOIAAg6Ig2hhIAXAAIAoBNIAphNIAXAAIg2BhIAAA6g");
	this.shape_125.setTransform(311.325,262.325);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_126.setTransform(289.375,264.225);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAJAAQAJAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_127.setTransform(277.3,264.325);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#2F3542").s().p("AAaBTIAAhOQAAgLgGgGQgGgGgLAAQgJAAgHAFQgIAGgEAHIAABTIgUAAIAAilIAUAAIAAA/QANgQAVAAQAkAAABAoIAABOg");
	this.shape_128.setTransform(265.325,261.9);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgUIAAhLIAUAAIAABKQAAAbAWAAQAVAAAIgRIAAhUIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_129.setTransform(253.125,264.45);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#2F3542").s().p("AgJBOIAAiKIgyAAIAAgRIB3AAIAAARIgyAAIAACKg");
	this.shape_130.setTransform(240.525,262.325);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_131.setTransform(218.575,264.225);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgPAOgSAAQgRAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_132.setTransform(206.5,264.325);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAJgPARAAQAGAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_133.setTransform(197.4,264.225);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_134.setTransform(187.1,264.325);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_135.setTransform(175.425,264.325);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_136.setTransform(164.125,264.325);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#2F3542").s().p("AgdBEIgBAOIgSAAIAAilIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAbgMAQQgMAQgVABQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgXQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_137.setTransform(152.275,262);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_138.setTransform(140.175,264.325);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAilIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBEg");
	this.shape_139.setTransform(129.425,261.9);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_140.setTransform(107.725,264.225);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_141.setTransform(95.65,264.325);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAilIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBEg");
	this.shape_142.setTransform(84.875,261.9);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_143.setTransform(72.55,264.325);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_144.setTransform(875.225,224.825);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgPAOgSAAQgRAAgLgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_145.setTransform(863.15,224.925);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAJgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_146.setTransform(854.05,224.825);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_147.setTransform(843.75,224.925);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACkIgSAAIgBgNQgMAOgUAAQgVAAgMgQgAgUgHQgIAKAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_148.setTransform(831.325,222.6);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgPAOgSAAQgRAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_149.setTransform(819.4,224.925);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_150.setTransform(807.725,224.925);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_151.setTransform(796.425,224.925);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAikIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBEg");
	this.shape_152.setTransform(785.675,222.5);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_153.setTransform(767.175,224.825);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#2F3542").s().p("AgjAwQgKgKAAgVIAAhLIAUAAIAABKQAAAaAWABQAVgBAIgQIAAhUIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgLg");
	this.shape_154.setTransform(754.975,225.05);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#2F3542").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgNgQQgMgQAAgcQAAgbAMgQQANgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_155.setTransform(742.55,227.125);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_156.setTransform(730.525,224.825);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_157.setTransform(718.45,224.925);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#2F3542").s().p("AgdBEIgBAOIgSAAIAAikIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgVgBQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgWQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_158.setTransform(706.575,222.6);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#2F3542").s().p("AA+A7IAAhLQAAgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgGAQIAABUIgUAAIAAhzIASAAIABANQAMgPAXAAQAXAAAIATQAGgJAJgFQAKgFAMAAQAnAAABAoIAABNg");
	this.shape_159.setTransform(690.5,224.825);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_160.setTransform(675.175,224.925);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#2F3542").s().p("AA9A7IAAhLQAAgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgHAQIAABUIgVAAIAAhzIATAAIABANQANgPAVAAQAYAAAIATQAGgJAKgFQAJgFAMAAQAmAAABAoIAABNg");
	this.shape_161.setTransform(659.6,224.825);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#2F3542").s().p("AgDBBQgGgIgBgPIAAhHIgUAAIAAgPIAUAAIAAgcIAUAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHADADQACAEAHAAIAJgCIAAAQQgHACgIAAQgNAAgGgIg");
	this.shape_162.setTransform(639.9,223.625);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_163.setTransform(630.65,224.925);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#2F3542").s().p("AgwBRIAAifIASAAIABANQANgPAUgBQAVABAMAPQAMAQAAAdIAAABQAAAagMAQQgMAQgVAAQgUAAgMgOIAAA4gAgcgvIAAA2QAJAQASAAQAOAAAIgLQAJgLAAgWQAAgTgJgMQgIgMgOAAQgSABgJAQg");
	this.shape_164.setTransform(618.75,227.05);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_165.setTransform(606.35,224.925);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACkIgSAAIgBgNQgMAOgUAAQgVAAgMgQgAgUgHQgIAKAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_166.setTransform(593.925,222.6);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAikIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBEg");
	this.shape_167.setTransform(577.075,222.5);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_168.setTransform(568.075,222.825);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACkIgSAAIgBgNQgMAOgUAAQgVAAgMgQgAgUgHQgIAKAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_169.setTransform(558.925,222.6);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_170.setTransform(550.325,222.825);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACkIgSAAIgBgNQgMAOgUAAQgVAAgMgQgAgUgHQgIAKAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_171.setTransform(541.175,222.6);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_172.setTransform(523.15,224.925);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_173.setTransform(513.25,223.625);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_174.setTransform(506.85,224.825);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_175.setTransform(496.875,224.925);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_176.setTransform(485.225,224.925);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_177.setTransform(473.925,224.925);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#2F3542").s().p("AgwBRIAAifIASAAIABANQAMgPAVgBQAVABAMAPQAMAQAAAdIAAABQAAAagMAQQgMAQgVAAQgUAAgMgOIAAA4gAgcgvIAAA2QAJAQASAAQAOAAAIgLQAJgLAAgWQAAgTgJgMQgIgMgOAAQgSABgJAQg");
	this.shape_178.setTransform(462.05,227.05);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgOAOgSAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_179.setTransform(443.55,224.925);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#2F3542").s().p("AgYBNQgMgGgGgJIAKgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgMgQQgNgQAAgcQAAgbANgQQAMgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMAOAAQASAAAJgSIAAg0QgJgQgSAAQgOAAgIALg");
	this.shape_180.setTransform(431.2,227.125);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#2F3542").s().p("AgYBNQgMgGgGgJIAKgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgNgQQgMgQAAgcQAAgbAMgQQANgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMAOAAQASAAAJgSIAAg0QgJgQgSAAQgOAAgIALg");
	this.shape_181.setTransform(418.85,227.125);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_182.setTransform(406.825,224.825);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_183.setTransform(398.075,222.825);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#2F3542").s().p("AAaBTIAAhOQAAgLgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABTIgUAAIAAikIAUAAIAAA/QANgRAVAAQAkAAABAoIAABOg");
	this.shape_184.setTransform(389.375,222.5);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_185.setTransform(377.625,224.925);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_186.setTransform(365.975,224.925);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#2F3542").s().p("AgOAUQAKgOAAgOIAAgSIATAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_187.setTransform(351.75,231.125);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_188.setTransform(347.275,222.825);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_189.setTransform(338.875,224.925);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#2F3542").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAikIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBEg");
	this.shape_190.setTransform(328.425,222.5);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#2F3542").s().p("AgjAwQgKgKAAgVIAAhLIAUAAIAABKQAAAaAWABQAVgBAIgQIAAhUIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgLg");
	this.shape_191.setTransform(315.975,225.05);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACkIgSAAIgBgNQgMAOgUAAQgVAAgMgQgAgUgHQgIAKAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_192.setTransform(303.475,222.6);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_193.setTransform(291.275,224.925);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_194.setTransform(281.85,224.825);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#2F3542").s().p("AgwBRIAAifIASAAIABANQANgPAUgBQAVABAMAPQAMAQAAAdIAAABQAAAagMAQQgMAQgVAAQgUAAgMgOIAAA4gAgcgvIAAA2QAJAQASAAQANAAAJgLQAJgLAAgWQAAgTgJgMQgJgMgNAAQgSABgJAQg");
	this.shape_195.setTransform(271.6,227.05);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_196.setTransform(259.525,224.925);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_197.setTransform(250.45,224.825);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_198.setTransform(233.975,224.825);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_199.setTransform(221.9,224.925);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACkIgSAAIgBgNQgMAOgUAAQgVAAgMgQgAgUgHQgIAKAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_200.setTransform(209.475,222.6);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#2F3542").s().p("AAaBTIAAhOQAAgLgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABTIgUAAIAAikIAUAAIAAA/QANgRAVAAQAkAAABAoIAABOg");
	this.shape_201.setTransform(191.425,222.5);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#2F3542").s().p("AgjAwQgKgKAAgVIAAhLIAUAAIAABKQAAAaAWABQAVgBAIgQIAAhUIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgLg");
	this.shape_202.setTransform(179.225,225.05);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#2F3542").s().p("AgdBEIgBAOIgSAAIAAikIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgVgBQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgWQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_203.setTransform(167.275,222.6);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#2F3542").s().p("AgjAwQgKgKAAgVIAAhLIAUAAIAABKQAAAaAWABQAVgBAIgQIAAhUIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgLg");
	this.shape_204.setTransform(154.725,225.05);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#2F3542").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQADAEAHAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape_205.setTransform(144.75,223.625);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_206.setTransform(129.4,224.925);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#2F3542").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgMgQQgNgQAAgcQAAgbANgQQAMgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_207.setTransform(117.05,227.125);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#2F3542").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgMgQQgNgQAAgcQAAgbANgQQAMgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_208.setTransform(104.7,227.125);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_209.setTransform(92.675,224.825);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_210.setTransform(80.325,224.925);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_211.setTransform(70.9,224.825);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#2F3542").s().p("AgOAUQAKgOABgOIAAgSIASAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_212.setTransform(878.75,191.725);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#2F3542").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABApIAABMg");
	this.shape_213.setTransform(870.925,183.1);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_214.setTransform(858.725,185.65);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#2F3542").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_215.setTransform(846.775,183.2);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_216.setTransform(834.225,185.65);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#2F3542").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQADAEAHAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape_217.setTransform(824.25,184.225);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_218.setTransform(808.025,183.425);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAJgPARAAQAGAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_219.setTransform(802.2,185.425);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_220.setTransform(793.95,184.225);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_221.setTransform(785.025,185.525);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#2F3542").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgLAAgHAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgIAQIAABUIgTAAIAAhzIASAAIABANQAMgPAXAAQAYAAAIATQAFgJAJgFQAKgFANAAQAlAAABAoIAABNg");
	this.shape_222.setTransform(769.45,185.425);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_223.setTransform(757.125,183.425);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_224.setTransform(748.725,185.525);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#2F3542").s().p("AgOAUQAKgOAAgOIAAgSIATAAIAAAPQAAALgFAKQgGALgGAGg");
	this.shape_225.setTransform(730.3,191.725);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#2F3542").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABApIAABMg");
	this.shape_226.setTransform(722.475,183.1);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_227.setTransform(710.275,185.65);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#2F3542").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_228.setTransform(698.325,183.2);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_229.setTransform(685.775,185.65);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQABAHADADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_230.setTransform(675.8,184.225);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_231.setTransform(657.425,183.1);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_232.setTransform(644.975,185.65);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#2F3542").s().p("AgCBBQgIgIABgPIAAhHIgVAAIAAgPIAVAAIAAgcIASAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHADADQAEAEAHAAIAJgCIAAAQQgIACgHAAQgOAAgFgIg");
	this.shape_233.setTransform(635,184.225);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_234.setTransform(625.675,185.425);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_235.setTransform(613.925,185.525);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#2F3542").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_236.setTransform(602.075,183.2);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_237.setTransform(579.275,185.425);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_238.setTransform(567.2,185.525);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_239.setTransform(556.425,183.1);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_240.setTransform(546.95,185.425);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_241.setTransform(536.65,185.525);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_242.setTransform(524.975,185.525);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_243.setTransform(513.35,185.525);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgBQAAgaANgQQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACjIgSAAIgBgMQgMAOgUAAQgVAAgMgQgAgUgIQgIAKAAAXQAAATAIALQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_244.setTransform(500.925,183.2);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_245.setTransform(491.85,185.425);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_246.setTransform(481.875,185.525);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#2F3542").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_247.setTransform(470.025,183.2);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#2F3542").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgKAAgHAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgIAQIAABUIgTAAIAAhzIASAAIABANQAMgPAXAAQAYAAAIATQAFgJAJgFQAKgFANAAQAlAAABAoIAABNg");
	this.shape_248.setTransform(443.65,185.425);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_249.setTransform(427.875,185.65);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#2F3542").s().p("AgJBSIAAijIATAAIAACjg");
	this.shape_250.setTransform(419.175,183.1);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_251.setTransform(413.825,183.425);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#2F3542").s().p("AgQBUIAAhkIgSAAIAAgPIASAAIAAgMQAAgTAKgKQAKgLARAAQAIAAAGACIgBAQIgKgBQgLAAgEAGQgGAGAAAKIAAANIAZAAIAAAPIgZAAIAABkg");
	this.shape_252.setTransform(407.65,182.975);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#2F3542").s().p("AA9A7IAAhLQAAgNgFgGQgGgGgOAAQgLAAgHAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQAMgPAWAAQAYAAAJATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_253.setTransform(383.55,185.425);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_254.setTransform(367.9,185.525);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#2F3542").s().p("AgJBSIAAijIATAAIAACjg");
	this.shape_255.setTransform(359.275,183.1);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_256.setTransform(350.6,185.525);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgBQAAgaANgQQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACjIgSAAIgBgMQgMAOgUAAQgVAAgMgQgAgUgIQgIAKAAAXQAAATAIALQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_257.setTransform(338.175,183.2);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_258.setTransform(326.575,185.525);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_259.setTransform(315.825,183.1);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_260.setTransform(293.125,185.425);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_261.setTransform(281.05,185.525);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#2F3542").s().p("AAcA6IgchXIgbBXIgQAAIgihzIAUAAIAXBWIAbhWIAPAAIAcBYIAWhYIAUAAIgiBzg");
	this.shape_262.setTransform(266.775,185.55);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_263.setTransform(252.875,185.525);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#2F3542").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABApIAABMg");
	this.shape_264.setTransform(240.925,183.1);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_265.setTransform(218.475,185.425);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgPAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_266.setTransform(206.4,185.525);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_267.setTransform(195.625,183.1);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#2F3542").s().p("AgYBNQgMgGgGgJIAKgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgMgQQgNgQAAgcQAAgbANgQQAMgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMAOAAQASAAAJgSIAAg0QgJgQgSAAQgOAAgIALg");
	this.shape_268.setTransform(182.9,187.725);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_269.setTransform(170.875,185.425);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_270.setTransform(158.525,185.525);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#2F3542").s().p("AgJBSIAAijIATAAIAACjg");
	this.shape_271.setTransform(149.575,183.1);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#2F3542").s().p("AglAsQgPgQAAgcIAAAAQAAgRAHgOQAGgNAMgIQAMgHAPAAQAYAAAOAQQAPARAAAaIAAABQAAARgHAOQgGANgMAIQgMAHgQAAQgXAAgOgQgAgXgfQgJAMAAAUQAAAUAJALQAJAMAOAAQAPAAAJgMQAJgMAAgUQAAgTgJgMQgJgMgPAAQgOAAgJAMg");
	this.shape_272.setTransform(140.625,185.525);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#2F3542").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgNgQQgMgQAAgcQAAgbAMgQQANgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_273.setTransform(127.95,187.725);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#2F3542").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgMgQQgNgQAAgcQAAgbANgQQAMgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_274.setTransform(115.6,187.725);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_275.setTransform(103.575,185.425);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_276.setTransform(91.825,185.525);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#2F3542").s().p("AA+A7IAAhLQAAgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgGAQIAABUIgUAAIAAhzIASAAIABANQAMgPAXAAQAXAAAIATQAGgJAJgFQAKgFAMAAQAnAAABAoIAABNg");
	this.shape_277.setTransform(76.25,185.425);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_278.setTransform(876.325,143.7);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVABAIgSIAAhTIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgKg");
	this.shape_279.setTransform(863.875,146.25);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#2F3542").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_280.setTransform(853.9,144.825);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_281.setTransform(844.575,146.025);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#2F3542").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVABAIgSIAAhTIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgKg");
	this.shape_282.setTransform(832.375,146.25);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_283.setTransform(802.475,144.025);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_284.setTransform(794.075,146.125);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_285.setTransform(782.45,146.125);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_286.setTransform(771.675,143.7);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_287.setTransform(762.675,144.025);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#2F3542").s().p("AgQBUIAAhkIgSAAIAAgPIASAAIAAgMQABgTAJgKQAKgLARAAQAIAAAGACIgBAQIgKgBQgLAAgFAGQgFAGAAAKIAAANIAZAAIAAAPIgZAAIAABkg");
	this.shape_288.setTransform(756.5,143.575);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_289.setTransform(749.675,144.025);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_290.setTransform(741.275,146.125);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_291.setTransform(729.65,146.125);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#2F3542").s().p("AgJBSIAAikIATAAIAACkg");
	this.shape_292.setTransform(721.025,143.7);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_293.setTransform(713.525,143.7);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQANgOAUAAQAVAAAMAPQAMAQAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQAOAAAIgMQAJgLAAgVQAAgUgJgLQgIgMgOABQgSAAgJAPg");
	this.shape_294.setTransform(680.05,148.25);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_295.setTransform(670.975,144.025);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_296.setTransform(662.575,146.125);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_297.setTransform(650.875,146.025);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_298.setTransform(642.125,144.025);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_299.setTransform(636.3,146.025);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQANgOAUAAQAVAAAMAPQAMAQAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQAOAAAIgMQAJgLAAgVQAAgUgJgLQgIgMgOABQgSAAgJAPg");
	this.shape_300.setTransform(626.05,148.25);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_301.setTransform(592.375,146.025);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_302.setTransform(580.3,146.125);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_303.setTransform(569.525,143.7);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQANgOAUAAQAVAAAMAPQAMAQAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQANAAAJgMQAJgLgBgVQABgUgJgLQgJgMgNABQgSAAgJAPg");
	this.shape_304.setTransform(557.25,148.25);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_305.setTransform(544.85,146.125);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_306.setTransform(535.75,146.025);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_307.setTransform(525.775,146.125);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_308.setTransform(513.775,146.025);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_309.setTransform(502.025,146.125);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#2F3542").s().p("AA9A7IAAhLQABgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgHAQIAABUIgVAAIAAhzIATAAIABANQANgPAVAAQAYAAAIATQAGgJAKgFQAJgFAMAAQAmAAACAoIAABNg");
	this.shape_310.setTransform(486.45,146.025);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#2F3542").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQADAEAHAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape_311.setTransform(451.65,144.825);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgTAAQAAgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_312.setTransform(442.4,146.125);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQAMgOAVAAQAVAAAMAPQAMAQAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQANAAAJgMQAIgLAAgVQAAgUgIgLQgJgMgNABQgSAAgJAPg");
	this.shape_313.setTransform(430.5,148.25);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_314.setTransform(418.1,146.125);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#2F3542").s().p("AgjBDQgNgRAAgaIAAgBQAAgbANgQQAMgQAVAAQATAAAMAOIAAg9IAUAAIAACkIgSAAIgBgMQgMAPgUAAQgVgBgMgQgAgUgIQgIAKAAAWQAAAVAIAKQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_315.setTransform(405.675,143.8);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#2F3542").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkgmIAYAAIgsAwIAxBDg");
	this.shape_316.setTransform(373.725,143.7);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_317.setTransform(364.725,144.025);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#2F3542").s().p("AgjBDQgNgRAAgaIAAgBQAAgbANgQQAMgQAVAAQATAAAMAOIAAg9IAUAAIAACkIgSAAIgBgMQgMAPgUAAQgVgBgMgQgAgUgIQgIAKAAAWQAAAVAIAKQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_318.setTransform(355.575,143.8);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_319.setTransform(346.975,144.025);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#2F3542").s().p("AgjBDQgNgRAAgaIAAgBQAAgbANgQQAMgQAVAAQATAAAMAOIAAg9IAUAAIAACkIgSAAIgBgMQgMAPgUAAQgVgBgMgQgAgUgIQgIAKAAAWQAAAVAIAKQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_320.setTransform(337.825,143.8);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_321.setTransform(304.7,146.125);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#2F3542").s().p("AgCBBQgIgIABgPIAAhHIgVAAIAAgPIAVAAIAAgcIASAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHADADQAEAEAHAAIAJgCIAAAQQgIACgHAAQgOAAgFgIg");
	this.shape_322.setTransform(294.8,144.825);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_323.setTransform(288.4,146.025);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_324.setTransform(278.425,146.125);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#2F3542").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_325.setTransform(266.775,146.125);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_326.setTransform(255.475,146.125);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABAMQANgOAUAAQAVAAAMAPQAMAQAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQAOAAAIgMQAJgLgBgVQABgUgJgLQgIgMgOABQgSAAgJAPg");
	this.shape_327.setTransform(243.6,148.25);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#2F3542").s().p("AgOAUQAKgOAAgOIAAgSIATAAIAAAPQAAALgFAKQgFALgIAGg");
	this.shape_328.setTransform(213.5,152.325);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#2F3542").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape_329.setTransform(205.48,146.1258);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#2F3542").s().p("AgSBBQgFgJABgOIAMhHIgVAAIADgPIAUAAIAGgcIASAAIgGAcIAWAAIgDAPIgVAAIgLBIIAAAFQABAIAHAAIAKgBIgCAQQgHACgGAAQgMAAgGgIg");
	this.shape_330.setTransform(196.8,144.825);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#2F3542").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape_331.setTransform(186.68,146.1258);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#2F3542").s().p("AA1A7IANhLIAAgLQgCgOgRAAQgLgBgIAHQgJAHgCALIgOBMIgSAAIANhLQABgMgFgHQgFgGgKAAQgTgBgKARIgPBUIgUAAIAVhzIASAAIgDANQAPgQAVABQALAAAHAFQAHAFADAJQAQgUAXABQARAAAIAMQAJALgDATIgMBLg");
	this.shape_332.setTransform(171.2784,146.0242);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#2F3542").s().p("AgkA7IAUhzIASAAIgCANQALgQARABIAJABIgCATIgJgBQgTAAgKARIgOBRg");
	this.shape_333.setTransform(159.125,146.0242);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#2F3542").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_334.setTransform(149.4232,146.1269);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#2F3542").s().p("AgUBTQgQAAgKgMQgJgMgBgVIABgPQACgSAHgNQAIgOALgHQALgIAOABQASAAALAOIALg9IATAAIgcCkIgSAAIACgMQgNAPgTAAIgBgBgAgTgMQgIAHgFAMQgFANAAAOQAAAPAGAJQAGAIALABQAQAAANgRIAJg1QgGgQgRAAIgBAAQgKAAgJAHg");
	this.shape_335.setTransform(138.0417,143.8008);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#2F3542").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_336.setTransform(125.2348,146.1251);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#2F3542").s().p("AASA7IANhLIAAgKQgBgPgQAAQgRgBgNATIgOBSIgUAAIAUhzIATAAIgDAPQAPgSAUABQAQAAAIALQAIALgCAUIgNBLg");
	this.shape_337.setTransform(112.745,146.0243);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#2F3542").s().p("AgWBPIAThzIATAAIgTBzgAAEg6QgDgDAAgFQAAgGADgDQADgDAFAAQAFgBADAEQADADAAAFQAAAFgDADQgDADgFABQgFAAgDgDg");
	this.shape_338.setTransform(104.85,144.0219);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#2F3542").s().p("AASBSIANhMIAAgJQgBgPgQAAQgRAAgNASIgOBSIgUAAIAdikIATAAIgMBAQAPgRAUAAQAQABAIAKQAIALgCAUIgNBLg");
	this.shape_339.setTransform(95.595,143.7);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#2F3542").s().p("AgFA8QgPAAgKgHQgKgIgFgNQgEgNABgQIABgFQACgQAIgOQAHgNANgHQAMgIAOABQATAAALAMQAKAMAAASIgSAAQAAgLgGgHQgGgHgLgBQgOAAgKALQgKAMgCAUIgBADIAAAOQABAMAGAIQAHAHALAAQAJABAIgHQAJgGACgKIATAAQgCALgHAJQgHAJgLAFQgKAEgJAAIgCAAg");
	this.shape_340.setTransform(84.6313,146.1257);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#2F3542").s().p("Ag8BOIAbibIBeAAIgDARIhKAAIgJAyIBBAAIgDAQIhBAAIgJA3IBLAAIgDARg");
	this.shape_341.setTransform(73.375,144.125);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_342.setTransform(875.325,106.625);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_343.setTransform(863.25,106.725);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgBQAAgbANgQQAMgQAVAAQATAAAMAOIAAg9IAUAAIAAClIgSAAIgBgNQgMAPgUAAQgVAAgMgRgAgUgHQgIAJAAAWQAAAVAIALQAIALAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_344.setTransform(850.825,104.4);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#2F3542").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape_345.setTransform(826.08,106.7258);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#2F3542").s().p("AgUBTQgQAAgKgMQgJgMgBgVIABgPQACgSAHgNQAIgOALgHQALgIAOABQASAAALAOIALg9IATAAIgcCkIgSAAIACgMQgNAPgTAAIgBgBgAgTgMQgIAHgFAMQgFANAAAOQAAAPAGAJQAGAIALABQAQAAANgRIAJg1QgGgQgRAAIgBAAQgKAAgJAHg");
	this.shape_346.setTransform(814.9917,104.4008);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#2F3542").s().p("AgXBPIAVhzIASAAIgTBzgAADg6QgDgDAAgFQAAgGADgDQAEgDAFAAQAFgBADAEQAEADAAAFQAAAFgEADQgDADgFABQgFAAgEgDg");
	this.shape_347.setTransform(806,104.6219);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#2F3542").s().p("AgXBTIAbilIAUAAIgcClg");
	this.shape_348.setTransform(800.75,104.3);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#2F3542").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_349.setTransform(792.2232,106.7269);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#2F3542").s().p("AASA7IANhLIAAgKQgBgPgQAAQgRgBgNATIgOBSIgUAAIAUhzIATAAIgDAPQAPgSAUABQAQAAAIALQAIALgCAUIgNBLg");
	this.shape_350.setTransform(779.995,106.6243);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#2F3542").s().p("AASA7IANhLIAAgKQgBgPgQAAQgRgBgNATIgOBSIgUAAIAUhzIATAAIgDAPQAPgSAUABQAQAAAIALQAIALgCAUIgNBLg");
	this.shape_351.setTransform(768.095,106.6243);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#2F3542").s().p("AAvBOIgIgpIg+AAIgVApIgWAAIBUibIASAAIAfCbgAgOAUIAyAAIgNhHg");
	this.shape_352.setTransform(754.425,104.725);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#2F3542").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgTAAIAAhzIASAAIABANQAMgPAWAAQAZAAAIATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_353.setTransform(726.35,106.625);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgUIAAhLIAUAAIAABKQAAAaAWAAQAVAAAIgQIAAhUIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_354.setTransform(710.575,106.85);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#2F3542").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_355.setTransform(701.875,104.3);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_356.setTransform(696.525,104.625);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#2F3542").s().p("AgQBUIAAhkIgSAAIAAgPIASAAIAAgMQABgTAJgKQAKgLARAAQAIAAAGACIgBAQIgKgBQgLAAgEAGQgGAGAAAKIAAANIAZAAIAAAPIgZAAIAABkg");
	this.shape_357.setTransform(690.35,104.175);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_358.setTransform(670.925,104.625);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#2F3542").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_359.setTransform(665.1,106.625);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_360.setTransform(655.125,106.725);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#2F3542").s().p("AgCBBQgIgIABgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQgBAHADADQAEAEAGAAIAJgCIAAAQQgHACgHAAQgOAAgFgIg");
	this.shape_361.setTransform(645.25,105.425);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_362.setTransform(636,106.725);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#2F3542").s().p("AA+A7IAAhLQAAgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgHAQIAABUIgUAAIAAhzIASAAIABANQAMgPAXAAQAYAAAHATQAGgJAJgFQAKgFANAAQAlAAACAoIAABNg");
	this.shape_363.setTransform(620.4,106.625);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgPAOgSAAQgRAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_364.setTransform(592.15,106.725);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgBQAAgbANgQQAMgQAVAAQATAAAMAOIAAg9IAUAAIAAClIgSAAIgBgNQgMAPgUAAQgVAAgMgRgAgUgHQgIAJAAAWQAAAVAIALQAIALAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_365.setTransform(579.725,104.4);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAGAFQAGAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_366.setTransform(567.8,106.725);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#2F3542").s().p("AgwBSIAAigIASAAIABANQAMgQAVABQAVgBAMARQAMAPAAAdIAAABQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgvIAAA2QAJAQASAAQAOAAAIgMQAJgLgBgVQABgUgJgLQgIgLgOAAQgSgBgJARg");
	this.shape_367.setTransform(555.9,108.85);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#2F3542").s().p("Ag6BQIACgRIAFABQAJAAAHgEQAHgFAFgKIAHgNIgVhxIAVAAIANBWIAohWIAWAAIhECHQgPAcgWAAIgMgCg");
	this.shape_368.setTransform(531.6,109.125);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#2F3542").s().p("AgSBBQgFgJABgOIAMhHIgVAAIADgPIAUAAIAGgcIASAAIgGAcIAWAAIgDAPIgVAAIgLBIIAAAFQABAIAHAAIAKgBIgCAQQgHACgGAAQgMAAgGgIg");
	this.shape_369.setTransform(523.5,105.425);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#2F3542").s().p("AgXBPIAUhzIATAAIgTBzgAAEg6QgDgDAAgFQAAgGADgDQADgDAFAAQAFgBADAEQAEADgBAFQABAFgEADQgDADgFABQgFAAgDgDg");
	this.shape_370.setTransform(517.15,104.6219);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#2F3542").s().p("AgXBTIAcilIATAAIgbClg");
	this.shape_371.setTransform(511.9,104.3);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#2F3542").s().p("AgXBPIAUhzIATAAIgTBzgAADg6QgCgDAAgFQAAgGACgDQAEgDAFAAQAFgBADAEQADADAAAFQAAAFgDADQgDADgFABQgFAAgEgDg");
	this.shape_372.setTransform(506.55,104.6219);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#2F3542").s().p("AgfBEIgDANIgSAAIAcikIAUAAIgMA+QAOgQATABQARAAAJAMQAJAMABAUQAAAHgBAGIAAADQgCASgIAOQgHAOgLAHQgLAHgNAAQgUgBgLgPgAgSgBIgJAxQAGASASABQAKAAAJgHQAIgHAFgNQAEgNABgOQAAgPgGgJQgFgIgMAAIgBAAQgQAAgMASg");
	this.shape_373.setTransform(497.2583,104.425);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#2F3542").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape_374.setTransform(485.38,106.7258);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#2F3542").s().p("AASA7IANhLIAAgKQgBgPgQAAQgRgBgNATIgOBSIgUAAIAUhzIATAAIgDAPQAPgSAUABQAQAAAIALQAIALgCAUIgNBLg");
	this.shape_375.setTransform(473.445,106.6243);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#2F3542").s().p("AgWBPIAUhzIASAAIgTBzgAAEg6QgEgDAAgFQAAgGAEgDQADgDAFAAQAFgBADAEQADADABAFQgBAFgDADQgDADgFABQgFAAgDgDg");
	this.shape_376.setTransform(465.55,104.6219);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#2F3542").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape_377.setTransform(456.48,106.7258);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#2F3542").s().p("AgSBBQgFgJABgOIAMhHIgVAAIADgPIAUAAIAGgcIASAAIgGAcIAWAAIgDAPIgVAAIgLBIIAAAFQAAAIAIAAIAKgBIgCAQQgHACgGAAQgMAAgGgIg");
	this.shape_378.setTransform(447.8,105.425);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#2F3542").s().p("AgFA8QgTAAgLgKQgNgLABgRIAUAAQAAAKAFAGQAHAGAKAAQAKAAAIgEQAHgFACgIQABgMgOgFIgTgGQgagIABgUQABgQANgJQANgKARAAQASAAAKAKQAMAKgBAQIgTAAQAAgJgGgFQgFgFgKgBQgJAAgHAFQgHAFgBAIQgCAKAOAFIAJACQAUAFAJAIQAIAIgBAMQAAALgHAIQgGAIgLAFQgKADgJAAIgDAAg");
	this.shape_379.setTransform(438.1501,106.7278);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#2F3542").s().p("AgTA7QgQgBgIgLQgIgMACgTIAMhKIATAAIgMBKIAAAJQAAAIAEAEQAEAFAIAAQAUABALgSIAPhTIATAAIgUBzIgTAAIADgMQgNAOgTAAIgCAAg");
	this.shape_380.setTransform(427.18,106.8509);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#2F3542").s().p("AgFA8QgTAAgLgKQgNgLABgRIAUAAQAAAKAFAGQAHAGAKAAQAKAAAIgEQAHgFACgIQABgMgOgFIgTgGQgagIABgUQABgQANgJQANgKARAAQASAAAKAKQAMAKgBAQIgTAAQAAgJgGgFQgFgFgKgBQgJAAgHAFQgHAFgBAIQgCAKAOAFIAJACQAUAFAJAIQAIAIgBAMQAAALgHAIQgGAIgLAFQgKADgJAAIgDAAg");
	this.shape_381.setTransform(415.2001,106.7278);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#2F3542").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_382.setTransform(391.175,106.625);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAGAFAKAAQAJAAAIgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_383.setTransform(379.1,106.725);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#2F3542").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQAEAEAGAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape_384.setTransform(369.2,105.425);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#2F3542").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgPAOgRAAQgSAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_385.setTransform(359.95,106.725);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgUIAAhLIAUAAIAABKQAAAaAWAAQAVAAAIgQIAAhUIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_386.setTransform(347.875,106.85);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#2F3542").s().p("AA9A7IAAhLQABgNgGgGQgGgGgNAAQgMAAgGAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgGAQIAABUIgUAAIAAhzIASAAIABANQAMgPAXAAQAYAAAHATQAGgJAKgFQAJgFAMAAQAnAAABAoIAABNg");
	this.shape_387.setTransform(332.2,106.625);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#2F3542").s().p("AgbA7IAAhzIATAAIAAANQAJgPATAAQAFAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_388.setTransform(319.4,106.625);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_389.setTransform(309.425,106.725);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#2F3542").s().p("AgdBEIgBAOIgSAAIAAilIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAcgMAQQgMAPgVABQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_390.setTransform(297.575,104.4);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_391.setTransform(272.875,106.725);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#2F3542").s().p("AA9A7IAAhLQABgNgGgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgHAQIAABUIgVAAIAAhzIATAAIABANQANgPAVAAQAYAAAJATQAFgJAKgFQAJgFAMAAQAmAAABAoIAABNg");
	this.shape_392.setTransform(257.3,106.625);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_393.setTransform(241.65,106.725);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#2F3542").s().p("AgYBNQgMgGgHgJIALgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgNgQQgMgQAAgcQAAgbAMgQQANgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgOANQgNANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_394.setTransform(229.3,108.925);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_395.setTransform(204.75,106.725);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_396.setTransform(196.125,104.625);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#2F3542").s().p("AgjBDQgNgQAAgbIAAgBQAAgbANgQQAMgQAVAAQATAAAMAOIAAg9IAUAAIAAClIgSAAIgBgNQgMAPgUAAQgVAAgMgRgAgUgHQgIAJAAAWQAAAVAIALQAIALAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_397.setTransform(186.975,104.4);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_398.setTransform(175.375,106.725);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#2F3542").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgIAQIAABUIgUAAIAAhzIATAAIABANQAMgPAXAAQAYAAAIATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_399.setTransform(159.8,106.625);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#2F3542").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_400.setTransform(134.875,104.625);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#2F3542").s().p("AgjAwQgKgLAAgUIAAhLIAUAAIAABKQAAAaAWAAQAVAAAIgQIAAhUIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_401.setTransform(126.075,106.85);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#2F3542").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_402.setTransform(117.375,104.3);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#2F3542").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_403.setTransform(108.7,106.725);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#2F3542").s().p("AgJBTIAAilIATAAIAAClg");
	this.shape_404.setTransform(100.075,104.3);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#2F3542").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_405.setTransform(91.725,106.725);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#2F3542").s().p("AA5BOIAAg9IAChAIgzB9IgPAAIgzh9IACBAIAAA9IgVAAIAAibIAbAAIAyB+IAzh+IAbAAIAACbg");
	this.shape_406.setTransform(76.2,104.725);

	this.instance = new lib.Bitmap14();
	this.instance.setTransform(7,4);

	this.instance_1 = new lib.Bitmap5();
	this.instance_1.setTransform(-28,-39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.btnMenuTujuan}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#3498DB",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap14.png", id:"Bitmap14"},
		{src:"images/Bitmap5.png", id:"Bitmap5"}
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