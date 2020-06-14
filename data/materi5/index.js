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



(lib.Bitmap28 = function() {
	this.initialize(img.Bitmap28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib.flash0ai = function() {
	this.initialize(img.flash0ai);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1750,980);


(lib.flash0aiAssets = function() {
	this.initialize(img.flash0aiAssets);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,575,83);


(lib.flash0aiAssets_1 = function() {
	this.initialize(img.flash0aiAssets_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,416,221);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


(lib.flash0aiAssets_2 = function() {
	this.initialize(img.flash0aiAssets_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,416,225);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);// helper functions:

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


(lib.Tween12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets();
	this.instance.setTransform(-19,-2.75,0.0662,0.0662);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-2.7,38.1,5.5);


(lib.Tween11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets();
	this.instance.setTransform(-19.05,-2.75,0.0662,0.0662);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-2.7,38,5.5);


(lib.Tween9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(5.55,-21.15,0.0908,0.0999,0,-45,135);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.1,-21.1,42.3,42.3);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.miner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#004C25").s().p("AgKARIAAghIAVAAIAAAhg");
	this.shape.setTransform(-70.9499,70.947,2.0594,2.0594);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#004C25").s().p("AgEAAQAAgEAEAAQAFAAAAAEQAAAFgFAAQgEAAAAgFg");
	this.shape_1.setTransform(-56.5337,56.5309,2.0594,2.0594);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8BC53F").s().p("AgOAPQgGgHAAgIQAAgIAGgGQAHgGAHAAQAJAAAGAGQAGAGAAAIQAAAIgGAHQgGAGgJAAQgHAAgHgGg");
	this.shape_2.setTransform(-56.5337,56.5309,2.0594,2.0594);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8BC53F").s().p("AAAAwQgTAAgOgOQgOgOgBgUQABgTAOgOQAOgPAUABQATAAAOAOQAOAOAAATQAAAUgOAPQgOANgTAAIgBAAgAgWgXQgLAKABANQgBAOALAKQAJAJANABQAOAAAJgKQAKgKAAgOQAAgNgJgJQgJgKgOAAIgBAAQgNAAgJAJg");
	this.shape_3.setTransform(-3.194,52.1546,2.0594,2.0594);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#006838").s().p("AgGAAQAAgCACgCQACgCACAAQAHAAAAAGQAAAHgHAAQgGAAAAgHg");
	this.shape_4.setTransform(-21.2657,50.713,2.0594,2.0594);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8BC53F").s().p("AgHAIQgDgEAAgEQAAgDADgEQADgDAEAAQAEAAAEAEQADADAAADQAAAFgDADQgEADgEAAQgEAAgDgDg");
	this.shape_5.setTransform(-3.1426,52.1546,2.0594,2.0594);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#004C25").s().p("AiDAAIAAgGIEHAGIAAAHg");
	this.shape_6.setTransform(-30.4469,60.7337,2.0592,2.0592);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8BC53F").s().p("AgtAvIgIgWIASg0IgEgIIARgLIAFAIIA3AIIAQARQgCAGgHAHQgNARgUAMQgcASgXAAIgGAAg");
	this.shape_7.setTransform(-22.7073,48.4762,2.0594,2.0594);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#004C25").s().p("Ah6AVID0gvIABAGIj0Awg");
	this.shape_8.setTransform(-31.8368,48.4818,2.0592,2.0592);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#004C25").s().p("AgEAlIAAhJIAKAAIAABJg");
	this.shape_9.setTransform(-64.2567,59.826,2.0594,2.0594);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#004C25").s().p("AgEAlIAAhJIAJAAIAABJg");
	this.shape_10.setTransform(-48.6564,59.826,2.0594,2.0594);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#004C25").s().p("Ah0BhIB7h+IAAg7Ii1C9IgEgEIC5jDIAAgCICsAAIAACLIgGAAIAAgpIigAAIAAApIgGAAIAAg7Ih2B5gAANgIICgAAIAAglIigAAgAANg0ICgAAIAAgpIigAAg");
	this.shape_11.setTransform(-103.8496,52.8754,2.0594,2.0594);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#004C25").s().p("AgzCIIBekSIAJADIheESg");
	this.shape_12.setTransform(-18.8973,13.5399,2.0594,2.0594);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#006838").s().p("AgVAfIAXhEIAUAHIgXBEg");
	this.shape_13.setTransform(-6.6436,-21.9856,2.0594,2.0594);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#004C25").s().p("AjHAhIAAgXIC1AAIAqgqICwAAIAAAgIinAAIghAhg");
	this.shape_14.setTransform(-107.6595,67.6519,2.0594,2.0594);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#004C25").s().p("AmTARIAAghIMnAAIAAAhg");
	this.shape_15.setTransform(14.4657,70.947,2.0594,2.0594);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#004C25").s().p("AgpAGIAAgLIBTAAIAAALg");
	this.shape_16.setTransform(65.3039,-12.0575,2.0592,2.0592);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#004C25").s().p("Ag6AGIAAgLIB1AAIAAALg");
	this.shape_17.setTransform(65.2525,4.3128,2.0592,2.0592);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#004C25").s().p("AhLAGIAAgLICXAAIAAALg");
	this.shape_18.setTransform(65.2525,20.6831,2.0592,2.0592);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#004C25").s().p("AhcAGIAAgLIC5AAIAAALg");
	this.shape_19.setTransform(65.2525,37.0534,2.0592,2.0592);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#004C25").s().p("AhtAGIAAgLIDbAAIAAALg");
	this.shape_20.setTransform(65.2525,53.4237,2.0592,2.0592);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#004C25").s().p("AAnDsIhbnXIAOAAIBcHXg");
	this.shape_21.setTransform(79.8725,18.8814,2.0592,2.0592);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#004C25").s().p("Ag0DsIBbnXIAOAAIhbHXg");
	this.shape_22.setTransform(50.478,18.8814,2.0592,2.0592);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#004C25").s().p("AgmAJIAAgQIBNAAIAAAQg");
	this.shape_23.setTransform(65.1282,-31.4075,2.0594,2.0594);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#004C25").s().p("AAAAEIgDgCIAAgCQACgFADACQAEABgCAEQAAAAAAABQgBABAAAAQAAAAgBABQAAAAgBAAIgBgBg");
	this.shape_24.setTransform(0.3749,-42.1434,2.0594,2.0594);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#8BC53F").s().p("AgGAHQgCgDAAgEQAAgDACgCQADgDADAAQAEAAACADQADADAAACQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_25.setTransform(65.2311,-42.2711,2.0594,2.0594);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#004C25").s().p("AgTAiIAAgvQAAgIAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAIIAAAvg");
	this.shape_26.setTransform(65.2311,-40.3661,2.0594,2.0594);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#8BC53F").s().p("AhegFIAlAAIAAhBIgpAAICFh3IAHAHIAdAyQAcA8AABDQAAA4ggBEQgQAigRAZIgJAMgAAaCaQAkg5ANg8Ih4AAgAAAAQIBOAAQABgKAAgLQAAgogLgmIhEAAgAA+hnQgMgfgRgaIhAA5IBdAAIAAAAg");
	this.shape_27.setTransform(128.4562,-35.3205,2.0594,2.0594);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#8BC53F").s().p("AgaAfIAWg+QACgGAFgDQAGgDAHACQAGADADAGQADAGgCAGIgWA+g");
	this.shape_28.setTransform(-1.7899,-36.6477,2.0594,2.0594);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#006838").s().p("Ak4AgIAAg/IJxAAIAAA/g");
	this.shape_29.setTransform(52.0507,-43.3008,2.0594,2.0594);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#006838").s().p("AhABDIAAiEIBHAAQAYgBARASQARAQAAAYQAAAHgDAGIgWA+g");
	this.shape_30.setTransform(-2.1128,53.7507,2.0594,2.0594);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#004C25").s().p("Ag0A6IAAhzIBpAAIAABzg");
	this.shape_31.setTransform(-26.4143,55.5012,2.0594,2.0594);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#006838").s().p("AgbAcQgLgMAAgQQAAgPALgLQAMgMAPAAQAQAAALAMQAMALAAAPQAAAQgMAMQgLALgQAAQgPAAgMgLg");
	this.shape_32.setTransform(-56.4823,56.4794,2.0594,2.0594);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#006838").s().p("AgHALIAAgVIAPAAIAAAVg");
	this.shape_33.setTransform(-79.6511,59.5171,2.0594,2.0594);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#006838").s().p("AgHALIAAgVIAPAAIAAAVg");
	this.shape_34.setTransform(-97.9287,59.5171,2.0594,2.0594);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#8BC53F").s().p("Ag0BRIAAihIBpAAIAAChg");
	this.shape_35.setTransform(-88.7641,40.5702,2.0594,2.0594);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#006838").s().p("AgIATIAAgkIARAAIAAAkg");
	this.shape_36.setTransform(133.4621,59.1894,2.0592,2.0592);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#8BC53F").s().p("AgPATIAAgkIAfAAIAAAkg");
	this.shape_37.setTransform(133.4621,66.8083,2.0592,2.0592);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#004C25").s().p("AgfAJIAAgRIA/AAIAAARg");
	this.shape_38.setTransform(133.4621,72.5224,2.0592,2.0592);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#8BC53F").s().p("AgPASIAAgjIAfAAIAAAjg");
	this.shape_39.setTransform(133.4621,51.622,2.0592,2.0592);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#006838").s().p("AgECEIAAkGIAJAAIAAEGg");
	this.shape_40.setTransform(133.4621,25.2133,2.0592,2.0592);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#006838").s().p("AgJGGIAAsLIATAAIAAMLg");
	this.shape_41.setTransform(133.475,25.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_40,p:{scaleX:2.0592,scaleY:2.0592,x:133.4621,y:25.2133}},{t:this.shape_39,p:{scaleX:2.0592,scaleY:2.0592,x:133.4621,y:51.622}},{t:this.shape_38,p:{scaleX:2.0592,scaleY:2.0592,x:133.4621,y:72.5224}},{t:this.shape_37,p:{scaleX:2.0592,scaleY:2.0592,x:133.4621,y:66.8083}},{t:this.shape_36,p:{scaleX:2.0592,scaleY:2.0592,x:133.4621,y:59.1894}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:52.0507,y:-43.3008}},{t:this.shape_28,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-1.7899,y:-36.6477}},{t:this.shape_27,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:128.4562,y:-35.3205}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:0.3749,y:-42.1434}},{t:this.shape_23},{t:this.shape_22,p:{scaleX:2.0592,scaleY:2.0592,x:50.478,y:18.8814}},{t:this.shape_21,p:{scaleX:2.0592,scaleY:2.0592,x:79.8725,y:18.8814}},{t:this.shape_20,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:53.4237}},{t:this.shape_19,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:37.0534}},{t:this.shape_18,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:20.6831}},{t:this.shape_17,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:4.3128}},{t:this.shape_16,p:{scaleX:2.0592,scaleY:2.0592,x:65.3039,y:-12.0575}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-6.6436,y:-21.9856}},{t:this.shape_12,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-18.8973,y:13.5399}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{scaleX:2.0592,scaleY:2.0592,x:-31.8368,y:48.4818}},{t:this.shape_7},{t:this.shape_6,p:{scaleX:2.0592,scaleY:2.0592,x:-30.4469,y:60.7337}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_41,p:{scaleY:1,y:25.275}},{t:this.shape_39,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_38,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_37,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_36,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:48.9626,y:-42.2421}},{t:this.shape_28,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-3.7352,y:-29.357}},{t:this.shape_27,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:125.7778,y:-43.2243}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-2.226,y:-35.0677}},{t:this.shape_23},{t:this.shape_22,p:{scaleX:2.0592,scaleY:2.0592,x:50.478,y:18.8814}},{t:this.shape_21,p:{scaleX:2.0592,scaleY:2.0592,x:79.8725,y:18.8814}},{t:this.shape_20,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:53.4237}},{t:this.shape_19,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:37.0534}},{t:this.shape_18,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:20.6831}},{t:this.shape_17,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:4.3128}},{t:this.shape_16,p:{scaleX:2.0592,scaleY:2.0592,x:65.3039,y:-12.0575}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-6.8464,y:-14.2289}},{t:this.shape_12,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-14.8747,y:22.4831}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{scaleX:2.0592,scaleY:2.0592,x:-31.8368,y:48.4818}},{t:this.shape_7},{t:this.shape_6,p:{scaleX:2.0592,scaleY:2.0592,x:-30.4469,y:60.7337}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},2).to({state:[{t:this.shape_41,p:{scaleY:1.0846,y:22.0124}},{t:this.shape_39,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_38,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_37,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_36,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:46.447,y:-40.8215}},{t:this.shape_28,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-4.7046,y:-22.7515}},{t:this.shape_27,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:122.7812,y:-49.4504}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-3.7717,y:-28.584}},{t:this.shape_23},{t:this.shape_22,p:{scaleX:2.0592,scaleY:2.0592,x:50.478,y:18.8814}},{t:this.shape_21,p:{scaleX:2.0592,scaleY:2.0592,x:79.8725,y:18.8814}},{t:this.shape_20,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:53.4237}},{t:this.shape_19,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:37.0534}},{t:this.shape_18,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:20.6831}},{t:this.shape_17,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:4.3128}},{t:this.shape_16,p:{scaleX:2.0592,scaleY:2.0592,x:65.3039,y:-12.0575}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-6.2933,y:-7.3889}},{t:this.shape_12,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-10.6247,y:29.9397}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{scaleX:2.0592,scaleY:2.0592,x:-31.8368,y:48.4818}},{t:this.shape_7},{t:this.shape_6,p:{scaleX:2.0592,scaleY:2.0592,x:-30.4469,y:60.7337}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},2).to({state:[{t:this.shape_41,p:{scaleY:1.1693,y:18.7543}},{t:this.shape_39,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_38,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_37,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_36,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:43.9599,y:-39.0541}},{t:this.shape_28,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-5.1336,y:-15.9713}},{t:this.shape_27,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:119.0523,y:-55.2551}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-4.7873,y:-21.8677}},{t:this.shape_23},{t:this.shape_22,p:{scaleX:2.0592,scaleY:2.0592,x:50.478,y:18.8814}},{t:this.shape_21,p:{scaleX:2.0592,scaleY:2.0592,x:79.8725,y:18.8814}},{t:this.shape_20,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:53.4237}},{t:this.shape_19,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:37.0534}},{t:this.shape_18,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:20.6831}},{t:this.shape_17,p:{scaleX:2.0592,scaleY:2.0592,x:65.2525,y:4.3128}},{t:this.shape_16,p:{scaleX:2.0592,scaleY:2.0592,x:65.3039,y:-12.0575}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-5.1819,y:-0.5269}},{t:this.shape_12,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-5.7676,y:37.0475}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{scaleX:2.0592,scaleY:2.0592,x:-31.8368,y:48.4818}},{t:this.shape_7},{t:this.shape_6,p:{scaleX:2.0592,scaleY:2.0592,x:-30.4469,y:60.7337}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},3).to({state:[{t:this.shape_41,p:{scaleY:1.0846,y:22.0124}},{t:this.shape_39,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_38,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_37,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_36,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:46.447,y:-40.8215}},{t:this.shape_28,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-4.7046,y:-22.7515}},{t:this.shape_27,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:122.7812,y:-49.4504}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-3.7717,y:-28.584}},{t:this.shape_23},{t:this.shape_22,p:{scaleX:2.0591,scaleY:2.0591,x:50.4751,y:18.88}},{t:this.shape_21,p:{scaleX:2.0591,scaleY:2.0591,x:79.8691,y:18.88}},{t:this.shape_20,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:53.4218}},{t:this.shape_19,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:37.0518}},{t:this.shape_18,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:20.6817}},{t:this.shape_17,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:4.3116}},{t:this.shape_16,p:{scaleX:2.0591,scaleY:2.0591,x:65.3008,y:-12.0584}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-6.2933,y:-7.3889}},{t:this.shape_12,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-10.6247,y:29.9397}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{scaleX:2.0591,scaleY:2.0591,x:-31.8386,y:48.4799}},{t:this.shape_7},{t:this.shape_6,p:{scaleX:2.0591,scaleY:2.0591,x:-30.4487,y:60.7317}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},2).to({state:[{t:this.shape_41,p:{scaleY:1,y:25.275}},{t:this.shape_39,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_38,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_37,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_36,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:48.9626,y:-42.2421}},{t:this.shape_28,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-3.7352,y:-29.357}},{t:this.shape_27,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:125.7778,y:-43.2243}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-2.226,y:-35.0677}},{t:this.shape_23},{t:this.shape_22,p:{scaleX:2.0591,scaleY:2.0591,x:50.4751,y:18.88}},{t:this.shape_21,p:{scaleX:2.0591,scaleY:2.0591,x:79.8691,y:18.88}},{t:this.shape_20,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:53.4218}},{t:this.shape_19,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:37.0518}},{t:this.shape_18,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:20.6817}},{t:this.shape_17,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:4.3116}},{t:this.shape_16,p:{scaleX:2.0591,scaleY:2.0591,x:65.3008,y:-12.0584}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-6.8464,y:-14.2289}},{t:this.shape_12,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-14.8747,y:22.4831}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{scaleX:2.0591,scaleY:2.0591,x:-31.8386,y:48.4799}},{t:this.shape_7},{t:this.shape_6,p:{scaleX:2.0591,scaleY:2.0591,x:-30.4487,y:60.7317}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},3).to({state:[{t:this.shape_40,p:{scaleX:2.0591,scaleY:2.0591,x:133.4579,y:25.2118}},{t:this.shape_39,p:{scaleX:2.0591,scaleY:2.0591,x:133.4579,y:51.6201}},{t:this.shape_38,p:{scaleX:2.0591,scaleY:2.0591,x:133.4579,y:72.5202}},{t:this.shape_37,p:{scaleX:2.0591,scaleY:2.0591,x:133.4579,y:66.8062}},{t:this.shape_36,p:{scaleX:2.0591,scaleY:2.0591,x:133.4579,y:59.1874}},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:52.0507,y:-43.3008}},{t:this.shape_28,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-1.7899,y:-36.6477}},{t:this.shape_27,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:128.4562,y:-35.3205}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:0.3749,y:-42.1434}},{t:this.shape_23},{t:this.shape_22,p:{scaleX:2.0591,scaleY:2.0591,x:50.4751,y:18.88}},{t:this.shape_21,p:{scaleX:2.0591,scaleY:2.0591,x:79.8691,y:18.88}},{t:this.shape_20,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:53.4218}},{t:this.shape_19,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:37.0518}},{t:this.shape_18,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:20.6817}},{t:this.shape_17,p:{scaleX:2.0591,scaleY:2.0591,x:65.2493,y:4.3116}},{t:this.shape_16,p:{scaleX:2.0591,scaleY:2.0591,x:65.3008,y:-12.0584}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-6.6436,y:-21.9856}},{t:this.shape_12,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-18.8973,y:13.5399}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{scaleX:2.0591,scaleY:2.0591,x:-31.8386,y:48.4799}},{t:this.shape_7},{t:this.shape_6,p:{scaleX:2.0591,scaleY:2.0591,x:-30.4487,y:60.7317}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-148.9,-94.7,297.8,169.2);


(lib.gambarLapisan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3867D6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.gambarLapisan, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.Path_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_6_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_1, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_6_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_0, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AiAQvMAAAghdIEBAAMAAAAhdg");
	this.shape.setTransform(12.85,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_5_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_1, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_5_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_0, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_4_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_1, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_4_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_0, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_1, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_3_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_0, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_2_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_0, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_1_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_0, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AiAQvMAAAghdIEBAAMAAAAhdg");
	this.shape.setTransform(12.85,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AiAQvMAAAghdIEBAAMAAAAhdg");
	this.shape.setTransform(12.85,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_29 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1E8FA").s().p("AilA5QhzgChNgKQhrgPhBgeQgVgJgFgLQgEgJALgJQAJgHAWgJIAGgCIQtAMQgCAIgMAJQgXATgnAKQgrANg7AJIhoAOQimATjBAAIhSAAg");
	this.shape.setTransform(55.7484,5.7431);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_29, new cjs.Rectangle(0,0,111.5,11.5), null);


(lib.Path_6_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8ED7F7").s().p("AgFAJIgBAAQgDgHAGgGQADgGAEAAQAGAAgEAFIAAAGQAAAEgFADIgFADQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAg");
	this.shape_1.setTransform(0.7651,1.0691);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_2, new cjs.Rectangle(0,0,1.6,2.2), null);


(lib.Path_5_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8ED7F7").s().p("AhPAPQAagPA3gJIAogGIApgFQAAgBAAAAQABAAAAABQAAAAAAAAQAAAAAAABIgCACQgnAOgsAIIgrAJQgYAGgNACIAAAAQgEAAAGgHg");
	this.shape_1.setTransform(8.3771,2.1454);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_2, new cjs.Rectangle(0,0,16.8,4.3), null);


(lib.Path_2_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#279FC9").s().p("AEvBOQgkgrg5gVQgygRg8gBQgdAAgzAFQg4AGgWABQhAADhbgOQgtgHgbgJQgogMgbgTQgPgLgMgLQC2AUCUAHQDTAKBigUIAEgvIAsAoIgFgZQgGgZADACIAwA0IAfACIgVClIggACQgLgTgMgOg");
	this.shape_1.setTransform(37.95,11.0675);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1_1, new cjs.Rectangle(0,0,75.9,22.2), null);


(lib.Path_2_0_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#279FC9").s().p("AhHBGIAAgCIASiSQBCAFA7AIIgjBSIgBAiQAAATgFAJQhFgDghgGg");
	this.shape_1.setTransform(7.2,7.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_0_1, new cjs.Rectangle(0,0,14.4,15.9), null);


(lib.Path_2_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#279FC9").s().p("AhHgGIA8gvQAeAAAjAEQABAyARA1g");
	this.shape_1.setTransform(7.15,5.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_2, new cjs.Rectangle(0,0,14.3,10.9), null);


(lib.Path_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#279FC9").s().p("AgLAyQgLg0gnghQAsgKAlgPIgUggIA+ARQgJAUgJAdQgSA4gEA0IgbALQgCgWgEgVg");
	this.shape_1.setTransform(6.15,9.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_2, new cjs.Rectangle(0,0,12.3,18.6), null);


(lib.Path_0_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#279FC9").s().p("ACNBkIgCgFQgUgqgSgWQgagdgjgHIhWgRQgxgKgigRQgPgHgNgKQBvAQAzgBQAlgBAVgLQAbgOAegXIAcAKIgIAVIgCAZIAFABIAPCQg");
	this.shape_1.setTransform(15.75,10.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0_1, new cjs.Rectangle(0,0,31.5,20.2), null);


(lib.Path_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#279FC9").s().p("AAKAyQgRgEgZgBIgsgBQgVgBg1gKIgSgEQB4gZA9gVQCCgvAagLQgfBggPAjIhLAUQgQgUgWgGg");
	this.shape_1.setTransform(16.9,7.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8, new cjs.Rectangle(0,0,33.8,15.2), null);


(lib.CompoundPath_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8ED7F7").s().p("AAOA+QgEgBgEgIQgGgQABgQQACgQAKgLIgJAGIgDADQgBADgDAMQgCAKgFAFQgGAGgIABQgJAAgGgGQgKgKgEgQQgFgSAUgVIgKAGIgXASQgCAEgEACQgFACgEgBQgHgBgCgHQgBgGADgHQAGgNAQgJQAJgGAMgEQgggDgZALQgbAJAKATQAEAHAIAJIAPANQACACgEADQgEAEgDgBIgdgKQgRgGgIgIQgJgJADgMQADgKAMgIQAQgMAjgDIAVgBQAcgEAeADIABAAIABABQABAAAAAAQABABAAAAQgBABAAABQgBAAgBABQgDAEgDAAQgTAFgRALIgJAHIgBACQgBACABADQAJgIAKgFIAIgFQAbgPAUgCQAEgBgCAFQgBADgDACQgSATgEAQQgCAJACAJIABAHQADgGAFgFQAMgPASgLQAqgaAuACIA9gGQAFAAgKAJQg6AMgeAQIgLAKQgLALgIASIgIASQgEALgFAFQgEAGgGAAIgCAAgAh+gDIgDgEIgBACIAEACg");
	this.shape.setTransform(16.757,6.2117);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_1, new cjs.Rectangle(0,0,33.6,12.5), null);


(lib.CompoundPath = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8ED7F7").s().p("AgFAZQgMgJACgMQgCgKAKgJQAIgKANABQABAAAAAAQABAAAAAAQAAABAAAAQABABgBAAQgCAHgJAJQgJALADAMIABAEQAAABAAAAQAAAAAAABQAAAAAAABQgBAAAAAAIgCABIgCAAg");
	this.shape.setTransform(1.6723,2.5188);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath, new cjs.Rectangle(0,0,3.3,5.1), null);


(lib.Path_29_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C1E8FA").s().p("AilA5QhzgChNgKQhrgPhBgeQgVgJgFgLQgEgJALgJQAJgHAWgJIAGgCIQtAMQgCAIgMAJQgXATgnAKQgrANg7AJIhoAOQimATjBAAIhSAAg");
	this.shape_1.setTransform(55.7484,5.7431);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_29_1, new cjs.Rectangle(0,0,111.5,11.5), null);


(lib.Path_6_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8ED7F7").s().p("AgFAJIgBAAQgDgHAGgGQADgGAEAAQAGAAgEAFIAAAGQAAAEgFADIgFADQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAg");
	this.shape_2.setTransform(0.7651,1.0691);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_3, new cjs.Rectangle(0,0,1.6,2.2), null);


(lib.Path_5_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8ED7F7").s().p("AhPAPQAagPA3gJIAogGIApgFQAAgBAAAAQABAAAAABQAAAAAAAAQAAAAAAABIgCACQgnAOgsAIIgrAJQgYAGgNACIAAAAQgEAAAGgHg");
	this.shape_2.setTransform(8.3771,2.1454);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_3, new cjs.Rectangle(0,0,16.8,4.3), null);


(lib.Path_2_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#279FC9").s().p("AEvBOQgkgrg5gVQgygRg8gBQgdAAgzAFQg4AGgWABQhAADhbgOQgtgHgbgJQgogMgbgTQgPgLgMgLQC2AUCUAHQDTAKBigUIAEgvIAsAoIgFgZQgGgZADACIAwA0IAfACIgVClIggACQgLgTgMgOg");
	this.shape_2.setTransform(37.95,11.0675);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1_2, new cjs.Rectangle(0,0,75.9,22.2), null);


(lib.Path_2_0_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#279FC9").s().p("AhHBGIAAgCIASiSQBCAFA7AIIgjBSIgBAiQAAATgFAJQhFgDghgGg");
	this.shape_2.setTransform(7.2,7.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_0_2, new cjs.Rectangle(0,0,14.4,15.9), null);


(lib.Path_2_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#279FC9").s().p("AhHgGIA8gvQAeAAAjAEQABAyARA1g");
	this.shape_2.setTransform(7.15,5.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_3, new cjs.Rectangle(0,0,14.3,10.9), null);


(lib.Path_1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#279FC9").s().p("AgLAyQgLg0gnghQAsgKAlgPIgUggIA+ARQgJAUgJAdQgSA4gEA0IgbALQgCgWgEgVg");
	this.shape_2.setTransform(6.15,9.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_3, new cjs.Rectangle(0,0,12.3,18.6), null);


(lib.Path_0_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#279FC9").s().p("ACNBkIgCgFQgUgqgSgWQgagdgjgHIhWgRQgxgKgigRQgPgHgNgKQBvAQAzgBQAlgBAVgLQAbgOAegXIAcAKIgIAVIgCAZIAFABIAPCQg");
	this.shape_2.setTransform(15.75,10.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0_2, new cjs.Rectangle(0,0,31.5,20.2), null);


(lib.Path_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#279FC9").s().p("AAKAyQgRgEgZgBIgsgBQgVgBg1gKIgSgEQB4gZA9gVQCCgvAagLQgfBggPAjIhLAUQgQgUgWgGg");
	this.shape_2.setTransform(16.9,7.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9, new cjs.Rectangle(0,0,33.8,15.2), null);


(lib.CompoundPath_1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8ED7F7").s().p("AAOA+QgEgBgEgIQgGgQABgQQACgQAKgLIgJAGIgDADQgBADgDAMQgCAKgFAFQgGAGgIABQgJAAgGgGQgKgKgEgQQgFgSAUgVIgKAGIgXASQgCAEgEACQgFACgEgBQgHgBgCgHQgBgGADgHQAGgNAQgJQAJgGAMgEQgggDgZALQgbAJAKATQAEAHAIAJIAPANQACACgEADQgEAEgDgBIgdgKQgRgGgIgIQgJgJADgMQADgKAMgIQAQgMAjgDIAVgBQAcgEAeADIABAAIABABQABAAAAAAQABABAAAAQgBABAAABQgBAAgBABQgDAEgDAAQgTAFgRALIgJAHIgBACQgBACABADQAJgIAKgFIAIgFQAbgPAUgCQAEgBgCAFQgBADgDACQgSATgEAQQgCAJACAJIABAHQADgGAFgFQAMgPASgLQAqgaAuACIA9gGQAFAAgKAJQg6AMgeAQIgLAKQgLALgIASIgIASQgEALgFAFQgEAGgGAAIgCAAgAh+gDIgDgEIgBACIAEACg");
	this.shape_1.setTransform(16.757,6.2117);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_1_1, new cjs.Rectangle(0,0,33.6,12.5), null);


(lib.CompoundPath_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8ED7F7").s().p("AgFAZQgMgJACgMQgCgKAKgJQAIgKANABQABAAAAAAQABAAAAAAQAAABAAAAQABABgBAAQgCAHgJAJQgJALADAMIABAEQAAABAAAAQAAAAAAABQAAAAAAABQgBAAAAAAIgCABIgCAAg");
	this.shape_1.setTransform(1.6723,2.5188);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_2, new cjs.Rectangle(0,0,3.3,5.1), null);


(lib.fish1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_15 = function() {
		var root=this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(15).call(this.frame_15).wait(1));

	// Layer_1
	this.instance = new lib.flash0aiAssets_2();
	this.instance.setTransform(-20.55,-2.05,0.0873,0.0873,-22.7185);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-18.15,y:-3.85},0).wait(2).to({x:-15},0).wait(1).to({x:-10.8},0).wait(2).to({x:-5.55},0).wait(1).to({rotation:-7.7178,x:1.15,y:-8.5},0).wait(2).to({scaleX:0.0872,scaleY:0.0872,rotation:-0.01,x:8,y:-11},0).wait(1).to({rotation:14.9818,x:16.5,y:-14.8},0).wait(2).to({x:20.45},0).wait(1).to({rotation:5.9739,x:26.15,y:-12.6},0).wait(1).to({x:31.15},0).wait(1).to({x:34.6},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.5,-17.8,91.2,33.900000000000006);


(lib.Tween12copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets();
	this.instance.setTransform(-19,-2.75,0.0662,0.0662);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-2.7,38.1,5.5);


(lib.Tween11copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets();
	this.instance.setTransform(-19.05,-2.75,0.0662,0.0662);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-2.7,38,5.5);


(lib.Tween10copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(18.9,-11.05,0.0909,0.1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.9,-11,37.8,22.1);


(lib.Tween10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(18.9,-11.05,0.0909,0.1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.9,-11,37.8,22.1);


(lib.Tween9copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(5.55,-21.15,0.0908,0.0999,0,-45,135);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.1,-21.1,42.3,42.3);


(lib.Tween8copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(18.9,-11.05,0.0909,0.1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.9,-11,37.8,22.1);


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.flash0aiAssets_1();
	this.instance.setTransform(18.9,-11.05,0.0909,0.1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.9,-11,37.8,22.1);


(lib.Tween7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4A59").s().p("A4lI2QrVg8ovhrQowhqkziLQk9iPAAidQAAiFDnh9QDgh5GihkIADAPQjYBLhxBTQh0BVAABZQAACNEcCAQESB6H0BgQH0BgKHA0QKfA2LeAAQXXAAQijKQHzhgETh6QEbiAAAiNQAAhYhyhVQhvhTjWhKIAGgPQGeBkDeB4QDlB9AACEQAACdk9CPQkzCLowBqQovBrrWA8QrvA8s2AAQs2AArvg8g");
	this.shape.setTransform(-0.0169,14.3758,0.053,0.053);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3D4A59").s().p("AkMENQhvhwAAidQAAicBvhwQBvhvCdAAQCdAABwBvQBvBwAACcQAACdhvBwQhwBvidAAQidAAhvhvg");
	this.shape_1.setTransform(-12.2073,-9.2595,0.0527,0.0527);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3D4A59").s().p("AkEEGQhthtAAiZQAAiYBthsQBshtCYAAQCZAABtBtQBsBsAACYQAACZhsBtQhtBsiZAAQiYAAhshsg");
	this.shape_2.setTransform(-13.2614,3.9165,0.0527,0.0527);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D4A59").s().p("AkMENQhvhwAAidQAAicBvhwQBwhvCcAAQCdAABwBvQBvBwAACcQAACdhvBwQhwBvidAAQicAAhwhvg");
	this.shape_3.setTransform(11.931,-9.2595,0.0527,0.0527);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D4A59").s().p("AkFEGQhshtAAiZQAAiYBshsQBshtCZAAQCZAABsBtQBtBsAACYQAACZhtBtQhsBsiZAAQiZAAhshsg");
	this.shape_4.setTransform(12.9851,3.9165,0.0527,0.0527);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3D4A59").s().p("EAcmAtqQkIgLhdgBIrggRQm3gJkqAEI3nAWQnRATjmgEQmKgGkhhWQgmgLgRgPQgtgngpikIgeh/QgQhFgMgeQhWjhh6jYQjwmpljleQlXlSmgjnQmrjtnMhkQiTgggwgQQhrgkg/g7QhzhsALiyQALisBzh4QBqhtCogwQCUgqCuAMQFpAaFdDnQEtDHEJFKQCkDNETGuQEYG2CcDGQDKEADkB+QEVCZDxhbQEDhjBTlBQAkiMgIieQgHibgviNQgoh5hJiWQgYgyhujVQirlMgwjRQgniuAliXQAriuCGhCQB4g7CRA4QCHA1BTB5QBGBnAmCYQAXBeAWC3IBuOGQAfECBSChQBrDWC7AYQC0AXCSilQCBiSAsjTQBMlthnnkQglithJj5QhVkYgniLQiJnfALmRQANnrDslAQBjipC+igQDUizCRABQCOgBDOCzQCkCPCHC6QDsFAANHrQALGRiJHfQgnCLhVEYQhJD5glCtQhnHkBMFtQAsDTCBCSQCSClC0gXQC7gYBsjWQBRihAfkCIBuuGQAWi3AXheQAmiYBGhnQBTh5CHg1QCRg4B4A7QCGBCArCuQAlCXgnCuQgwDRirFMQhvDWgXAxQhJCWgoB5QgvCNgHCbQgICeAlCMQBSFBEDBjQDxBbEWiZQDkh+DJkAQCcjGEYm2QETmuCkjNQEJlKEtjHQFdjnFpgaQCugMCUAqQCoAwBqBtQBzB4ALCsQALCyhzBsQg/A7hrAkQgwAQiTAgQnOBnmkDoQmYDilTFNQlQFJjuGXQjyGch6HIQgJAjgMAOQgOAQgoAOQkgBgmiACIgNAAQiEAAjXgJg");
	this.shape_5.setTransform(-0.057,-2.2109,0.0528,0.0528);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.8,-17.7,63.5,35.4);


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4A59").s().p("A4lI2QrVg8ovhrQowhqkziLQk9iPAAidQAAiFDnh9QDgh5GihkIADAPQjYBLhxBTQh0BVAABZQAACNEcCAQESB6H0BgQH0BgKHA0QKfA2LeAAQXXAAQijKQHzhgETh6QEbiAAAiNQAAhYhyhVQhvhTjWhKIAGgPQGeBkDeB4QDlB9AACEQAACdk9CPQkzCLowBqQovBrrWA8QrvA8s2AAQs2AArvg8g");
	this.shape.setTransform(-0.0169,14.3758,0.053,0.053);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3D4A59").s().p("AkMENQhvhwAAidQAAicBvhwQBvhvCdAAQCdAABwBvQBvBwAACcQAACdhvBwQhwBvidAAQidAAhvhvg");
	this.shape_1.setTransform(-12.196,-9.2546,0.0527,0.0527);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3D4A59").s().p("AkEEGQhthtAAiZQAAiYBthsQBshtCYAAQCZAABtBtQBsBsAACYQAACZhsBtQhtBsiZAAQiYAAhshsg");
	this.shape_2.setTransform(-13.2507,3.929,0.0527,0.0527);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D4A59").s().p("AkMENQhvhwAAidQAAicBvhwQBwhvCcAAQCdAABwBvQBvBwAACcQAACdhvBwQhwBvidAAQicAAhwhvg");
	this.shape_3.setTransform(11.9563,-9.2546,0.0527,0.0527);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D4A59").s().p("AkFEGQhshtAAiZQAAiYBshsQBshtCZAAQCZAABsBtQBtBsAACYQAACZhtBtQhsBsiZAAQiZAAhshsg");
	this.shape_4.setTransform(13.011,3.929,0.0527,0.0527);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3D4A59").s().p("EAcmAtqQkIgLhdgBIrggRQm3gJkqAEI3nAWQnRATjmgEQmKgGkhhWQgmgLgRgPQgtgngpikIgeh/QgQhFgMgeQhWjhh6jYQjwmpljleQlXlSmgjnQmrjtnMhkQiTgggwgQQhrgkg/g7QhzhsALiyQALisBzh4QBqhtCogwQCUgqCuAMQFpAaFdDnQEtDHEJFKQCkDNETGuQEYG2CcDGQDKEADkB+QEVCZDxhbQEDhjBTlBQAkiMgIieQgHibgviNQgoh5hJiWQgYgyhujVQirlMgwjRQgniuAliXQAriuCGhCQB4g7CRA4QCHA1BTB5QBGBnAmCYQAXBeAWC3IBuOGQAfECBSChQBrDWC7AYQC0AXCSilQCBiSAsjTQBMlthnnkQglithJj5QhVkYgniLQiJnfALmRQANnrDslAQBjipC+igQDUizCRABQCOgBDOCzQCkCPCHC6QDsFAANHrQALGRiJHfQgnCLhVEYQhJD5glCtQhnHkBMFtQAsDTCBCSQCSClC0gXQC7gYBsjWQBRihAfkCIBuuGQAWi3AXheQAmiYBGhnQBTh5CHg1QCRg4B4A7QCGBCArCuQAlCXgnCuQgwDRirFMQhvDWgXAxQhJCWgoB5QgvCNgHCbQgICeAlCMQBSFBEDBjQDxBbEWiZQDkh+DJkAQCcjGEYm2QETmuCkjNQEJlKEtjHQFdjnFpgaQCugMCUAqQCoAwBqBtQBzB4ALCsQALCyhzBsQg/A7hrAkQgwAQiTAgQnOBnmkDoQmYDilTFNQlQFJjuGXQjyGch6HIQgJAjgMAOQgOAQgoAOQkgBgmiACIgNAAQiEAAjXgJg");
	this.shape_5.setTransform(-0.0478,-2.2064,0.0529,0.0529);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.8,-17.7,63.5,35.4);


(lib.Tween3copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween3copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween3_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape_1.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween2copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween2copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween2_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape_1.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween1copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.Tween1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7D7D45").s().p("AiIAaQgDgQALgQQAKgPAUgHQAxgRAvAzQATguA5AGQAYACARAMQASAMAEAQQADAOgOgDIglgOQg/gVgZAqQgxgwgwAhQgLAIgQAOQgDADgDAAQgFAAgCgKg");
	this.shape_1.setTransform(0.0092,-0.0173);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.7,-3.5,27.5,7.1);


(lib.miner_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#004C25").s().p("AgKARIAAghIAVAAIAAAhg");
	this.shape_42.setTransform(-70.9499,70.947,2.0594,2.0594);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#004C25").s().p("AgEAAQAAgEAEAAQAFAAAAAEQAAAFgFAAQgEAAAAgFg");
	this.shape_43.setTransform(-56.5337,56.5309,2.0594,2.0594);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#8BC53F").s().p("AgOAPQgGgHAAgIQAAgIAGgGQAHgGAHAAQAJAAAGAGQAGAGAAAIQAAAIgGAHQgGAGgJAAQgHAAgHgGg");
	this.shape_44.setTransform(-56.5337,56.5309,2.0594,2.0594);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#8BC53F").s().p("AAAAwQgTAAgOgOQgOgOgBgUQABgTAOgOQAOgPAUABQATAAAOAOQAOAOAAATQAAAUgOAPQgOANgTAAIgBAAgAgWgXQgLAKABANQgBAOALAKQAJAJANABQAOAAAJgKQAKgKAAgOQAAgNgJgJQgJgKgOAAIgBAAQgNAAgJAJg");
	this.shape_45.setTransform(-3.194,52.1546,2.0594,2.0594);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#006838").s().p("AgGAAQAAgCACgCQACgCACAAQAHAAAAAGQAAAHgHAAQgGAAAAgHg");
	this.shape_46.setTransform(-21.2657,50.713,2.0594,2.0594);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#8BC53F").s().p("AgHAIQgDgEAAgEQAAgDADgEQADgDAEAAQAEAAAEAEQADADAAADQAAAFgDADQgEADgEAAQgEAAgDgDg");
	this.shape_47.setTransform(-3.1426,52.1546,2.0594,2.0594);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#004C25").s().p("AiDAAIAAgGIEHAGIAAAHg");
	this.shape_48.setTransform(-30.4504,60.7297,2.0591,2.0591);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#8BC53F").s().p("AgtAvIgIgWIASg0IgEgIIARgLIAFAIIA3AIIAQARQgCAGgHAHQgNARgUAMQgcASgXAAIgGAAg");
	this.shape_49.setTransform(-22.7073,48.4762,2.0594,2.0594);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#004C25").s().p("Ah6AVID0gvIABAGIj0Awg");
	this.shape_50.setTransform(-31.8403,48.4781,2.0591,2.0591);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#004C25").s().p("AgEAlIAAhJIAKAAIAABJg");
	this.shape_51.setTransform(-64.2567,59.826,2.0594,2.0594);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#004C25").s().p("AgEAlIAAhJIAJAAIAABJg");
	this.shape_52.setTransform(-48.6564,59.826,2.0594,2.0594);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#004C25").s().p("Ah0BhIB7h+IAAg7Ii1C9IgEgEIC5jDIAAgCICsAAIAACLIgGAAIAAgpIigAAIAAApIgGAAIAAg7Ih2B5gAANgIICgAAIAAglIigAAgAANg0ICgAAIAAgpIigAAg");
	this.shape_53.setTransform(-103.8496,52.8754,2.0594,2.0594);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#004C25").s().p("AgzCIIBekSIAJADIheESg");
	this.shape_54.setTransform(-18.8973,13.5399,2.0594,2.0594);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#006838").s().p("AgVAfIAXhEIAUAHIgXBEg");
	this.shape_55.setTransform(-6.6436,-21.9856,2.0594,2.0594);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#004C25").s().p("AjHAhIAAgXIC1AAIAqgqICwAAIAAAgIinAAIghAhg");
	this.shape_56.setTransform(-107.6595,67.6519,2.0594,2.0594);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#004C25").s().p("AmTARIAAghIMnAAIAAAhg");
	this.shape_57.setTransform(14.4657,70.947,2.0594,2.0594);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#004C25").s().p("AgpAGIAAgLIBTAAIAAALg");
	this.shape_58.setTransform(65.2976,-12.0594,2.0591,2.0591);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#004C25").s().p("Ag6AGIAAgLIB1AAIAAALg");
	this.shape_59.setTransform(65.2461,4.3105,2.0591,2.0591);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#004C25").s().p("AhLAGIAAgLICXAAIAAALg");
	this.shape_60.setTransform(65.2461,20.6803,2.0591,2.0591);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#004C25").s().p("AhcAGIAAgLIC5AAIAAALg");
	this.shape_61.setTransform(65.2461,37.0501,2.0591,2.0591);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#004C25").s().p("AhtAGIAAgLIDbAAIAAALg");
	this.shape_62.setTransform(65.2461,53.4199,2.0591,2.0591);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#004C25").s().p("AAnDsIhbnXIAOAAIBcHXg");
	this.shape_63.setTransform(79.8657,18.8786,2.0591,2.0591);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#004C25").s().p("Ag0DsIBbnXIAOAAIhbHXg");
	this.shape_64.setTransform(50.4721,18.8786,2.0591,2.0591);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#004C25").s().p("AgmAJIAAgQIBNAAIAAAQg");
	this.shape_65.setTransform(65.1282,-31.4075,2.0594,2.0594);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#004C25").s().p("AAAAEIgDgCIAAgCQACgFADACQAEABgCAEQAAAAAAABQgBABAAAAQAAAAgBABQAAAAgBAAIgBgBg");
	this.shape_66.setTransform(0.3749,-42.1434,2.0594,2.0594);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#8BC53F").s().p("AgGAHQgCgDAAgEQAAgDACgCQADgDADAAQAEAAACADQADADAAACQAAAEgDADQgCACgEAAQgDAAgDgCg");
	this.shape_67.setTransform(65.2311,-42.2711,2.0594,2.0594);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#004C25").s().p("AgTAiIAAgvQAAgIAGgGQAGgGAHAAQAIAAAGAGQAGAGAAAIIAAAvg");
	this.shape_68.setTransform(65.2311,-40.3661,2.0594,2.0594);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#8BC53F").s().p("AhegFIAlAAIAAhBIgpAAICFh3IAHAHIAdAyQAcA8AABDQAAA4ggBEQgQAigRAZIgJAMgAAaCaQAkg5ANg8Ih4AAgAAAAQIBOAAQABgKAAgLQAAgogLgmIhEAAgAA+hnQgMgfgRgaIhAA5IBdAAIAAAAg");
	this.shape_69.setTransform(128.4562,-35.3205,2.0594,2.0594);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#8BC53F").s().p("AgaAfIAWg+QACgGAFgDQAGgDAHACQAGADADAGQADAGgCAGIgWA+g");
	this.shape_70.setTransform(-1.7899,-36.6477,2.0594,2.0594);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#006838").s().p("Ak4AgIAAg/IJxAAIAAA/g");
	this.shape_71.setTransform(52.0507,-43.3008,2.0594,2.0594);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#006838").s().p("AhABDIAAiEIBHAAQAYgBARASQARAQAAAYQAAAHgDAGIgWA+g");
	this.shape_72.setTransform(-2.1128,53.7507,2.0594,2.0594);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#004C25").s().p("Ag0A6IAAhzIBpAAIAABzg");
	this.shape_73.setTransform(-26.4143,55.5012,2.0594,2.0594);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#006838").s().p("AgbAcQgLgMAAgQQAAgPALgLQAMgMAPAAQAQAAALAMQAMALAAAPQAAAQgMAMQgLALgQAAQgPAAgMgLg");
	this.shape_74.setTransform(-56.4823,56.4794,2.0594,2.0594);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#006838").s().p("AgHALIAAgVIAPAAIAAAVg");
	this.shape_75.setTransform(-79.6511,59.5171,2.0594,2.0594);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#006838").s().p("AgHALIAAgVIAPAAIAAAVg");
	this.shape_76.setTransform(-97.9287,59.5171,2.0594,2.0594);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#8BC53F").s().p("Ag0BRIAAihIBpAAIAAChg");
	this.shape_77.setTransform(-88.7641,40.5702,2.0594,2.0594);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#006838").s().p("AgIATIAAgkIARAAIAAAkg");
	this.shape_78.setTransform(133.4537,59.1854,2.0591,2.0591);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#8BC53F").s().p("AgPATIAAgkIAfAAIAAAkg");
	this.shape_79.setTransform(133.4537,66.8041,2.0591,2.0591);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#004C25").s().p("AgfAJIAAgRIA/AAIAAARg");
	this.shape_80.setTransform(133.4537,72.5181,2.0591,2.0591);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#8BC53F").s().p("AgPASIAAgjIAfAAIAAAjg");
	this.shape_81.setTransform(133.4537,51.6182,2.0591,2.0591);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#006838").s().p("AgECEIAAkGIAJAAIAAEGg");
	this.shape_82.setTransform(133.4537,25.2103,2.0591,2.0591);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#006838").s().p("AgJGGIAAsLIATAAIAAMLg");
	this.shape_83.setTransform(133.475,25.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_82,p:{x:133.4537,y:25.2103}},{t:this.shape_81,p:{scaleX:2.0591,scaleY:2.0591,x:133.4537,y:51.6182}},{t:this.shape_80,p:{scaleX:2.0591,scaleY:2.0591,x:133.4537,y:72.5181}},{t:this.shape_79,p:{scaleX:2.0591,scaleY:2.0591,x:133.4537,y:66.8041}},{t:this.shape_78,p:{scaleX:2.0591,scaleY:2.0591,x:133.4537,y:59.1854}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:52.0507,y:-43.3008}},{t:this.shape_70,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-1.7899,y:-36.6477}},{t:this.shape_69,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:128.4562,y:-35.3205}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:0.3749,y:-42.1434}},{t:this.shape_65},{t:this.shape_64,p:{x:50.4721,y:18.8786}},{t:this.shape_63,p:{x:79.8657,y:18.8786}},{t:this.shape_62,p:{x:65.2461,y:53.4199}},{t:this.shape_61,p:{x:65.2461,y:37.0501}},{t:this.shape_60,p:{x:65.2461,y:20.6803}},{t:this.shape_59,p:{x:65.2461,y:4.3105}},{t:this.shape_58,p:{x:65.2976,y:-12.0594}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-6.6436,y:-21.9856}},{t:this.shape_54,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-18.8973,y:13.5399}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50,p:{x:-31.8403,y:48.4781}},{t:this.shape_49},{t:this.shape_48,p:{x:-30.4504,y:60.7297}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]}).to({state:[{t:this.shape_83,p:{scaleY:1,y:25.275}},{t:this.shape_81,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_80,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_79,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_78,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:48.9626,y:-42.2421}},{t:this.shape_70,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-3.7352,y:-29.357}},{t:this.shape_69,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:125.7778,y:-43.2243}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-2.226,y:-35.0677}},{t:this.shape_65},{t:this.shape_64,p:{x:50.4721,y:18.8786}},{t:this.shape_63,p:{x:79.8657,y:18.8786}},{t:this.shape_62,p:{x:65.2461,y:53.4199}},{t:this.shape_61,p:{x:65.2461,y:37.0501}},{t:this.shape_60,p:{x:65.2461,y:20.6803}},{t:this.shape_59,p:{x:65.2461,y:4.3105}},{t:this.shape_58,p:{x:65.2976,y:-12.0594}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-6.8464,y:-14.2289}},{t:this.shape_54,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-14.8747,y:22.4831}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50,p:{x:-31.8403,y:48.4781}},{t:this.shape_49},{t:this.shape_48,p:{x:-30.4504,y:60.7297}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},2).to({state:[{t:this.shape_83,p:{scaleY:1.0846,y:22.0124}},{t:this.shape_81,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_80,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_79,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_78,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:46.447,y:-40.8215}},{t:this.shape_70,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-4.7046,y:-22.7515}},{t:this.shape_69,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:122.7812,y:-49.4504}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-3.7717,y:-28.584}},{t:this.shape_65},{t:this.shape_64,p:{x:50.4721,y:18.8786}},{t:this.shape_63,p:{x:79.8657,y:18.8786}},{t:this.shape_62,p:{x:65.2461,y:53.4199}},{t:this.shape_61,p:{x:65.2461,y:37.0501}},{t:this.shape_60,p:{x:65.2461,y:20.6803}},{t:this.shape_59,p:{x:65.2461,y:4.3105}},{t:this.shape_58,p:{x:65.2976,y:-12.0594}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-6.2933,y:-7.3889}},{t:this.shape_54,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-10.6247,y:29.9397}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50,p:{x:-31.8403,y:48.4781}},{t:this.shape_49},{t:this.shape_48,p:{x:-30.4504,y:60.7297}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},2).to({state:[{t:this.shape_83,p:{scaleY:1.1693,y:18.7543}},{t:this.shape_81,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_80,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_79,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_78,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:43.9599,y:-39.0541}},{t:this.shape_70,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-5.1336,y:-15.9713}},{t:this.shape_69,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:119.0523,y:-55.2551}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-4.7873,y:-21.8677}},{t:this.shape_65},{t:this.shape_64,p:{x:50.4721,y:18.8786}},{t:this.shape_63,p:{x:79.8657,y:18.8786}},{t:this.shape_62,p:{x:65.2461,y:53.4199}},{t:this.shape_61,p:{x:65.2461,y:37.0501}},{t:this.shape_60,p:{x:65.2461,y:20.6803}},{t:this.shape_59,p:{x:65.2461,y:4.3105}},{t:this.shape_58,p:{x:65.2976,y:-12.0594}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-5.1819,y:-0.5269}},{t:this.shape_54,p:{scaleX:2.0594,scaleY:2.0594,rotation:-18.1376,x:-5.7676,y:37.0475}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50,p:{x:-31.8403,y:48.4781}},{t:this.shape_49},{t:this.shape_48,p:{x:-30.4504,y:60.7297}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},3).to({state:[{t:this.shape_83,p:{scaleY:1.0846,y:22.0124}},{t:this.shape_81,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_80,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_79,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_78,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:46.447,y:-40.8215}},{t:this.shape_70,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-4.7046,y:-22.7515}},{t:this.shape_69,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:122.7812,y:-49.4504}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-3.7717,y:-28.584}},{t:this.shape_65},{t:this.shape_64,p:{x:50.4691,y:18.8772}},{t:this.shape_63,p:{x:79.8623,y:18.8772}},{t:this.shape_62,p:{x:65.2429,y:53.418}},{t:this.shape_61,p:{x:65.2429,y:37.0485}},{t:this.shape_60,p:{x:65.2429,y:20.6789}},{t:this.shape_59,p:{x:65.2429,y:4.3093}},{t:this.shape_58,p:{x:65.2944,y:-12.0603}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-6.2933,y:-7.3889}},{t:this.shape_54,p:{scaleX:2.0594,scaleY:2.0594,rotation:-12.4121,x:-10.6247,y:29.9397}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50,p:{x:-31.8421,y:48.4763}},{t:this.shape_49},{t:this.shape_48,p:{x:-30.4522,y:60.7277}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},2).to({state:[{t:this.shape_83,p:{scaleY:1,y:25.275}},{t:this.shape_81,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:51.636}},{t:this.shape_80,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:72.5388}},{t:this.shape_79,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:66.824}},{t:this.shape_78,p:{scaleX:2.0594,scaleY:2.0594,x:133.4935,y:59.2042}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:48.9626,y:-42.2421}},{t:this.shape_70,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-3.7352,y:-29.357}},{t:this.shape_69,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:125.7778,y:-43.2243}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-2.226,y:-35.0677}},{t:this.shape_65},{t:this.shape_64,p:{x:50.4691,y:18.8772}},{t:this.shape_63,p:{x:79.8623,y:18.8772}},{t:this.shape_62,p:{x:65.2429,y:53.418}},{t:this.shape_61,p:{x:65.2429,y:37.0485}},{t:this.shape_60,p:{x:65.2429,y:20.6789}},{t:this.shape_59,p:{x:65.2429,y:4.3093}},{t:this.shape_58,p:{x:65.2944,y:-12.0603}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-6.8464,y:-14.2289}},{t:this.shape_54,p:{scaleX:2.0595,scaleY:2.0595,rotation:-6.6954,x:-14.8747,y:22.4831}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50,p:{x:-31.8421,y:48.4763}},{t:this.shape_49},{t:this.shape_48,p:{x:-30.4522,y:60.7277}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},3).to({state:[{t:this.shape_82,p:{x:133.4495,y:25.2088}},{t:this.shape_81,p:{scaleX:2.0591,scaleY:2.0591,x:133.4495,y:51.6164}},{t:this.shape_80,p:{scaleX:2.0591,scaleY:2.0591,x:133.4495,y:72.5159}},{t:this.shape_79,p:{scaleX:2.0591,scaleY:2.0591,x:133.4495,y:66.802}},{t:this.shape_78,p:{scaleX:2.0591,scaleY:2.0591,x:133.4495,y:59.1834}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:52.0507,y:-43.3008}},{t:this.shape_70,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-1.7899,y:-36.6477}},{t:this.shape_69,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:128.4562,y:-35.3205}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:0.3749,y:-42.1434}},{t:this.shape_65},{t:this.shape_64,p:{x:50.4691,y:18.8772}},{t:this.shape_63,p:{x:79.8623,y:18.8772}},{t:this.shape_62,p:{x:65.2429,y:53.418}},{t:this.shape_61,p:{x:65.2429,y:37.0485}},{t:this.shape_60,p:{x:65.2429,y:20.6789}},{t:this.shape_59,p:{x:65.2429,y:4.3093}},{t:this.shape_58,p:{x:65.2944,y:-12.0603}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-6.6436,y:-21.9856}},{t:this.shape_54,p:{scaleX:2.0594,scaleY:2.0594,rotation:0,x:-18.8973,y:13.5399}},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50,p:{x:-31.8421,y:48.4763}},{t:this.shape_49},{t:this.shape_48,p:{x:-30.4522,y:60.7277}},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},3).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-148.9,-94.7,297.8,169.2);


(lib.fish1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_15 = function() {
		var root=this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(15).call(this.frame_15).wait(1));

	// Layer_1
	this.instance = new lib.flash0aiAssets_2();
	this.instance.setTransform(-20.55,-2.05,0.0873,0.0873,-22.7185);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:-18.15,y:-3.85},0).wait(2).to({x:-15},0).wait(1).to({x:-10.8},0).wait(2).to({x:-5.55},0).wait(1).to({rotation:-7.7178,x:1.15,y:-8.5},0).wait(2).to({scaleX:0.0872,scaleY:0.0872,rotation:-0.01,x:8,y:-11},0).wait(1).to({rotation:14.9818,x:16.5,y:-14.8},0).wait(2).to({x:20.45},0).wait(1).to({rotation:5.9739,x:26.15,y:-12.6},0).wait(1).to({x:31.15},0).wait(1).to({x:34.6},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.5,-17.8,91.2,33.900000000000006);


(lib.bg1copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1copy3, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.bg1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
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


(lib.Pathcopy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#279FC9").s().p("AAKAyQgRgEgZgBIgsgBQgVgBg1gKIgSgEQB4gZA9gVQCCgvAagLQgfBggPAjIhLAUQgQgUgWgGg");
	this.shape.setTransform(16.9,7.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pathcopy4, new cjs.Rectangle(0,0,33.8,15.2), null);


(lib.Pathcopy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AiAQvMAAAghdIEBAAMAAAAhdg");
	this.shape.setTransform(12.85,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pathcopy3, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_29copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1E8FA").s().p("AilA5QhzgChNgKQhrgPhBgeQgVgJgFgLQgEgJALgJQAJgHAWgJIAGgCIQtAMQgCAIgMAJQgXATgnAKQgrANg7AJIhoAOQimATjBAAIhSAAg");
	this.shape.setTransform(55.7484,5.7431);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_29copy2, new cjs.Rectangle(0,0,111.5,11.5), null);


(lib.Path_29_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C1E8FA").s().p("AilA5QhzgChNgKQhrgPhBgeQgVgJgFgLQgEgJALgJQAJgHAWgJIAGgCIQtAMQgCAIgMAJQgXATgnAKQgrANg7AJIhoAOQimATjBAAIhSAAg");
	this.shape_2.setTransform(55.7484,5.7431);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_29_2, new cjs.Rectangle(0,0,111.5,11.5), null);


(lib.Path_7copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7copy, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_6copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8ED7F7").s().p("AgFAJIgBAAQgDgHAGgGQADgGAEAAQAGAAgEAFIAAAGQAAAEgFADIgFADQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAg");
	this.shape.setTransform(0.7651,1.0691);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6copy4, new cjs.Rectangle(0,0,1.6,2.2), null);


(lib.Path_6copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AiAQvMAAAghdIEBAAMAAAAhdg");
	this.shape.setTransform(12.85,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6copy3, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_6_1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_1copy, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_6_0copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_0copy, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_6_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8ED7F7").s().p("AgFAJIgBAAQgDgHAGgGQADgGAEAAQAGAAgEAFIAAAGQAAAEgFADIgFADQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAg");
	this.shape_3.setTransform(0.7651,1.0691);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_4, new cjs.Rectangle(0,0,1.6,2.2), null);


(lib.Path_5copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8ED7F7").s().p("AhPAPQAagPA3gJIAogGIApgFQAAgBAAAAQABAAAAABQAAAAAAAAQAAAAAAABIgCACQgnAOgsAIIgrAJQgYAGgNACIAAAAQgEAAAGgHg");
	this.shape.setTransform(8.3771,2.1454);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5copy4, new cjs.Rectangle(0,0,16.8,4.3), null);


(lib.Path_5copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5copy3, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_5_1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_1copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_5_0copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_0copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_5_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8ED7F7").s().p("AhPAPQAagPA3gJIAogGIApgFQAAgBAAAAQABAAAAABQAAAAAAAAQAAAAAAABIgCACQgnAOgsAIIgrAJQgYAGgNACIAAAAQgEAAAGgHg");
	this.shape_3.setTransform(8.3771,2.1454);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_4, new cjs.Rectangle(0,0,16.8,4.3), null);


(lib.Path_4copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_4_1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_1copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_4_0copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_0copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_3copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_3_1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_1copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_3_0copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_0copy, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_2copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#279FC9").s().p("AhHgGIA8gvQAeAAAjAEQABAyARA1g");
	this.shape.setTransform(7.15,5.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2copy4, new cjs.Rectangle(0,0,14.3,10.9), null);


(lib.Path_2copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2copy3, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_2_1copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#279FC9").s().p("AEvBOQgkgrg5gVQgygRg8gBQgdAAgzAFQg4AGgWABQhAADhbgOQgtgHgbgJQgogMgbgTQgPgLgMgLQC2AUCUAHQDTAKBigUIAEgvIAsAoIgFgZQgGgZADACIAwA0IAfACIgVClIggACQgLgTgMgOg");
	this.shape.setTransform(37.95,11.0675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1copy4, new cjs.Rectangle(0,0,75.9,22.2), null);


(lib.Path_2_1copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuAB8IAAj3IcBAAIAAD3g");
	this.shape.setTransform(89.725,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1copy3, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_2_1_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#279FC9").s().p("AEvBOQgkgrg5gVQgygRg8gBQgdAAgzAFQg4AGgWABQhAADhbgOQgtgHgbgJQgogMgbgTQgPgLgMgLQC2AUCUAHQDTAKBigUIAEgvIAsAoIgFgZQgGgZADACIAwA0IAfACIgVClIggACQgLgTgMgOg");
	this.shape_3.setTransform(37.95,11.0675);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1_3, new cjs.Rectangle(0,0,75.9,22.2), null);


(lib.Path_2_0copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#279FC9").s().p("AhHBGIAAgCIASiSQBCAFA7AIIgjBSIgBAiQAAATgFAJQhFgDghgGg");
	this.shape.setTransform(7.2,7.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_0copy4, new cjs.Rectangle(0,0,14.4,15.9), null);


(lib.Path_2_0copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("AuBB8IAAj3IcCAAIAAD3g");
	this.shape.setTransform(89.75,12.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_0copy3, new cjs.Rectangle(0,0,179.5,24.9), null);


(lib.Path_2_0_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#279FC9").s().p("AhHBGIAAgCIASiSQBCAFA7AIIgjBSIgBAiQAAATgFAJQhFgDghgGg");
	this.shape_3.setTransform(7.2,7.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_0_3, new cjs.Rectangle(0,0,14.4,15.9), null);


(lib.Path_2_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#279FC9").s().p("AhHgGIA8gvQAeAAAjAEQABAyARA1g");
	this.shape_3.setTransform(7.15,5.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_4, new cjs.Rectangle(0,0,14.3,10.9), null);


(lib.Path_1copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#279FC9").s().p("AgLAyQgLg0gnghQAsgKAlgPIgUggIA+ARQgJAUgJAdQgSA4gEA0IgbALQgCgWgEgVg");
	this.shape.setTransform(6.15,9.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1copy4, new cjs.Rectangle(0,0,12.3,18.6), null);


(lib.Path_1copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C3363A").s().p("AiAQvMAAAghdIEBAAMAAAAhdg");
	this.shape.setTransform(12.85,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1copy3, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_1_1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1copy, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_1_0copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_0copy, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_1_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#279FC9").s().p("AgLAyQgLg0gnghQAsgKAlgPIgUggIA+ARQgJAUgJAdQgSA4gEA0IgbALQgCgWgEgVg");
	this.shape_3.setTransform(6.15,9.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_4, new cjs.Rectangle(0,0,12.3,18.6), null);


(lib.Path_0copy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#279FC9").s().p("ACNBkIgCgFQgUgqgSgWQgagdgjgHIhWgRQgxgKgigRQgPgHgNgKQBvAQAzgBQAlgBAVgLQAbgOAegXIAcAKIgIAVIgCAZIAFABIAPCQg");
	this.shape.setTransform(15.75,10.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0copy4, new cjs.Rectangle(0,0,31.5,20.2), null);


(lib.Path_0copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#AD3537").s().p("Ah/QvMAAAghdID/AAMAAAAhdg");
	this.shape.setTransform(12.825,107.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0copy3, new cjs.Rectangle(0,0,25.7,214.2), null);


(lib.Path_0_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#279FC9").s().p("ACNBkIgCgFQgUgqgSgWQgagdgjgHIhWgRQgxgKgigRQgPgHgNgKQBvAQAzgBQAlgBAVgLQAbgOAegXIAcAKIgIAVIgCAZIAFABIAPCQg");
	this.shape_3.setTransform(15.75,10.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_0_3, new cjs.Rectangle(0,0,31.5,20.2), null);


(lib.Path_10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#279FC9").s().p("AAKAyQgRgEgZgBIgsgBQgVgBg1gKIgSgEQB4gZA9gVQCCgvAagLQgfBggPAjIhLAUQgQgUgWgGg");
	this.shape_3.setTransform(16.9,7.6);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_10, new cjs.Rectangle(0,0,33.8,15.2), null);


(lib.CompoundPathcopy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8ED7F7").s().p("AgFAZQgMgJACgMQgCgKAKgJQAIgKANABQABAAAAAAQABAAAAAAQAAABAAAAQABABgBAAQgCAHgJAJQgJALADAMIABAEQAAABAAAAQAAAAAAABQAAAAAAABQgBAAAAAAIgCABIgCAAg");
	this.shape.setTransform(1.6723,2.5188);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPathcopy2, new cjs.Rectangle(0,0,3.3,5.1), null);


(lib.CompoundPath_1copy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#8ED7F7").s().p("AAOA+QgEgBgEgIQgGgQABgQQACgQAKgLIgJAGIgDADQgBADgDAMQgCAKgFAFQgGAGgIABQgJAAgGgGQgKgKgEgQQgFgSAUgVIgKAGIgXASQgCAEgEACQgFACgEgBQgHgBgCgHQgBgGADgHQAGgNAQgJQAJgGAMgEQgggDgZALQgbAJAKATQAEAHAIAJIAPANQACACgEADQgEAEgDgBIgdgKQgRgGgIgIQgJgJADgMQADgKAMgIQAQgMAjgDIAVgBQAcgEAeADIABAAIABABQABAAAAAAQABABAAAAQgBABAAABQgBAAgBABQgDAEgDAAQgTAFgRALIgJAHIgBACQgBACABADQAJgIAKgFIAIgFQAbgPAUgCQAEgBgCAFQgBADgDACQgSATgEAQQgCAJACAJIABAHQADgGAFgFQAMgPASgLQAqgaAuACIA9gGQAFAAgKAJQg6AMgeAQIgLAKQgLALgIASIgIASQgEALgFAFQgEAGgGAAIgCAAgAh+gDIgDgEIgBACIAEACg");
	this.shape.setTransform(16.757,6.2117);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_1copy2, new cjs.Rectangle(0,0,33.6,12.5), null);


(lib.CompoundPath_1_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8ED7F7").s().p("AAOA+QgEgBgEgIQgGgQABgQQACgQAKgLIgJAGIgDADQgBADgDAMQgCAKgFAFQgGAGgIABQgJAAgGgGQgKgKgEgQQgFgSAUgVIgKAGIgXASQgCAEgEACQgFACgEgBQgHgBgCgHQgBgGADgHQAGgNAQgJQAJgGAMgEQgggDgZALQgbAJAKATQAEAHAIAJIAPANQACACgEADQgEAEgDgBIgdgKQgRgGgIgIQgJgJADgMQADgKAMgIQAQgMAjgDIAVgBQAcgEAeADIABAAIABABQABAAAAAAQABABAAAAQgBABAAABQgBAAgBABQgDAEgDAAQgTAFgRALIgJAHIgBACQgBACABADQAJgIAKgFIAIgFQAbgPAUgCQAEgBgCAFQgBADgDACQgSATgEAQQgCAJACAJIABAHQADgGAFgFQAMgPASgLQAqgaAuACIA9gGQAFAAgKAJQg6AMgeAQIgLAKQgLALgIASIgIASQgEALgFAFQgEAGgGAAIgCAAgAh+gDIgDgEIgBACIAEACg");
	this.shape_2.setTransform(16.757,6.2117);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_1_2, new cjs.Rectangle(0,0,33.6,12.5), null);


(lib.CompoundPath_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8ED7F7").s().p("AgFAZQgMgJACgMQgCgKAKgJQAIgKANABQABAAAAAAQABAAAAAAQAAABAAAAQABABgBAAQgCAHgJAJQgJALADAMIABAEQAAABAAAAQAAAAAAABQAAAAAAABQgBAAAAAAIgCABIgCAAg");
	this.shape_2.setTransform(1.6723,2.5188);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath_3, new cjs.Rectangle(0,0,3.3,5.1), null);


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
	this.shape.setTransform(-38.9395,-3.005,0.7124,0.7883,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2268,-3.0247,0.7124,0.7883,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7883,x:-45.2268,y:-3.0247}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7883,x:-38.9395,y:-3.005}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7878,x:-45.2205,y:-2.2154}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7878,x:-38.9376,y:-2.1957}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7878,x:-45.2205,y:-0.2154}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7878,x:-38.9376,y:-0.1957}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49);


(lib.bg1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape_1.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1_1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.worm1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		var root = this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// Layer_1
	this.instance = new lib.Tween11("synched",0);

	this.instance_1 = new lib.Tween12("synched",0);
	this.instance_1.setTransform(86,-0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:86,y:-0.25},24).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-3,124.1,5.8);


(lib.oilSplash = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		var root = this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// Layer_1
	this.instance = new lib.Tween6("synched",0);
	this.instance.setTransform(0,7.3,0.3657,0.3657);

	this.instance_1 = new lib.Tween7("synched",0);
	this.instance_1.setTransform(-5.3,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,scaleX:1,scaleY:1,x:-5.3,y:0},24).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.1,-17.7,63.5,35.4);


(lib.ClipGroup_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AijOKIAA3nQAAh9BYhXQBXhZB8AAIAcAAIAAcUg");
	mask.setTransform(103.525,90.65);

	// Layer_3
	this.instance = new lib.Path_0();
	this.instance.setTransform(141.2,107.1,1,1,0,0,0,12.8,107.1);
	this.instance.alpha = 0.3008;

	this.instance_1 = new lib.Path_1_0();
	this.instance_1.setTransform(89.85,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_1.alpha = 0.3008;

	this.instance_2 = new lib.Path_2_0();
	this.instance_2.setTransform(89.8,180.4,1,1,0,0,0,89.8,12.4);
	this.instance_2.alpha = 0.3008;

	this.instance_3 = new lib.Path_3_0();
	this.instance_3.setTransform(89.8,132.4,1,1,0,0,0,89.8,12.4);
	this.instance_3.alpha = 0.3008;

	this.instance_4 = new lib.Path_4_0();
	this.instance_4.setTransform(89.8,84.4,1,1,0,0,0,89.8,12.4);
	this.instance_4.alpha = 0.3008;

	this.instance_5 = new lib.Path_5_0();
	this.instance_5.setTransform(89.8,36.4,1,1,0,0,0,89.8,12.4);
	this.instance_5.alpha = 0.3008;

	this.instance_6 = new lib.Path_6_0();
	this.instance_6.setTransform(38.5,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_6.alpha = 0.3008;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D9685F").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape.setTransform(89.875,107.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5C192").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_1.setTransform(89.875,107.1);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(87.1,0,32.900000000000006,181.3), null);


(lib.ClipGroup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AijOKIAA8UIAcAAQB8AABXBZQBYBXAAB9IAAXng");
	mask.setTransform(76.225,90.65);

	// Layer_3
	this.instance = new lib.Path_7();
	this.instance.setTransform(38.5,107.1,1,1,0,0,0,12.8,107.1);
	this.instance.alpha = 0.3008;

	this.instance_1 = new lib.Path_1_1();
	this.instance_1.setTransform(89.85,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_1.alpha = 0.3008;

	this.instance_2 = new lib.Path_2_1();
	this.instance_2.setTransform(90,180.4,1,1,0,0,0,89.7,12.4);
	this.instance_2.alpha = 0.3008;

	this.instance_3 = new lib.Path_3_1();
	this.instance_3.setTransform(90,132.4,1,1,0,0,0,89.7,12.4);
	this.instance_3.alpha = 0.3008;

	this.instance_4 = new lib.Path_4_1();
	this.instance_4.setTransform(90,84.4,1,1,0,0,0,89.7,12.4);
	this.instance_4.alpha = 0.3008;

	this.instance_5 = new lib.Path_5_1();
	this.instance_5.setTransform(90,36.4,1,1,0,0,0,89.7,12.4);
	this.instance_5.alpha = 0.3008;

	this.instance_6 = new lib.Path_6_1();
	this.instance_6.setTransform(141.2,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_6.alpha = 0.3008;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D9685F").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape.setTransform(89.875,107.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5C192").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_1.setTransform(89.875,107.1);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(59.8,0,32.900000000000006,181.3), null);


(lib.ClipGroup_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOg");
	mask_1.setTransform(169.85,37.0345);

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C1E8FA").s().p("AggAxIABgCQAogOALgZQAMgZgZgdIAAgCQABAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAABQAVAQACAPQADAOgIANQgQAcgqAMIgBAAIAAgBg");
	this.shape_2.setTransform(225.0097,52.8979);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C1E8FA").s().p("ABWBXQgMgVgHgIQgNgMgOgHIgrgTQgbgLgRgJQgTgIgIgIQgNgMgBgOQAAgOAMgMIAZgSIAAAAIgMALQgIAHgDAFQgJAPAMANQAJAKATAJIAfAPIAlAVQAWAMAKAHQAXASAJAcIgDACIAAAAg");
	this.shape_3.setTransform(216.699,42.7225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8ED7F7").s().p("AhtAjIgVgDQgMgBgJAEQAAABgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQANgIAUAAQANgBAWADIANABIgJgLQgBgDAGgEQASgIAlADIAbAEIAcADIA1AEQAPACAPgCIgLAAIgmgEQgfgEgqgIQgSgDgEgGQgFgHAIgHQAGgGAMgDIAUgEQABAAAAAAQAAAAAAABQAAAAgBAAQAAABgBAAIgTAHIgJADQgFADAEACQAHAFALACIAUADQAbAFA1AFIAbABQARABAFAFQACADgEAFQgDADgEACQgSAIghgCIg4gGIg0gGIgZgDQgQgBgKADQALAIABADQADAEgGAFQgFAEgGABIgPACQgMAAgOgEg");
	this.shape_4.setTransform(72.2689,24.6639);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C1E8FA").s().p("AjGAhQBKgTCEgNQA7gGAzgHIArgIQAZgFAMgIQAEgCgDADQgLAMgXAGIgnAIQg5AKg0AFIhsAKQg/AGgsAKQgBAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBg");
	this.shape_5.setTransform(253.5321,32.785);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C1E8FA").s().p("AhxA3QAAAAABgBQAAAAABgBQAAAAAAAAQABgBAAAAIBNgMQAugHAegIQAVgGAPgHIAPgIQAHgFACgHQAEgVgggaIACgCQAqAXgFAXQgDAOgTALQgLAIgXAIQgjANgxAGIhXAJQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBg");
	this.shape_6.setTransform(269.7069,29.37);

	this.instance_7 = new lib.Path_5_2();
	this.instance_7.setTransform(286.7,8.6,1,1,0,0,0,8.3,2.1);
	this.instance_7.alpha = 0.5;

	this.instance_8 = new lib.Path_6_2();
	this.instance_8.setTransform(246.4,8.7,1,1,0,0,0,0.8,1.1);
	this.instance_8.alpha = 0.5;

	this.instance_9 = new lib.CompoundPath();
	this.instance_9.setTransform(249.95,8.85,1,1,0,0,0,1.7,2.5);
	this.instance_9.alpha = 0.5;

	this.instance_10 = new lib.CompoundPath_1();
	this.instance_10.setTransform(268.7,11.75,1,1,0,0,0,16.8,6.2);
	this.instance_10.alpha = 0.5;

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C1E8FA").s().p("AANArQgNgDgKgNQgKgMAAgNQgBgcAZgQQADgBgCACQgVASAKAXQADAIAIALIAQARQACACgEADQgCACgDAAIgBAAg");
	this.shape_7.setTransform(153.3359,52.9844);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C1E8FA").s().p("Ah1BxQgLgTAOgXQAMgSAXgOQAVgNAhgMIA4gSQAegKASgKQAYgNACgNQAEgXgWgQQgOgLgegKQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAkAIANAGQAZANAEATQAFAjhBAcQgUAIgkALQgpAMgPAGQggAMgSARQgZAXALAZIgCACIgBAAIgBAAg");
	this.shape_8.setTransform(160.792,42.6583);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C1E8FA").s().p("AAJAhQgKgEgHgJQgIgJABgKQAAgTAVgPQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQgQAPAGARQACAHAFAHIAMANQAAAAAAABQAAAAAAABQAAABAAAAQgBABgBAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgBgBg");
	this.shape_9.setTransform(224.1348,40.2625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#C1E8FA").s().p("AhEAuQgPgKgDgLQgDgJAKgOQAOgTAkgMQAtgPBHgCQAAAAAAAAQAAABAAAAQAAAAAAABQgBAAgBABQhBAHgtAQQgQAFgJAGIgJAGIgEADQgJAOAKAcQABAAAAABQAAAAgBAAQAAABAAAAQgBABgBAAIgDACIgBgBg");
	this.shape_10.setTransform(236.164,40.9667);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C1E8FA").s().p("AhBANQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBIADgDQAZgFAygEIAdgEQAPgCAIgEQABAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAQgGAIgRAEIgcAFQgoAHgeAAIgLAAg");
	this.shape_11.setTransform(138.9306,16.655);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#5CCAF3").s().p("AgKAHQgSgEAFgKQAAgBAAAAQAAgBAAAAQABAAAAAAQAAAAABABQAJAEAMADIAYABQAFABgMAIIgJABQgIAAgKgDg");
	this.shape_12.setTransform(62.996,26.6802);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#5CCAF3").s().p("Ag5AcQgbgGgGgJQgEgGAEgHQADgGAHgGQANgKAXgGIATgFIADACIACAAIgNAHIgdAOQgMAIAAAIQAAAHAMAFQAMAEARACIAfACQAqADA1gBIgcACIg9AEQgiAAgbgGg");
	this.shape_13.setTransform(75.925,23.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#5CCAF3").s().p("AAAAVQgegEgIgIQgGgFADgHQADgGAIgEQAGgEAbgGQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAgBAAIgBACIgPAEQgJADgGADQgKAHAUAIQASAGApAGQABAAAAABQABAAAAAAQAAABgBAAQAAABgBABQgDADgCAAg");
	this.shape_14.setTransform(136.5625,23.3188);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#5CCAF3").s().p("AgJAVQgdgBgNgDQgJgCgEgGQgFgHAGgGQAGgIAXgKQABAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgBABIgOAIQgJAGAEAGQAFAFAXACQA9ADAeAEQABAAAAABQAAAAAAABQAAAAAAABQgBAAgBABQgEAEgCAAIgZABIgrgCg");
	this.shape_15.setTransform(186.818,26.2198);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#5CCAF3").s().p("AgcAZQgBgDAEgDQAJgHAUgLQAJgFADgFQADgFADgLQAAgBABAAQAAAAAAAAQABgBAAAAQAAAAABAAQADACABAFQABAEgBAEQgEAJgJAHQgPAOgYAJIgDABQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_16.setTransform(240.7419,15.9564);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#8ED7F7").s().p("AhDBwQgugJgJgBQhpgGg0gGQgBAAAAAAQgBgBAAAAQAAgBABAAQAAgBABgBQADgDACAAIA4gIQAhgFAWAAIAPABQgKgFgFgIQgCgCADgEQACgCAEgCQAMgGAUABIAiADIBBgBIALAAIgcgEQhJgNgpgTQgEgBAFgFQAFgDADAAQAoAGBSAGQgygIgggJQgzgPgSgKQgngVABgeIACgCIABAAQAIAaAqATQAeANArALIAJACQgdgIgQgFQgdgLgSgOQgRgNgCgPIABgJQgDgPAPgLQAHgEAAAEQACAIACARQACAOAIAJQALAOAdAMQAQAHAYAGIAoAIIBFANQBCAJA7ACIA6gCQAkgCAUAHQAHACACADQACAEgEADQgEAEgIABQgSADgbABIgtAAIgaAAQAKACAGADQAFACgFAGQgDAEgEACQgaAMgtABIgogBIgJgBIgfACQgCACgEABIgCAAQAYADALAKQADADgGAFQgEAEgEABQgTAGgZgDQAKAFAHAFQACACgEAEQgFAFgDAAQgIABgJAAQgQAAgWgEg");
	this.shape_17.setTransform(106.8865,12.8977);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C1E8FA").s().p("AALAJQgUgGgGgKIAAgBIACgBQAFAEAJAEIAPAFQAAABABAAQAAAAAAABQgBAAAAABQAAAAgBABIgDACIgBgBg");
	this.shape_18.setTransform(101.7448,4.806);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#C1E8FA").s().p("AAfAdQgngFgRgGQgggJgKgLQgFgHACgIQACgIAIgGQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAgBABQgLAPAYAMQAGADAhAKQAkAMAqAGQACAAgFAEQgQAAgVgDg");
	this.shape_19.setTransform(111.425,4.93);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#C1E8FA").s().p("AlxBmQgeAAgHgBQgagDABgNQABgMAXgCIAhgBQAmAABNgKIAxgFQAegEASgJQAKgFgIgFQgGgDgKgCIgYgCQgQgBgGgEQgPgLAhgGQAbgFAOABQCpAFCJgXQBNgNAlgLQAkgLAPgGQAfgNALgQIABAAIABgCIAKgHQAOgHADAHQAEALgQAOQgIAGgVAKIgjARQgYALgZAIIgTAGIgPAEQgTAFgCAGQAAAAgBABQAAAAAAAAQABAAAAAAQAAAAAAAAQALAGAZgFQAXgEAYgHQAcgHAZgIQAWgHAIgDIAVgJIAPgKQAVgOAHAFQAHAFgNANQgUATgjAQQgbALgfAJIgYAHIgOAGQAegBApgQIAngMQAXgHARAAQAEgBgBAEQgCAEgCABQgSAQggALQgUAHgkAIIhEAOQgmAGggABQgEABADgEQADgEACgBIA4gWIgLADQhMARgmAGQgjAGgXAAQgOAAgogDQgEgBADgFIAEgGQAKgHATgDIAfgFIBLgQIArgKIg1AKQhAALhMAFQgwADgZgBQgNAAgQgCQgOgCgIABIAOAHQAHAFgGAGQgFAGgMADIgUADIgIAEIABAAQADACALADIAPACQAKACAEAEQADABgFAFQgLAKgVADIgjACQhFAFhCAAIgrgBg");
	this.shape_20.setTransform(186.5185,14.0435);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#5CCAF3").s().p("AidB5IgDgBQgKgCgGgDQgKgEARgHQAPgFAbgEIArgIQATgEANgFQASgIAGgJQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQgIgEgOACIggAGQg3ALghABQgJAAgLgBIgGgDQAAAAAAgBQgBAAABAAQAAgBAAAAQABgBAAAAIAEgDQAGgDAZgGIAbgIQAQgGAGgKIAAgBQgIgCgLACIgUAEIg2AJQg/AKgzACIghACQgTABgOgCQgYgDAEgMQAGgHARgDQAagGAxgBQA4gCATgDQBlgMBdgbQA3gRAMgFQApgTADgcQAAgEgCgJIgEgPIACgEQADgFAFAIQAKALgCASQgCARgQARIgeAbIAAABIAAABQAGABANgDQAMgEAHACQgGALgQAHIgcAKQgNAEgIAEIgGAFIAAABQgCADACADQACACAHABQAGACAOAAQANAAAMgBIAMAAQAOABAGADQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQgCAFgQAHIgWAIQgQAEgHAEQgBAAAAAAQgBAAAAABQAAAAABAAQAAAAABAAQAfAHAtgWQAagNATgPQAagVALgHQAQgJAHABQABAEgEAGQgMARgcASQgOAJgUAJIgkAOIAFAAIArgJQAWgGAOADQAAAAABAAQAAAAAAABQABAAAAABQAAABgBABQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABIgJAIIADgBQAggMARgDIABgBQAagJAPgLQAUgPAPgGQAGgDAHABQAIAAABAGQAAAJgNALQgIAHgSAMIgGAEQAUgCAfgPQAjgPAQgDQAFgBgCADQgEALgOAJQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgFAHgKAHIgJAGQANACAXgJQAYgJANgBQAEAAgCAEQgHARghAOQgdANgdACQgLACgKgCQgPgDADgJQACgHAIgEIAQgGIAAgBIgPADQgiANgjAIQgYAGgGABQgWABAGgPQAFgKAUgJIAKgFIgHADQgaAIgmAJQgSAIgmALQhHAQg5AGQgqADgeAAQgVAAgPgBg");
	this.shape_21.setTransform(228.3232,18.9956);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E2F4FC").s().p("AiGAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAABgBIACgBQBEAFBDgCQAhAABjgGQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAgBABIgDACQg5AGhNABIgSAAQg+AAg0gGg");
	this.shape_22.setTransform(167.725,3.8063);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E2F4FC").s().p("AhNAPQizgJhpgVQABgBAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQBEAMBTAFQBCADBQACQBdADAvAAQBUAAA7gFQAdgCAogEIBEgIQAGgBgKAJQg9AOhZAFQg2AEhEAAQhIAAhYgEg");
	this.shape_23.setTransform(164.1008,5.6279);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E2F4FC").s().p("AgvArQhHgBhMgJIhIgKIgigGQhAgGgygLQgigHgYgJQgegJgQgQIADgCQAPAKAhAJIAxALQA7ANBCAEQBSAHCmAFQChAFB6gIQCYgLB/ghQAFgCgIAJIhFASIgCABQgdAHhAANQhFAOgfAEQgiAGgpACIhKADIhHAAIhNgBg");
	this.shape_24.setTransform(166.5089,7.37);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00B0E6").s().p("AlaEAQAKgMAAgMQgBgJgJgKQgIgJgRgJIgbgQQg0geARgcQAPgaA9gMQAlgJBEgFIBpgIQBGgGAlgFQAngEA8gNQAbgGAUgHQBHgXgRgeQgIgOgZgKQgMgFgmgLQghgKgVgKQgZgMgJgQQgGgMAEgMQAEgMAKgIQATgPAtgHQAjgFA+gHQBEgHAdgFIAmgGIAbgDQAmgHATgLQAMgGAFgKQAHgKgGgKIgFgIIASABQARAIAGAKQAHAMgJAPQgIANgOAJQgWAQgoAKQgLADg2AGQhkAJguAKQhzAXAlAlQAIAHAnAJIBKAQQBfAYgZAnQgQAXgsAKQgRAEg4AGQigATicAOQhDADgvAEQhaAJgMAYQgHANALARQAJAPAPAIQAOAIAvAPQAlARgNAbQgPAihBASQAWgMANgPg");
	this.shape_25.setTransform(274.9172,30.875);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#00B0E6").s().p("Ag5BCQiUgjAvhKQATgeA4gPIgEACQgbAOgMALQgUARAAAUQAAAXAXAVQAUATAkANQAdALAmAHQAXAEAsAGQAuAFA5AEQiQgEhTgTg");
	this.shape_26.setTransform(156.4571,52.325);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AIfCYQhHgXmmABQjWABj1AFQhEABgXgDQg7gHgWgZQgYgcA6gXQAWgKA7gNQAlgIBegRIA4gIQAjgIAOgQQAOgSgPgSQgXgUgJgKQgLgMAEgPQADgNAMgMQAQgQAcgLIAJAAQgjASgIAZQgHATASAUQALAKAYAUQAVASgLAQQgHAJgUAKQgOAHgdAFIgtAIIgwALQg9APguAOQgnAKgSAIQghAOAIAQQAFAIAPAFQAJAEAUAFQAiAHAuABIA3gCIA3gCIBzgEIDlgGIByAAIBzADIBwABQBBACAwAIQA0AJAZARQAMAJAEALQgNgNghgKg");
	this.shape_27.setTransform(105.4966,17.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#5CCAF3").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLIBmABQgVARgDARQgEAYAoAOQAeAMBBAHIBPAFQAgACBAAHIBsAKIBUAIQAzAFARADQARADAOAGQAaANgIAFQgTAPgqAJQgeAGgrACIhJADQglACgvAFQg/AHgZANQgPAIAFALQAFAKAQAGQAWAIAxACIBcAIQAuAEA9ADIBqAFIDLALQBAACAcAEQA1AFAkAQQAOAFAEAHQAHAJgJAKQgHAHgNAGIgYALIgxASQg0AUgaAIQh1AlgkANQgcALgOAIQgXAOgDASQgCAQAXAOQAUAMAuAKQBFAQCBAHQBaAFBRABIBNgBIBJgDQAogCAggGQAigGAcgNQAigPAGgUQAIgRgVgYQgQgSgkgVQgOgIghgQQgggOgPgKQgdgTABgSQABgYAqgNQAWgHAxgFIBTgJIDGgQQA3gEAbgEQA/gIAfgOQAQgHAFgLQAIgMgIgNQgLgVgfgQQgRgIgogNQg1gQgqgMIg5gPQgfgKgUgNQgUgMAHgPQAGgKAWgIQAVgHAegDQAPgBAlgBQAhgBBAACQAzACBogBIBfgEQAzgBAigDQArgEAfgMIACgBIBjABQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_28.setTransform(182.6498,30.908);

	this.instance_11 = new lib.Path_29();
	this.instance_11.setTransform(167.6,6.15,1,1,0,0,0,55.8,5.8);
	this.instance_11.alpha = 0.3984;
	this.instance_11.compositeOperation = "screen";

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLMAkNAAaQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_29.setTransform(182.6498,30.908);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.instance_7,this.instance_8,this.instance_9,this.instance_10,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.instance_11,this.shape_29];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.instance_11},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(46.6,2.2,272.09999999999997,59.599999999999994), null);


(lib.ClipGroup_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOg");
	mask_2.setTransform(169.85,37.0345);

	// Layer_3
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#C1E8FA").s().p("AggAxIABgCQAogOALgZQAMgZgZgdIAAgCQABAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAABQAVAQACAPQADAOgIANQgQAcgqAMIgBAAIAAgBg");
	this.shape_30.setTransform(225.0097,52.8979);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#C1E8FA").s().p("ABWBXQgMgVgHgIQgNgMgOgHIgrgTQgbgLgRgJQgTgIgIgIQgNgMgBgOQAAgOAMgMIAZgSIAAAAIgMALQgIAHgDAFQgJAPAMANQAJAKATAJIAfAPIAlAVQAWAMAKAHQAXASAJAcIgDACIAAAAg");
	this.shape_31.setTransform(216.699,42.7225);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8ED7F7").s().p("AhtAjIgVgDQgMgBgJAEQAAABgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQANgIAUAAQANgBAWADIANABIgJgLQgBgDAGgEQASgIAlADIAbAEIAcADIA1AEQAPACAPgCIgLAAIgmgEQgfgEgqgIQgSgDgEgGQgFgHAIgHQAGgGAMgDIAUgEQABAAAAAAQAAAAAAABQAAAAgBAAQAAABgBAAIgTAHIgJADQgFADAEACQAHAFALACIAUADQAbAFA1AFIAbABQARABAFAFQACADgEAFQgDADgEACQgSAIghgCIg4gGIg0gGIgZgDQgQgBgKADQALAIABADQADAEgGAFQgFAEgGABIgPACQgMAAgOgEg");
	this.shape_32.setTransform(72.2689,24.6639);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#C1E8FA").s().p("AjGAhQBKgTCEgNQA7gGAzgHIArgIQAZgFAMgIQAEgCgDADQgLAMgXAGIgnAIQg5AKg0AFIhsAKQg/AGgsAKQgBAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBg");
	this.shape_33.setTransform(253.5321,32.785);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#C1E8FA").s().p("AhxA3QAAAAABgBQAAAAABgBQAAAAAAAAQABgBAAAAIBNgMQAugHAegIQAVgGAPgHIAPgIQAHgFACgHQAEgVgggaIACgCQAqAXgFAXQgDAOgTALQgLAIgXAIQgjANgxAGIhXAJQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBg");
	this.shape_34.setTransform(269.7069,29.37);

	this.instance_12 = new lib.Path_5_3();
	this.instance_12.setTransform(286.7,8.6,1,1,0,0,0,8.3,2.1);
	this.instance_12.alpha = 0.5;

	this.instance_13 = new lib.Path_6_3();
	this.instance_13.setTransform(246.4,8.7,1,1,0,0,0,0.8,1.1);
	this.instance_13.alpha = 0.5;

	this.instance_14 = new lib.CompoundPath_2();
	this.instance_14.setTransform(249.95,8.85,1,1,0,0,0,1.7,2.5);
	this.instance_14.alpha = 0.5;

	this.instance_15 = new lib.CompoundPath_1_1();
	this.instance_15.setTransform(268.7,11.75,1,1,0,0,0,16.8,6.2);
	this.instance_15.alpha = 0.5;

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#C1E8FA").s().p("AANArQgNgDgKgNQgKgMAAgNQgBgcAZgQQADgBgCACQgVASAKAXQADAIAIALIAQARQACACgEADQgCACgDAAIgBAAg");
	this.shape_35.setTransform(153.3359,52.9844);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#C1E8FA").s().p("Ah1BxQgLgTAOgXQAMgSAXgOQAVgNAhgMIA4gSQAegKASgKQAYgNACgNQAEgXgWgQQgOgLgegKQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAkAIANAGQAZANAEATQAFAjhBAcQgUAIgkALQgpAMgPAGQggAMgSARQgZAXALAZIgCACIgBAAIgBAAg");
	this.shape_36.setTransform(160.792,42.6583);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#C1E8FA").s().p("AAJAhQgKgEgHgJQgIgJABgKQAAgTAVgPQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQgQAPAGARQACAHAFAHIAMANQAAAAAAABQAAAAAAABQAAABAAAAQgBABgBAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgBgBg");
	this.shape_37.setTransform(224.1348,40.2625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#C1E8FA").s().p("AhEAuQgPgKgDgLQgDgJAKgOQAOgTAkgMQAtgPBHgCQAAAAAAAAQAAABAAAAQAAAAAAABQgBAAgBABQhBAHgtAQQgQAFgJAGIgJAGIgEADQgJAOAKAcQABAAAAABQAAAAgBAAQAAABAAAAQgBABgBAAIgDACIgBgBg");
	this.shape_38.setTransform(236.164,40.9667);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#C1E8FA").s().p("AhBANQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBIADgDQAZgFAygEIAdgEQAPgCAIgEQABAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAQgGAIgRAEIgcAFQgoAHgeAAIgLAAg");
	this.shape_39.setTransform(138.9306,16.655);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#5CCAF3").s().p("AgKAHQgSgEAFgKQAAgBAAAAQAAgBAAAAQABAAAAAAQAAAAABABQAJAEAMADIAYABQAFABgMAIIgJABQgIAAgKgDg");
	this.shape_40.setTransform(62.996,26.6802);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#5CCAF3").s().p("Ag5AcQgbgGgGgJQgEgGAEgHQADgGAHgGQANgKAXgGIATgFIADACIACAAIgNAHIgdAOQgMAIAAAIQAAAHAMAFQAMAEARACIAfACQAqADA1gBIgcACIg9AEQgiAAgbgGg");
	this.shape_41.setTransform(75.925,23.975);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#5CCAF3").s().p("AAAAVQgegEgIgIQgGgFADgHQADgGAIgEQAGgEAbgGQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAgBAAIgBACIgPAEQgJADgGADQgKAHAUAIQASAGApAGQABAAAAABQABAAAAAAQAAABgBAAQAAABgBABQgDADgCAAg");
	this.shape_42.setTransform(136.5625,23.3188);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#5CCAF3").s().p("AgJAVQgdgBgNgDQgJgCgEgGQgFgHAGgGQAGgIAXgKQABAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgBABIgOAIQgJAGAEAGQAFAFAXACQA9ADAeAEQABAAAAABQAAAAAAABQAAAAAAABQgBAAgBABQgEAEgCAAIgZABIgrgCg");
	this.shape_43.setTransform(186.818,26.2198);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#5CCAF3").s().p("AgcAZQgBgDAEgDQAJgHAUgLQAJgFADgFQADgFADgLQAAgBABAAQAAAAAAAAQABgBAAAAQAAAAABAAQADACABAFQABAEgBAEQgEAJgJAHQgPAOgYAJIgDABQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_44.setTransform(240.7419,15.9564);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#8ED7F7").s().p("AhDBwQgugJgJgBQhpgGg0gGQgBAAAAAAQgBgBAAAAQAAgBABAAQAAgBABgBQADgDACAAIA4gIQAhgFAWAAIAPABQgKgFgFgIQgCgCADgEQACgCAEgCQAMgGAUABIAiADIBBgBIALAAIgcgEQhJgNgpgTQgEgBAFgFQAFgDADAAQAoAGBSAGQgygIgggJQgzgPgSgKQgngVABgeIACgCIABAAQAIAaAqATQAeANArALIAJACQgdgIgQgFQgdgLgSgOQgRgNgCgPIABgJQgDgPAPgLQAHgEAAAEQACAIACARQACAOAIAJQALAOAdAMQAQAHAYAGIAoAIIBFANQBCAJA7ACIA6gCQAkgCAUAHQAHACACADQACAEgEADQgEAEgIABQgSADgbABIgtAAIgaAAQAKACAGADQAFACgFAGQgDAEgEACQgaAMgtABIgogBIgJgBIgfACQgCACgEABIgCAAQAYADALAKQADADgGAFQgEAEgEABQgTAGgZgDQAKAFAHAFQACACgEAEQgFAFgDAAQgIABgJAAQgQAAgWgEg");
	this.shape_45.setTransform(106.8865,12.8977);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#C1E8FA").s().p("AALAJQgUgGgGgKIAAgBIACgBQAFAEAJAEIAPAFQAAABABAAQAAAAAAABQgBAAAAABQAAAAgBABIgDACIgBgBg");
	this.shape_46.setTransform(101.7448,4.806);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#C1E8FA").s().p("AAfAdQgngFgRgGQgggJgKgLQgFgHACgIQACgIAIgGQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAgBABQgLAPAYAMQAGADAhAKQAkAMAqAGQACAAgFAEQgQAAgVgDg");
	this.shape_47.setTransform(111.425,4.93);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#C1E8FA").s().p("AlxBmQgeAAgHgBQgagDABgNQABgMAXgCIAhgBQAmAABNgKIAxgFQAegEASgJQAKgFgIgFQgGgDgKgCIgYgCQgQgBgGgEQgPgLAhgGQAbgFAOABQCpAFCJgXQBNgNAlgLQAkgLAPgGQAfgNALgQIABAAIABgCIAKgHQAOgHADAHQAEALgQAOQgIAGgVAKIgjARQgYALgZAIIgTAGIgPAEQgTAFgCAGQAAAAgBABQAAAAAAAAQABAAAAAAQAAAAAAAAQALAGAZgFQAXgEAYgHQAcgHAZgIQAWgHAIgDIAVgJIAPgKQAVgOAHAFQAHAFgNANQgUATgjAQQgbALgfAJIgYAHIgOAGQAegBApgQIAngMQAXgHARAAQAEgBgBAEQgCAEgCABQgSAQggALQgUAHgkAIIhEAOQgmAGggABQgEABADgEQADgEACgBIA4gWIgLADQhMARgmAGQgjAGgXAAQgOAAgogDQgEgBADgFIAEgGQAKgHATgDIAfgFIBLgQIArgKIg1AKQhAALhMAFQgwADgZgBQgNAAgQgCQgOgCgIABIAOAHQAHAFgGAGQgFAGgMADIgUADIgIAEIABAAQADACALADIAPACQAKACAEAEQADABgFAFQgLAKgVADIgjACQhFAFhCAAIgrgBg");
	this.shape_48.setTransform(186.5185,14.0435);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#5CCAF3").s().p("AidB5IgDgBQgKgCgGgDQgKgEARgHQAPgFAbgEIArgIQATgEANgFQASgIAGgJQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQgIgEgOACIggAGQg3ALghABQgJAAgLgBIgGgDQAAAAAAgBQgBAAABAAQAAgBAAAAQABgBAAAAIAEgDQAGgDAZgGIAbgIQAQgGAGgKIAAgBQgIgCgLACIgUAEIg2AJQg/AKgzACIghACQgTABgOgCQgYgDAEgMQAGgHARgDQAagGAxgBQA4gCATgDQBlgMBdgbQA3gRAMgFQApgTADgcQAAgEgCgJIgEgPIACgEQADgFAFAIQAKALgCASQgCARgQARIgeAbIAAABIAAABQAGABANgDQAMgEAHACQgGALgQAHIgcAKQgNAEgIAEIgGAFIAAABQgCADACADQACACAHABQAGACAOAAQANAAAMgBIAMAAQAOABAGADQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQgCAFgQAHIgWAIQgQAEgHAEQgBAAAAAAQgBAAAAABQAAAAABAAQAAAAABAAQAfAHAtgWQAagNATgPQAagVALgHQAQgJAHABQABAEgEAGQgMARgcASQgOAJgUAJIgkAOIAFAAIArgJQAWgGAOADQAAAAABAAQAAAAAAABQABAAAAABQAAABgBABQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABIgJAIIADgBQAggMARgDIABgBQAagJAPgLQAUgPAPgGQAGgDAHABQAIAAABAGQAAAJgNALQgIAHgSAMIgGAEQAUgCAfgPQAjgPAQgDQAFgBgCADQgEALgOAJQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgFAHgKAHIgJAGQANACAXgJQAYgJANgBQAEAAgCAEQgHARghAOQgdANgdACQgLACgKgCQgPgDADgJQACgHAIgEIAQgGIAAgBIgPADQgiANgjAIQgYAGgGABQgWABAGgPQAFgKAUgJIAKgFIgHADQgaAIgmAJQgSAIgmALQhHAQg5AGQgqADgeAAQgVAAgPgBg");
	this.shape_49.setTransform(228.3232,18.9956);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#E2F4FC").s().p("AiGAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAABgBIACgBQBEAFBDgCQAhAABjgGQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAgBABIgDACQg5AGhNABIgSAAQg+AAg0gGg");
	this.shape_50.setTransform(167.725,3.8063);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#E2F4FC").s().p("AhNAPQizgJhpgVQABgBAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQBEAMBTAFQBCADBQACQBdADAvAAQBUAAA7gFQAdgCAogEIBEgIQAGgBgKAJQg9AOhZAFQg2AEhEAAQhIAAhYgEg");
	this.shape_51.setTransform(164.1008,5.6279);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#E2F4FC").s().p("AgvArQhHgBhMgJIhIgKIgigGQhAgGgygLQgigHgYgJQgegJgQgQIADgCQAPAKAhAJIAxALQA7ANBCAEQBSAHCmAFQChAFB6gIQCYgLB/ghQAFgCgIAJIhFASIgCABQgdAHhAANQhFAOgfAEQgiAGgpACIhKADIhHAAIhNgBg");
	this.shape_52.setTransform(166.5089,7.37);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#00B0E6").s().p("AlaEAQAKgMAAgMQgBgJgJgKQgIgJgRgJIgbgQQg0geARgcQAPgaA9gMQAlgJBEgFIBpgIQBGgGAlgFQAngEA8gNQAbgGAUgHQBHgXgRgeQgIgOgZgKQgMgFgmgLQghgKgVgKQgZgMgJgQQgGgMAEgMQAEgMAKgIQATgPAtgHQAjgFA+gHQBEgHAdgFIAmgGIAbgDQAmgHATgLQAMgGAFgKQAHgKgGgKIgFgIIASABQARAIAGAKQAHAMgJAPQgIANgOAJQgWAQgoAKQgLADg2AGQhkAJguAKQhzAXAlAlQAIAHAnAJIBKAQQBfAYgZAnQgQAXgsAKQgRAEg4AGQigATicAOQhDADgvAEQhaAJgMAYQgHANALARQAJAPAPAIQAOAIAvAPQAlARgNAbQgPAihBASQAWgMANgPg");
	this.shape_53.setTransform(274.9172,30.875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#00B0E6").s().p("Ag5BCQiUgjAvhKQATgeA4gPIgEACQgbAOgMALQgUARAAAUQAAAXAXAVQAUATAkANQAdALAmAHQAXAEAsAGQAuAFA5AEQiQgEhTgTg");
	this.shape_54.setTransform(156.4571,52.325);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#00B0E6").s().p("AIfCYQhHgXmmABQjWABj1AFQhEABgXgDQg7gHgWgZQgYgcA6gXQAWgKA7gNQAlgIBegRIA4gIQAjgIAOgQQAOgSgPgSQgXgUgJgKQgLgMAEgPQADgNAMgMQAQgQAcgLIAJAAQgjASgIAZQgHATASAUQALAKAYAUQAVASgLAQQgHAJgUAKQgOAHgdAFIgtAIIgwALQg9APguAOQgnAKgSAIQghAOAIAQQAFAIAPAFQAJAEAUAFQAiAHAuABIA3gCIA3gCIBzgEIDlgGIByAAIBzADIBwABQBBACAwAIQA0AJAZARQAMAJAEALQgNgNghgKg");
	this.shape_55.setTransform(105.4966,17.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#5CCAF3").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLIBmABQgVARgDARQgEAYAoAOQAeAMBBAHIBPAFQAgACBAAHIBsAKIBUAIQAzAFARADQARADAOAGQAaANgIAFQgTAPgqAJQgeAGgrACIhJADQglACgvAFQg/AHgZANQgPAIAFALQAFAKAQAGQAWAIAxACIBcAIQAuAEA9ADIBqAFIDLALQBAACAcAEQA1AFAkAQQAOAFAEAHQAHAJgJAKQgHAHgNAGIgYALIgxASQg0AUgaAIQh1AlgkANQgcALgOAIQgXAOgDASQgCAQAXAOQAUAMAuAKQBFAQCBAHQBaAFBRABIBNgBIBJgDQAogCAggGQAigGAcgNQAigPAGgUQAIgRgVgYQgQgSgkgVQgOgIghgQQgggOgPgKQgdgTABgSQABgYAqgNQAWgHAxgFIBTgJIDGgQQA3gEAbgEQA/gIAfgOQAQgHAFgLQAIgMgIgNQgLgVgfgQQgRgIgogNQg1gQgqgMIg5gPQgfgKgUgNQgUgMAHgPQAGgKAWgIQAVgHAegDQAPgBAlgBQAhgBBAACQAzACBogBIBfgEQAzgBAigDQArgEAfgMIACgBIBjABQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_56.setTransform(182.6498,30.908);

	this.instance_16 = new lib.Path_29_1();
	this.instance_16.setTransform(167.6,6.15,1,1,0,0,0,55.8,5.8);
	this.instance_16.alpha = 0.3984;
	this.instance_16.compositeOperation = "screen";

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#8ED7F7").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLMAkNAAaQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_57.setTransform(182.6498,30.908);

	var maskedShapeInstanceList = [this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.instance_12,this.instance_13,this.instance_14,this.instance_15,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49,this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.instance_16,this.shape_57];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_57},{t:this.instance_16},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(46.6,2.2,272.09999999999997,59.599999999999994), null);


(lib.fish2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		var root = this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// Layer_1
	this.instance = new lib.Tween8("synched",0);

	this.instance_1 = new lib.Tween9("synched",0);
	this.instance_1.setTransform(25.9,-25.95,1,1,74.9998);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween10("synched",0);
	this.instance_2.setTransform(62.9,0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},12).to({state:[{t:this.instance_2}]},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,rotation:74.9998,x:25.9,y:-25.95},12).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},12).to({_off:true,rotation:0,x:62.9,y:0.05},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.9,-45.4,100.69999999999999,63.8);


(lib.worm1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		var root = this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// Layer_1
	this.instance = new lib.Tween11copy("synched",0);

	this.instance_1 = new lib.Tween12copy("synched",0);
	this.instance_1.setTransform(86,-0.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:86,y:-0.25},24).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-3,124.1,5.8);


(lib.fish2copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_24 = function() {
		var root = this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(24).call(this.frame_24).wait(1));

	// Layer_1
	this.instance = new lib.Tween8copy2("synched",0);

	this.instance_1 = new lib.Tween9copy("synched",0);
	this.instance_1.setTransform(25.9,-25.95,1,1,74.9998);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween10copy2("synched",0);
	this.instance_2.setTransform(62.9,0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},12).to({state:[{t:this.instance_2}]},12).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,rotation:74.9998,x:25.9,y:-25.95},12).wait(13));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},12).to({_off:true,rotation:0,x:62.9,y:0.05},12).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.9,-45.4,100.69999999999999,63.8);


(lib.birdcopy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1copy3("synched",0);

	this.instance_1 = new lib.Tween2copy3("synched",0);
	this.instance_1.setTransform(-221.5,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3copy3("synched",0);
	this.instance_2.setTransform(13.75,3.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},34).to({state:[{t:this.instance_2}]},38).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-221.5},34).wait(39));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},34).to({_off:true,x:13.75,y:3.55},38).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.2,-3.5,262.7,10.6);


(lib.birdcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1copy("synched",0);

	this.instance_1 = new lib.Tween2copy("synched",0);
	this.instance_1.setTransform(-221.5,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3copy("synched",0);
	this.instance_2.setTransform(13.75,3.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},34).to({state:[{t:this.instance_2}]},38).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-221.5},34).wait(39));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},34).to({_off:true,x:13.75,y:3.55},38).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.2,-3.5,262.7,10.6);


(lib.bird = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1_1("synched",0);

	this.instance_1 = new lib.Tween2_1("synched",0);
	this.instance_1.setTransform(-221.5,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3_1("synched",0);
	this.instance_2.setTransform(13.75,3.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},34).to({state:[{t:this.instance_2}]},38).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:-221.5},34).wait(39));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},34).to({_off:true,x:13.75,y:3.55},38).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.2,-3.5,262.7,10.6);


(lib.bgAnimation1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1E8FA").s().p("AgGA9QgOgKAQgiQANgagigIQgcgDgSgEQghgJAHgSQAFgNAcgCQAWgBARAEQgegCgSAFQgWAVASADIAGABIAdAEIAgAEQAVAEAFAKQAHANgJANIgRAXQgPAXAdABQAUAAAVgGIAugOQABAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQggANgUAHQgTAGgOAAQgNAAgGgGg");
	this.shape.setTransform(279.0062,101.0235,0.6697,0.6696);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C1E8FA").s().p("AgpBmQg5gCgngSQgXgLgDgRQgCgRASgSQAVgTArgLQAYgGAugIQBBgNAdgKQA2gUAaghQABAAABAAQAAAAAAAAQABAAAAAAQAAABgBAAQgZAnhBAWIhsAaQgyAMgWAJQg4AaASAUQANAOAWAHQAlALAvAFQAdADA3ABQABAAABABQAAAAAAAAQABAAgBABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAIhaACIgHAAg");
	this.shape_1.setTransform(191.4973,117.462,0.6697,0.6696);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C1E8FA").s().p("AiaBIQAAgBgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIADgBQBUAVAYAFQA/AMAxgCQAugWgwgIIgNgFIgdgKQgggOgKgMQgUgYAVgTQAQgQAkgNIAwgOQAdgIARgIQAdgNgWgLQgRgJgcgBQhGgFhaAHQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQB1gQBMAPQApAIgMAUQgKARgiALQgoALgZAIQgsAPgFAQQgIAXA3AaQBEAfAGAIQALANgaAGQgQAEgVAAQhagBiAgog");
	this.shape_2.setTransform(153.1905,116.016,0.6697,0.6696);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AjQAuQAAgBAAAAQABAAAAgBQAAAAABAAQABAAAAgBQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQgCAZBzgRQBFgLBDgQIBJgSQAqgMAagRQAhgXgkgMQgbgJgeAAQgqAEgVAAIABgBIBTgHQBBAAgEAgQgCANgTAMIgfANQgoARg+AQQhEAThRALQgpAGgbAAQg3AAAIgYg");
	this.shape_3.setTransform(99.4852,94.1618,0.6697,0.6696);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C1E8FA").s().p("AgdCGQg5AAgEgWQgEgaArgTQAYgKAngLQAYgJAGgEQATgKADgMQAFgPgIgNQgFgKgPgMQgTgPgEgFQgMgNAAgOQAAgUAigRQAjgRAQAKIAAABQgXgBgeARQgkAUASAUQAHAIAQALQARANAHAHQARATgFAWQgGAWgXANQgXANgqAOIgmAMQgaALAAANQABAUA1AEQAaACApgCQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgnAEgaAAIgGAAg");
	this.shape_4.setTransform(239.7752,120.6402,0.6697,0.6696);

	this.instance = new lib.ClipGroup_2();
	this.instance.setTransform(186.3,109.5,0.6698,0.6696,0,0,0,169.8,36.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5CCAF3").s().p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOgAOMAOIhaARQgYADgPADQgcAHgDANQgEAQAaAMQAiAPADADQAwA0hGAtQgqAahLAUIguALQgoAMAAANQABAQAjAEIAyABQBwAABrgSQCzgfgfhBQgIgQhEgaQg8gYACgeQABggAzgDQBEgEAEgCQAbgPgOgMQgMgJgcgEQgQgDgSAAQgaAAgeAFgAtmBfQg1ACAEAbQAFAdBiAMQAzAGBEACQAtAHBiAZQBcAXAyAHQAdAEAYgBQAogCAFgQQAIgUgggRQgFgEgrgQQg/gbAKggQAJgbA+geIBignQA+ggg5gQQgbgIgxACIhMAGQhBACiEAAQhEAAiEAFQggABgYAHQgmALASAWQASAVA3ACQAdABAygEQAbAAA9gEQA5gEAeABQARAAAIAFQgKAJgZAFQgaAFgJAHQgUAQAOAPQAIAJAWARQAMAPABAHQACAKgTABQgIAAgQgIQgTgIgFgBQhRgShVgJQgkgEgVAAIgLABgAUtjRQgrABgTAPQghAaAsAPQA7AVAEAKQAGANgDAPIgGAUQgBAQAzgBQA8gFBogcQCEglgWgfQgQgYhKAPQhSARgOgGQgegNAwgaQAagNAogSQAdgZgPgUQgOgVghASIg+ApQgkAXggACIgxgBIgTABgA4LjpQhDAGAKAlQAMArB7gDQBXgBBGgQQB3gbAzgRQCDgsgegpQgNgUglAAQgpACgRAAQgYgBgvgDQgxgEgYAAQg0gBgQACQgwAFgJAZQgGAQAXALQAUALgJANQgFAIgdABIgkgBIhBgCIgWABg");
	this.shape_5.setTransform(186.3129,109.9822,0.6698,0.6696);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#10481B").s().p("AgUAjIgJgJQgIgIACgDQACgDAKAHIAKAIIgFgQQgDgPACgBQAEAAAJATIABgYQACgYAGgBQAMgBgMAxIAIgKQAJgJADABQAGABgNAcIAGgFQAHgGAFAAQAJAAgZAYg");
	this.shape_6.setTransform(232.1497,85.0134,0.6696,0.6695);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#237812").s().p("AgZAqIgNgMQgMgOADgFQAGgKATASIgEgPQgEgPAFgEQAHgGAIAVQgCgJABgKQADgVALgBQAMgBgCAXQgBALgDALIAIgEQAJgFAGADQAKADgQARIAJgEQAJgCAEAFQAGAJgZASg");
	this.shape_7.setTransform(232.1874,84.612,0.6696,0.6695);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#10481B").s().p("AgeAYIgFgHQgGgIADgBQAFgBAOAOIgDgSQgBgSAFAAQAHAAAJAcIABgRQABgSAGgBQAJgCAAApIAJgJQAJgIAFAAQAHAAgNAZg");
	this.shape_8.setTransform(101.7109,85.3303,0.6696,0.6695);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#237812").s().p("AglAgIgIgLQgHgLACgDQACgDALAIIALAHIgDgUQgCgVAGgDQAIgFAKAeIAEgOQAEgPAHgCQAHgBABAVIAAATIALgGQAMgFAHADQALADgNAdg");
	this.shape_9.setTransform(101.8198,84.8786,0.6696,0.6695);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#10481B").s().p("AgoAUIgIgHQgIgHACgCQACgCAIAFIAHAFIgDgMQgCgNADAAQAEAAAFAYIABgOQADgPAGgBQAJgCgCAhIAHgMQAHgNAGgBQAKgCgKAcIALgMQAMgKAGABQAIABgPAUIAKgFQALgGAEgBQAHAAgRAUg");
	this.shape_10.setTransform(140.3156,85.7306,0.6697,0.6696);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8ED7F7").s().p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOg");
	this.shape_11.setTransform(186.3051,109.9796,0.6697,0.6696);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#237812").s().p("AhRAzQgHgTgFgTQgLgmAJgGQAJgGANAXQAHAMAFAMQABgMADgMQAFgaANgBQANgBABAUQAAAIgBAJQADgNAFgMQANgbAPADQAQADgIAZQgEANgIAMIATgIQAUgGAHAIQAHAHgNAQIgOAQIAbgGQAcgEAKAIQAJAIgSAJIgTAIg");
	this.shape_12.setTransform(272.8454,85.389,0.6696,0.6695);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#237812").s().p("Ag6ATQgLgMABgDQABgDALAFIALAGIgBgPQgBgRADgCQAEgDAJAYIADgOQAEgOAFAAQAJAAACAbQAKgRAOgBQANgBgHASQAMgLAKACQALACgGAOIAHgEQAHgCAEACQAEADgHALQgHALgIAEIhgABIgLgLg");
	this.shape_13.setTransform(140.3644,85.1648,0.6697,0.6696);

	this.instance_1 = new lib.Path_1_2();
	this.instance_1.setTransform(255.8,133.1,0.6696,0.6695,0,0,0,6.9,10);
	this.instance_1.alpha = 0.6016;
	this.instance_1.compositeOperation = "multiply";

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#279FC9").s().p("AhpglQBvgOBLgdIgUghIA+ASIgSAwQgSA5gEAzQhEAfiJAWg");
	this.shape_14.setTransform(251.6263,134.1728,0.6696,0.6695);

	this.instance_2 = new lib.Path_2_1_1();
	this.instance_2.setTransform(204.25,136.4,0.6696,0.6695,0,0,0,38.6,11.8);
	this.instance_2.alpha = 0.6016;
	this.instance_2.compositeOperation = "multiply";

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#279FC9").s().p("ACTBuQkhgIkNgrIgJgBIgPiRQCtAWCYAMQEuAXB8gaIAEgvIAxArIgIgaQgHgbACACIAxA0IAfACIgWClQhAAEhTAAIh4gCg");
	this.shape_15.setTransform(200.4497,136.2135,0.6696,0.6695);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#03507F").s().p("AgihJQAngCAqgFIgRCWQggAGgsAFQAEhNAIhNg");
	this.shape_16.setTransform(241.381,137.0852,0.6696,0.6695);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#279FC9").s().p("Ah5BYIAWilQB3ACBmgMIgRCWQhHAMhTAIIhFAFg");
	this.shape_17.setTransform(236.342,137.5539,0.6696,0.6695);

	this.instance_3 = new lib.Path_0_1();
	this.instance_3.setTransform(161.7,133.35,0.6696,0.6695,0,0,0,16.6,10.4);
	this.instance_3.alpha = 0.6016;
	this.instance_3.compositeOperation = "multiply";

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#279FC9").s().p("AjdAaIgch6QAxALA0AGQCeAbBIABQAyABAYgNQAagOAfgXIgJA1IAcglIABAOIgDAZIAGABIAOCRQkOgZjJgyg");
	this.shape_18.setTransform(155.4672,133.3192,0.6696,0.6695);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F9CA67").s().p("AgBgEIADgFIgCATg");
	this.shape_19.setTransform(171.1198,127.9464,0.6696,0.6695);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F9CA67").s().p("AgCAMIACgYIADAZg");
	this.shape_20.setTransform(171.0696,129.4695,0.6696,0.6695);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#03507F").s().p("AgOA0Igah2QAUAFAiAHIAcB6g");
	this.shape_21.setTransform(137.816,130.5128,0.6697,0.6696);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#279FC9").s().p("AhjAVQgWglgWg2IgSguIAYAAQAbABARAFIgUASIA4AdQBOAjBxAXIAcB6Qilgqhgg2g");
	this.shape_22.setTransform(129.7624,127.2319,0.6697,0.6696);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#03507F").s().p("AAMBWQgUhhghhOIAtAFIAlCug");
	this.shape_23.setTransform(93.476,110.8572,0.6696,0.6695);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#279FC9").s().p("ACoCSQhQgJhYgYIhGgVQAGgUgJgnQgVhPhShkQA1AXEHBgIAlCug");
	this.shape_24.setTransform(84.4025,107.0409,0.6696,0.6695);

	this.instance_4 = new lib.Path_2_0_1();
	this.instance_4.setTransform(116.9,114.25,0.6696,0.6695,0,0,0,7.9,8.3);
	this.instance_4.alpha = 0.6016;
	this.instance_4.compositeOperation = "multiply";

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#279FC9").s().p("ABJBiQhygLiBgSIgmivQAqADAYgBQgSAQgJAQIgFANIAngPQAsgQAbgBQgSANgFAQQgCAIABAGIA6gHQBYgCCXATIgjBSIgBAqQAAALgGAJIhegIg");
	this.shape_25.setTransform(107.7224,112.2966,0.6696,0.6695);

	this.instance_5 = new lib.Path_8();
	this.instance_5.setTransform(288.75,106.8,0.6696,0.6695,0,0,0,17.8,8.1);
	this.instance_5.alpha = 0.6016;
	this.instance_5.compositeOperation = "multiply";

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#279FC9").s().p("AjPACQDBghBlgjQCBguAbgMQggBigOAhIm3B2QAGg5AdhCg");
	this.shape_26.setTransform(283.7687,109.8696,0.6696,0.6695);

	this.instance_6 = new lib.Path_2_2();
	this.instance_6.setTransform(258.2,115.6,0.6696,0.6695,0,0,0,8,5.7);
	this.instance_6.alpha = 0.6016;
	this.instance_6.compositeOperation = "multiply";

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#03507F").s().p("Ah6AGIC3hBIA+gKQgdBCgGA4Ig/ARg");
	this.shape_27.setTransform(261.5871,114.6901,0.6696,0.6695);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.instance_6},{t:this.shape_26},{t:this.instance_5},{t:this.shape_25},{t:this.instance_4},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.instance_3},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.instance_2},{t:this.shape_14},{t:this.instance_1},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.instance},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.instance_7 = new lib.oilSplash();
	this.instance_7.setTransform(55.6,83.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_1
	this.instance_8 = new lib.miner_1();
	this.instance_8.setTransform(-115,13.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Isolation_Mode
	this.instance_9 = new lib.bird();
	this.instance_9.setTransform(306.25,-127.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_1
	this.instance_10 = new lib.flash0ai();
	this.instance_10.setTransform(-301.1,-168.6,0.3441,0.3441);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bgAnimation1, new cjs.Rectangle(-301.1,-168.6,621.1,337.29999999999995), null);


(lib.ClipGroupcopy4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOg");
	mask.setTransform(169.85,37.0345);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1E8FA").s().p("AggAxIABgCQAogOALgZQAMgZgZgdIAAgCQABAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAABQAVAQACAPQADAOgIANQgQAcgqAMIgBAAIAAgBg");
	this.shape.setTransform(225.0097,52.8979);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C1E8FA").s().p("ABWBXQgMgVgHgIQgNgMgOgHIgrgTQgbgLgRgJQgTgIgIgIQgNgMgBgOQAAgOAMgMIAZgSIAAAAIgMALQgIAHgDAFQgJAPAMANQAJAKATAJIAfAPIAlAVQAWAMAKAHQAXASAJAcIgDACIAAAAg");
	this.shape_1.setTransform(216.699,42.7225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8ED7F7").s().p("AhtAjIgVgDQgMgBgJAEQAAABgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQANgIAUAAQANgBAWADIANABIgJgLQgBgDAGgEQASgIAlADIAbAEIAcADIA1AEQAPACAPgCIgLAAIgmgEQgfgEgqgIQgSgDgEgGQgFgHAIgHQAGgGAMgDIAUgEQABAAAAAAQAAAAAAABQAAAAgBAAQAAABgBAAIgTAHIgJADQgFADAEACQAHAFALACIAUADQAbAFA1AFIAbABQARABAFAFQACADgEAFQgDADgEACQgSAIghgCIg4gGIg0gGIgZgDQgQgBgKADQALAIABADQADAEgGAFQgFAEgGABIgPACQgMAAgOgEg");
	this.shape_2.setTransform(72.2689,24.6639);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C1E8FA").s().p("AjGAhQBKgTCEgNQA7gGAzgHIArgIQAZgFAMgIQAEgCgDADQgLAMgXAGIgnAIQg5AKg0AFIhsAKQg/AGgsAKQgBAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBg");
	this.shape_3.setTransform(253.5321,32.785);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C1E8FA").s().p("AhxA3QAAAAABgBQAAAAABgBQAAAAAAAAQABgBAAAAIBNgMQAugHAegIQAVgGAPgHIAPgIQAHgFACgHQAEgVgggaIACgCQAqAXgFAXQgDAOgTALQgLAIgXAIQgjANgxAGIhXAJQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBg");
	this.shape_4.setTransform(269.7069,29.37);

	this.instance = new lib.Path_5copy4();
	this.instance.setTransform(286.7,8.6,1,1,0,0,0,8.3,2.1);
	this.instance.alpha = 0.5;

	this.instance_1 = new lib.Path_6copy4();
	this.instance_1.setTransform(246.4,8.7,1,1,0,0,0,0.8,1.1);
	this.instance_1.alpha = 0.5;

	this.instance_2 = new lib.CompoundPathcopy2();
	this.instance_2.setTransform(249.95,8.85,1,1,0,0,0,1.7,2.5);
	this.instance_2.alpha = 0.5;

	this.instance_3 = new lib.CompoundPath_1copy2();
	this.instance_3.setTransform(268.7,11.75,1,1,0,0,0,16.8,6.2);
	this.instance_3.alpha = 0.5;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C1E8FA").s().p("AANArQgNgDgKgNQgKgMAAgNQgBgcAZgQQADgBgCACQgVASAKAXQADAIAIALIAQARQACACgEADQgCACgDAAIgBAAg");
	this.shape_5.setTransform(153.3359,52.9844);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C1E8FA").s().p("Ah1BxQgLgTAOgXQAMgSAXgOQAVgNAhgMIA4gSQAegKASgKQAYgNACgNQAEgXgWgQQgOgLgegKQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAkAIANAGQAZANAEATQAFAjhBAcQgUAIgkALQgpAMgPAGQggAMgSARQgZAXALAZIgCACIgBAAIgBAAg");
	this.shape_6.setTransform(160.792,42.6583);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C1E8FA").s().p("AAJAhQgKgEgHgJQgIgJABgKQAAgTAVgPQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQgQAPAGARQACAHAFAHIAMANQAAAAAAABQAAAAAAABQAAABAAAAQgBABgBAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgBgBg");
	this.shape_7.setTransform(224.1348,40.2625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#C1E8FA").s().p("AhEAuQgPgKgDgLQgDgJAKgOQAOgTAkgMQAtgPBHgCQAAAAAAAAQAAABAAAAQAAAAAAABQgBAAgBABQhBAHgtAQQgQAFgJAGIgJAGIgEADQgJAOAKAcQABAAAAABQAAAAgBAAQAAABAAAAQgBABgBAAIgDACIgBgBg");
	this.shape_8.setTransform(236.164,40.9667);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#C1E8FA").s().p("AhBANQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBIADgDQAZgFAygEIAdgEQAPgCAIgEQABAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAQgGAIgRAEIgcAFQgoAHgeAAIgLAAg");
	this.shape_9.setTransform(138.9306,16.655);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#5CCAF3").s().p("AgKAHQgSgEAFgKQAAgBAAAAQAAgBAAAAQABAAAAAAQAAAAABABQAJAEAMADIAYABQAFABgMAIIgJABQgIAAgKgDg");
	this.shape_10.setTransform(62.996,26.6802);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#5CCAF3").s().p("Ag5AcQgbgGgGgJQgEgGAEgHQADgGAHgGQANgKAXgGIATgFIADACIACAAIgNAHIgdAOQgMAIAAAIQAAAHAMAFQAMAEARACIAfACQAqADA1gBIgcACIg9AEQgiAAgbgGg");
	this.shape_11.setTransform(75.925,23.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#5CCAF3").s().p("AAAAVQgegEgIgIQgGgFADgHQADgGAIgEQAGgEAbgGQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAgBAAIgBACIgPAEQgJADgGADQgKAHAUAIQASAGApAGQABAAAAABQABAAAAAAQAAABgBAAQAAABgBABQgDADgCAAg");
	this.shape_12.setTransform(136.5625,23.3188);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#5CCAF3").s().p("AgJAVQgdgBgNgDQgJgCgEgGQgFgHAGgGQAGgIAXgKQABAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgBABIgOAIQgJAGAEAGQAFAFAXACQA9ADAeAEQABAAAAABQAAAAAAABQAAAAAAABQgBAAgBABQgEAEgCAAIgZABIgrgCg");
	this.shape_13.setTransform(186.818,26.2198);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#5CCAF3").s().p("AgcAZQgBgDAEgDQAJgHAUgLQAJgFADgFQADgFADgLQAAgBABAAQAAAAAAAAQABgBAAAAQAAAAABAAQADACABAFQABAEgBAEQgEAJgJAHQgPAOgYAJIgDABQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_14.setTransform(240.7419,15.9564);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#8ED7F7").s().p("AhDBwQgugJgJgBQhpgGg0gGQgBAAAAAAQgBgBAAAAQAAgBABAAQAAgBABgBQADgDACAAIA4gIQAhgFAWAAIAPABQgKgFgFgIQgCgCADgEQACgCAEgCQAMgGAUABIAiADIBBgBIALAAIgcgEQhJgNgpgTQgEgBAFgFQAFgDADAAQAoAGBSAGQgygIgggJQgzgPgSgKQgngVABgeIACgCIABAAQAIAaAqATQAeANArALIAJACQgdgIgQgFQgdgLgSgOQgRgNgCgPIABgJQgDgPAPgLQAHgEAAAEQACAIACARQACAOAIAJQALAOAdAMQAQAHAYAGIAoAIIBFANQBCAJA7ACIA6gCQAkgCAUAHQAHACACADQACAEgEADQgEAEgIABQgSADgbABIgtAAIgaAAQAKACAGADQAFACgFAGQgDAEgEACQgaAMgtABIgogBIgJgBIgfACQgCACgEABIgCAAQAYADALAKQADADgGAFQgEAEgEABQgTAGgZgDQAKAFAHAFQACACgEAEQgFAFgDAAQgIABgJAAQgQAAgWgEg");
	this.shape_15.setTransform(106.8865,12.8977);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C1E8FA").s().p("AALAJQgUgGgGgKIAAgBIACgBQAFAEAJAEIAPAFQAAABABAAQAAAAAAABQgBAAAAABQAAAAgBABIgDACIgBgBg");
	this.shape_16.setTransform(101.7448,4.806);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C1E8FA").s().p("AAfAdQgngFgRgGQgggJgKgLQgFgHACgIQACgIAIgGQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAgBABQgLAPAYAMQAGADAhAKQAkAMAqAGQACAAgFAEQgQAAgVgDg");
	this.shape_17.setTransform(111.425,4.93);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#C1E8FA").s().p("AlxBmQgeAAgHgBQgagDABgNQABgMAXgCIAhgBQAmAABNgKIAxgFQAegEASgJQAKgFgIgFQgGgDgKgCIgYgCQgQgBgGgEQgPgLAhgGQAbgFAOABQCpAFCJgXQBNgNAlgLQAkgLAPgGQAfgNALgQIABAAIABgCIAKgHQAOgHADAHQAEALgQAOQgIAGgVAKIgjARQgYALgZAIIgTAGIgPAEQgTAFgCAGQAAAAgBABQAAAAAAAAQABAAAAAAQAAAAAAAAQALAGAZgFQAXgEAYgHQAcgHAZgIQAWgHAIgDIAVgJIAPgKQAVgOAHAFQAHAFgNANQgUATgjAQQgbALgfAJIgYAHIgOAGQAegBApgQIAngMQAXgHARAAQAEgBgBAEQgCAEgCABQgSAQggALQgUAHgkAIIhEAOQgmAGggABQgEABADgEQADgEACgBIA4gWIgLADQhMARgmAGQgjAGgXAAQgOAAgogDQgEgBADgFIAEgGQAKgHATgDIAfgFIBLgQIArgKIg1AKQhAALhMAFQgwADgZgBQgNAAgQgCQgOgCgIABIAOAHQAHAFgGAGQgFAGgMADIgUADIgIAEIABAAQADACALADIAPACQAKACAEAEQADABgFAFQgLAKgVADIgjACQhFAFhCAAIgrgBg");
	this.shape_18.setTransform(186.5185,14.0435);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#5CCAF3").s().p("AidB5IgDgBQgKgCgGgDQgKgEARgHQAPgFAbgEIArgIQATgEANgFQASgIAGgJQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQgIgEgOACIggAGQg3ALghABQgJAAgLgBIgGgDQAAAAAAgBQgBAAABAAQAAgBAAAAQABgBAAAAIAEgDQAGgDAZgGIAbgIQAQgGAGgKIAAgBQgIgCgLACIgUAEIg2AJQg/AKgzACIghACQgTABgOgCQgYgDAEgMQAGgHARgDQAagGAxgBQA4gCATgDQBlgMBdgbQA3gRAMgFQApgTADgcQAAgEgCgJIgEgPIACgEQADgFAFAIQAKALgCASQgCARgQARIgeAbIAAABIAAABQAGABANgDQAMgEAHACQgGALgQAHIgcAKQgNAEgIAEIgGAFIAAABQgCADACADQACACAHABQAGACAOAAQANAAAMgBIAMAAQAOABAGADQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQgCAFgQAHIgWAIQgQAEgHAEQgBAAAAAAQgBAAAAABQAAAAABAAQAAAAABAAQAfAHAtgWQAagNATgPQAagVALgHQAQgJAHABQABAEgEAGQgMARgcASQgOAJgUAJIgkAOIAFAAIArgJQAWgGAOADQAAAAABAAQAAAAAAABQABAAAAABQAAABgBABQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABIgJAIIADgBQAggMARgDIABgBQAagJAPgLQAUgPAPgGQAGgDAHABQAIAAABAGQAAAJgNALQgIAHgSAMIgGAEQAUgCAfgPQAjgPAQgDQAFgBgCADQgEALgOAJQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgFAHgKAHIgJAGQANACAXgJQAYgJANgBQAEAAgCAEQgHARghAOQgdANgdACQgLACgKgCQgPgDADgJQACgHAIgEIAQgGIAAgBIgPADQgiANgjAIQgYAGgGABQgWABAGgPQAFgKAUgJIAKgFIgHADQgaAIgmAJQgSAIgmALQhHAQg5AGQgqADgeAAQgVAAgPgBg");
	this.shape_19.setTransform(228.3232,18.9956);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E2F4FC").s().p("AiGAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAABgBIACgBQBEAFBDgCQAhAABjgGQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAgBABIgDACQg5AGhNABIgSAAQg+AAg0gGg");
	this.shape_20.setTransform(167.725,3.8063);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E2F4FC").s().p("AhNAPQizgJhpgVQABgBAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQBEAMBTAFQBCADBQACQBdADAvAAQBUAAA7gFQAdgCAogEIBEgIQAGgBgKAJQg9AOhZAFQg2AEhEAAQhIAAhYgEg");
	this.shape_21.setTransform(164.1008,5.6279);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E2F4FC").s().p("AgvArQhHgBhMgJIhIgKIgigGQhAgGgygLQgigHgYgJQgegJgQgQIADgCQAPAKAhAJIAxALQA7ANBCAEQBSAHCmAFQChAFB6gIQCYgLB/ghQAFgCgIAJIhFASIgCABQgdAHhAANQhFAOgfAEQgiAGgpACIhKADIhHAAIhNgBg");
	this.shape_22.setTransform(166.5089,7.37);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#00B0E6").s().p("AlaEAQAKgMAAgMQgBgJgJgKQgIgJgRgJIgbgQQg0geARgcQAPgaA9gMQAlgJBEgFIBpgIQBGgGAlgFQAngEA8gNQAbgGAUgHQBHgXgRgeQgIgOgZgKQgMgFgmgLQghgKgVgKQgZgMgJgQQgGgMAEgMQAEgMAKgIQATgPAtgHQAjgFA+gHQBEgHAdgFIAmgGIAbgDQAmgHATgLQAMgGAFgKQAHgKgGgKIgFgIIASABQARAIAGAKQAHAMgJAPQgIANgOAJQgWAQgoAKQgLADg2AGQhkAJguAKQhzAXAlAlQAIAHAnAJIBKAQQBfAYgZAnQgQAXgsAKQgRAEg4AGQigATicAOQhDADgvAEQhaAJgMAYQgHANALARQAJAPAPAIQAOAIAvAPQAlARgNAbQgPAihBASQAWgMANgPg");
	this.shape_23.setTransform(274.9172,30.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#00B0E6").s().p("Ag5BCQiUgjAvhKQATgeA4gPIgEACQgbAOgMALQgUARAAAUQAAAXAXAVQAUATAkANQAdALAmAHQAXAEAsAGQAuAFA5AEQiQgEhTgTg");
	this.shape_24.setTransform(156.4571,52.325);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AIfCYQhHgXmmABQjWABj1AFQhEABgXgDQg7gHgWgZQgYgcA6gXQAWgKA7gNQAlgIBegRIA4gIQAjgIAOgQQAOgSgPgSQgXgUgJgKQgLgMAEgPQADgNAMgMQAQgQAcgLIAJAAQgjASgIAZQgHATASAUQALAKAYAUQAVASgLAQQgHAJgUAKQgOAHgdAFIgtAIIgwALQg9APguAOQgnAKgSAIQghAOAIAQQAFAIAPAFQAJAEAUAFQAiAHAuABIA3gCIA3gCIBzgEIDlgGIByAAIBzADIBwABQBBACAwAIQA0AJAZARQAMAJAEALQgNgNghgKg");
	this.shape_25.setTransform(105.4966,17.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#5CCAF3").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLIBmABQgVARgDARQgEAYAoAOQAeAMBBAHIBPAFQAgACBAAHIBsAKIBUAIQAzAFARADQARADAOAGQAaANgIAFQgTAPgqAJQgeAGgrACIhJADQglACgvAFQg/AHgZANQgPAIAFALQAFAKAQAGQAWAIAxACIBcAIQAuAEA9ADIBqAFIDLALQBAACAcAEQA1AFAkAQQAOAFAEAHQAHAJgJAKQgHAHgNAGIgYALIgxASQg0AUgaAIQh1AlgkANQgcALgOAIQgXAOgDASQgCAQAXAOQAUAMAuAKQBFAQCBAHQBaAFBRABIBNgBIBJgDQAogCAggGQAigGAcgNQAigPAGgUQAIgRgVgYQgQgSgkgVQgOgIghgQQgggOgPgKQgdgTABgSQABgYAqgNQAWgHAxgFIBTgJIDGgQQA3gEAbgEQA/gIAfgOQAQgHAFgLQAIgMgIgNQgLgVgfgQQgRgIgogNQg1gQgqgMIg5gPQgfgKgUgNQgUgMAHgPQAGgKAWgIQAVgHAegDQAPgBAlgBQAhgBBAACQAzACBogBIBfgEQAzgBAigDQArgEAfgMIACgBIBjABQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_26.setTransform(182.6498,30.908);

	this.instance_4 = new lib.Path_29copy2();
	this.instance_4.setTransform(167.6,6.15,1,1,0,0,0,55.8,5.8);
	this.instance_4.alpha = 0.3984;
	this.instance_4.compositeOperation = "screen";

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLMAkNAAaQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_27.setTransform(182.6498,30.908);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.instance,this.instance_1,this.instance_2,this.instance_3,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.instance_4,this.shape_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.instance_4},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroupcopy4, new cjs.Rectangle(46.6,2.2,272.09999999999997,59.599999999999994), null);


(lib.ClipGroupcopy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AijOKIAA8UIAcAAQB8AABXBZQBYBXAAB9IAAXng");
	mask.setTransform(76.225,90.65);

	// Layer_3
	this.instance = new lib.Path_7copy();
	this.instance.setTransform(38.5,107.1,1,1,0,0,0,12.8,107.1);
	this.instance.alpha = 0.3008;

	this.instance_1 = new lib.Path_1_1copy();
	this.instance_1.setTransform(89.85,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_1.alpha = 0.3008;

	this.instance_2 = new lib.Path_2_1copy3();
	this.instance_2.setTransform(90,180.4,1,1,0,0,0,89.7,12.4);
	this.instance_2.alpha = 0.3008;

	this.instance_3 = new lib.Path_3_1copy();
	this.instance_3.setTransform(90,132.4,1,1,0,0,0,89.7,12.4);
	this.instance_3.alpha = 0.3008;

	this.instance_4 = new lib.Path_4_1copy();
	this.instance_4.setTransform(90,84.4,1,1,0,0,0,89.7,12.4);
	this.instance_4.alpha = 0.3008;

	this.instance_5 = new lib.Path_5_1copy();
	this.instance_5.setTransform(90,36.4,1,1,0,0,0,89.7,12.4);
	this.instance_5.alpha = 0.3008;

	this.instance_6 = new lib.Path_6_1copy();
	this.instance_6.setTransform(141.2,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_6.alpha = 0.3008;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D9685F").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape.setTransform(89.875,107.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5C192").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_1.setTransform(89.875,107.1);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroupcopy3, new cjs.Rectangle(59.8,0,32.900000000000006,181.3), null);


(lib.ClipGroup_1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AijOKIAA3nQAAh9BYhXQBXhZB8AAIAcAAIAAcUg");
	mask.setTransform(103.525,90.65);

	// Layer_3
	this.instance = new lib.Path_0copy3();
	this.instance.setTransform(141.2,107.1,1,1,0,0,0,12.8,107.1);
	this.instance.alpha = 0.3008;

	this.instance_1 = new lib.Path_1_0copy();
	this.instance_1.setTransform(89.85,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_1.alpha = 0.3008;

	this.instance_2 = new lib.Path_2_0copy3();
	this.instance_2.setTransform(89.8,180.4,1,1,0,0,0,89.8,12.4);
	this.instance_2.alpha = 0.3008;

	this.instance_3 = new lib.Path_3_0copy();
	this.instance_3.setTransform(89.8,132.4,1,1,0,0,0,89.8,12.4);
	this.instance_3.alpha = 0.3008;

	this.instance_4 = new lib.Path_4_0copy();
	this.instance_4.setTransform(89.8,84.4,1,1,0,0,0,89.8,12.4);
	this.instance_4.alpha = 0.3008;

	this.instance_5 = new lib.Path_5_0copy();
	this.instance_5.setTransform(89.8,36.4,1,1,0,0,0,89.8,12.4);
	this.instance_5.alpha = 0.3008;

	this.instance_6 = new lib.Path_6_0copy();
	this.instance_6.setTransform(38.5,107.1,1,1,0,0,0,12.8,107.1);
	this.instance_6.alpha = 0.3008;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D9685F").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape.setTransform(89.875,107.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5C192").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_1.setTransform(89.875,107.1);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6,this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1copy, new cjs.Rectangle(87.1,0,32.900000000000006,181.3), null);


(lib.ClipGroup_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_3 = new cjs.Shape();
	mask_3._off = true;
	mask_3.graphics.p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOg");
	mask_3.setTransform(169.85,37.0345);

	// Layer_3
	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#C1E8FA").s().p("AggAxIABgCQAogOALgZQAMgZgZgdIAAgCQABAAAAAAQAAgBAAAAQAAAAAAAAQABAAAAABQAVAQACAPQADAOgIANQgQAcgqAMIgBAAIAAgBg");
	this.shape_58.setTransform(225.0097,52.8979);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#C1E8FA").s().p("ABWBXQgMgVgHgIQgNgMgOgHIgrgTQgbgLgRgJQgTgIgIgIQgNgMgBgOQAAgOAMgMIAZgSIAAAAIgMALQgIAHgDAFQgJAPAMANQAJAKATAJIAfAPIAlAVQAWAMAKAHQAXASAJAcIgDACIAAAAg");
	this.shape_59.setTransform(216.699,42.7225);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#8ED7F7").s().p("AhtAjIgVgDQgMgBgJAEQAAABgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQANgIAUAAQANgBAWADIANABIgJgLQgBgDAGgEQASgIAlADIAbAEIAcADIA1AEQAPACAPgCIgLAAIgmgEQgfgEgqgIQgSgDgEgGQgFgHAIgHQAGgGAMgDIAUgEQABAAAAAAQAAAAAAABQAAAAgBAAQAAABgBAAIgTAHIgJADQgFADAEACQAHAFALACIAUADQAbAFA1AFIAbABQARABAFAFQACADgEAFQgDADgEACQgSAIghgCIg4gGIg0gGIgZgDQgQgBgKADQALAIABADQADAEgGAFQgFAEgGABIgPACQgMAAgOgEg");
	this.shape_60.setTransform(72.2689,24.6639);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#C1E8FA").s().p("AjGAhQBKgTCEgNQA7gGAzgHIArgIQAZgFAMgIQAEgCgDADQgLAMgXAGIgnAIQg5AKg0AFIhsAKQg/AGgsAKQgBAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBg");
	this.shape_61.setTransform(253.5321,32.785);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#C1E8FA").s().p("AhxA3QAAAAABgBQAAAAABgBQAAAAAAAAQABgBAAAAIBNgMQAugHAegIQAVgGAPgHIAPgIQAHgFACgHQAEgVgggaIACgCQAqAXgFAXQgDAOgTALQgLAIgXAIQgjANgxAGIhXAJQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBg");
	this.shape_62.setTransform(269.7069,29.37);

	this.instance_17 = new lib.Path_5_4();
	this.instance_17.setTransform(286.7,8.6,1,1,0,0,0,8.3,2.1);
	this.instance_17.alpha = 0.5;

	this.instance_18 = new lib.Path_6_4();
	this.instance_18.setTransform(246.4,8.7,1,1,0,0,0,0.8,1.1);
	this.instance_18.alpha = 0.5;

	this.instance_19 = new lib.CompoundPath_3();
	this.instance_19.setTransform(249.95,8.85,1,1,0,0,0,1.7,2.5);
	this.instance_19.alpha = 0.5;

	this.instance_20 = new lib.CompoundPath_1_2();
	this.instance_20.setTransform(268.7,11.75,1,1,0,0,0,16.8,6.2);
	this.instance_20.alpha = 0.5;

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#C1E8FA").s().p("AANArQgNgDgKgNQgKgMAAgNQgBgcAZgQQADgBgCACQgVASAKAXQADAIAIALIAQARQACACgEADQgCACgDAAIgBAAg");
	this.shape_63.setTransform(153.3359,52.9844);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#C1E8FA").s().p("Ah1BxQgLgTAOgXQAMgSAXgOQAVgNAhgMIA4gSQAegKASgKQAYgNACgNQAEgXgWgQQgOgLgegKQAAgBAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAkAIANAGQAZANAEATQAFAjhBAcQgUAIgkALQgpAMgPAGQggAMgSARQgZAXALAZIgCACIgBAAIgBAAg");
	this.shape_64.setTransform(160.792,42.6583);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#C1E8FA").s().p("AAJAhQgKgEgHgJQgIgJABgKQAAgTAVgPQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQgQAPAGARQACAHAFAHIAMANQAAAAAAABQAAAAAAABQAAABAAAAQgBABgBAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAIgBgBg");
	this.shape_65.setTransform(224.1348,40.2625);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#C1E8FA").s().p("AhEAuQgPgKgDgLQgDgJAKgOQAOgTAkgMQAtgPBHgCQAAAAAAAAQAAABAAAAQAAAAAAABQgBAAgBABQhBAHgtAQQgQAFgJAGIgJAGIgEADQgJAOAKAcQABAAAAABQAAAAgBAAQAAABAAAAQgBABgBAAIgDACIgBgBg");
	this.shape_66.setTransform(236.164,40.9667);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#C1E8FA").s().p("AhBANQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBIADgDQAZgFAygEIAdgEQAPgCAIgEQABAAAAAAQABAAAAAAQAAAAAAAAQAAABAAAAQgGAIgRAEIgcAFQgoAHgeAAIgLAAg");
	this.shape_67.setTransform(138.9306,16.655);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#5CCAF3").s().p("AgKAHQgSgEAFgKQAAgBAAAAQAAgBAAAAQABAAAAAAQAAAAABABQAJAEAMADIAYABQAFABgMAIIgJABQgIAAgKgDg");
	this.shape_68.setTransform(62.996,26.6802);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#5CCAF3").s().p("Ag5AcQgbgGgGgJQgEgGAEgHQADgGAHgGQANgKAXgGIATgFIADACIACAAIgNAHIgdAOQgMAIAAAIQAAAHAMAFQAMAEARACIAfACQAqADA1gBIgcACIg9AEQgiAAgbgGg");
	this.shape_69.setTransform(75.925,23.975);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#5CCAF3").s().p("AAAAVQgegEgIgIQgGgFADgHQADgGAIgEQAGgEAbgGQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAgBAAIgBACIgPAEQgJADgGADQgKAHAUAIQASAGApAGQABAAAAABQABAAAAAAQAAABgBAAQAAABgBABQgDADgCAAg");
	this.shape_70.setTransform(136.5625,23.3188);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#5CCAF3").s().p("AgJAVQgdgBgNgDQgJgCgEgGQgFgHAGgGQAGgIAXgKQABAAAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgBABIgOAIQgJAGAEAGQAFAFAXACQA9ADAeAEQABAAAAABQAAAAAAABQAAAAAAABQgBAAgBABQgEAEgCAAIgZABIgrgCg");
	this.shape_71.setTransform(186.818,26.2198);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#5CCAF3").s().p("AgcAZQgBgDAEgDQAJgHAUgLQAJgFADgFQADgFADgLQAAgBABAAQAAAAAAAAQABgBAAAAQAAAAABAAQADACABAFQABAEgBAEQgEAJgJAHQgPAOgYAJIgDABQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_72.setTransform(240.7419,15.9564);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#8ED7F7").s().p("AhDBwQgugJgJgBQhpgGg0gGQgBAAAAAAQgBgBAAAAQAAgBABAAQAAgBABgBQADgDACAAIA4gIQAhgFAWAAIAPABQgKgFgFgIQgCgCADgEQACgCAEgCQAMgGAUABIAiADIBBgBIALAAIgcgEQhJgNgpgTQgEgBAFgFQAFgDADAAQAoAGBSAGQgygIgggJQgzgPgSgKQgngVABgeIACgCIABAAQAIAaAqATQAeANArALIAJACQgdgIgQgFQgdgLgSgOQgRgNgCgPIABgJQgDgPAPgLQAHgEAAAEQACAIACARQACAOAIAJQALAOAdAMQAQAHAYAGIAoAIIBFANQBCAJA7ACIA6gCQAkgCAUAHQAHACACADQACAEgEADQgEAEgIABQgSADgbABIgtAAIgaAAQAKACAGADQAFACgFAGQgDAEgEACQgaAMgtABIgogBIgJgBIgfACQgCACgEABIgCAAQAYADALAKQADADgGAFQgEAEgEABQgTAGgZgDQAKAFAHAFQACACgEAEQgFAFgDAAQgIABgJAAQgQAAgWgEg");
	this.shape_73.setTransform(106.8865,12.8977);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#C1E8FA").s().p("AALAJQgUgGgGgKIAAgBIACgBQAFAEAJAEIAPAFQAAABABAAQAAAAAAABQgBAAAAABQAAAAgBABIgDACIgBgBg");
	this.shape_74.setTransform(101.7448,4.806);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#C1E8FA").s().p("AAfAdQgngFgRgGQgggJgKgLQgFgHACgIQACgIAIgGQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAgBABQgLAPAYAMQAGADAhAKQAkAMAqAGQACAAgFAEQgQAAgVgDg");
	this.shape_75.setTransform(111.425,4.93);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#C1E8FA").s().p("AlxBmQgeAAgHgBQgagDABgNQABgMAXgCIAhgBQAmAABNgKIAxgFQAegEASgJQAKgFgIgFQgGgDgKgCIgYgCQgQgBgGgEQgPgLAhgGQAbgFAOABQCpAFCJgXQBNgNAlgLQAkgLAPgGQAfgNALgQIABAAIABgCIAKgHQAOgHADAHQAEALgQAOQgIAGgVAKIgjARQgYALgZAIIgTAGIgPAEQgTAFgCAGQAAAAgBABQAAAAAAAAQABAAAAAAQAAAAAAAAQALAGAZgFQAXgEAYgHQAcgHAZgIQAWgHAIgDIAVgJIAPgKQAVgOAHAFQAHAFgNANQgUATgjAQQgbALgfAJIgYAHIgOAGQAegBApgQIAngMQAXgHARAAQAEgBgBAEQgCAEgCABQgSAQggALQgUAHgkAIIhEAOQgmAGggABQgEABADgEQADgEACgBIA4gWIgLADQhMARgmAGQgjAGgXAAQgOAAgogDQgEgBADgFIAEgGQAKgHATgDIAfgFIBLgQIArgKIg1AKQhAALhMAFQgwADgZgBQgNAAgQgCQgOgCgIABIAOAHQAHAFgGAGQgFAGgMADIgUADIgIAEIABAAQADACALADIAPACQAKACAEAEQADABgFAFQgLAKgVADIgjACQhFAFhCAAIgrgBg");
	this.shape_76.setTransform(186.5185,14.0435);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#5CCAF3").s().p("AidB5IgDgBQgKgCgGgDQgKgEARgHQAPgFAbgEIArgIQATgEANgFQASgIAGgJQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAQgIgEgOACIggAGQg3ALghABQgJAAgLgBIgGgDQAAAAAAgBQgBAAABAAQAAgBAAAAQABgBAAAAIAEgDQAGgDAZgGIAbgIQAQgGAGgKIAAgBQgIgCgLACIgUAEIg2AJQg/AKgzACIghACQgTABgOgCQgYgDAEgMQAGgHARgDQAagGAxgBQA4gCATgDQBlgMBdgbQA3gRAMgFQApgTADgcQAAgEgCgJIgEgPIACgEQADgFAFAIQAKALgCASQgCARgQARIgeAbIAAABIAAABQAGABANgDQAMgEAHACQgGALgQAHIgcAKQgNAEgIAEIgGAFIAAABQgCADACADQACACAHABQAGACAOAAQANAAAMgBIAMAAQAOABAGADQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAAAABQgCAFgQAHIgWAIQgQAEgHAEQgBAAAAAAQgBAAAAABQAAAAABAAQAAAAABAAQAfAHAtgWQAagNATgPQAagVALgHQAQgJAHABQABAEgEAGQgMARgcASQgOAJgUAJIgkAOIAFAAIArgJQAWgGAOADQAAAAABAAQAAAAAAABQABAAAAABQAAABgBABQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABIgJAIIADgBQAggMARgDIABgBQAagJAPgLQAUgPAPgGQAGgDAHABQAIAAABAGQAAAJgNALQgIAHgSAMIgGAEQAUgCAfgPQAjgPAQgDQAFgBgCADQgEALgOAJQAAAAAAABQAAABAAAAQAAABAAAAQgBABAAAAQgFAHgKAHIgJAGQANACAXgJQAYgJANgBQAEAAgCAEQgHARghAOQgdANgdACQgLACgKgCQgPgDADgJQACgHAIgEIAQgGIAAgBIgPADQgiANgjAIQgYAGgGABQgWABAGgPQAFgKAUgJIAKgFIgHADQgaAIgmAJQgSAIgmALQhHAQg5AGQgqADgeAAQgVAAgPgBg");
	this.shape_77.setTransform(228.3232,18.9956);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#E2F4FC").s().p("AiGAAQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAABgBIACgBQBEAFBDgCQAhAABjgGQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAgBABIgDACQg5AGhNABIgSAAQg+AAg0gGg");
	this.shape_78.setTransform(167.725,3.8063);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#E2F4FC").s().p("AhNAPQizgJhpgVQABgBAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQBEAMBTAFQBCADBQACQBdADAvAAQBUAAA7gFQAdgCAogEIBEgIQAGgBgKAJQg9AOhZAFQg2AEhEAAQhIAAhYgEg");
	this.shape_79.setTransform(164.1008,5.6279);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#E2F4FC").s().p("AgvArQhHgBhMgJIhIgKIgigGQhAgGgygLQgigHgYgJQgegJgQgQIADgCQAPAKAhAJIAxALQA7ANBCAEQBSAHCmAFQChAFB6gIQCYgLB/ghQAFgCgIAJIhFASIgCABQgdAHhAANQhFAOgfAEQgiAGgpACIhKADIhHAAIhNgBg");
	this.shape_80.setTransform(166.5089,7.37);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#00B0E6").s().p("AlaEAQAKgMAAgMQgBgJgJgKQgIgJgRgJIgbgQQg0geARgcQAPgaA9gMQAlgJBEgFIBpgIQBGgGAlgFQAngEA8gNQAbgGAUgHQBHgXgRgeQgIgOgZgKQgMgFgmgLQghgKgVgKQgZgMgJgQQgGgMAEgMQAEgMAKgIQATgPAtgHQAjgFA+gHQBEgHAdgFIAmgGIAbgDQAmgHATgLQAMgGAFgKQAHgKgGgKIgFgIIASABQARAIAGAKQAHAMgJAPQgIANgOAJQgWAQgoAKQgLADg2AGQhkAJguAKQhzAXAlAlQAIAHAnAJIBKAQQBfAYgZAnQgQAXgsAKQgRAEg4AGQigATicAOQhDADgvAEQhaAJgMAYQgHANALARQAJAPAPAIQAOAIAvAPQAlARgNAbQgPAihBASQAWgMANgPg");
	this.shape_81.setTransform(274.9172,30.875);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#00B0E6").s().p("Ag5BCQiUgjAvhKQATgeA4gPIgEACQgbAOgMALQgUARAAAUQAAAXAXAVQAUATAkANQAdALAmAHQAXAEAsAGQAuAFA5AEQiQgEhTgTg");
	this.shape_82.setTransform(156.4571,52.325);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#2C3E50").s().p("AIfCYQhHgXmmABQjWABj1AFQhEABgXgDQg7gHgWgZQgYgcA6gXQAWgKA7gNQAlgIBegRIA4gIQAjgIAOgQQAOgSgPgSQgXgUgJgKQgLgMAEgPQADgNAMgMQAQgQAcgLIAJAAQgjASgIAZQgHATASAUQALAKAYAUQAVASgLAQQgHAJgUAKQgOAHgdAFIgtAIIgwALQg9APguAOQgnAKgSAIQghAOAIAQQAFAIAPAFQAJAEAUAFQAiAHAuABIA3gCIA3gCIBzgEIDlgGIByAAIBzADIBwABQBBACAwAIQA0AJAZARQAMAJAEALQgNgNghgKg");
	this.shape_83.setTransform(105.4966,17.5);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#5CCAF3").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLIBmABQgVARgDARQgEAYAoAOQAeAMBBAHIBPAFQAgACBAAHIBsAKIBUAIQAzAFARADQARADAOAGQAaANgIAFQgTAPgqAJQgeAGgrACIhJADQglACgvAFQg/AHgZANQgPAIAFALQAFAKAQAGQAWAIAxACIBcAIQAuAEA9ADIBqAFIDLALQBAACAcAEQA1AFAkAQQAOAFAEAHQAHAJgJAKQgHAHgNAGIgYALIgxASQg0AUgaAIQh1AlgkANQgcALgOAIQgXAOgDASQgCAQAXAOQAUAMAuAKQBFAQCBAHQBaAFBRABIBNgBIBJgDQAogCAggGQAigGAcgNQAigPAGgUQAIgRgVgYQgQgSgkgVQgOgIghgQQgggOgPgKQgdgTABgSQABgYAqgNQAWgHAxgFIBTgJIDGgQQA3gEAbgEQA/gIAfgOQAQgHAFgLQAIgMgIgNQgLgVgfgQQgRgIgogNQg1gQgqgMIg5gPQgfgKgUgNQgUgMAHgPQAGgKAWgIQAVgHAegDQAPgBAlgBQAhgBBAACQAzACBogBIBfgEQAzgBAigDQArgEAfgMIACgBIBjABQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_84.setTransform(182.6498,30.908);

	this.instance_21 = new lib.Path_29_2();
	this.instance_21.setTransform(167.6,6.15,1,1,0,0,0,55.8,5.8);
	this.instance_21.alpha = 0.3984;
	this.instance_21.compositeOperation = "screen";

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#2C3E50").s().p("AhJEwQiZgGhLgPQioghAyhQQASgcAxgPQAcgIA4gKIAwgLQAggJAKgNQAOgUgUgSQgPgMgcgIQhIgWmlABQjXABj1AEQhFAAgXgCQg7gGgVgZQgYgcA5gXQAWgKA7gNQAlgJBegQIA5gJQAjgIANgQQAPgSgQgSQgXgUgIgKQgMgMAEgPQADgNANgMQAQgQAcgLMAkNAAaQAQAIAHAKQAGAMgIAQQgIAMgOAKQgXAPgnAKQgLADg2AGQhkAKguAJQhzAYAlAkQAHAIAnAIIBLAQQBfAZgaAnQgPAWgsALQgSAEg3AGQihASidAPQhDACguAFQhaAJgMAXQgHAOALARQAJAPAOAIQAPAHAvAPQAlASgNAbQgNAcguAQQgbAKgyAJQgpAHg7ACIhmAEQg0AChCAAQhnAAiHgFg");
	this.shape_85.setTransform(182.6498,30.908);

	var maskedShapeInstanceList = [this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.instance_17,this.instance_18,this.instance_19,this.instance_20,this.shape_63,this.shape_64,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84,this.instance_21,this.shape_85];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_3;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_85},{t:this.instance_21},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(46.6,2.2,272.09999999999997,59.599999999999994), null);


(lib.dalemPerson1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FCD4A0").s().p("Ai1C2QhLhMgBhqQABhqBLhLQBLhLBqAAQBqAABMBLQBLBLABBqQgBBqhLBMQhMBLhqABQhqgBhLhLg");
	this.shape.setTransform(13.9548,8.2156,0.1268,0.1268);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCD4A0").s().p("Ai1C2QhMhMABhqQgBhqBMhLQBLhLBqAAQBrAABLBLQBMBLgBBqQABBqhMBMQhLBLhrABQhqgBhLhLg");
	this.shape_1.setTransform(-12.8604,8.2156,0.1268,0.1268);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DC5953").s().p("Ai+BzIAAjlIF9AAIAADlg");
	this.shape_2.setTransform(14.294,-5.1317,0.1268,0.1268);

	this.instance = new lib.ClipGroup();
	this.instance.setTransform(15.7,-14.1,0.1268,0.1268,0,0,0,90.3,106.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCD4A0").s().p("AiVU7MAAAgp1QB8AABXBYQBZBYgBB9MAAAAlIg");
	this.shape_3.setTransform(13.7772,-10.6292,0.1268,0.1268);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DC5953").s().p("Ai+BzIAAjlIF9AAIAADlg");
	this.shape_4.setTransform(-13.3138,-5.1317,0.1268,0.1268);

	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(-14.7,-14.1,0.1268,0.1268,0,0,0,89.9,106.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FCD4A0").s().p("AiVU7MAAAglIQAAh9BYhYQBXhYB8AAMAAAAp1g");
	this.shape_5.setTransform(-12.7939,-10.6292,0.1268,0.1268);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#8F6548").s().p("AiCAwQgUAAgOgOQgOgOAAgUQAAgTAOgOQAOgOAUgBIEFAAQAVABAOAOQANAOAAATQAAAUgNAOQgOAOgVAAg");
	this.shape_6.setTransform(-1.0146,-41.9639,0.1267,0.1267);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8F6548").s().p("AiCAwQgUAAgOgOQgOgOgBgUQABgTAOgOQAOgOAUgBIEFAAQAVABAOAOQAOAOgBATQABAUgOAOQgPAOgUAAg");
	this.shape_7.setTransform(-8.0651,-41.9639,0.1267,0.1267);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E1AA74").s().p("AhUAAIgfgkIDnAAIgfAkQgQASgXAJQgWALgYgBQgyAAgiglg");
	this.shape_8.setTransform(-4.5272,-35.3124,0.1267,0.1267);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#8F6548").s().p("AngEQQjHjHAAkZIAAi9IBDDZQAOAvAkAhIAAjwQAAg2AmgnQAngmA2AAIHQAAQA2AAAnAmQAnAnAAA2IAAEmQClgCB0h1QB1h1AAimIB2AAIAADwQAAEZjIDHQjIDIkZAAQkZAAjHjIgAi2jQQAyAMAaAuIAdAyQAPAZAZAOQAZAPAcAAIAPAAQAkAAAbgaQAagaAAglIAAh1QAAgygkglQgkgjgygBImJAAQgzABgjAjQgkAlAAAyIAAB1QAAAkAYAaQAaAbAkAAIAAAAQAgAAAagQQAagQAOgcIAVgoQASgkAkgRQAYgMAaAAQANAAANADg");
	this.shape_9.setTransform(-1.3969,-28.8596,0.1266,0.1266);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F79D8D").s().p("AhJBKQgegfAAgrQAAgqAegeQAfgfAqAAQArAAAeAfQAfAeAAAqQAAArgfAfQgeAegrAAQgqAAgfgeg");
	this.shape_10.setTransform(7.8904,-37.1151,0.1266,0.1266);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8F6548").s().p("AI5JIQgOgFAAgOIAAkEQAAgfgVgVQgWgVgeAAQgVAAgQgQQgPgPAAgWIAAhVQAAgYgRgQQgQgRgYAAIwkAAQAAkBC3i3QC3i2ECAAIB/AAQEDAAC2C2QC3C3AAEBIAAG9IgPAAIhRBgQgHAIgIAAQgEAAgEgCg");
	this.shape_11.setTransform(-1.3051,-46.1284,0.1266,0.1266);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F79D8D").s().p("AixAiQgPgBgJgJQgKgKAAgOQAAgNAKgKQAJgJAPgBIFjAAQAOABAKAJQAKAKAAANQAAAOgKAKQgKAJgOABg");
	this.shape_12.setTransform(-3.923,-32.7594,0.1266,0.1266);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#61544D").s().p("AgyBaQgWgVAAgeIAAhNQAAgeAWgVQAVgVAdAAQAeAAAWAVQAVAVAAAeIAABNQAAAegVAVQgWAVgeAAQgdAAgVgVg");
	this.shape_13.setTransform(-1.2418,-39.6632,0.1266,0.1266);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#61544D").s().p("AgyBaQgWgVAAgeIAAhNQAAgeAWgVQAVgVAdAAQAeAAAWAVQAVAVAAAeIAABNQAAAegVAVQgWAVgeAAQgdAAgVgVg");
	this.shape_14.setTransform(-7.9652,-39.6632,0.1266,0.1266);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FCD4A0").s().p("ApvN1QjHjIAAkZIAAsmQAAkaDHjHQDIjIEaAAQEYAADHDIQDIDHAAEaIAAFWIBFAAQBZAAA/A+QBABAAABZQAABahAA/Qg/BAhZAAIhFAAIAAAgQAAEZjIDIQjHDHkYAAQkaAAjIjHg");
	this.shape_15.setTransform(0.4074,-39.2454,0.1266,0.1266);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E1AA74").s().p("AlMkuIKYhHIlCLqg");
	this.shape_16.setTransform(-1.2568,-21.6368,0.1268,0.1268);

	this.instance_2 = new lib.Path();
	this.instance_2.setTransform(7.05,-14.1,0.1267,0.1267,0,0,0,15,107.4);
	this.instance_2.alpha = 0.3008;

	this.instance_3 = new lib.Path_1();
	this.instance_3.setTransform(0.55,-14.1,0.1267,0.1267,0,0,0,13.4,107.4);
	this.instance_3.alpha = 0.3008;

	this.instance_4 = new lib.Path_2();
	this.instance_4.setTransform(0.5,-4.8,0.1267,0.1267,0,0,0,90.4,12.7);
	this.instance_4.alpha = 0.3008;

	this.instance_5 = new lib.Path_3();
	this.instance_5.setTransform(0.5,-10.9,0.1267,0.1267,0,0,0,90.4,12.2);
	this.instance_5.alpha = 0.3008;

	this.instance_6 = new lib.Path_4();
	this.instance_6.setTransform(0.5,-17,0.1267,0.1267,0,0,0,90.4,12.2);
	this.instance_6.alpha = 0.3008;

	this.instance_7 = new lib.Path_5();
	this.instance_7.setTransform(0.5,-23.05,0.1267,0.1267,0,0,0,90.4,12.7);
	this.instance_7.alpha = 0.3008;

	this.instance_8 = new lib.Path_6();
	this.instance_8.setTransform(-6,-14.1,0.1267,0.1267,0,0,0,13.4,107.4);
	this.instance_8.alpha = 0.3008;

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F07167").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_17.setTransform(0.4835,-14.0659,0.1267,0.1267);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FCD4A0").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_18.setTransform(0.4835,-14.0659,0.1267,0.1267);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#61544D").s().p("AnKD4IAAhfIHvmQIFVAAIBRD3IAAD4g");
	this.shape_19.setTransform(7.1162,50.4041,0.1268,0.1268);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3A9BD5").s().p("AIubtMAAAgxvIxcAAMAAAAxvIlUAAMAAAg3ZIcFAAMAAAA3Zg");
	this.shape_20.setTransform(0.5091,24.7714,0.1268,0.1268);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#61544D").s().p("AnKD4IAAhfIHwmQIFUAAIBSD3IAAD4g");
	this.shape_21.setTransform(-11.364,50.4041,0.1268,0.1268);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#445259").s().p("AuCBsIAAjXIcFAAIAADXg");
	this.shape_22.setTransform(0.5091,0.9206,0.1268,0.1268);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#61544D").s().p("AgFALQgDgDAAgDIAAgJQAAgDADgDQACgDADAAQAEAAADADQACADAAADIAAAJQAAADgCADQgDADgEAAQgDAAgCgDg");
	this.shape_23.setTransform(-0.425,-39.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FCD4A0").s().p("AhOBwQgZgZAAgkIAAhlQAAgkAZgZQAZgZAkAAQAjAAAZAZQAZAZAAAkIAAArIAJAAQALAAAIAHQAIAIAAAMQAAALgIAIQgIAIgLAAIgJAAIAAAEQAAAkgZAZQgZAZgjAAQgkAAgZgZg");
	this.shape_24.setTransform(0.425,-39.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:0.1266,scaleY:0.1266,x:-1.2418,y:-39.6632}},{t:this.shape_12,p:{scaleX:0.1266,scaleY:0.1266,x:-3.923,y:-32.7594}},{t:this.shape_11,p:{scaleX:0.1266,scaleY:0.1266,x:-1.3051,y:-46.1284}},{t:this.shape_10,p:{scaleX:0.1266,scaleY:0.1266,x:7.8904,y:-37.1151}},{t:this.shape_9,p:{scaleX:0.1266,scaleY:0.1266,x:-1.3969,y:-28.8596}},{t:this.shape_8,p:{scaleX:0.1267,scaleY:0.1267,x:-4.5272,y:-35.3124}},{t:this.shape_7,p:{scaleX:0.1267,scaleY:0.1267,x:-8.0651,y:-41.9639}},{t:this.shape_6,p:{scaleX:0.1267,scaleY:0.1267,x:-1.0146,y:-41.9639}},{t:this.shape_5},{t:this.instance_1},{t:this.shape_4},{t:this.shape_3},{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.shape_16},{t:this.shape_24},{t:this.shape_13,p:{scaleX:0.1267,scaleY:0.1267,x:-7.1477,y:-39.6498}},{t:this.shape_23},{t:this.shape_12,p:{scaleX:0.0961,scaleY:0.1267,x:-3.8708,y:-32.6394}},{t:this.shape_11,p:{scaleX:0.1267,scaleY:0.1267,x:-1.2812,y:-46.1213}},{t:this.shape_10,p:{scaleX:0.1267,scaleY:0.1267,x:7.9232,y:-37.0992}},{t:this.shape_9,p:{scaleX:0.1267,scaleY:0.1267,x:-1.3731,y:-28.8358}},{t:this.shape_8,p:{scaleX:0.1268,scaleY:0.1268,x:-4.5142,y:-35.3015}},{t:this.shape_7,p:{scaleX:0.1268,scaleY:0.1268,x:-7.0543,y:-41.9569}},{t:this.shape_6,p:{scaleX:0.1268,scaleY:0.1268,x:-0.9995,y:-42.9569}},{t:this.shape_5},{t:this.instance_1},{t:this.shape_4},{t:this.shape_3},{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},6).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.1,-53.5,53.2,107.1);


(lib.bird_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance_3 = new lib.Tween1("synched",0);

	this.instance_4 = new lib.Tween2("synched",0);
	this.instance_4.setTransform(-221.5,0);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween3("synched",0);
	this.instance_5.setTransform(13.75,3.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},34).to({state:[{t:this.instance_5}]},38).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true,x:-221.5},34).wait(39));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:false},34).to({_off:true,x:13.75,y:3.55},38).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.2,-3.5,262.7,10.6);


(lib.water = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1E8FA").s().p("AgGA9QgOgKAQgiQANgagigIQgcgDgSgEQghgJAHgSQAFgNAcgCQAWgBARAEQgegCgSAFQgWAVASADIAGABIAdAEIAgAEQAVAEAFAKQAHANgJANIgRAXQgPAXAdABQAUAAAVgGIAugOQABAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQggANgUAHQgTAGgOAAQgNAAgGgGg");
	this.shape.setTransform(92.6797,-11.6699,0.6698,0.6698);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C1E8FA").s().p("AgpBmQg5gCgngSQgXgLgDgRQgCgRASgSQAVgTArgLQAYgGAugIQBBgNAdgKQA2gUAaghQABAAABAAQAAAAAAAAQABAAAAAAQAAABgBAAQgZAnhBAWIhsAaQgyAMgWAJQg4AaASAUQANAOAWAHQAlALAvAFQAdADA3ABQABAAABABQAAAAAAAAQABAAgBABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAIhaACIgHAAg");
	this.shape_1.setTransform(5.1608,4.7743,0.6698,0.6698);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C1E8FA").s().p("AiaBIQAAgBgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIADgBQBUAVAYAFQA/AMAxgCQAugWgwgIIgNgFIgdgKQgggOgKgMQgUgYAVgTQAQgQAkgNIAwgOQAdgIARgIQAdgNgWgLQgRgJgcgBQhGgFhaAHQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQB1gQBMAPQApAIgMAUQgKARgiALQgoALgZAIQgsAPgFAQQgIAXA3AaQBEAfAGAIQALANgaAGQgQAEgVAAQhagBiAgog");
	this.shape_2.setTransform(-33.1503,3.3277,0.6698,0.6698);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C1E8FA").s().p("AjQAuQAAgBAAAAQABAAAAgBQAAAAABAAQABAAAAgBQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQgCAZBzgRQBFgLBDgQIBJgSQAqgMAagRQAhgXgkgMQgbgJgeAAQgqAEgVAAIABgBIBTgHQBBAAgEAgQgCANgTAMIgfANQgoARg+AQQhEAThRALQgpAGgbAAQg3AAAIgYg");
	this.shape_3.setTransform(-86.8617,-18.5339,0.6698,0.6698);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C1E8FA").s().p("AgdCGQg5AAgEgWQgEgaArgTQAYgKAngLQAYgJAGgEQATgKADgMQAFgPgIgNQgFgKgPgMQgTgPgEgFQgMgNAAgOQAAgUAigRQAjgRAQAKIAAABQgXgBgeARQgkAUASAUQAHAIAQALQARANAHAHQARATgFAWQgGAWgXANQgXANgqAOIgmAMQgaALAAANQABAUA1AEQAaACApgCQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgnAEgaAAIgGAAg");
	this.shape_4.setTransform(53.4443,7.9535,0.6698,0.6698);

	this.instance = new lib.ClipGroup_3();
	this.instance.setTransform(-0.05,-3.4,0.6699,0.6699,0,0,0,169.8,36);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5CCAF3").s().p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOgAOMAOIhaARQgYADgPADQgcAHgDANQgEAQAaAMQAiAPADADQAwA0hGAtQgqAahLAUIguALQgoAMAAANQABAQAjAEIAyABQBwAABrgSQCzgfgfhBQgIgQhEgaQg8gYACgeQABggAzgDQBEgEAEgCQAbgPgOgMQgMgJgcgEQgQgDgSAAQgaAAgeAFgAtmBfQg1ACAEAbQAFAdBiAMQAzAGBEACQAtAHBiAZQBcAXAyAHQAdAEAYgBQAogCAFgQQAIgUgggRQgFgEgrgQQg/gbAKggQAJgbA+geIBignQA+ggg5gQQgbgIgxACIhMAGQhBACiEAAQhEAAiEAFQggABgYAHQgmALASAWQASAVA3ACQAdABAygEQAbAAA9gEQA5gEAeABQARAAAIAFQgKAJgZAFQgaAFgJAHQgUAQAOAPQAIAJAWARQAMAPABAHQACAKgTABQgIAAgQgIQgTgIgFgBQhRgShVgJQgkgEgVAAIgLABgAUtjRQgrABgTAPQghAaAsAPQA7AVAEAKQAGANgDAPIgGAUQgBAQAzgBQA8gFBogcQCEglgWgfQgQgYhKAPQhSARgOgGQgegNAwgaQAagNAogSQAdgZgPgUQgOgVghASIg+ApQgkAXggACIgxgBIgTABgA4LjpQhDAGAKAlQAMArB7gDQBXgBBGgQQB3gbAzgRQCDgsgegpQgNgUglAAQgpACgRAAQgYgBgvgDQgxgEgYAAQg0gBgQACQgwAFgJAZQgGAQAXALQAUALgJANQgFAIgdABIgkgBIhBgCIgWABg");
	this.shape_5.setTransform(-0.0164,-2.7068,0.6699,0.6699);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#10481B").s().p("AgUAjIgJgJQgIgIACgDQACgDAKAHIAKAIIgFgQQgDgPACgBQAEAAAJATIABgYQACgYAGgBQAMgBgMAxIAIgKQAJgJADABQAGABgNAcIAGgFQAHgGAFAAQAJAAgZAYg");
	this.shape_6.setTransform(45.8252,-27.6854,0.6697,0.6697);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#237812").s().p("AgZAqIgNgMQgMgOADgFQAGgKATASIgEgPQgEgPAFgEQAHgGAIAVQgCgJABgKQADgVALgBQAMgBgCAXQgBALgDALIAIgEQAJgFAGADQAKADgQARIAJgEQAJgCAEAFQAGAJgZASg");
	this.shape_7.setTransform(45.8629,-28.087,0.6697,0.6697);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#10481B").s().p("AgeAYIgFgHQgGgIADgBQAFgBAOAOIgDgSQgBgSAFAAQAHAAAJAcIABgRQABgSAGgBQAJgCAAApIAJgJQAJgIAFAAQAHAAgNAZg");
	this.shape_8.setTransform(-84.6344,-27.3684,0.6697,0.6697);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#237812").s().p("AglAgIgIgLQgHgLACgDQACgDALAIIALAHIgDgUQgCgVAGgDQAIgFAKAeIAEgOQAEgPAHgCQAHgBABAVIAAATIALgGQAMgFAHADQALADgNAdg");
	this.shape_9.setTransform(-84.5256,-27.8203,0.6697,0.6697);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#10481B").s().p("AgoAUIgIgHQgIgHACgCQACgCAIAFIAHAFIgDgMQgCgNADAAQAEAAAFAYIABgOQADgPAGgBQAJgCgCAhIAHgMQAHgNAGgBQAKgCgKAcIALgMQAMgKAGABQAIABgPAUIAKgFQALgGAEgBQAHAAgRAUg");
	this.shape_10.setTransform(-46.0267,-26.968,0.6698,0.6698);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8ED7F7").s().p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOg");
	this.shape_11.setTransform(-0.0319,-2.7107,0.6698,0.6698);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#237812").s().p("AhRAzQgHgTgFgTQgLgmAJgGQAJgGANAXQAHAMAFAMQABgMADgMQAFgaANgBQANgBABAUQAAAIgBAJQADgNAFgMQANgbAPADQAQADgIAZQgEANgIAMIATgIQAUgGAHAIQAHAHgNAQIgOAQIAbgGQAcgEAKAIQAJAIgSAJIgTAIg");
	this.shape_12.setTransform(86.5274,-27.3097,0.6697,0.6697);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#237812").s().p("Ag6ATQgLgMABgDQABgDALAFIALAGIgBgPQgBgRADgCQAEgDAJAYIADgOQAEgOAFAAQAJAAACAbQAKgRAOgBQANgBgHASQAMgLAKACQALACgGAOIAHgEQAHgCAEACQAEADgHALQgHALgIAEIhgABIgLgLg");
	this.shape_13.setTransform(-45.9779,-27.534,0.6698,0.6698);

	this.instance_1 = new lib.Path_1_3();
	this.instance_1.setTransform(69.2,20.15,0.6697,0.6697,0,0,0,6.5,10.1);
	this.instance_1.alpha = 0.6016;
	this.instance_1.compositeOperation = "multiply";

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#279FC9").s().p("AhpglQBvgOBLgdIgUghIA+ASIgSAwQgSA5gEAzQhEAfiJAWg");
	this.shape_14.setTransform(65.3049,21.4908,0.6697,0.6697);

	this.instance_2 = new lib.Path_2_1_2();
	this.instance_2.setTransform(17.85,23.5,0.6697,0.6697,0,0,0,38,11.8);
	this.instance_2.alpha = 0.6016;
	this.instance_2.compositeOperation = "multiply";

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#279FC9").s().p("ACTBuQkhgIkNgrIgJgBIgPiRQCtAWCYAMQEuAXB8gaIAEgvIAxArIgIgaQgHgbACACIAxA0IAfACIgWClQhAAEhTAAIh4gCg");
	this.shape_15.setTransform(14.1201,23.5321,0.6697,0.6697);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#03507F").s().p("AgihJQAngCAqgFIgRCWQggAGgsAFQAEhNAIhNg");
	this.shape_16.setTransform(55.0579,24.4041,0.6697,0.6697);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#279FC9").s().p("Ah5BYIAWilQB3ACBmgMIgRCWQhHAMhTAIIhFAFg");
	this.shape_17.setTransform(50.0181,24.873,0.6697,0.6697);

	this.instance_3 = new lib.Path_0_2();
	this.instance_3.setTransform(-24.65,20.7,0.6697,0.6697,0,0,0,15.9,10.9);
	this.instance_3.alpha = 0.6016;
	this.instance_3.compositeOperation = "multiply";

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#279FC9").s().p("AjdAaIgch6QAxALA0AGQCeAbBIABQAyABAYgNQAagOAfgXIgJA1IAcglIABAOIgDAZIAGABIAOCRQkOgZjJgyg");
	this.shape_18.setTransform(-30.8696,20.6369,0.6697,0.6697);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F9CA67").s().p("AgBgEIADgFIgCATg");
	this.shape_19.setTransform(-15.2145,15.2622,0.6697,0.6697);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F9CA67").s().p("AgCAMIACgYIADAZg");
	this.shape_20.setTransform(-15.2647,16.7859,0.6697,0.6697);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#03507F").s().p("AgOA0Igah2QAUAFAiAHIAcB6g");
	this.shape_21.setTransform(-48.5265,17.8295,0.6698,0.6698);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#279FC9").s().p("AhjAVQgWglgWg2IgSguIAYAAQAbABARAFIgUASIA4AdQBOAjBxAXIAcB6Qilgqhgg2g");
	this.shape_22.setTransform(-56.581,14.5474,0.6698,0.6698);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#03507F").s().p("AAMBWQgUhhghhOIAtAFIAlCug");
	this.shape_23.setTransform(-92.8707,-1.8329,0.6697,0.6697);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#279FC9").s().p("ACoCSQhQgJhYgYIhGgVQAGgUgJgnQgVhPhShkQA1AXEHBgIAlCug");
	this.shape_24.setTransform(-101.9456,-5.6504,0.6697,0.6697);

	this.instance_4 = new lib.Path_2_0_2();
	this.instance_4.setTransform(-69.55,1.4,0.6697,0.6697,0,0,0,7.2,8);
	this.instance_4.alpha = 0.6016;
	this.instance_4.compositeOperation = "multiply";

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#279FC9").s().p("ABJBiQhygLiBgSIgmivQAqADAYgBQgSAQgJAQIgFANIAngPQAsgQAbgBQgSANgFAQQgCAIABAGIA6gHQBYgCCXATIgjBSIgBAqQAAALgGAJIhegIg");
	this.shape_25.setTransform(-78.622,-0.3929,0.6697,0.6697);

	this.instance_5 = new lib.Path_9();
	this.instance_5.setTransform(102.4,-6.1,0.6697,0.6697,0,0,0,17.6,7.7);
	this.instance_5.alpha = 0.6016;
	this.instance_5.compositeOperation = "multiply";

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#279FC9").s().p("AjPACQDBghBlgjQCBguAbgMQggBigOAhIm3B2QAGg5AdhCg");
	this.shape_26.setTransform(97.4524,-2.8207,0.6697,0.6697);

	this.instance_6 = new lib.Path_2_3();
	this.instance_6.setTransform(71.9,2.9,0.6697,0.6697,0,0,0,7.9,5.6);
	this.instance_6.alpha = 0.6016;
	this.instance_6.compositeOperation = "multiply";

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#03507F").s().p("Ah6AGIC3hBIA+gKQgdBCgGA4Ig/ARg");
	this.shape_27.setTransform(75.2673,2.0014,0.6697,0.6697);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#C1E8FA").s().p("AiLAfQAAAAAAgBQAAAAAAAAQABgBAAAAQAAAAABAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQgBARBNgMQAtgHAtgLIAxgMQAcgHASgMQAWgPgZgIQgRgGgVAAQgcACgOAAIABAAIA4gFQArAAgDAVQgBAJgNAIIgVAJQgaALgqALQgtANg2AHQgbAEgSAAQglAAAFgQg");
	this.shape_28.setTransform(-86.8487,-18.5387);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#5CCAF3").s().p("AAwDhIjJgWIACgQQgYAIgsAEQhaAJhpgVQh1gYhTgkQgagMgTgLIgOgJIAGhSIitgKIkpiCICvhjQBdgGGOABQG7ABBVgCQCDgDFyAOIHPARIAcACQAQALAlA0QAjAwABAIQgSAHhXAfQg2ATifAoIiVAlIBjArIgiBUIgcAKQhKAdh2AGIijACQgrAJhNAAQhMAAhtgJgAJgAKIg8ALQgQACgKACQgTAEgCAJQgDALASAIQAXAKACACQAgAjgvAeQgdARgxAOIggAHQgaAIAAAJQAAALAYADIAiAAQBKAABJgMQB3gVgVgrQgFgLgtgSQgpgPABgUQABgWAjgCQAtgDACgBQATgKgKgIQgHgGgUgDIgVgCQgSAAgVAEgApHBAQgjABADASQADAUBBAIQAjAEAuABQAeAFBBARQA+APAhAFQAUACAQAAQAbgCADgLQAGgNgWgLQgDgDgdgLQgrgSAHgVQAGgSAqgVIBBgaQAqgUgmgMQgSgFghABIgzAEQgrAChZAAQgtAAhZAEQgVAAgQAFQgaAHAMAOQAMAPAlABQAUAAAhgCQASAAApgDQAmgCAVAAQALAAAFADQgHAHgQADQgSADgGAFQgNALAJAKQAFAGAPALQAIAKABAFQABAHgMAAQgGAAgLgFQgMgGgEAAQg2gMg5gGQgXgDgOAAIgJABgAN4iMQgdABgNAKQgWARAeALQAnAOADAHQADAIgCAKIgDAOQgBAKAigBQApgDBFgTQBZgYgPgVQgLgQgxAKQg4ALgJgEQgUgIAggSQARgJAbgMQAUgRgKgNQgKgOgWAMIgpAcQgYAPgWACIghgBIgMAAgAwMibQgtAEAHAYQAIAdBTgCQA6gBAugLQBRgSAhgLQBYgegUgbQgJgNgYAAQgcABgLAAQgQAAgggDQgggCgQAAQgkgBgKABQggAEgHAQQgEALAQAIQAOAHgHAJQgDAFgTABIgZgBIgqgBIgQABg");
	this.shape_29.setTransform(-0.025,-2.7023);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27,p:{scaleX:0.6697,scaleY:0.6697,x:75.2673,y:2.0014}},{t:this.instance_6,p:{regX:7.9,scaleX:0.6697,scaleY:0.6697}},{t:this.shape_26,p:{scaleX:0.6697,scaleY:0.6697,x:97.4524,y:-2.8207}},{t:this.instance_5,p:{regX:17.6,scaleX:0.6697,scaleY:0.6697,x:102.4}},{t:this.shape_25,p:{scaleX:0.6697,scaleY:0.6697,x:-78.622,y:-0.3929}},{t:this.instance_4,p:{regX:7.2,scaleX:0.6697,scaleY:0.6697,x:-69.55}},{t:this.shape_24,p:{scaleX:0.6697,scaleY:0.6697,x:-101.9456,y:-5.6504}},{t:this.shape_23,p:{scaleX:0.6697,scaleY:0.6697,x:-92.8707,y:-1.8329}},{t:this.shape_22,p:{scaleX:0.6698,scaleY:0.6698,x:-56.581,y:14.5474}},{t:this.shape_21,p:{scaleX:0.6698,scaleY:0.6698,x:-48.5265,y:17.8295}},{t:this.shape_20,p:{scaleX:0.6697,scaleY:0.6697,x:-15.2647,y:16.7859}},{t:this.shape_19,p:{scaleX:0.6697,scaleY:0.6697,x:-15.2145,y:15.2622}},{t:this.shape_18,p:{scaleX:0.6697,scaleY:0.6697,x:-30.8696,y:20.6369}},{t:this.instance_3,p:{regX:15.9,regY:10.9,scaleX:0.6697,scaleY:0.6697,x:-24.65,y:20.7}},{t:this.shape_17,p:{scaleX:0.6697,scaleY:0.6697,x:50.0181,y:24.873}},{t:this.shape_16,p:{scaleX:0.6697,scaleY:0.6697,x:55.0579,y:24.4041}},{t:this.shape_15,p:{scaleX:0.6697,scaleY:0.6697,x:14.1201,y:23.5321}},{t:this.instance_2,p:{regX:38,regY:11.8,scaleX:0.6697,scaleY:0.6697,x:17.85,y:23.5}},{t:this.shape_14,p:{scaleX:0.6697,scaleY:0.6697,x:65.3049,y:21.4908}},{t:this.instance_1,p:{regX:6.5,regY:10.1,scaleX:0.6697,scaleY:0.6697,x:69.2}},{t:this.shape_13,p:{scaleX:0.6698,scaleY:0.6698,x:-45.9779,y:-27.534}},{t:this.shape_12,p:{scaleX:0.6697,scaleY:0.6697,x:86.5274,y:-27.3097}},{t:this.shape_11,p:{scaleX:0.6698,scaleY:0.6698,x:-0.0319,y:-2.7107}},{t:this.shape_10,p:{scaleX:0.6698,scaleY:0.6698,x:-46.0267,y:-26.968}},{t:this.shape_9,p:{scaleX:0.6697,scaleY:0.6697,x:-84.5256,y:-27.8203}},{t:this.shape_8,p:{scaleX:0.6697,scaleY:0.6697,x:-84.6344,y:-27.3684}},{t:this.shape_7,p:{scaleX:0.6697,scaleY:0.6697,x:45.8629,y:-28.087}},{t:this.shape_6,p:{scaleX:0.6697,scaleY:0.6697,x:45.8252,y:-27.6854}},{t:this.shape_5},{t:this.instance,p:{regY:36,scaleY:0.6699,y:-3.4}},{t:this.shape_4,p:{scaleX:0.6698,scaleY:0.6698,x:53.4443,y:7.9535}},{t:this.shape_3,p:{x:-86.8617,y:-18.5339}},{t:this.shape_2,p:{scaleX:0.6698,scaleY:0.6698,x:-33.1503,y:3.3277}},{t:this.shape_1,p:{scaleX:0.6698,scaleY:0.6698,x:5.1608,y:4.7743}},{t:this.shape,p:{scaleX:0.6698,scaleY:0.6698,x:92.6797,y:-11.6699}}]}).to({state:[{t:this.shape_27,p:{scaleX:0.6698,scaleY:0.6698,x:75.2759,y:2.0029}},{t:this.instance_6,p:{regX:7.6,scaleX:0.6698,scaleY:0.6698}},{t:this.shape_26,p:{scaleX:0.6698,scaleY:0.6698,x:97.462,y:-2.8195}},{t:this.instance_5,p:{regX:17.3,scaleX:0.6698,scaleY:0.6698,x:102.45}},{t:this.shape_25,p:{scaleX:0.6698,scaleY:0.6698,x:-78.6204,y:-0.3915}},{t:this.instance_4,p:{regX:7.3,scaleX:0.6698,scaleY:0.6698,x:-69.45}},{t:this.shape_24,p:{scaleX:0.6698,scaleY:0.6698,x:-101.9451,y:-5.6492}},{t:this.shape_23,p:{scaleX:0.6698,scaleY:0.6698,x:-92.8697,y:-1.8315}},{t:this.shape_22,p:{scaleX:0.6699,scaleY:0.6699,x:-56.5745,y:14.5526}},{t:this.shape_21,p:{scaleX:0.6699,scaleY:0.6699,x:-48.5191,y:17.8351}},{t:this.shape_20,p:{scaleX:0.6698,scaleY:0.6698,x:-15.2602,y:16.788}},{t:this.shape_19,p:{scaleX:0.6698,scaleY:0.6698,x:-15.21,y:15.2643}},{t:this.shape_18,p:{scaleX:0.6698,scaleY:0.6698,x:-30.8658,y:20.6392}},{t:this.instance_3,p:{regX:16,regY:10.6,scaleX:0.6698,scaleY:0.6698,x:-24.6,y:20.75}},{t:this.shape_17,p:{scaleX:0.6698,scaleY:0.6698,x:50.0256,y:24.8755}},{t:this.shape_16,p:{scaleX:0.6698,scaleY:0.6698,x:55.0656,y:24.4067}},{t:this.shape_15,p:{scaleX:0.6698,scaleY:0.6698,x:14.1259,y:23.5346}},{t:this.instance_2,p:{regX:38.1,regY:11.5,scaleX:0.6698,scaleY:0.6698,x:17.9,y:23.5}},{t:this.shape_14,p:{scaleX:0.6698,scaleY:0.6698,x:65.3131,y:21.4932}},{t:this.instance_1,p:{regX:6.7,regY:9.7,scaleX:0.6698,scaleY:0.6698,x:69.55}},{t:this.shape_13,p:{scaleX:0.6699,scaleY:0.6699,x:-45.9701,y:-27.5336}},{t:this.shape_12,p:{scaleX:0.6698,scaleY:0.6698,x:86.5365,y:-27.3096}},{t:this.shape_11,p:{scaleX:0.6699,scaleY:0.6699,x:-0.019,y:-2.7075}},{t:this.shape_10,p:{scaleX:0.6699,scaleY:0.6699,x:-46.019,y:-26.9676}},{t:this.shape_9,p:{scaleX:0.6698,scaleY:0.6698,x:-84.5242,y:-27.8202}},{t:this.shape_8,p:{scaleX:0.6698,scaleY:0.6698,x:-84.6331,y:-27.3683}},{t:this.shape_7,p:{scaleX:0.6698,scaleY:0.6698,x:45.8701,y:-28.0869}},{t:this.shape_6,p:{scaleX:0.6698,scaleY:0.6698,x:45.8325,y:-27.6853}},{t:this.shape_29},{t:this.shape_4,p:{scaleX:0.6699,scaleY:0.6699,x:53.4633,y:7.958}},{t:this.shape_28},{t:this.shape_2,p:{scaleX:0.6699,scaleY:0.6699,x:-33.1411,y:3.3317}},{t:this.shape_1,p:{scaleX:0.6699,scaleY:0.6699,x:5.1744,y:4.7783}},{t:this.shape,p:{scaleX:0.6699,scaleY:0.6699,x:92.7032,y:-11.6677}},{t:this.instance,p:{regY:35.3,scaleY:0.705,y:-2.25}}]},6).to({state:[{t:this.shape_27,p:{scaleX:0.6697,scaleY:0.6697,x:75.2586,y:1.9999}},{t:this.instance_6,p:{regX:8.1,scaleX:0.6697,scaleY:0.6697}},{t:this.shape_26,p:{scaleX:0.6697,scaleY:0.6697,x:97.4427,y:-2.822}},{t:this.instance_5,p:{regX:17.8,scaleX:0.6697,scaleY:0.6697,x:102.4}},{t:this.shape_25,p:{scaleX:0.6697,scaleY:0.6697,x:-78.6236,y:-0.3943}},{t:this.instance_4,p:{regX:7.2,scaleX:0.6697,scaleY:0.6697,x:-69.55}},{t:this.shape_24,p:{scaleX:0.6697,scaleY:0.6697,x:-101.9462,y:-5.6515}},{t:this.shape_23,p:{scaleX:0.6697,scaleY:0.6697,x:-92.8716,y:-1.8342}},{t:this.shape_22,p:{scaleX:0.6698,scaleY:0.6698,x:-56.5837,y:14.5453}},{t:this.shape_21,p:{scaleX:0.6698,scaleY:0.6698,x:-48.5295,y:17.8273}},{t:this.shape_20,p:{scaleX:0.6697,scaleY:0.6697,x:-15.2692,y:16.7837}},{t:this.shape_19,p:{scaleX:0.6697,scaleY:0.6697,x:-15.2189,y:15.2601}},{t:this.shape_18,p:{scaleX:0.6697,scaleY:0.6697,x:-30.8734,y:20.6345}},{t:this.instance_3,p:{regX:15.9,regY:11.1,scaleX:0.6697,scaleY:0.6697,x:-24.65,y:20.75}},{t:this.shape_17,p:{scaleX:0.6697,scaleY:0.6697,x:50.0106,y:24.8704}},{t:this.shape_16,p:{scaleX:0.6697,scaleY:0.6697,x:55.0502,y:24.4016}},{t:this.shape_15,p:{scaleX:0.6697,scaleY:0.6697,x:14.1143,y:23.5296}},{t:this.instance_2,p:{regX:38,regY:12,scaleX:0.6697,scaleY:0.6697,x:17.85,y:23.55}},{t:this.shape_14,p:{scaleX:0.6697,scaleY:0.6697,x:65.2967,y:21.4884}},{t:this.instance_1,p:{regX:6.7,regY:10.2,scaleX:0.6697,scaleY:0.6697,x:69.25}},{t:this.shape_13,p:{scaleX:0.6698,scaleY:0.6698,x:-45.9809,y:-27.5342}},{t:this.shape_12,p:{scaleX:0.6697,scaleY:0.6697,x:86.5182,y:-27.3099}},{t:this.shape_11,p:{scaleX:0.6698,scaleY:0.6698,x:-0.0371,y:-2.712}},{t:this.shape_10,p:{scaleX:0.6698,scaleY:0.6698,x:-46.0298,y:-26.9682}},{t:this.shape_9,p:{scaleX:0.6697,scaleY:0.6697,x:-84.5269,y:-27.8204}},{t:this.shape_8,p:{scaleX:0.6697,scaleY:0.6697,x:-84.6357,y:-27.3686}},{t:this.shape_7,p:{scaleX:0.6697,scaleY:0.6697,x:45.8556,y:-28.0871}},{t:this.shape_6,p:{scaleX:0.6697,scaleY:0.6697,x:45.8179,y:-27.6856}},{t:this.shape_5},{t:this.instance,p:{regY:36,scaleY:0.6699,y:-3.4}},{t:this.shape_4,p:{scaleX:0.6698,scaleY:0.6698,x:53.4367,y:7.9517}},{t:this.shape_3,p:{x:-86.8629,y:-18.5345}},{t:this.shape_2,p:{scaleX:0.6698,scaleY:0.6698,x:-33.154,y:3.3262}},{t:this.shape_1,p:{scaleX:0.6698,scaleY:0.6698,x:5.1554,y:4.7726}},{t:this.shape,p:{scaleX:0.6698,scaleY:0.6698,x:92.6703,y:-11.6708}}]},7).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113.8,-31,227.6,62.1);


(lib.person1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_142 = function() {
		var root = this
		root.stop();
		var root = this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(142).call(this.frame_142).wait(3));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgGAwQgCgCAAgCQAAgDACgDQACgCAEAAQACAAACACQACADAAADQAAACgCACQgCADgCAAQgEAAgCgDgAgHAWQAAgIACgFQABgFAEgEIAJgJQAGgHAAgIQAAgGgEgFQgDgEgIAAQgFAAgFAEQgEAEAAAGIgNAAQABgMAHgGQAIgHALAAQANAAAIAHQAHAHAAAMQAAAMgLAMIgIAGQgFAGAAAKg");
	this.shape.setTransform(-53.175,-89.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgFAyIAAhIIALAAIAABIgAgEglQgCgCAAgDQAAgDACgDQACgBACAAQAEAAABABQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_1.setTransform(-58.15,-89.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_2.setTransform(-63.75,-88.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgFAyIAAhIIALAAIAABIgAgEglQgCgCAAgDQAAgDACgDQACgBACAAQAEAAABABQACADAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_3.setTransform(-69.3,-89.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgGAGgDQAIgDAGAAQANABAHAGQAIAHAAALIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_4.setTransform(-78.25,-88.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgeA0IAAhlIALAAIABAIQAIgKAMAAQAOAAAIAKQAHALAAARIAAABQAAAQgHAKQgIALgNAAQgNAAgIgJIAAAkgAgSgeIAAAjQAGAKAMgBQAIABAFgIQAGgHAAgNQAAgMgGgIQgFgHgIAAQgMAAgGAKg");
	this.shape_5.setTransform(-85.825,-86.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAHgDQAGgDAHAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_6.setTransform(-93.7,-88.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgXAgQgHgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAGgDQAIgDAHAAQAMABAIAGQAGAHABALIAAAhQAAAKACAGIAAABIgNAAIgCgIQgIAKgMAAQgKAAgIgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_7.setTransform(-104.75,-88.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEAEQgFACgBAGIgMAAQAAgGAEgFQAEgGAHgDQAHgDAGAAQANABAHAGQAIAHAAALIAAAhQAAAKADAGIAAABIgOAAIgBgIQgKAKgKAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_8.setTransform(-112.35,-88.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgEgDQgEgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAGgDQAIgDAHAAQAMABAHAGQAIAHAAALIAAAhQAAAKACAGIAAABIgNAAIgCgIQgIAKgMAAQgKAAgIgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAGgDQAFgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_9.setTransform(-119.95,-88.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACgBAGIgMAAQAAgGAEgFQAEgGAHgDQAHgDAGAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgJAAQgXAAAAANg");
	this.shape_10.setTransform(-127.55,-88.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgGAGgDQAHgDAIAAQAMABAHAGQAIAHAAALIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgLAAgHgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAGgDQAFgDADgFIAAgPIgLAAQgWAAAAANg");
	this.shape_11.setTransform(-135.15,-88.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEACAAAGIgNAAQAAgGAEgFQAEgGAHgDQAGgDAHAAQANABAIAGQAGAHABALIAAAhQAAAKADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAANg");
	this.shape_12.setTransform(-142.75,-88.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgEgEgHAAQgGAAgEAEQgGACAAAGIgMAAQAAgGAEgFQAEgGAGgDQAHgDAHAAQANABAHAGQAIAHAAALIAAAhQAAAKACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAOQAAAGAEAEQAEADAGAAQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAANg");
	this.shape_13.setTransform(-150.35,-88.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_14.setTransform(-159.175,-89.575);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AJPEPIx4AAQhMAAg7gXQg7gXgSglIjkm+Qgbg1BCgrQBCgqBrAAIU4AAQBLAAA7AXQA7AXATAlIDjG/QAXAsguAnQgtAmhVAMIAACCg");
	this.shape_15.setTransform(-106.2724,-85.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgGAxQgCgDAAgDQAAgCACgCQACgCAEgBQACABACACQACACAAACQAAADgCADQgCACgCAAQgEAAgCgCgAgHAWQAAgIACgFQABgEAEgGIAJgJQAGgGAAgHQAAgIgEgEQgDgEgIAAQgFAAgFAEQgEAEAAAGIgNAAQABgMAHgGQAIgHALAAQANAAAIAHQAHAHAAAMQAAAMgLALIgIAHQgFAGAAAKg");
	this.shape_16.setTransform(-38.525,-81.1);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgGAyIAAhJIANAAIAABJgAgEglQgDgCAAgDQAAgDADgDQABgCADAAQAEAAACACQABADAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_17.setTransform(-43.5,-81.15);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_18.setTransform(-49.1,-79.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCgBgDQABgDACgDQACgCACAAQAEAAACACQABADAAADQAAADgBACQgCACgEAAQgCAAgCgCg");
	this.shape_19.setTransform(-54.65,-81.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgXAgQgGgGgBgJQABgMAIgFQAJgHAPAAIANAAIAAgGQgBgGgEgEQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAHgDAIAAQAMgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgLAAgHgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgLAAQgWAAAAANg");
	this.shape_20.setTransform(-63.6,-79.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_21.setTransform(-71.175,-78.45);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFAEgBAEIgMAAQAAgFAEgFQAEgFAHgDQAHgDAGAAQANgBAHAHQAIAGAAALIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_22.setTransform(-79.05,-79.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_23.setTransform(-86.75,-79.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_24.setTransform(-94.225,-79.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AAWAyIgigvIgMANIAAAiIgNAAIAAhjIANAAIAAAxIArgxIAQAAIgmAsIApA3g");
	this.shape_25.setTransform(-101.825,-81.075);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgGAxQgCgDAAgDQAAgCACgCQACgCAEgBQACABACACQACACAAACQAAADgCADQgCACgCAAQgEAAgCgCgAgHAWQAAgIACgFQABgEAEgGIAJgJQAGgGAAgHQAAgIgEgEQgDgEgIAAQgFAAgFAEQgEAEAAAGIgNAAQABgMAHgGQAIgHALAAQANAAAIAHQAHAHAAAMQAAAMgLALIgIAHQgFAGAAAKg");
	this.shape_26.setTransform(-113.575,-81.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCgBgDQABgDACgDQACgCACAAQAEAAACACQABADAAADQAAADgBACQgCACgEAAQgCAAgCgCg");
	this.shape_27.setTransform(-118.55,-81.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_28.setTransform(-122.725,-80.625);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgXAgQgHgGAAgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAGgDQAIgDAHAAQAMgBAIAHQAGAGABALIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_29.setTransform(-128.6,-79.8);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_30.setTransform(-138.525,-79.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgPAxQgHgDgEgGIAGgIQAIAKAMAAQAIAAAFgFQAGgFAAgKIAAgGQgIAJgMAAQgNAAgIgLQgIgKAAgRQAAgSAIgKQAIgKANAAQANAAAHAJIABgIIALAAIAABHQAAAPgIAIQgJAIgOAAQgHAAgIgDgAgMghQgFAHAAAOQAAAMAFAHQAFAHAIAAQAMAAAGgLIAAghQgGgKgMAAQgIAAgFAHg");
	this.shape_31.setTransform(-152.175,-78.425);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAQAmIAAgwQABgIgEgEQgDgEgIAAQgFAAgFADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_32.setTransform(-159.85,-79.875);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAHgDQAGgDAHAAQANgBAIAHQAGAGABALIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_33.setTransform(-167.5,-79.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgWAzIgFAAIAAgLIAEABQAHAAADgDQAEgDACgGIADgIIgbhIIAPAAIARA3IARg3IANAAIgdBUQgGATgPAAg");
	this.shape_34.setTransform(-174.6,-78.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_35.setTransform(-38.1,-98.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AASAlIgSg3IgRA3IgKAAIgWhJIANAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_36.setTransform(-47.15,-98.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_37.setTransform(-56.025,-98.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AAQA1IAAgyQAAgGgDgEQgDgEgIAAQgFAAgFADQgFADgDAFIAAA1IgMAAIAAhoIAMAAIAAAnQAJgKANAAQAXAAAAAZIAAAyg");
	this.shape_38.setTransform(-63.65,-100.15);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_39.setTransform(-74.025,-100.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_40.setTransform(-81.85,-98.6);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgVAzIgGAAIAAgLIAEABQAGAAAEgDQAEgDACgGIADgIIgahIIANAAIASA2IARg2IAOAAIgeBUQgGATgPAAg");
	this.shape_41.setTransform(-88.95,-97.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_42.setTransform(-96.15,-98.675);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_43.setTransform(-103.8,-98.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_44.setTransform(-111.375,-100.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_45.setTransform(-121.975,-100.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_46.setTransform(-130.025,-98.6);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_47.setTransform(-137.075,-100.15);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgIAMQAGgIAAgJIAAgLIAMAAIAAAJQAAAHgEAHQgDAGgFAFg");
	this.shape_48.setTransform(-146.15,-94.65);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AARA1IAAgyQgBgGgDgEQgEgEgHAAQgGAAgEADQgFADgDAFIAAA1IgMAAIAAhoIAMAAIAAAnQAJgKANAAQAXAAAAAZIAAAyg");
	this.shape_49.setTransform(-151.15,-100.15);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_50.setTransform(-159.025,-98.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_51.setTransform(-167.025,-98.6);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_52.setTransform(-175.025,-98.6);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgdAyIAAhjIANAAIAABYIAuAAIAAALg");
	this.shape_53.setTransform(-182.375,-99.875);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAIgDAGAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_54.setTransform(-69.25,-79.8);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AgVAzIgGAAIAAgLIAEABQAGAAAEgDQAEgDACgGIADgIIgahIIANAAIASA3IARg3IAOAAIgeBUQgGATgPAAg");
	this.shape_55.setTransform(-76.35,-78.3);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAHgDAHAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_56.setTransform(-99.05,-79.8);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_57.setTransform(-106.625,-81.275);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgWAzIgEAAIAAgLIADABQAGAAAEgDQAEgDACgGIADgIIgbhIIAPAAIARA3IARg3IANAAIgdBUQgGATgPAAg");
	this.shape_58.setTransform(-121.4,-78.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_59.setTransform(-136.075,-79.8);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQACgDACAAQAEAAABADQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_60.setTransform(-27.55,-99.95);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQACgDACAAQAEAAABADQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_61.setTransform(-38.7,-99.95);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_62.setTransform(-53.925,-99.425);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_63.setTransform(-59.8,-98.6);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_64.setTransform(-74.1,-98.675);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_65.setTransform(-79.95,-98.675);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_66.setTransform(-92.575,-99.425);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgIAMQAGgIAAgJIAAgLIAMAAIAAAJQgBAHgDAHQgDAGgFAFg");
	this.shape_67.setTransform(-99.7,-94.65);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AAQA1IAAgyQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADgEAFIAAA1IgMAAIAAhoIAMAAIAAAnQAJgKANAAQAXAAAAAZIAAAyg");
	this.shape_68.setTransform(-104.7,-100.15);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgGA1IAAhoIANAAIAABog");
	this.shape_69.setTransform(-117.85,-100.15);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgDQAHgCAHAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_70.setTransform(-123.35,-98.6);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AARAlIgRg3IgRA3IgKAAIgVhJIAMAAIAPA2IARg2IAJAAIASA3IAOg3IANAAIgWBJg");
	this.shape_71.setTransform(-132.4,-98.6);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_72.setTransform(-173.675,-98.6);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgUAtQgIgFgFgLQgGgLAAgOIAAgGQAAgOAFgLQAFgLAJgGQAKgGAKAAQAMAAAJAGQAJAFAFALQAFALAAAPIAAAFQAAAPgFALQgFALgJAFQgJAGgMAAQgLAAgJgGgAgSgdQgIAJAAARIAAAGQAAARAIAKQAGAKAMAAQANAAAHgJQAHgKAAgRIAAgGQAAgSgHgJQgHgKgNAAQgMAAgGAKg");
	this.shape_73.setTransform(-182.5,-99.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{x:-63.75,y:-88.375}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_53},{t:this.shape_52,p:{x:-175.025}},{t:this.shape_51,p:{x:-167.025}},{t:this.shape_50,p:{x:-159.025}},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46,p:{x:-130.025}},{t:this.shape_45},{t:this.shape_44,p:{x:-111.375,y:-100.075}},{t:this.shape_43},{t:this.shape_42,p:{x:-96.15}},{t:this.shape_41,p:{x:-88.95}},{t:this.shape_40,p:{x:-81.85}},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37,p:{x:-56.025}},{t:this.shape_36},{t:this.shape_35,p:{x:-38.1}},{t:this.shape_2,p:{x:-30.45,y:-98.675}},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{x:-94.225}},{t:this.shape_23,p:{x:-86.75}},{t:this.shape_22},{t:this.shape_21,p:{x:-71.175}},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},47).to({state:[{t:this.shape_15},{t:this.shape_73},{t:this.shape_72},{t:this.shape_52,p:{x:-165.675}},{t:this.shape_51,p:{x:-157.675}},{t:this.shape_50,p:{x:-149.675}},{t:this.shape_46,p:{x:-141.675}},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_35,p:{x:-112.35}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_37,p:{x:-86.325}},{t:this.shape_65},{t:this.shape_64},{t:this.shape_41,p:{x:-66.9}},{t:this.shape_63},{t:this.shape_62},{t:this.shape_40,p:{x:-47.65}},{t:this.shape_61},{t:this.shape_42,p:{x:-33.15}},{t:this.shape_60},{t:this.shape_21,p:{x:-143.625}},{t:this.shape_59},{t:this.shape_23,p:{x:-128.6}},{t:this.shape_58},{t:this.shape_24,p:{x:-114.325}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_44,p:{x:-91.175,y:-81.275}},{t:this.shape_2,p:{x:-83.55,y:-79.875}},{t:this.shape_55},{t:this.shape_54}]},48).to({state:[{t:this.shape_15},{t:this.shape_73},{t:this.shape_72},{t:this.shape_52,p:{x:-165.675}},{t:this.shape_51,p:{x:-157.675}},{t:this.shape_50,p:{x:-149.675}},{t:this.shape_46,p:{x:-141.675}},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_35,p:{x:-112.35}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_37,p:{x:-86.325}},{t:this.shape_65},{t:this.shape_64},{t:this.shape_41,p:{x:-66.9}},{t:this.shape_63},{t:this.shape_62},{t:this.shape_40,p:{x:-47.65}},{t:this.shape_61},{t:this.shape_42,p:{x:-33.15}},{t:this.shape_60},{t:this.shape_21,p:{x:-143.625}},{t:this.shape_59},{t:this.shape_23,p:{x:-128.6}},{t:this.shape_58},{t:this.shape_24,p:{x:-114.325}},{t:this.shape_57},{t:this.shape_56},{t:this.shape_44,p:{x:-91.175,y:-81.275}},{t:this.shape_2,p:{x:-83.55,y:-79.875}},{t:this.shape_55},{t:this.shape_54}]},47).wait(3));

	// Layer_1
	this.instance = new lib.dalemPerson1();
	this.instance.setTransform(0.5,0,1,1,0,0,0,0.5,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(145));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-206.4,-124.7,233.5,178.3);


(lib.dalemPerson1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FCD4A0").s().p("Ai1C2QhLhMgBhqQABhqBLhLQBLhLBqAAQBqAABMBLQBLBLABBqQgBBqhLBMQhMBLhqABQhqgBhLhLg");
	this.shape.setTransform(13.9548,8.2156,0.1268,0.1268);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCD4A0").s().p("Ai1C2QhMhMABhqQgBhqBMhLQBLhLBqAAQBrAABLBLQBMBLgBBqQABBqhMBMQhLBLhrABQhqgBhLhLg");
	this.shape_1.setTransform(-12.8604,8.2156,0.1268,0.1268);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DC5953").s().p("Ai+BzIAAjlIF9AAIAADlg");
	this.shape_2.setTransform(14.294,-5.1317,0.1268,0.1268);

	this.instance = new lib.ClipGroupcopy3();
	this.instance.setTransform(15.7,-14.1,0.1268,0.1268,0,0,0,90.3,106.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCD4A0").s().p("AiVU7MAAAgp1QB8AABXBYQBZBYgBB9MAAAAlIg");
	this.shape_3.setTransform(13.7772,-10.6292,0.1268,0.1268);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DC5953").s().p("Ai+BzIAAjlIF9AAIAADlg");
	this.shape_4.setTransform(-13.3138,-5.1317,0.1268,0.1268);

	this.instance_1 = new lib.ClipGroup_1copy();
	this.instance_1.setTransform(-14.7,-14.1,0.1268,0.1268,0,0,0,89.9,106.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FCD4A0").s().p("AiVU7MAAAglIQAAh9BYhYQBXhYB8AAMAAAAp1g");
	this.shape_5.setTransform(-12.7939,-10.6292,0.1268,0.1268);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#8F6548").s().p("AiCAwQgUAAgOgOQgOgOAAgUQAAgTAOgOQAOgOAUgBIEFAAQAVABAOAOQANAOAAATQAAAUgNAOQgOAOgVAAg");
	this.shape_6.setTransform(-1.0146,-41.9639,0.1267,0.1267);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8F6548").s().p("AiCAwQgUAAgOgOQgOgOgBgUQABgTAOgOQAOgOAUgBIEFAAQAVABAOAOQAOAOgBATQABAUgOAOQgPAOgUAAg");
	this.shape_7.setTransform(-8.0651,-41.9639,0.1267,0.1267);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E1AA74").s().p("AhUAAIgfgkIDnAAIgfAkQgQASgXAJQgWALgYgBQgyAAgiglg");
	this.shape_8.setTransform(-4.5272,-35.3124,0.1267,0.1267);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#8F6548").s().p("AngEQQjHjHAAkZIAAi9IBDDZQAOAvAkAhIAAjwQAAg2AmgnQAngmA2AAIHQAAQA2AAAnAmQAnAnAAA2IAAEmQClgCB0h1QB1h1AAimIB2AAIAADwQAAEZjIDHQjIDIkZAAQkZAAjHjIgAi2jQQAyAMAaAuIAdAyQAPAZAZAOQAZAPAcAAIAPAAQAkAAAbgaQAagaAAglIAAh1QAAgygkglQgkgjgygBImJAAQgzABgjAjQgkAlAAAyIAAB1QAAAkAYAaQAaAbAkAAIAAAAQAgAAAagQQAagQAOgcIAVgoQASgkAkgRQAYgMAaAAQANAAANADg");
	this.shape_9.setTransform(-1.3969,-28.8596,0.1266,0.1266);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F79D8D").s().p("AhJBKQgegfAAgrQAAgqAegeQAfgfAqAAQArAAAeAfQAfAeAAAqQAAArgfAfQgeAegrAAQgqAAgfgeg");
	this.shape_10.setTransform(7.8904,-37.1151,0.1266,0.1266);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8F6548").s().p("AI5JIQgOgFAAgOIAAkEQAAgfgVgVQgWgVgeAAQgVAAgQgQQgPgPAAgWIAAhVQAAgYgRgQQgQgRgYAAIwkAAQAAkBC3i3QC3i2ECAAIB/AAQEDAAC2C2QC3C3AAEBIAAG9IgPAAIhRBgQgHAIgIAAQgEAAgEgCg");
	this.shape_11.setTransform(-1.3051,-46.1284,0.1266,0.1266);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F79D8D").s().p("AixAiQgPgBgJgJQgKgKAAgOQAAgNAKgKQAJgJAPgBIFjAAQAOABAKAJQAKAKAAANQAAAOgKAKQgKAJgOABg");
	this.shape_12.setTransform(-3.923,-32.7594,0.1266,0.1266);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#61544D").s().p("AgyBaQgWgVAAgeIAAhNQAAgeAWgVQAVgVAdAAQAeAAAWAVQAVAVAAAeIAABNQAAAegVAVQgWAVgeAAQgdAAgVgVg");
	this.shape_13.setTransform(-1.2418,-39.6632,0.1266,0.1266);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#61544D").s().p("AgyBaQgWgVAAgeIAAhNQAAgeAWgVQAVgVAdAAQAeAAAWAVQAVAVAAAeIAABNQAAAegVAVQgWAVgeAAQgdAAgVgVg");
	this.shape_14.setTransform(-7.9652,-39.6632,0.1266,0.1266);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FCD4A0").s().p("ApvN1QjHjIAAkZIAAsmQAAkaDHjHQDIjIEaAAQEYAADHDIQDIDHAAEaIAAFWIBFAAQBZAAA/A+QBABAAABZQAABahAA/Qg/BAhZAAIhFAAIAAAgQAAEZjIDIQjHDHkYAAQkaAAjIjHg");
	this.shape_15.setTransform(0.4074,-39.2454,0.1266,0.1266);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E1AA74").s().p("AlMkuIKYhHIlCLqg");
	this.shape_16.setTransform(-1.2568,-21.6368,0.1268,0.1268);

	this.instance_2 = new lib.Pathcopy3();
	this.instance_2.setTransform(7.05,-14.1,0.1267,0.1267,0,0,0,15,107.4);
	this.instance_2.alpha = 0.3008;

	this.instance_3 = new lib.Path_1copy3();
	this.instance_3.setTransform(0.55,-14.1,0.1267,0.1267,0,0,0,13.4,107.4);
	this.instance_3.alpha = 0.3008;

	this.instance_4 = new lib.Path_2copy3();
	this.instance_4.setTransform(0.5,-4.8,0.1267,0.1267,0,0,0,90.4,12.7);
	this.instance_4.alpha = 0.3008;

	this.instance_5 = new lib.Path_3copy();
	this.instance_5.setTransform(0.5,-10.9,0.1267,0.1267,0,0,0,90.4,12.2);
	this.instance_5.alpha = 0.3008;

	this.instance_6 = new lib.Path_4copy();
	this.instance_6.setTransform(0.5,-17,0.1267,0.1267,0,0,0,90.4,12.2);
	this.instance_6.alpha = 0.3008;

	this.instance_7 = new lib.Path_5copy3();
	this.instance_7.setTransform(0.5,-23.05,0.1267,0.1267,0,0,0,90.4,12.7);
	this.instance_7.alpha = 0.3008;

	this.instance_8 = new lib.Path_6copy3();
	this.instance_8.setTransform(-6,-14.1,0.1267,0.1267,0,0,0,13.4,107.4);
	this.instance_8.alpha = 0.3008;

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#F07167").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_17.setTransform(0.4835,-14.0659,0.1267,0.1267);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FCD4A0").s().p("AuCQvMAAAghdIcFAAMAAAAhdg");
	this.shape_18.setTransform(0.4835,-14.0659,0.1267,0.1267);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#61544D").s().p("AnKD4IAAhfIHvmQIFVAAIBRD3IAAD4g");
	this.shape_19.setTransform(7.1162,50.4041,0.1268,0.1268);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3A9BD5").s().p("AIubtMAAAgxvIxcAAMAAAAxvIlUAAMAAAg3ZIcFAAMAAAA3Zg");
	this.shape_20.setTransform(0.5091,24.7714,0.1268,0.1268);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#61544D").s().p("AnKD4IAAhfIHwmQIFUAAIBSD3IAAD4g");
	this.shape_21.setTransform(-11.364,50.4041,0.1268,0.1268);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#445259").s().p("AuCBsIAAjXIcFAAIAADXg");
	this.shape_22.setTransform(0.5091,0.9206,0.1268,0.1268);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#61544D").s().p("AgFALQgDgDAAgDIAAgJQAAgDADgDQACgDADAAQAEAAADADQACADAAADIAAAJQAAADgCADQgDADgEAAQgDAAgCgDg");
	this.shape_23.setTransform(-0.425,-39.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FCD4A0").s().p("AhOBwQgZgZAAgkIAAhlQAAgkAZgZQAZgZAkAAQAjAAAZAZQAZAZAAAkIAAArIAJAAQALAAAIAHQAIAIAAAMQAAALgIAIQgIAIgLAAIgJAAIAAAEQAAAkgZAZQgZAZgjAAQgkAAgZgZg");
	this.shape_24.setTransform(0.425,-39.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13,p:{scaleX:0.1266,scaleY:0.1266,x:-1.2418,y:-39.6632}},{t:this.shape_12,p:{scaleX:0.1266,scaleY:0.1266,x:-3.923,y:-32.7594}},{t:this.shape_11,p:{scaleX:0.1266,scaleY:0.1266,x:-1.3051,y:-46.1284}},{t:this.shape_10,p:{scaleX:0.1266,scaleY:0.1266,x:7.8904,y:-37.1151}},{t:this.shape_9,p:{scaleX:0.1266,scaleY:0.1266,x:-1.3969,y:-28.8596}},{t:this.shape_8,p:{scaleX:0.1267,scaleY:0.1267,x:-4.5272,y:-35.3124}},{t:this.shape_7,p:{scaleX:0.1267,scaleY:0.1267,x:-8.0651,y:-41.9639}},{t:this.shape_6,p:{scaleX:0.1267,scaleY:0.1267,x:-1.0146,y:-41.9639}},{t:this.shape_5},{t:this.instance_1},{t:this.shape_4},{t:this.shape_3},{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.shape_16},{t:this.shape_24},{t:this.shape_13,p:{scaleX:0.1267,scaleY:0.1267,x:-7.1477,y:-39.6498}},{t:this.shape_23},{t:this.shape_12,p:{scaleX:0.0961,scaleY:0.1267,x:-3.8708,y:-32.6394}},{t:this.shape_11,p:{scaleX:0.1267,scaleY:0.1267,x:-1.2812,y:-46.1213}},{t:this.shape_10,p:{scaleX:0.1267,scaleY:0.1267,x:7.9232,y:-37.0992}},{t:this.shape_9,p:{scaleX:0.1267,scaleY:0.1267,x:-1.3731,y:-28.8358}},{t:this.shape_8,p:{scaleX:0.1268,scaleY:0.1268,x:-4.5142,y:-35.3015}},{t:this.shape_7,p:{scaleX:0.1268,scaleY:0.1268,x:-7.0543,y:-41.9569}},{t:this.shape_6,p:{scaleX:0.1268,scaleY:0.1268,x:-0.9995,y:-42.9569}},{t:this.shape_5},{t:this.instance_1},{t:this.shape_4},{t:this.shape_3},{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},6).wait(7));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-26.1,-53.5,53.2,107.1);


(lib.bgAnimation1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_4
	this.instance = new lib.fish1();
	this.instance.setTransform(-102.8,98.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_5
	this.instance_1 = new lib.fish2();
	this.instance_1.setTransform(-111.1,95.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Isolation_Mode
	this.instance_2 = new lib.person1();
	this.instance_2.setTransform(178.4,42.7,1,1,0,0,0,0.5,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_6
	this.instance_3 = new lib.worm1();
	this.instance_3.setTransform(-106.1,96.4);

	this.instance_4 = new lib.worm1();
	this.instance_4.setTransform(-102.4,101.9);

	this.instance_5 = new lib.worm1();
	this.instance_5.setTransform(-93.95,108.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(1));

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1E8FA").s().p("AgGA9QgOgKAQgiQANgagigIQgcgDgSgEQghgJAHgSQAFgNAcgCQAWgBARAEQgegCgSAFQgWAVASADIAGABIAdAEIAgAEQAVAEAFAKQAHANgJANIgRAXQgPAXAdABQAUAAAVgGIAugOQABAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQggANgUAHQgTAGgOAAQgNAAgGgGg");
	this.shape.setTransform(-94.6579,101.0217,0.6697,0.6695);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C1E8FA").s().p("AgpBmQg5gCgngSQgXgLgDgRQgCgRASgSQAVgTArgLQAYgGAugIQBBgNAdgKQA2gUAaghQABAAABAAQAAAAAAAAQABAAAAAAQAAABgBAAQgZAnhBAWIhsAaQgyAMgWAJQg4AaASAUQANAOAWAHQAlALAvAFQAdADA3ABQABAAABABQAAAAAAAAQABAAgBABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAIhaACIgHAAg");
	this.shape_1.setTransform(-182.1609,117.4588,0.6697,0.6695);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C1E8FA").s().p("AiaBIQAAgBgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIADgBQBUAVAYAFQA/AMAxgCQAugWgwgIIgNgFIgdgKQgggOgKgMQgUgYAVgTQAQgQAkgNIAwgOQAdgIARgIQAdgNgWgLQgRgJgcgBQhGgFhaAHQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQB1gQBMAPQApAIgMAUQgKARgiALQgoALgZAIQgsAPgFAQQgIAXA3AaQBEAfAGAIQALANgaAGQgQAEgVAAQhagBiAgog");
	this.shape_2.setTransform(-220.465,116.0129,0.6697,0.6695);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AjQAuQAAgBAAAAQABAAAAgBQAAAAABAAQABAAAAgBQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQgCAZBzgRQBFgLBDgQIBJgSQAqgMAagRQAhgXgkgMQgbgJgeAAQgqAEgVAAIABgBIBTgHQBBAAgEAgQgCANgTAMIgfANQgoARg+AQQhEAThRALQgpAGgbAAQg3AAAIgYg");
	this.shape_3.setTransform(-274.1666,94.1607,0.6697,0.6695);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C1E8FA").s().p("AgdCGQg5AAgEgWQgEgaArgTQAYgKAngLQAYgJAGgEQATgKADgMQAFgPgIgNQgFgKgPgMQgTgPgEgFQgMgNAAgOQAAgUAigRQAjgRAQAKIAAABQgXgBgeARQgkAUASAUQAHAIAQALQARANAHAHQARATgFAWQgGAWgXANQgXANgqAOIgmAMQgaALAAANQABAUA1AEQAaACApgCQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgnAEgaAAIgGAAg");
	this.shape_4.setTransform(-133.8862,120.6367,0.6697,0.6695);

	this.instance_6 = new lib.ClipGroup_4();
	this.instance_6.setTransform(-187.35,109.5,0.6698,0.6696,0,0,0,169.8,36.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5CCAF3").s().p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOgAOMAOIhaARQgYADgPADQgcAHgDANQgEAQAaAMQAiAPADADQAwA0hGAtQgqAahLAUIguALQgoAMAAANQABAQAjAEIAyABQBwAABrgSQCzgfgfhBQgIgQhEgaQg8gYACgeQABggAzgDQBEgEAEgCQAbgPgOgMQgMgJgcgEQgQgDgSAAQgaAAgeAFgAtmBfQg1ACAEAbQAFAdBiAMQAzAGBEACQAtAHBiAZQBcAXAyAHQAdAEAYgBQAogCAFgQQAIgUgggRQgFgEgrgQQg/gbAKggQAJgbA+geIBignQA+ggg5gQQgbgIgxACIhMAGQhBACiEAAQhEAAiEAFQggABgYAHQgmALASAWQASAVA3ACQAdABAygEQAbAAA9gEQA5gEAeABQARAAAIAFQgKAJgZAFQgaAFgJAHQgUAQAOAPQAIAJAWARQAMAPABAHQACAKgTABQgIAAgQgIQgTgIgFgBQhRgShVgJQgkgEgVAAIgLABgAUtjRQgrABgTAPQghAaAsAPQA7AVAEAKQAGANgDAPIgGAUQgBAQAzgBQA8gFBogcQCEglgWgfQgQgYhKAPQhSARgOgGQgegNAwgaQAagNAogSQAdgZgPgUQgOgVghASIg+ApQgkAXggACIgxgBIgTABgA4LjpQhDAGAKAlQAMArB7gDQBXgBBGgQQB3gbAzgRQCDgsgegpQgNgUglAAQgpACgRAAQgYgBgvgDQgxgEgYAAQg0gBgQACQgwAFgJAZQgGAQAXALQAUALgJANQgFAIgdABIgkgBIhBgCIgWABg");
	this.shape_5.setTransform(-187.3423,109.9803,0.6698,0.6696);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#10481B").s().p("AgUAjIgJgJQgIgIACgDQACgDAKAHIAKAIIgFgQQgDgPACgBQAEAAAJATIABgYQACgYAGgBQAMgBgMAxIAIgKQAJgJADABQAGABgNAcIAGgFQAHgGAFAAQAJAAgZAYg");
	this.shape_6.setTransform(-141.5294,85.0128,0.6695,0.6694);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#237812").s().p("AgZAqIgNgMQgMgOADgFQAGgKATASIgEgPQgEgPAFgEQAHgGAIAVQgCgJABgKQADgVALgBQAMgBgCAXQgBALgDALIAIgEQAJgFAGADQAKADgQARIAJgEQAJgCAEAFQAGAJgZASg");
	this.shape_7.setTransform(-141.4917,84.6115,0.6695,0.6694);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#10481B").s().p("AgeAYIgFgHQgGgIADgBQAFgBAOAOIgDgSQgBgSAFAAQAHAAAJAcIABgRQABgSAGgBQAJgCAAApIAJgJQAJgIAFAAQAHAAgNAZg");
	this.shape_8.setTransform(-271.9444,85.3297,0.6695,0.6694);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#237812").s().p("AglAgIgIgLQgHgLACgDQACgDALAIIALAHIgDgUQgCgVAGgDQAIgFAKAeIAEgOQAEgPAHgCQAHgBABAVIAAATIALgGQAMgFAHADQALADgNAdg");
	this.shape_9.setTransform(-271.8356,84.878,0.6695,0.6694);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#10481B").s().p("AgoAUIgIgHQgIgHACgCQACgCAIAFIAHAFIgDgMQgCgNADAAQAEAAAFAYIABgOQADgPAGgBQAJgCgCAhIAHgMQAHgNAGgBQAKgCgKAcIALgMQAMgKAGABQAIABgPAUIAKgFQALgGAEgBQAHAAgRAUg");
	this.shape_10.setTransform(-233.3391,85.7302,0.6697,0.6695);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8ED7F7").s().p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOg");
	this.shape_11.setTransform(-187.3526,109.9771,0.6697,0.6695);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#237812").s().p("AhRAzQgHgTgFgTQgLgmAJgGQAJgGANAXQAHAMAFAMQABgMADgMQAFgaANgBQANgBABAUQAAAIgBAJQADgNAFgMQANgbAPADQAQADgIAZQgEANgIAMIATgIQAUgGAHAIQAHAHgNAQIgOAQIAbgGQAcgEAKAIQAJAIgSAJIgTAIg");
	this.shape_12.setTransform(-100.8411,85.3883,0.6695,0.6694);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#237812").s().p("Ag6ATQgLgMABgDQABgDALAFIALAGIgBgPQgBgRADgCQAEgDAJAYIADgOQAEgOAFAAQAJAAACAbQAKgRAOgBQANgBgHASQAMgLAKACQALACgGAOIAHgEQAHgCAEACQAEADgHALQgHALgIAEIhgABIgLgLg");
	this.shape_13.setTransform(-233.2902,85.1645,0.6697,0.6695);

	this.instance_7 = new lib.Path_1_4();
	this.instance_7.setTransform(-118.25,133.1,0.6696,0.6695,0,0,0,5.6,10);
	this.instance_7.alpha = 0.6016;
	this.instance_7.compositeOperation = "multiply";

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#279FC9").s().p("AhpglQBvgOBLgdIgUghIA+ASIgSAwQgSA5gEAzQhEAfiJAWg");
	this.shape_14.setTransform(-122.0563,134.1633,0.6695,0.6694);

	this.instance_8 = new lib.Path_2_1_3();
	this.instance_8.setTransform(-169.6,136.4,0.6696,0.6695,0,0,0,38,11.8);
	this.instance_8.alpha = 0.6016;
	this.instance_8.compositeOperation = "multiply";

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#279FC9").s().p("ACTBuQkhgIkNgrIgJgBIgPiRQCtAWCYAMQEuAXB8gaIAEgvIAxArIgIgaQgHgbACACIAxA0IAfACIgWClQhAAEhTAAIh4gCg");
	this.shape_15.setTransform(-173.2236,136.2036,0.6695,0.6694);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#03507F").s().p("AgihJQAngCAqgFIgRCWQggAGgsAFQAEhNAIhNg");
	this.shape_16.setTransform(-132.2998,137.0751,0.6695,0.6694);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#279FC9").s().p("Ah5BYIAWilQB3ACBmgMIgRCWQhHAMhTAIIhFAFg");
	this.shape_17.setTransform(-137.3379,137.5437,0.6695,0.6694);

	this.instance_9 = new lib.Path_0_3();
	this.instance_9.setTransform(-212.35,133.35,0.6696,0.6695,0,0,0,15.2,10.4);
	this.instance_9.alpha = 0.6016;
	this.instance_9.compositeOperation = "multiply";

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#279FC9").s().p("AjdAaIgch6QAxALA0AGQCeAbBIABQAyABAYgNQAagOAfgXIgJA1IAcglIABAOIgDAZIAGABIAOCRQkOgZjJgyg");
	this.shape_18.setTransform(-218.1979,133.3098,0.6695,0.6694);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F9CA67").s().p("AgBgEIADgFIgCATg");
	this.shape_19.setTransform(-202.5481,127.938,0.6695,0.6694);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F9CA67").s().p("AgCAMIACgYIADAZg");
	this.shape_20.setTransform(-202.5984,129.4608,0.6695,0.6694);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#03507F").s().p("AgOA0Igah2QAUAFAiAHIAcB6g");
	this.shape_21.setTransform(-235.8384,130.5084,0.6697,0.6695);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#279FC9").s().p("AhjAVQgWglgWg2IgSguIAYAAQAbABARAFIgUASIA4AdQBOAjBxAXIAcB6Qilgqhgg2g");
	this.shape_22.setTransform(-243.8915,127.2277,0.6697,0.6695);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#03507F").s().p("AAMBWQgUhhghhOIAtAFIAlCug");
	this.shape_23.setTransform(-280.1778,110.8518,0.6695,0.6694);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#279FC9").s().p("ACoCSQhQgJhYgYIhGgVQAGgUgJgnQgVhPhShkQA1AXEHBgIAlCug");
	this.shape_24.setTransform(-289.2497,107.0363,0.6695,0.6694);

	this.instance_10 = new lib.Path_2_0_3();
	this.instance_10.setTransform(-257,114.25,0.6696,0.6695,0,0,0,6.9,8.3);
	this.instance_10.alpha = 0.6016;
	this.instance_10.compositeOperation = "multiply";

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#279FC9").s().p("ABJBiQhygLiBgSIgmivQAqADAYgBQgSAQgJAQIgFANIAngPQAsgQAbgBQgSANgFAQQgCAIABAGIA6gHQBYgCCXATIgjBSIgBAqQAAALgGAJIhegIg");
	this.shape_25.setTransform(-265.934,112.291,0.6695,0.6694);

	this.instance_11 = new lib.Path_10();
	this.instance_11.setTransform(-85.15,106.8,0.6696,0.6695,0,0,0,16.6,8.1);
	this.instance_11.alpha = 0.6016;
	this.instance_11.compositeOperation = "multiply";

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#279FC9").s().p("AjPACQDBghBlgjQCBguAbgMQggBigOAhIm3B2QAGg5AdhCg");
	this.shape_26.setTransform(-89.9198,109.8645,0.6695,0.6694);

	this.instance_12 = new lib.Path_2_4();
	this.instance_12.setTransform(-115.7,115.6,0.6696,0.6695,0,0,0,7.2,5.7);
	this.instance_12.alpha = 0.6016;
	this.instance_12.compositeOperation = "multiply";

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#03507F").s().p("Ah6AGIC3hBIA+gKQgdBCgGA4Ig/ARg");
	this.shape_27.setTransform(-112.0974,114.6841,0.6695,0.6694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.instance_12},{t:this.shape_26},{t:this.instance_11},{t:this.shape_25},{t:this.instance_10},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.instance_9},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.instance_8},{t:this.shape_14},{t:this.instance_7},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.instance_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Isolation_Mode
	this.instance_13 = new lib.birdcopy();
	this.instance_13.setTransform(306.25,-127.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_1
	this.instance_14 = new lib.flash0ai();
	this.instance_14.setTransform(-301.1,-168.6,0.3441,0.3441);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bgAnimation1copy, new cjs.Rectangle(-301.1,-168.6,621.1,337.29999999999995), null);


(lib.bgAnimation1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Isolation_Mode
	this.instance_11 = new lib.water();
	this.instance_11.setTransform(185.05,111.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_1
	this.instance_12 = new lib.miner();
	this.instance_12.setTransform(-115,13.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Isolation_Mode
	this.instance_13 = new lib.bird_1();
	this.instance_13.setTransform(306.25,-127.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_1
	this.instance_14 = new lib.flash0ai();
	this.instance_14.setTransform(-301.1,-168.6,0.3441,0.3441);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bgAnimation1_1, new cjs.Rectangle(-301.1,-168.6,621.1,337.29999999999995), null);


(lib.person1copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_63 = function() {
		var root = this
		root.stop();
		var root = this
		root.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(63).call(this.frame_63).wait(31));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABAMQAHgJAAgJIAAgKIAMAAIAAAJQAAAHgDAGQgEAHgEAEgAgTAMQAHgJgBgJIAAgKIANAAIAAAJQAAAHgDAGQgDAHgGAEg");
	this.shape.setTransform(-67.65,-83.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgGAwQgCgBAAgDQAAgEACgCQACgBAEAAQACAAACABQACACAAAEQAAADgCABQgCADgCAAQgEAAgCgDgAgHAWQAAgIACgFQABgEAEgFIAJgJQAGgHAAgIQAAgGgEgFQgDgEgIAAQgFAAgFAEQgEADAAAHIgNAAQABgMAHgGQAIgHALAAQANAAAIAHQAHAHAAAMQAAAMgLAMIgIAGQgFAFAAALg");
	this.shape_1.setTransform(-73.375,-79.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAQA1IgZgjIgIAJIAAAaIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_2.setTransform(-79.725,-79.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgEgDQgEgEgHAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgGAGgDQAIgCAHAAQAMAAAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMgBQgKABgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgCQAFgEACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_3.setTransform(-87.55,-78.15);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgWA0IgEgBIAAgLIADABQAHAAADgDQAEgDACgHIADgHIgbhIIAPAAIARA2IARg2IANAAIgdBVQgGASgPAAg");
	this.shape_4.setTransform(-94.65,-76.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AARAmIAAgwQAAgIgEgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLAMAAQAYAAAAAbIAAAwg");
	this.shape_5.setTransform(-101.85,-78.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgGAzIAAhJIANAAIAABJgAgEglQgDgCAAgDQAAgDADgCQABgCADAAQAEAAACACQABACAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_6.setTransform(-107.4,-79.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAnAmIAAgwQAAgIgDgEQgEgEgIAAQgIAAgEAEQgFAFgBAHIAAAwIgLAAIAAgwQAAgQgQAAQgNAAgEALIAAA1IgNAAIAAhJIAMAAIABAIQAIgKAOAAQAPAAAFAMQADgFAGgDQAGgEAIAAQAZAAAAAaIAAAxg");
	this.shape_7.setTransform(-115.225,-78.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_8.setTransform(-123.35,-78.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgVAcQgJgJAAgRIAAgCQAAgLAEgIQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAKAAARIAAAFIgxAAQABAKAGAIQAGAGAIAAQAHAAAFgDQAEgCAEgFIAHAGQgJAOgSAAQgPAAgJgKgAgLgVQgFAFgBAKIAkAAIAAgBQgBgJgEgFQgFgGgIAAQgHAAgFAGg");
	this.shape_9.setTransform(-129.725,-78.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_10.setTransform(-137.275,-79.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAHgDAIAAQAMABAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgLAAgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_11.setTransform(-42,-96.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgWA0IgEgBIAAgLIADABQAGAAAEgDQAEgDACgHIADgHIgbhIIAOAAIASA2IARg2IANAAIgdBVQgGASgPAAg");
	this.shape_12.setTransform(-49.1,-95.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AARAmIAAgwQgBgIgDgEQgEgEgHAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_13.setTransform(-56.3,-97.025);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgRAmIAAhJIAMAAIAAAIQAGgKALAAIAGABIAAAMIgHAAQgLAAgFAKIAAA0g");
	this.shape_14.setTransform(-62.15,-97.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AgFAzIAAhJIALAAIAABJgAgEglQgCgCAAgDQAAgDACgCQACgCACAAQAEAAABACQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_15.setTransform(-66.6,-98.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAHgEQAGgDAHAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_16.setTransform(-72.1,-96.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AAQA1IgZgjIgIAIIAAAbIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_17.setTransform(-82.425,-98.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgXAcQgKgLAAgRIAAAAQAAgLAFgIQAEgJAIgEQAHgGAJAAQAPAAAKALQAJAKAAARIAAABQAAALgEAJQgEAIgIAEQgIAFgKABQgOAAgJgLgAgOgUQgGAIAAANQAAAMAGAIQAGAHAIAAQAKAAAFgHQAGgIAAgNQAAgMgGgIQgFgHgKAAQgIAAgGAHg");
	this.shape_18.setTransform(-90.475,-96.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAQA1IgZgjIgIAIIAAAbIgNAAIAAhpIANAAIAAA/IAHgIIAWgXIAPAAIgcAdIAgAsg");
	this.shape_19.setTransform(-97.525,-98.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AgXAgQgHgGAAgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgEgEgIAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAGgEQAIgDAHAAQAMABAIAGQAGAHABALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMAAQgKAAgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_20.setTransform(-108.8,-96.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgDgEgIAAQgGAAgEAEQgFADgBAEIgMAAQAAgFAEgFQAEgFAHgEQAHgDAGAAQANABAHAGQAIAHAAALIAAAgQAAALADAGIAAABIgOAAIgBgIQgKAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_21.setTransform(-116.4,-96.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIAMAAIAAgFQAAgIgEgDQgEgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAGgEQAIgDAHAAQAMABAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgCgIQgIAKgMAAQgKAAgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_22.setTransform(-124,-96.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgWAgQgIgGABgKQgBgLAKgGQAIgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADgBAEIgMAAQAAgFAEgFQAEgFAHgEQAHgDAGAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgJAAQgXAAAAAOg");
	this.shape_23.setTransform(-131.6,-96.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgXAgQgGgGgBgKQABgLAIgGQAJgGAPAAIANAAIAAgFQgBgIgEgDQgEgEgHAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAHgDAIAAQAMABAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgLAAgHgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgLAAQgWAAAAAOg");
	this.shape_24.setTransform(-139.2,-96.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgWAgQgIgGAAgKQAAgLAJgGQAJgGAPAAIAMAAIAAgFQAAgIgDgDQgFgEgHAAQgGAAgFAEQgEADAAAEIgNAAQAAgFAEgFQAEgFAHgEQAGgDAHAAQANABAIAGQAGAHABALIAAAgQAAALADAGIAAABIgOAAIgCgIQgJAKgKAAQgMAAgGgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAFgDQAGgDACgFIAAgPIgKAAQgWAAAAAOg");
	this.shape_25.setTransform(-146.8,-96.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgXAgQgGgGAAgKQAAgLAJgGQAIgGAPAAIANAAIAAgFQAAgIgFgDQgEgEgHAAQgGAAgEAEQgGADAAAEIgMAAQAAgFAEgFQAEgFAGgEQAHgDAHAAQANABAHAGQAIAHAAALIAAAgQAAALACAGIAAABIgNAAIgBgIQgKAKgLAAQgKAAgIgHgAgRAPQAAAFAEAEQAEAEAGgBQAFAAAGgDQAFgDADgFIAAgPIgKAAQgXAAAAAOg");
	this.shape_26.setTransform(-154.4,-96.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AAZAyIAAguIgxAAIAAAuIgNAAIAAhjIANAAIAAArIAxAAIAAgrIANAAIAABjg");
	this.shape_27.setTransform(-163.225,-98.225);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AJPEPIx4AAQhMAAg7gXQg7gXgSglIjkm+Qgbg1BCgrQBCgqBrAAIU4AAQBLAAA7AXQA7AXATAlIDjG/QAXAsguAnQgtAmhVAMIAACCg");
	this.shape_28.setTransform(-106.2724,-85.025);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AgFAyIAAhJIALAAIAABJgAgEglQgCgCgBgDQABgDACgDQACgCACAAQAEAAACACQABADAAADQAAADgBACQgCACgEAAQgCAAgCgCg");
	this.shape_29.setTransform(-95.6,-81.6);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKQgFACgFAAQgIAAgDgGg");
	this.shape_30.setTransform(-99.775,-81.075);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AgXAgQgHgGAAgJQABgMAIgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgEgEgIAAQgGAAgFADQgEAEAAAEIgNAAQAAgFAEgFQAEgFAGgDQAIgDAHAAQAMgBAIAHQAGAGABALIAAAhQAAALACAGIAAABIgNAAIgCgIQgIAJgMAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAFgDQAGgEACgEIAAgQIgKAAQgWAAAAANg");
	this.shape_31.setTransform(-105.65,-80.25);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AgWAgQgIgGAAgJQAAgMAJgFQAJgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEADAAAFIgNAAQAAgFAEgFQAEgGAHgDQAGgCAHAAQANgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEACgEIAAgQIgKAAQgWAAAAAOg");
	this.shape_32.setTransform(-44.2,-99.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_33.setTransform(-52.125,-100.525);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_34.setTransform(-59.7,-99.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHALAAARIAAACQAAAPgHALQgIAKgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGALAMAAQAIgBAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_35.setTransform(-67.275,-97.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_36.setTransform(-78.6,-99.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AgVAzIgGAAIAAgLIAEABQAHAAADgDQAEgDACgGIADgIIgahIIANAAIASA2IARg2IAOAAIgeBUQgGATgPAAg");
	this.shape_37.setTransform(-85.7,-97.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgDgEgIAAQgFAAgFADQgFAEgDAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_38.setTransform(-92.9,-99.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_39.setTransform(-100.65,-99.125);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgFADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALADAGIAAABIgOAAIgBgIQgKAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_40.setTransform(-108.3,-99.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AAQA1IgZgiIgIAIIAAAaIgNAAIAAhoIANAAIAAA+IAHgIIAWgYIAPAAIgcAfIAgArg");
	this.shape_41.setTransform(-115.175,-100.6);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgGAzIAAhKIANAAIAABKgAgEglQgDgCAAgDQAAgDADgCQABgDADAAQAEAAACADQABACAAADQAAADgBACQgCACgEAAQgDAAgBgCg");
	this.shape_42.setTransform(-120.9,-100.4);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AAQA1IAAgyQAAgGgDgEQgEgEgHAAQgGAAgEADQgEADgEAFIAAA1IgMAAIAAhoIAMAAIAAAnQAJgKANAAQAXAAAAAZIAAAyg");
	this.shape_43.setTransform(-129.9,-100.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgWAfQgGgHAAgOIAAgvIANAAIAAAvQAAARANAAQAOAAAEgLIAAg1IANAAIAABJIgMAAIgBgHQgGAJgOAAQgMAAgGgHg");
	this.shape_44.setTransform(-137.6,-98.975);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgWAfQgGgHAAgOIAAgvIAMAAIAAAvQAAARAOAAQAOAAAFgLIAAg1IAMAAIAABJIgMAAIAAgHQgIAJgNAAQgMAAgGgHg");
	this.shape_45.setTransform(-145.3,-98.975);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AgWArQgIgLAAgRIAAgBQAAgQAIgKQAIgLANAAQAMAAAIAJIAAgmIAMAAIAABoIgLAAIgBgIQgIAJgMAAQgNAAgIgKgAgMgFQgGAHAAAOQAAAMAGAHQAFAHAIAAQAMAAAGgKIAAghQgGgLgMAAQgIAAgFAHg");
	this.shape_46.setTransform(-153.275,-100.525);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgWAgQgIgGABgJQgBgMAKgFQAIgHAPAAIAMAAIAAgGQAAgGgDgEQgFgEgHAAQgGAAgFADQgEADgBAFIgMAAQAAgFAEgFQAEgGAHgDQAHgCAGAAQANgBAIAHQAGAHABAKIAAAhQAAALADAGIAAABIgOAAIgCgIQgJAJgKAAQgMAAgGgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAFgCQAGgEACgEIAAgQIgJAAQgXAAAAAOg");
	this.shape_47.setTransform(-160.85,-99.05);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AASAlIgSg3IgRA3IgKAAIgWhJIANAAIAOA2IASg2IAJAAIARA3IAPg3IAMAAIgVBJg");
	this.shape_48.setTransform(-169.9,-99.05);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAIgDAGAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_49.setTransform(-69.25,-79.8);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgVAzIgGAAIAAgLIAEABQAGAAAEgDQAEgDACgGIADgIIgahIIANAAIASA3IARg3IAOAAIgeBUQgGATgPAAg");
	this.shape_50.setTransform(-76.35,-78.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGAEAAAEIgMAAQAAgFAEgFQAEgFAGgDQAHgDAHAAQANgBAHAHQAIAGAAALIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAOQAAAHAEADQAEADAGABQAFAAAGgDQAFgEADgEIAAgQIgKAAQgXAAAAANg");
	this.shape_51.setTransform(-99.05,-79.8);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgSArIgBAJIgLAAIAAhoIAMAAIAAAnQAIgKANAAQANAAAIALQAHAKAAAQIAAACQAAARgHAKQgIAKgNAAQgNAAgIgKgAgSAAIAAAfQAGALAMAAQAJAAAFgHQAFgHAAgOQAAgNgFgGQgFgHgJAAQgMAAgGAMg");
	this.shape_52.setTransform(-106.625,-81.275);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_53.setTransform(-114.325,-79.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgWAzIgEAAIAAgLIADABQAGAAAEgDQAEgDACgGIADgIIgbhIIAPAAIARA3IARg3IANAAIgdBUQgGATgPAAg");
	this.shape_54.setTransform(-121.4,-78.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgDAFIAAA0IgNAAIAAhJIAMAAIABAJQAIgLAMAAQAYAAAAAbIAAAwg");
	this.shape_55.setTransform(-128.6,-79.875);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_56.setTransform(-136.075,-79.8);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AgeA0IAAhmIALAAIABAIQAIgJAMAAQAOAAAIAKQAHAKAAASIAAABQAAAQgHAKQgIALgNAAQgNAAgIgIIAAAjgAgSgeIAAAiQAGAKAMAAQAIAAAFgGQAGgIAAgNQAAgNgGgHQgFgHgIAAQgMAAgGAKg");
	this.shape_57.setTransform(-143.625,-78.45);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQACgDACAAQAEAAABADQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_58.setTransform(-27.55,-99.95);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_59.setTransform(-33.15,-98.675);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AgFAzIAAhKIALAAIAABKgAgEglQgCgCAAgDQAAgDACgCQACgDACAAQAEAAABADQACACAAADQAAADgCACQgBACgEAAQgCAAgCgCg");
	this.shape_60.setTransform(-38.7,-99.95);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_61.setTransform(-47.65,-98.6);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_62.setTransform(-53.925,-99.425);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgDgEgIAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgDQAIgCAGAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_63.setTransform(-59.8,-98.6);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AgVAzIgGAAIAAgLIAEABQAGAAAEgDQAEgDACgGIADgIIgahIIANAAIASA2IARg2IAOAAIgeBUQgGATgPAAg");
	this.shape_64.setTransform(-66.9,-97.1);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AAQAmIAAgwQAAgIgDgEQgEgEgHAAQgGAAgEADQgEAEgEAFIAAA0IgMAAIAAhJIAMAAIAAAJQAJgLANAAQAXAAAAAbIAAAwg");
	this.shape_65.setTransform(-74.1,-98.675);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_66.setTransform(-79.95,-98.675);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgIAIgGQAHgEAIAAQAOAAAIAJQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgDAEgFIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgKgEgFQgFgFgIAAQgHAAgFAFg");
	this.shape_67.setTransform(-86.325,-98.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AgBApQgFgFAAgJIAAgtIgNAAIAAgKIANAAIAAgSIAMAAIAAASIAOAAIAAAKIgOAAIAAAtQAAAEACADQACACAEAAIAGgBIAAAKIgKACQgIAAgDgGg");
	this.shape_68.setTransform(-92.575,-99.425);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgIAMQAGgIAAgJIAAgLIAMAAIAAAJQgBAHgDAHQgDAGgFAFg");
	this.shape_69.setTransform(-99.7,-94.65);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgGA1IAAhoIANAAIAABog");
	this.shape_70.setTransform(-117.85,-100.15);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgXAgQgGgGAAgJQAAgMAJgFQAIgHAPAAIANAAIAAgGQAAgGgFgEQgEgEgHAAQgGAAgEADQgGADAAAFIgMAAQAAgFAEgFQAEgGAGgDQAHgCAHAAQANgBAHAHQAIAHAAAKIAAAhQAAALACAGIAAABIgNAAIgBgIQgKAJgLAAQgKAAgIgGgAgRAPQAAAGAEADQAEADAGAAQAFAAAGgCQAFgEADgEIAAgQIgKAAQgXAAAAAOg");
	this.shape_71.setTransform(-123.35,-98.6);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("AARAlIgRg3IgRA3IgKAAIgVhJIAMAAIAPA2IARg2IAJAAIASA3IAOg3IANAAIgWBJg");
	this.shape_72.setTransform(-132.4,-98.6);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_73.setTransform(-141.675,-98.6);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_74.setTransform(-149.675,-98.6);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_75.setTransform(-157.675,-98.6);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_76.setTransform(-165.675,-98.6);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#000000").s().p("AgXAcQgKgKAAgSIAAAAQAAgKAFgJQAEgJAIgFQAHgEAJAAQAPAAAKAKQAJAKAAARIAAABQAAALgEAIQgEAJgIAFQgIAEgKAAQgOAAgJgKgAgOgTQgGAHAAANQAAAMAGAHQAGAIAIAAQAKAAAFgIQAGgHAAgNQAAgMgGgHQgFgIgKAAQgIAAgGAIg");
	this.shape_77.setTransform(-173.675,-98.6);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#000000").s().p("AgUAtQgIgFgFgLQgGgLAAgOIAAgGQAAgOAFgLQAFgLAJgGQAKgGAKAAQAMAAAJAGQAJAFAFALQAFALAAAPIAAAFQAAAPgFALQgFALgJAFQgJAGgMAAQgLAAgJgGgAgSgdQgIAJAAARIAAAGQAAARAIAKQAGAKAMAAQANAAAHgJQAHgKAAgRIAAgGQAAgSgHgJQgHgKgNAAQgMAAgGAKg");
	this.shape_78.setTransform(-182.5,-99.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10,p:{x:-137.275,y:-79.625}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7,p:{x:-115.225,y:-78.225}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_28},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43,p:{x:-129.9,y:-100.6}},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39,p:{x:-100.65,y:-99.125}},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34,p:{x:-59.7,y:-99.05}},{t:this.shape_33},{t:this.shape_32},{t:this.shape_7,p:{x:-115.575,y:-80.325}},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]},31).to({state:[{t:this.shape_28},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_34,p:{x:-112.35,y:-98.6}},{t:this.shape_43,p:{x:-104.7,y:-100.15}},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_10,p:{x:-91.175,y:-81.275}},{t:this.shape_39,p:{x:-83.55,y:-79.875}},{t:this.shape_50},{t:this.shape_49}]},32).wait(31));

	// Layer_1
	this.instance = new lib.dalemPerson1copy();
	this.instance.setTransform(0.5,0,1,1,0,0,0,0.5,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(94));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-206.4,-124.7,233.5,178.3);


(lib.bgAnimation1copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_4
	this.instance = new lib.fish1copy();
	this.instance.setTransform(-102.8,98.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_5
	this.instance_1 = new lib.fish2copy();
	this.instance_1.setTransform(-111.1,95.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Isolation_Mode
	this.instance_2 = new lib.person1copy();
	this.instance_2.setTransform(178.4,42.7,1,1,0,0,0,0.5,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_6
	this.instance_3 = new lib.worm1copy();
	this.instance_3.setTransform(-106.1,96.4);

	this.instance_4 = new lib.worm1copy();
	this.instance_4.setTransform(-102.4,101.9);

	this.instance_5 = new lib.worm1copy();
	this.instance_5.setTransform(-93.95,108.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3}]}).wait(1));

	// Isolation_Mode
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#C1E8FA").s().p("AgGA9QgOgKAQgiQANgagigIQgcgDgSgEQghgJAHgSQAFgNAcgCQAWgBARAEQgegCgSAFQgWAVASADIAGABIAdAEIAgAEQAVAEAFAKQAHANgJANIgRAXQgPAXAdABQAUAAAVgGIAugOQABAAAAAAQAAABAAAAQAAAAAAAAQAAAAgBAAQggANgUAHQgTAGgOAAQgNAAgGgGg");
	this.shape.setTransform(-94.6485,101.0235,0.6697,0.6696);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C1E8FA").s().p("AgpBmQg5gCgngSQgXgLgDgRQgCgRASgSQAVgTArgLQAYgGAugIQBBgNAdgKQA2gUAaghQABAAABAAQAAAAAAAAQABAAAAAAQAAABgBAAQgZAnhBAWIhsAaQgyAMgWAJQg4AaASAUQANAOAWAHQAlALAvAFQAdADA3ABQABAAABABQAAAAAAAAQABAAgBABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAIhaACIgHAAg");
	this.shape_1.setTransform(-182.1554,117.462,0.6697,0.6696);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C1E8FA").s().p("AiaBIQAAgBgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIADgBQBUAVAYAFQA/AMAxgCQAugWgwgIIgNgFIgdgKQgggOgKgMQgUgYAVgTQAQgQAkgNIAwgOQAdgIARgIQAdgNgWgLQgRgJgcgBQhGgFhaAHQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQB1gQBMAPQApAIgMAUQgKARgiALQgoALgZAIQgsAPgFAQQgIAXA3AaQBEAfAGAIQALANgaAGQgQAEgVAAQhagBiAgog");
	this.shape_2.setTransform(-220.4613,116.016,0.6697,0.6696);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AjQAuQAAgBAAAAQABAAAAgBQAAAAABAAQABAAAAgBQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQgCAZBzgRQBFgLBDgQIBJgSQAqgMAagRQAhgXgkgMQgbgJgeAAQgqAEgVAAIABgBIBTgHQBBAAgEAgQgCANgTAMIgfANQgoARg+AQQhEAThRALQgpAGgbAAQg3AAAIgYg");
	this.shape_3.setTransform(-274.1654,94.1618,0.6697,0.6696);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C1E8FA").s().p("AgdCGQg5AAgEgWQgEgaArgTQAYgKAngLQAYgJAGgEQATgKADgMQAFgPgIgNQgFgKgPgMQgTgPgEgFQgMgNAAgOQAAgUAigRQAjgRAQAKIAAABQgXgBgeARQgkAUASAUQAHAIAQALQARANAHAHQARATgFAWQgGAWgXANQgXANgqAOIgmAMQgaALAAANQABAUA1AEQAaACApgCQAAAAABAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgnAEgaAAIgGAAg");
	this.shape_4.setTransform(-133.8786,120.6402,0.6697,0.6696);

	this.instance_6 = new lib.ClipGroupcopy4();
	this.instance_6.setTransform(-187.35,109.25,0.6699,0.6697,0,0,0,169.8,36);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#5CCAF3").s().p("ABHFPIksggIADgZQgkANhCAGQiFANidggQiwgjh7g2QgngRgcgRIgVgOIAJh6IkDgOIm7jDIEGiUQCKgIJSABQKVABB/gDQDEgEIpAUIKzAaQAPAAAbADQAXARA3BNQA0BIACALQgaALiCAuQhRAdjtA8IjeA3ICTBAIgyB9IgqAPQhvAriwAJIjzADQhAAOhzAAQhyAAijgOgAOMAOIhaARQgYADgPADQgcAHgDANQgEAQAaAMQAiAPADADQAwA0hGAtQgqAahLAUIguALQgoAMAAANQABAQAjAEIAyABQBwAABrgSQCzgfgfhBQgIgQhEgaQg8gYACgeQABggAzgDQBEgEAEgCQAbgPgOgMQgMgJgcgEQgQgDgSAAQgaAAgeAFgAtmBfQg1ACAEAbQAFAdBiAMQAzAGBEACQAtAHBiAZQBcAXAyAHQAdAEAYgBQAogCAFgQQAIgUgggRQgFgEgrgQQg/gbAKggQAJgbA+geIBignQA+ggg5gQQgbgIgxACIhMAGQhBACiEAAQhEAAiEAFQggABgYAHQgmALASAWQASAVA3ACQAdABAygEQAbAAA9gEQA5gEAeABQARAAAIAFQgKAJgZAFQgaAFgJAHQgUAQAOAPQAIAJAWARQAMAPABAHQACAKgTABQgIAAgQgIQgTgIgFgBQhRgShVgJQgkgEgVAAIgLABgAUtjRQgrABgTAPQghAaAsAPQA7AVAEAKQAGANgDAPIgGAUQgBAQAzgBQA8gFBogcQCEglgWgfQgQgYhKAPQhSARgOgGQgegNAwgaQAagNAogSQAdgZgPgUQgOgVghASIg+ApQgkAXggACIgxgBIgTABgA4LjpQhDAGAKAlQAMArB7gDQBXgBBGgQQB3gbAzgRQCDgsgegpQgNgUglAAQgpACgRAAQgYgBgvgDQgxgEgYAAQg0gBgQACQgwAFgJAZQgGAQAXALQAUALgJANQgFAIgdABIgkgBIhBgCIgWABg");
	this.shape_5.setTransform(-187.3241,109.9854,0.6699,0.6697);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#10481B").s().p("AgUAjIgJgJQgIgIACgDQACgDAKAHIAKAIIgFgQQgDgPACgBQAEAAAJATIABgYQACgYAGgBQAMgBgMAxIAIgKQAJgJADABQAGABgNAcIAGgFQAHgGAFAAQAJAAgZAYg");
	this.shape_6.setTransform(-141.4785,85.0138,0.6697,0.6696);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#237812").s().p("AgZAqIgNgMQgMgOADgFQAGgKATASIgEgPQgEgPAFgEQAHgGAIAVQgCgJABgKQADgVALgBQAMgBgCAXQgBALgDALIAIgEQAJgFAGADQAKADgQARIAJgEQAJgCAEAFQAGAJgZASg");
	this.shape_7.setTransform(-141.4408,84.6123,0.6697,0.6696);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#10481B").s().p("AgeAYIgFgHQgGgIADgBQAFgBAOAOIgDgSQgBgSAFAAQAHAAAJAcIABgRQABgSAGgBQAJgCAAApIAJgJQAJgIAFAAQAHAAgNAZg");
	this.shape_8.setTransform(-271.9351,85.3308,0.6697,0.6696);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#237812").s().p("AglAgIgIgLQgHgLACgDQACgDALAIIALAHIgDgUQgCgVAGgDQAIgFAKAeIAEgOQAEgPAHgCQAHgBABAVIAAATIALgGQAMgFAHADQALADgNAdg");
	this.shape_9.setTransform(-271.8262,84.879,0.6697,0.6696);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#10481B").s().p("AgoAUIgIgHQgIgHACgCQACgCAIAFIAHAFIgDgMQgCgNADAAQAEAAAFAYIABgOQADgPAGgBQAJgCgCAhIAHgMQAHgNAGgBQAKgCgKAcIALgMQAMgKAGABQAIABgPAUIAKgFQALgGAEgBQAHAAgRAUg");
	this.shape_10.setTransform(-233.3221,85.7314,0.6699,0.6697);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8ED7F7").s().p("AAwDhIjJgWIACgRQgYAJgsAEQhaAIhpgVQh2gXhSglQgagLgTgLIgOgJIAGhSIitgKIkpiCICvhjQBdgGGOABQG7ABBVgCQCDgDFyAOIHPARIAcACQAPALAmA0QAiAwACAHQgSAIhXAfQg2ATifAoIiVAlIBjArIgiBUIgcAKQhKAdh2AGIijACQgrAJhNAAQhMAAhtgJg");
	this.shape_11.setTransform(-187.325,109.9977);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#237812").s().p("AhRAzQgHgTgFgTQgLgmAJgGQAJgGANAXQAHAMAFAMQABgMADgMQAFgaANgBQANgBABAUQAAAIgBAJQADgNAFgMQANgbAPADQAQADgIAZQgEANgIAMIATgIQAUgGAHAIQAHAHgNAQIgOAQIAbgGQAcgEAKAIQAJAIgSAJIgTAIg");
	this.shape_12.setTransform(-100.7772,85.3894,0.6697,0.6696);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#237812").s().p("Ag6ATQgLgMABgDQABgDALAFIALAGIgBgPQgBgRADgCQAEgDAJAYIADgOQAEgOAFAAQAJAAACAbQAKgRAOgBQANgBgHASQAMgLAKACQALACgGAOIAHgEQAHgCAEACQAEADgHALQgHALgIAEIhgABIgLgLg");
	this.shape_13.setTransform(-233.2732,85.1655,0.6699,0.6697);

	this.instance_7 = new lib.Path_1copy4();
	this.instance_7.setTransform(-117.85,132.8,0.6699,0.6697,0,0,0,6.2,9.3);
	this.instance_7.alpha = 0.6016;
	this.instance_7.compositeOperation = "multiply";

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AhpglQBvgOBLgdIgUghIA+ASIgSAwQgSA5gEAzQhEAfiJAWg");
	this.shape_14.setTransform(-121.9625,134.1896,0.6699,0.6697);

	this.instance_8 = new lib.Path_2_1copy4();
	this.instance_8.setTransform(-169.4,136.2,0.6699,0.6697,0,0,0,38,11.1);
	this.instance_8.alpha = 0.6016;
	this.instance_8.compositeOperation = "multiply";

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("ACTBuQkhgIkNgrIgJgBIgPiRQCtAWCYAMQEuAXB8gaIAEgvIAxArIgIgaQgHgbACACIAxA0IAfACIgWClQhAAEhTAAIh4gCg");
	this.shape_15.setTransform(-173.1566,136.2309,0.6699,0.6697);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#03507F").s().p("AgihJQAngCAqgFIgRCWQggAGgsAFQAEhNAIhNg");
	this.shape_16.setTransform(-132.2113,137.1029,0.6699,0.6697);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("Ah5BYIAWilQB3ACBmgMIgRCWQhHAMhTAIIhFAFg");
	this.shape_17.setTransform(-137.252,137.5717,0.6699,0.6697);

	this.instance_9 = new lib.Path_0copy4();
	this.instance_9.setTransform(-211.9,133.4,0.6699,0.6697,0,0,0,15.8,10.2);
	this.instance_9.alpha = 0.6016;
	this.instance_9.compositeOperation = "multiply";

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AiUARIgThRQAhAHAjAFQBqARAwABQAhABAQgJQASgJAUgQIgFAkIASgZIABAKIgCARIAEAAIAJBhQi0gRiHgig");
	this.shape_18.setTransform(-218.15,133.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F9CA67").s().p("AgBgEIADgFIgCATg");
	this.shape_19.setTransform(-202.4965,127.9612,0.6699,0.6697);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#F9CA67").s().p("AgCAMIACgYIADAZg");
	this.shape_20.setTransform(-202.5467,129.4848,0.6699,0.6697);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#03507F").s().p("AgOA0Igah2QAUAFAiAHIAcB6g");
	this.shape_21.setTransform(-235.8221,130.5228,0.6699,0.6697);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AhCAOQgPgZgOgkIgMgeIAPAAQASAAAMADIgOAMIAmAVQA0AWBMAQIASBRQhugchAgkg");
	this.shape_22.setTransform(-243.875,127.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#03507F").s().p("AAMBWQgUhhghhOIAtAFIAlCug");
	this.shape_23.setTransform(-280.1668,110.8665,0.6699,0.6697);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("ACoCSQhQgJhYgYIhGgVQAGgUgJgnQgVhPhShkQA1AXEHBgIAlCug");
	this.shape_24.setTransform(-289.2435,107.049,0.6699,0.6697);

	this.instance_10 = new lib.Path_2_0copy4();
	this.instance_10.setTransform(-256.8,114.1,0.6699,0.6697,0,0,0,7.2,7.9);
	this.instance_10.alpha = 0.6016;
	this.instance_10.compositeOperation = "multiply";

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("ABJBiQhygLiBgSIgmivQAqADAYgBQgSAQgJAQIgFANIAngPQAsgQAbgBQgSANgFAQQgCAIABAGIA6gHQBYgCCXATIgjBSIgBAqQAAALgGAJIhegIg");
	this.shape_25.setTransform(-265.9156,112.3064,0.6699,0.6697);

	this.instance_11 = new lib.Pathcopy4();
	this.instance_11.setTransform(-84.9,106.6,0.6699,0.6697,0,0,0,16.9,7.6);
	this.instance_11.alpha = 0.6016;
	this.instance_11.compositeOperation = "multiply";

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AjPACQDBghBlgjQCBguAbgMQggBigOAhIm3B2QAGg5AdhCg");
	this.shape_26.setTransform(-89.8091,109.8786,0.6699,0.6697);

	this.instance_12 = new lib.Path_2copy4();
	this.instance_12.setTransform(-115.45,115.6,0.6699,0.6697,0,0,0,7.2,5.5);
	this.instance_12.alpha = 0.6016;
	this.instance_12.compositeOperation = "multiply";

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#03507F").s().p("Ah6AGIC3hBIA+gKQgdBCgGA4Ig/ARg");
	this.shape_27.setTransform(-111.9983,114.7006,0.6699,0.6697);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_27},{t:this.instance_12},{t:this.shape_26},{t:this.instance_11},{t:this.shape_25},{t:this.instance_10},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.instance_9},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.instance_8},{t:this.shape_14},{t:this.instance_7},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.instance_6},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Isolation_Mode
	this.instance_13 = new lib.birdcopy3();
	this.instance_13.setTransform(306.25,-127.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_1
	this.instance_14 = new lib.flash0ai();
	this.instance_14.setTransform(-301.1,-168.6,0.3441,0.3441);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bgAnimation1copy3, new cjs.Rectangle(-301.1,-168.6,621.1,337.29999999999995), null);


// stage content:
(lib.materi5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{game1:0,game2:1,game3:2,game4:3,game5:4});

	this.actionFrames = [0,1,2,3,4];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		_this.gotoAndStop('game2');
		});
	}
	this.frame_1 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		_this.gotoAndStop('game3');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('game1');
		});
	}
	this.frame_2 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		_this.gotoAndStop('game4');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('game2');
		});
	}
	this.frame_3 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		_this.gotoAndStop('game5');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('game3');
		});
	}
	this.frame_4 = function() {
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		
		_this.stop();
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		window.location.replace('../game1/index.html');
		});
		
		_this.btnBack3.on('click', function(){
		
		_this.gotoAndStop('game4');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1));

	// base
	this.btnNextDasar1 = new lib.btnKINext();
	this.btnNextDasar1.name = "btnNextDasar1";
	this.btnNextDasar1.setTransform(885.8,504.8);
	new cjs.ButtonHelper(this.btnNextDasar1, 0, 1, 2, false, new lib.btnKINext(), 3);

	this.btnMenuDasar1 = new lib.btnMenuKI();
	this.btnMenuDasar1.name = "btnMenuDasar1";
	this.btnMenuDasar1.setTransform(755.75,504.8);
	new cjs.ButtonHelper(this.btnMenuDasar1, 0, 1, 2, false, new lib.btnMenuKI(), 3);

	this.instance = new lib.bgAnimation1_1();
	this.instance.setTransform(490.1,305.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AABAQQAIgMAAgLIAAgPIAUAAIAAANQAAAIgEAJQgFAJgHAGgAgcAQQAHgMAAgLIAAgPIAVAAIAAANQAAAIgFAJQgEAJgHAGg");
	this.shape.setTransform(719.775,102.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAOBEIgWgnIgKAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAYgcIAeAAIgjAnIAmA4g");
	this.shape_1.setTransform(712,106.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_2.setTransform(701.775,108.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_3.setTransform(692.475,110.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_4.setTransform(682.875,108.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_5.setTransform(675.475,106.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AApBAIAAgjIADg7IgjBeIgRAAIgjheIADA7IAAAjIgaAAIAAh/IAiAAIAgBcIAhhcIAiAAIAAB/g");
	this.shape_6.setTransform(665.225,107.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_7.setTransform(648.025,108.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAOBEIgXgnIgJAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAYgcIAeAAIgjAnIAmA4g");
	this.shape_8.setTransform(639,106.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_9.setTransform(628.575,108.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgXA8QgMgFgHgKQgGgJAAgNIAaAAQABAWAYAAQAJAAAGgEQAFgEAAgHQAAgHgFgEQgGgEgMgFQgOgEgIgEQgWgLAAgUQAAgLAGgIQAFgIALgEQALgFANAAQAOAAALAFQAKAFAHAJQAFAJAAAMIgaAAQAAgJgFgFQgGgFgKAAQgJAAgGAEQgEAEAAAHQAAAGAFAEQAHAFALADQAXAHAKAJQAKAKAAAPQAAARgMAJQgNAKgVAAQgOAAgMgGg");
	this.shape_10.setTransform(618.05,107.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKAKQgEgEAAgGQAAgFAEgEQAFgEAFABQAGgBAFAEQADAEAAAFQAAAGgDAEQgFADgGABQgFgBgFgDg");
	this.shape_11.setTransform(605.35,112.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgNBAIAAhqIgmAAIAAgVIBnAAIAAAVIgnAAIAABqg");
	this.shape_12.setTransform(597.225,107.15);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAOAAALAGQALAEAGAKQAGAKAAANQAAASgNAKQgNALgWAAIgXAAIAAAtgAgWgBIAXAAQALAAAFgGQAGgFgBgIQABgKgGgGQgGgFgJgBIgYAAg");
	this.shape_13.setTransform(586.1,107.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_14.setTransform(573.175,106.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AArAxIAAg8QAAgIgEgEQgCgDgJgBQgLAAgFALIAABBIgYAAIAAg8QAAgIgDgEQgDgDgIgBQgLABgFAIIAABDIgZAAIAAhfIAXAAIABALQALgMAQAAQASAAAHAOQAKgOASAAQAQgBAIAKQAHAJAAASIAAA8g");
	this.shape_15.setTransform(563,108.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_16.setTransform(550.175,108.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgSA5IgBAKIgXAAIAAiGIAZAAIAAAwQAJgKAOAAQARgBAKANQAKANAAAWIAAACQAAAWgKANQgKANgRABQgPgBgJgLgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgOgEgGQgFgGgIgBQgMAAgFAJg");
	this.shape_17.setTransform(540.275,106.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAPBEIgYgnIgJAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAXgcIAfAAIgiAnIAlA4g");
	this.shape_18.setTransform(526.3,106.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_19.setTransform(516.075,108.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_20.setTransform(506.775,110.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_21.setTransform(497.175,108.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_22.setTransform(489.775,106.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AAqAxIAAg8QAAgIgCgEQgDgDgIgBQgMAAgEALIAABBIgZAAIAAg8QAAgIgDgEQgEgDgHgBQgLABgFAIIAABDIgZAAIAAhfIAXAAIACALQAJgMASAAQARAAAHAOQAKgOATAAQAPgBAHAKQAIAJAAASIAAA8g");
	this.shape_23.setTransform(479.6,108.7);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_24.setTransform(462.225,108.7);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_25.setTransform(452.375,108.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgWA/QgJgEgFgHIAKgPQAKAKAOAAQAJAAAFgFQAGgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAOAAAJALIABgJIAYAAIAABbQgBAMgFAJQgGAKgKAEQgLAFgMAAQgLAAgKgEgAgMgmQgFAHAAAPQAAANAFAHQAFAHAIAAQAMAAAFgJIAAgnQgFgIgMAAQgIAAgFAHg");
	this.shape_26.setTransform(442.3,110.575);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_27.setTransform(432.275,108.7);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_28.setTransform(422.425,108.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgSA5IgBAKIgXAAIAAiGIAZAAIAAAwQAJgKAOAAQARgBAKANQAKANAAAWIAAACQAAAWgKANQgKANgRABQgPgBgJgLgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgOgEgGQgFgGgIgBQgMAAgFAJg");
	this.shape_29.setTransform(412.725,106.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AArAxIAAg8QAAgIgEgEQgCgDgJgBQgLAAgFALIAABBIgYAAIAAg8QAAgIgDgEQgEgDgHgBQgLABgFAIIAABDIgZAAIAAhfIAXAAIABALQALgMAQAAQASAAAHAOQAKgOASAAQAQgBAIAKQAHAJAAASIAAA8g");
	this.shape_30.setTransform(399.65,108.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_31.setTransform(387.025,108.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_32.setTransform(377.125,108.7);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAFgMQAGgLAKgGQAKgGAMAAQAUAAALAMQALANAAAWIAAAJIg7AAQABAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgGAAgFAFg");
	this.shape_33.setTransform(367.3,108.8);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_34.setTransform(357.475,110.525);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_35.setTransform(342.625,108.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_36.setTransform(332.775,108.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_37.setTransform(323.125,108.8);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AAQBEIAAg9QAAgHgEgDQgDgFgJAAQgKAAgFAIIAABEIgZAAIAAiGIAZAAIAAAyQAKgMAPAAQAfgBAAAkIAAA9g");
	this.shape_38.setTransform(313.275,106.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_39.setTransform(303.425,108.8);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgTAtQgKgEgGgIQgEgHAAgJIAXAAQABAHAFADQAEAEAHAAQAHAAAEgCQAEgDAAgFQAAgEgFgDQgFgDgIgCQgjgHABgVQAAgNAKgIQAKgIAQAAQATAAAKAIQALAIAAAOIgZAAQAAgFgEgEQgDgDgIAAQgFAAgEACQgDADAAAFQAAAEAEADQAEADAJABQAJACAGADQAVAGAAASQAAANgMAIQgLAJgSAAQgLgBgIgEg");
	this.shape_40.setTransform(293.9,108.8);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_41.setTransform(284.325,108.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgaAxIAAhfIAYAAIABALQAGgNAOABQAEgBAEACIgBAYIgJAAQgOAAgEAKIAAA9g");
	this.shape_42.setTransform(276.425,108.7);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgGAMAAQAUAAALAMQALANAAAWIAAAJIg7AAQABAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgGAIgJAFQgKAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_43.setTransform(267.95,108.8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_44.setTransform(258.125,110.525);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_45.setTransform(744.425,83.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_46.setTransform(736.225,82.125);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_47.setTransform(728.475,83.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_48.setTransform(718.625,83.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgGgGQgEgIAAgIIAXAAQABAGAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgJgCQgjgHAAgUQAAgNALgJQAKgJAQAAQATAAAKAJQALAJAAAOIgZAAQAAgGgEgDQgDgEgIAAQgFAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAGACQAVAHAAASQAAANgMAJQgLAHgSAAQgKABgJgFg");
	this.shape_49.setTransform(708.9,83.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_50.setTransform(697.475,81.3);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_51.setTransform(692.225,83.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_52.setTransform(686.175,81.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_53.setTransform(678.525,81.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_54.setTransform(670.775,83.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg8AAQACAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgFAIgLAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgHAAgEAFg");
	this.shape_55.setTransform(662.3,83.2);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgLAOAAQARAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgPAAgJgMgAgRAAIAAAmQAFAKAMAAQAMAAADgMQACgGAAgMQAAgPgEgFQgFgGgIAAQgMAAgFAIg");
	this.shape_56.setTransform(652.475,81.3);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgVA/QgLgEgFgHIALgPQAKAKAOAAQAJAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAPAAAIALIACgJIAWAAIAABbQAAAMgFAJQgGAKgKAEQgLAFgMAAQgLAAgJgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAHAAQAMAAAFgJIAAgnQgFgIgMAAQgHAAgGAHg");
	this.shape_57.setTransform(637.45,84.975);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_58.setTransform(627.425,83.1);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_59.setTransform(617.575,83.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_60.setTransform(609.875,83.1);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_61.setTransform(601.375,83.2);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgDgEQgEgEgIABQgLAAgEAKIAABAIgZAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_62.setTransform(588.75,83.1);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQATAAAMANQALANAAAWIAAAJIg8AAQACAKAGAFQAGAGAJAAQAPAAAHgLIANAOQgFAIgKAFQgKAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgHAAgEAFg");
	this.shape_63.setTransform(576.15,83.2);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgXA8QgMgFgHgKQgGgJAAgNIAbAAQAAAWAYAAQAJAAAGgEQAFgEAAgHQAAgHgFgEQgGgEgMgFQgOgEgIgEQgWgLAAgUQAAgLAGgIQAGgIALgEQAKgFANAAQAOAAAKAFQALAFAHAJQAFAJAAAMIgaAAQAAgJgFgFQgGgFgKAAQgJAAgFAEQgGAEAAAHQAAAGAHAEQAGAFALADQAXAHAKAJQAKAKAAAPQAAARgNAJQgMAKgVAAQgOAAgMgGg");
	this.shape_64.setTransform(565.7,81.575);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_65.setTransform(550.875,83.2);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_66.setTransform(542.875,82.125);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgHQAKgFANgBQATAAAMANQAMALABAUIABAGQAAAWgMANQgNANgUAAQgUAAgMgNgAgNgUQgGAGAAAPQAAAOAGAGQAEAIAJAAQAJAAAGgIQAEgHAAgOQAAgOgEgGQgGgIgJAAQgIAAgFAIg");
	this.shape_67.setTransform(534.85,83.2);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AAVBAIggg0IgOAQIAAAkIgaAAIAAh/IAaAAIAAA6IAMgQIAfgqIAhAAIguA5IAvBGg");
	this.shape_68.setTransform(524.675,81.55);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_69.setTransform(511.425,81.3);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_70.setTransform(503.775,81.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_71.setTransform(489.575,83.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_72.setTransform(479.475,81.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_73.setTransform(469.775,83.2);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_74.setTransform(462.075,83.1);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg7AAQABAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgGAAgFAFg");
	this.shape_75.setTransform(453.6,83.2);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgLAOAAQARAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgPAAgJgMgAgRAAIAAAmQAFAKAMAAQAMAAADgMQACgGAAgMQAAgPgEgFQgFgGgIAAQgMAAgFAIg");
	this.shape_76.setTransform(443.775,81.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgVA/QgKgEgGgHIALgPQAKAKANAAQAKAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNABgVIAAgCQgBgVALgOQALgNARAAQAOAAAKALIABgJIAWAAIAABbQAAAMgFAJQgGAKgKAEQgKAFgNAAQgKAAgKgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAIAAQALAAAFgJIAAgnQgFgIgLAAQgIAAgGAHg");
	this.shape_77.setTransform(428.75,84.975);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_78.setTransform(418.725,83.1);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_79.setTransform(408.875,83.2);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_80.setTransform(399.575,85.125);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgDgJAAQgKAAgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgNAPAAQAfABAAAiIAAA9g");
	this.shape_81.setTransform(385.525,81.2);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_82.setTransform(375.675,83.2);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_83.setTransform(366.375,85.125);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_84.setTransform(357.025,83.2);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_85.setTransform(349.825,81.2);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_86.setTransform(345.075,81.3);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AASAvIgSg6IgRA6IgVAAIgZhdIAZAAIAMA7IASg7IARAAIARA7IANg7IAYAAIgYBdg");
	this.shape_87.setTransform(336.05,83.2);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_88.setTransform(319.925,83.3);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_89.setTransform(311.725,82.125);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_90.setTransform(303.975,83.2);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_91.setTransform(294.125,83.3);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AgUAtQgJgFgFgGQgGgIABgIIAYAAQAAAGAEADQAFAEAHAAQAIAAADgDQAEgDAAgEQAAgFgFgCQgEgDgKgCQghgHgBgUQAAgNALgJQAKgJARAAQARAAAMAJQAKAJAAAOIgZAAQAAgGgDgDQgEgEgHAAQgGAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAHACQATAHAAASQABANgLAJQgMAHgRAAQgLABgKgFg");
	this.shape_92.setTransform(284.4,83.2);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_93.setTransform(270.525,83.2);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AggA3QgKgNAAgYQAAgVAKgNQAKgOARAAQANAAAJALIAAgxIAaAAIAACGIgXAAIgBgKQgKAMgOAAQgRAAgKgNgAgRAUQAAAOAFAGQAFAIAIAAQALAAAFgKIAAgmQgEgIgMAAQgSgBAAAdg");
	this.shape_94.setTransform(260.425,81.3);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_95.setTransform(250.725,83.2);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAPAAAKAFQALAFAGALQAGAJAAAMQAAATgNAKQgNALgXAAIgVAAIAAAtgAgVgCIAWAAQAKAAAGgEQAGgGAAgJQAAgJgGgFQgGgHgKABIgWAAg");
	this.shape_96.setTransform(240.35,81.55);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AABAXIAAgNQAAgJAFgIQAEgKAHgFIAMAHQgIAMAAALIAAAPgAgcAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgIAMAAALIAAAPg");
	this.shape_97.setTransform(230.9,76.45);

	this.judulKI = new lib.bg1_1();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_1 = new lib.Bitmap28();
	this.instance_1.setTransform(7,4);

	this.instance_2 = new lib.Bitmap5();
	this.instance_2.setTransform(-28,-39);

	this.btnBack3 = new lib.btnKIBack();
	this.btnBack3.name = "btnBack3";
	this.btnBack3.setTransform(749,508.25);
	new cjs.ButtonHelper(this.btnBack3, 0, 1, 2, false, new lib.btnKIBack(), 3);

	this.instance_3 = new lib.bgAnimation1();
	this.instance_3.setTransform(490.1,305.6);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgGQAKgHANABQATgBAMAMQANAMAAAVIABAFQAAAWgMANQgNAOgUAAQgUAAgMgOgAgOgUQgFAHAAAOQAAANAFAIQAGAHAIAAQAJAAAGgHQAEgIAAgOQAAgNgEgHQgGgIgJAAQgJAAgFAIg");
	this.shape_98.setTransform(495.95,108.8);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgdAkQgMgNAAgXIAAAAQAAgWAMgOQAMgNATABQASAAAKAKQALAKAAARIgXAAQgBgHgEgFQgEgFgHAAQgIAAgFAHQgEAGAAAOIAAADQAAAOAEAHQAFAGAIAAQAHAAAEgEQAEgEABgGIAXAAQAAAJgEAIQgGAJgJAEQgJAEgLABQgTgBgMgNg");
	this.shape_99.setTransform(486.2,108.8);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgGQAKgHANABQATgBAMAMQAMAMABAVIABAFQAAAWgMANQgNAOgUAAQgUAAgMgOgAgNgUQgGAHAAAOQAAANAGAIQAEAHAJAAQAJAAAGgHQAEgIAAgOQAAgNgEgHQgGgIgJAAQgIAAgFAIg");
	this.shape_100.setTransform(476.35,108.8);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAOBEIgWgnIgKAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAXgcIAfAAIgiAnIAlA4g");
	this.shape_101.setTransform(447.15,106.8);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgCgEQgEgEgHABQgMAAgEAKIAABAIgZAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAYAAIABAKQAJgNASAAQARAAAHAPQAKgPATAAQAPABAHAIQAIAKAAASIAAA7g");
	this.shape_102.setTransform(745.65,83.1);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgVA/QgLgEgFgHIALgPQAKAKAOAAQAJAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAPAAAIALIACgJIAWAAIAABbQAAAMgFAJQgGAKgKAEQgLAFgMAAQgKAAgKgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAHAAQAMAAAFgJIAAgnQgFgIgMAAQgHAAgGAHg");
	this.shape_103.setTransform(708.55,84.975);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAGgLQAFgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg7AAQABAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgGAIgJAFQgKAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_104.setTransform(688.7,83.2);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgEgEQgCgEgJABQgLAAgFAKIAABAIgYAAIAAg7QAAgJgDgDQgEgEgHABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_105.setTransform(675.95,83.1);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAOBDIgWglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_106.setTransform(659.45,81.2);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AApBAIAAgjIADg8IgjBfIgRAAIgjhfIADA8IAAAjIgaAAIAAh/IAiAAIAgBcIAhhcIAiAAIAAB/g");
	this.shape_107.setTransform(612.675,81.55);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAOBDIgWglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_108.setTransform(586.45,81.2);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgXA8QgMgFgHgKQgGgJAAgNIAaAAQAAAWAZAAQAJAAAGgEQAFgEAAgHQAAgHgFgEQgGgEgMgFQgOgEgIgEQgWgLAAgUQAAgLAGgIQAFgIALgEQAMgFAMAAQAOAAALAFQAKAFAHAJQAFAJAAAMIgaAAQAAgJgFgFQgGgFgKAAQgJAAgGAEQgEAEAAAHQAAAGAFAEQAHAFALADQAXAHAKAJQAKAKAAAPQAAARgMAJQgNAKgVAAQgOAAgMgGg");
	this.shape_109.setTransform(565.5,81.575);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgJAKQgFgEAAgGQAAgFAFgEQAEgEAFAAQAGAAAFAEQADAEAAAFQAAAGgDAEQgFAEgGgBQgFABgEgEg");
	this.shape_110.setTransform(552.8,86.7);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgNBAIAAhpIgmAAIAAgWIBnAAIAAAWIgnAAIAABpg");
	this.shape_111.setTransform(544.675,81.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAPAAAKAFQALAFAGALQAGAJAAAMQAAATgNAKQgNALgWAAIgXAAIAAAtgAgWgCIAXAAQALAAAFgEQAGgGgBgJQABgJgGgFQgGgHgJABIgYAAg");
	this.shape_112.setTransform(533.55,81.55);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAPBDIgXglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_113.setTransform(518.8,81.2);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_114.setTransform(489.675,83.1);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgEgEQgCgEgJABQgLAAgFAKIAABAIgYAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_115.setTransform(472.1,83.1);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_116.setTransform(415.525,83.1);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_117.setTransform(381.875,81.2);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgUAtQgJgFgFgGQgGgIAAgIIAZAAQAAAGAEADQAFAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgKgCQghgHAAgUQgBgNALgJQALgJAQAAQARAAAMAJQAKAJAAAOIgZAAQAAgGgEgDQgDgEgHAAQgGAAgDADQgEADAAAEQAAAEAEADQAEADAIACQAKABAGACQAUAHAAASQABANgLAJQgMAHgRAAQgLABgKgFg");
	this.shape_118.setTransform(365.15,83.2);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgPAUIADgGQAHgLAAgJIAAgUIAVAAIgBASQAAAIgFAKQgEAKgHAHg");
	this.shape_119.setTransform(353.55,88.475);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_120.setTransform(349.325,81.3);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgGgGQgEgIAAgIIAXAAQABAGAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgJgCQgjgHAAgUQAAgNALgJQALgJAPAAQATAAALAJQAKAJAAAOIgZAAQAAgGgDgDQgEgEgIAAQgFAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAHACQATAHABASQgBANgKAJQgMAHgSAAQgLABgIgFg");
	this.shape_121.setTransform(275.65,83.2);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAPAAAKAFQALAFAGALQAGAJAAAMQAAATgNAKQgNALgWAAIgXAAIAAAtgAgWgCIAXAAQALAAAFgEQAGgGgBgJQABgJgGgFQgGgHgJABIgYAAg");
	this.shape_122.setTransform(231.6,81.55);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AABAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgHAMgBALIAAAPgAgcAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgIAMAAALIAAAPg");
	this.shape_123.setTransform(222.15,76.45);

	this.judulKI_1 = new lib.bg1();
	this.judulKI_1.name = "judulKI_1";
	this.judulKI_1.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI_1.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_4 = new lib.bgAnimation1copy();
	this.instance_4.setTransform(490.1,305.6);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABAKQAGgMAOAAQAEAAAEABIgBAYIgJgBQgOAAgEALIAAA8g");
	this.shape_124.setTransform(736.575,97.7);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_125.setTransform(728.075,97.8);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_126.setTransform(714.775,95.9);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAOBDIgXgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_127.setTransform(708.2,95.8);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHAMABQATAAAMAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgKAFQgKAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgGAAgFAFg");
	this.shape_128.setTransform(698,97.8);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgFgGQgFgIgBgJIAZAAQAAAHAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgFgDgJgCQghgHAAgVQAAgMAKgJQALgJAQABQARgBALAJQALAJAAANIgZAAQAAgFgEgEQgDgDgHAAQgGAAgDACQgEADAAAFQAAAFAEACQAEACAIACQAKACAGADQAVAGgBASQAAANgLAJQgLAHgRABQgMAAgIgFg");
	this.shape_129.setTransform(688.35,97.8);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_130.setTransform(674.225,97.7);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_131.setTransform(664.375,97.8);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AgWA/QgJgEgGgHIAMgPQAJAKANAAQAKAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgSAAgKgOQgKgNAAgVIAAgCQAAgVAKgOQAKgNASAAQAPAAAJALIABgJIAWAAIAABbQABAMgGAJQgGAKgKAEQgKAFgNAAQgKAAgLgEgAgMgmQgFAHAAAPQAAANAFAHQAFAHAJAAQALAAAFgJIAAgnQgFgIgLAAQgJAAgFAHg");
	this.shape_132.setTransform(654.3,99.575);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_133.setTransform(644.275,97.7);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgQIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQAAQgPgBgIgIg");
	this.shape_134.setTransform(634.225,97.9);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AAPBDIgXgmIgKAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_135.setTransform(625,95.8);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgWA/QgKgEgFgHIAMgPQAJAKANAAQAKAAAFgFQAGgFAAgKIAAgFQgJAKgNAAQgSAAgKgOQgKgNAAgVIAAgCQAAgVAKgOQAKgNASAAQAOAAAKALIABgJIAWAAIAABbQABAMgGAJQgGAKgKAEQgKAFgNAAQgKAAgLgEgAgMgmQgFAHAAAPQAAANAFAHQAFAHAJAAQALAAAFgJIAAgnQgFgIgLAAQgJAAgFAHg");
	this.shape_136.setTransform(614.35,99.575);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_137.setTransform(604.325,97.7);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_138.setTransform(596.925,95.9);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_139.setTransform(582.925,95.9);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABAKQAGgMAOAAQAEAAAEABIgBAYIgJgBQgOAAgEALIAAA8g");
	this.shape_140.setTransform(577.675,97.7);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_141.setTransform(569.175,97.8);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgCgEQgEgDgHgBQgMABgEAKIAABAIgZAAIAAg7QAAgIgDgEQgEgDgHgBQgLAAgFAJIAABCIgZAAIAAhdIAXAAIACAKQAJgMASAAQARAAAHAOQAKgOATAAQAPAAAHAJQAIAIAAATIAAA7g");
	this.shape_142.setTransform(556.55,97.7);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQAUAAALAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgFAIgLAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgHAAgEAFg");
	this.shape_143.setTransform(543.95,97.8);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgdAkQgMgNAAgXIAAAAQAAgWAMgOQAMgMATAAQASAAAKAKQALAKAAARIgXAAQgBgIgEgEQgEgFgHAAQgIAAgFAHQgEAGAAAPIAAABQAAAPAEAHQAFAGAIAAQAHAAAEgEQAEgEABgGIAXAAQAAAKgEAIQgGAHgJAFQgJAFgLAAQgTAAgMgOg");
	this.shape_144.setTransform(534.35,97.8);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_145.setTransform(524.525,97.7);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQAUAAALAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAIAAQAPAAAJgLIAMAOQgFAIgLAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgHAAgEAFg");
	this.shape_146.setTransform(514.7,97.8);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgDgEQgDgDgHgBQgMABgFAKIAABAIgYAAIAAg7QAAgIgDgEQgDgDgIgBQgLAAgFAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMARAAQARAAAHAOQAKgOATAAQAPAAAHAJQAIAIAAATIAAA7g");
	this.shape_147.setTransform(501.95,97.7);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_148.setTransform(484.825,97.8);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_149.setTransform(467.475,95.9);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_150.setTransform(445.375,97.7);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_151.setTransform(435.525,97.8);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABAKQAGgMAOAAQAEAAAEABIgBAYIgJgBQgOAAgEALIAAA8g");
	this.shape_152.setTransform(427.825,97.7);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgHQAKgFANAAQATAAAMALQAMAMACAVIAAAFQAAAWgNANQgLAOgVAAQgTAAgNgOgAgNgUQgGAGAAAPQAAANAGAIQAEAHAJAAQAJAAAFgHQAGgIAAgOQAAgOgGgGQgFgIgJAAQgJAAgEAIg");
	this.shape_153.setTransform(419.05,97.8);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgdAkQgLgNAAgXIAAAAQAAgWALgOQALgMAUAAQASAAALAKQAKAKABARIgYAAQAAgIgFgEQgEgFgIAAQgHAAgFAHQgEAGgBAPIAAABQAAAPAFAHQAFAGAIAAQAHAAAEgEQAFgEAAgGIAYAAQAAAKgGAIQgFAHgJAFQgJAFgLAAQgTAAgMgOg");
	this.shape_154.setTransform(409.3,97.8);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgHQAKgFANAAQATAAAMALQANAMABAVIAAAFQAAAWgNANQgLAOgVAAQgTAAgNgOgAgOgUQgFAGAAAPQAAANAFAIQAGAHAIAAQAJAAAFgHQAGgIgBgOQABgOgGgGQgFgIgJAAQgIAAgGAIg");
	this.shape_155.setTransform(399.45,97.8);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgKAOAAQARAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgPAAgJgNgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgPgEgFQgFgGgIgBQgMAAgFAJg");
	this.shape_156.setTransform(389.475,95.9);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAGgMQAFgLAKgGQAKgHAMABQATAAAMAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgKAFQgKAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgGAAgFAFg");
	this.shape_157.setTransform(379.4,97.8);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AAOBDIgXgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_158.setTransform(370.25,95.8);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_159.setTransform(349.425,97.8);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgKAOAAQARAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgPAAgJgNgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgPgEgFQgFgGgIgBQgMAAgFAJg");
	this.shape_160.setTransform(339.725,95.9);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_161.setTransform(332.075,95.9);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgKAOAAQARAAAKAMQAKANAAAWIAAACQAAAWgKANQgKAOgRAAQgPAAgJgNgAgRAAIAAAmQAFAKAMAAQAMAAADgNQACgFAAgMQAAgPgEgFQgFgGgIgBQgMAAgFAJg");
	this.shape_162.setTransform(324.825,95.9);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AAOBDIgXgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_163.setTransform(315.35,95.8);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_164.setTransform(305.125,97.8);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AAOBDIgXgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_165.setTransform(291.6,95.8);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_166.setTransform(281.375,97.8);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AAQAwIAAg7QAAgJgEgDQgDgDgJgBQgJAAgGAJIAABCIgZAAIAAhdIAYAAIABAKQAKgMAQAAQAPAAAIAJQAHAIAAASIAAA8g");
	this.shape_167.setTransform(262.475,97.7);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_168.setTransform(255.075,95.9);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AABAXIAAgOQAAgIAEgIQAFgJAHgGIAMAHQgHAMgBALIAAAPgAgcAXIAAgOQAAgIAFgIQAEgJAHgGIAMAHQgIAMAAALIAAAPg");
	this.shape_169.setTransform(233.55,91.05);

	this.judulKI_2 = new lib.bg1copy();
	this.judulKI_2.name = "judulKI_2";
	this.judulKI_2.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI_2.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_5 = new lib.bgAnimation1copy3();
	this.instance_5.setTransform(490.1,305.6);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AArAxIAAg8QgBgIgDgEQgCgDgIgBQgMAAgFALIAABBIgYAAIAAg8QAAgIgDgEQgEgDgHgBQgLABgFAIIAABDIgZAAIAAhfIAYAAIABALQAKgMARAAQARAAAHAOQAKgOASAAQAQgBAIAKQAHAJAAASIAAA8g");
	this.shape_170.setTransform(560.1,108.7);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgGAMAAQAUAAALAMQALANAAAWIAAAJIg7AAQABAJAGAGQAGAGAIAAQAQAAAHgLIANAOQgGAIgJAFQgKAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_171.setTransform(547.5,108.8);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AgdAkQgMgNABgXIAAAAQgBgWAMgOQALgNAUABQASAAALAKQAKAKABARIgYAAQgBgHgEgFQgEgFgIAAQgHAAgEAHQgFAGgBAOIAAADQAAAOAFAHQAFAGAIAAQAHAAAEgEQAEgEABgGIAYAAQAAAJgGAIQgFAJgJAEQgJAEgLABQgTgBgMgNg");
	this.shape_172.setTransform(537.9,108.8);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgaAxIAAhfIAYAAIABALQAGgNAOABQAEgBAEACIgBAYIgJAAQgOAAgEAKIAAA9g");
	this.shape_173.setTransform(530.275,108.7);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAFgMQAGgLAKgGQAKgGAMAAQATAAAMAMQALANAAAWIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgLAFQgJAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgHAAgEAFg");
	this.shape_174.setTransform(521.8,108.8);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AAPBEIgYgnIgJAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAYgcIAeAAIgjAnIAmA4g");
	this.shape_175.setTransform(485.9,106.8);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgMBEIAAiGIAZAAIAACGg");
	this.shape_176.setTransform(412.775,106.8);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgaAxIAAhfIAYAAIABALQAGgNAOABQAEgBAEACIgBAYIgJAAQgOAAgEAKIAAA9g");
	this.shape_177.setTransform(403.025,108.7);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgVA/QgLgEgFgHIALgPQAKAKAOAAQAJAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAPAAAIALIABgJIAYAAIAABbQgBAMgFAJQgGAKgKAEQgLAFgMAAQgLAAgJgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAHAAQAMAAAFgJIAAgnQgFgIgMAAQgHAAgGAHg");
	this.shape_178.setTransform(734.1,84.975);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAGgLQAFgLAKgGQAKgHAMAAQATAAAMANQALANAAAWIAAAJIg8AAQACAKAGAFQAGAGAJAAQAPAAAHgLIANAOQgFAIgLAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgGAAgFAFg");
	this.shape_179.setTransform(699.45,83.2);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgFgGQgFgIgBgIIAYAAQABAGAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgFgDgIgCQgjgHABgUQAAgNAKgJQALgJAPAAQASAAALAJQALAJAAAOIgZAAQAAgGgEgDQgDgEgIAAQgFAAgDADQgEADAAAEQAAAEAEADQAEADAIACQAKABAGACQAVAHgBASQAAANgLAJQgLAHgSAAQgLABgIgFg");
	this.shape_180.setTransform(689.8,83.2);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgDgJAAQgKAAgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgNAPAAQAfABAAAiIAAA9g");
	this.shape_181.setTransform(675.725,81.2);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_182.setTransform(638.125,82.125);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgHQAKgFANgBQATAAAMANQANALABAUIAAAGQAAAWgMANQgNANgUAAQgUAAgMgNgAgOgUQgFAGAAAPQAAAOAFAGQAGAIAIAAQAJAAAGgIQAEgHAAgOQAAgOgEgGQgGgIgJAAQgJAAgFAIg");
	this.shape_183.setTransform(614.3,83.2);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AgYAKIAAgTIAxAAIAAATg");
	this.shape_184.setTransform(595.475,82.475);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgHQAKgFANgBQATAAAMANQAMALACAUIAAAGQAAAWgNANQgLANgVAAQgTAAgNgNgAgNgUQgGAGAAAPQAAAOAGAGQAEAIAJAAQAJAAAFgIQAGgHAAgOQAAgOgGgGQgFgIgJAAQgJAAgEAIg");
	this.shape_185.setTransform(575.65,83.2);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_186.setTransform(565.675,84.925);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_187.setTransform(488.925,82.125);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_188.setTransform(463.925,81.2);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg7AAQABAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgGAAgFAFg");
	this.shape_189.setTransform(456.75,83.2);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AAOBDIgWglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_190.setTransform(447.6,81.2);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_191.setTransform(418.425,84.925);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgCgEQgDgEgIABQgMAAgEAKIAABAIgZAAIAAg7QAAgJgDgDQgEgEgHABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIACAKQAJgNASAAQARAAAHAPQAKgPATAAQAPABAHAIQAIAKAAASIAAA7g");
	this.shape_192.setTransform(405.35,83.1);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgUAtQgJgFgGgGQgEgIAAgIIAXAAQABAGAEADQAFAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgJgCQgjgHAAgUQAAgNALgJQALgJAPAAQATAAALAJQAKAJAAAOIgZAAQAAgGgDgDQgEgEgIAAQgFAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAHACQATAHABASQgBANgKAJQgMAHgSAAQgLABgJgFg");
	this.shape_193.setTransform(383.2,83.2);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AAPBDIgYglIgJAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_194.setTransform(369.95,81.2);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_195.setTransform(333.425,81.3);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgDgJAAQgKAAgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgNAPAAQAfABAAAiIAAA9g");
	this.shape_196.setTransform(286.175,81.2);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgDgEQgDgEgHABQgMAAgFAKIAABAIgYAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAYAAIABAKQAKgNARAAQARAAAHAPQAKgPATAAQAPABAHAIQAIAKAAASIAAA7g");
	this.shape_197.setTransform(253.55,83.1);

	this.judulKI_3 = new lib.bg1copy3();
	this.judulKI_3.name = "judulKI_3";
	this.judulKI_3.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI_3.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_198.setTransform(476.275,470.325);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMgBgFgHg");
	this.shape_199.setTransform(470.175,464.85);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_200.setTransform(461.725,466.025);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAggiIAWAAIgoArIAsA+g");
	this.shape_201.setTransform(451.9,463.8);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_202.setTransform(440.675,466.025);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_203.setTransform(432.4,465.925);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_204.setTransform(423.025,466.025);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJAAAGgFQAFgDADgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgqB5QgJAagVAAg");
	this.shape_205.setTransform(412.85,468.15);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGgBgIQAAgNALgJQAMgJAPAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_206.setTransform(403,466.025);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_207.setTransform(392.375,466.025);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_208.setTransform(378.15,465.925);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_209.setTransform(358.925,465.925);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_210.setTransform(347.925,466.025);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_211.setTransform(340.1,464.1);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_212.setTransform(328.85,465.925);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgKAHQgMAHgOAAQgUAAgOgPgAgVgcQgIAKAAATQAAASAIAKQAIALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgIALg");
	this.shape_213.setTransform(314.4,466.025);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_214.setTransform(303.175,465.925);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgVAAgMgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_215.setTransform(291.95,466.025);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAggiIAWAAIgoArIAsA+g");
	this.shape_216.setTransform(281.85,463.8);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_217.setTransform(270.925,466.025);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_218.setTransform(262.7,465.925);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_219.setTransform(253.625,466.025);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_220.setTransform(242.875,467.95);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_221.setTransform(226.625,466.025);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgZIAAgBQAAgXALgPQALgPATAAQARAAAMANIAAg3IASAAIAACVIgRAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgHAJAAAUQAAATAHAKQAHAJANABQAQAAAJgQIAAgvQgJgQgQABQgNAAgHAKg");
	this.shape_222.setTransform(215.3,463.9);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_223.setTransform(204.425,466.025);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_224.setTransform(193.625,467.95);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAggiIAWAAIgoArIAsA+g");
	this.shape_225.setTransform(178.45,463.8);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_226.setTransform(167.225,466.025);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_227.setTransform(156.425,467.95);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_228.setTransform(141.8,465.925);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_229.setTransform(127.575,466.025);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAgBQAAgXAMgPQAMgPASAAQASAAAKANIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgIAJAAAUQAAATAIAKQAHAJAMABQASAAAHgQIAAgvQgHgQgSABQgMAAgHAKg");
	this.shape_230.setTransform(116.25,463.9);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_231.setTransform(108,465.925);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_232.setTransform(98.925,466.025);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgKgNAAQgSAAgIARg");
	this.shape_233.setTransform(88.175,463.9);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_234.setTransform(871.575,437.025);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgGgIIAJgMQALAPASAAQAMAAAHgIQAHgHABgNIAAgJQgMAMgRAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIARAAIAABnQgBAUgLAMQgMAMgVAAQgKgBgMgFgAgSgwQgHAKAAAUQAAASAHAJQAHAKAMAAQARAAAJgPIAAgvQgJgPgRAAQgLAAgIAKg");
	this.shape_235.setTransform(860.35,439);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgMQAMAPAQAAQANAAAHgIQAIgHgBgNIAAgJQgKAMgSAAQgTAAgLgPQgMgPABgZQgBgZAMgOQALgPATAAQASAAAMAOIAAgMIAQAAIAABnQAAAUgMAMQgMAMgUAAQgKgBgMgFgAgSgwQgIAKABAUQgBASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_236.setTransform(849.15,439);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_237.setTransform(838.225,436.925);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEABgEQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAEgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_238.setTransform(830.3,435.1);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhABABAkIAABGg");
	this.shape_239.setTransform(822.375,434.8);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_240.setTransform(811.675,437.025);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgGgGQgGgFgKAAQgJAAgFAEQgFAFAAAHQAAAGAEADQAGAEANADQANADAJAEQAIADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_241.setTransform(801.15,437.025);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_242.setTransform(783.175,437.025);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFAAQAKAAAEgDQAFgEAEgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgqB5QgJAagWAAg");
	this.shape_243.setTransform(773,439.15);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_244.setTransform(762.775,436.925);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_245.setTransform(751.725,436.925);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_246.setTransform(740.725,437.025);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgCgEAAgEQAAgEACgDQADgDAEAAQAFAAADADQACADABAEQgBAEgCAEQgDACgFAAQgEAAgDgCg");
	this.shape_247.setTransform(732.9,435.1);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_248.setTransform(727.6,436.925);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_249.setTransform(718.225,437.025);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhABABAkIAABGg");
	this.shape_250.setTransform(707.325,434.8);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_251.setTransform(696.325,437.025);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AgeAoQgNgOgBgZIAAgCQABgQAFgMQAGgMALgGQAKgHANAAQASAAAMALQAMAKAAARIgRAAQAAgKgIgGQgGgHgLAAQgNAAgHAKQgHAKgBATIAAACQABASAHAKQAHAKANAAQAKAAAHgGQAIgGAAgJIARAAQAAAKgGAIQgFAIgKAFQgKAFgLAAQgUAAgMgPg");
	this.shape_252.setTransform(685.85,437.025);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_253.setTransform(674.975,436.925);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_254.setTransform(664.275,437.025);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAOQgLAQgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQAAQAMABAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_255.setTransform(653.525,438.95);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_256.setTransform(634.875,437.025);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_257.setTransform(625.875,435.85);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_258.setTransform(617.425,437.025);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_259.setTransform(603.2,436.925);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_260.setTransform(581.575,436.925);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_261.setTransform(570.575,437.025);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgMQALAPARAAQANAAAHgIQAIgHgBgNIAAgJQgKAMgSAAQgTAAgLgPQgMgPABgZQgBgZAMgOQALgPATAAQASAAAMAOIAAgMIAQAAIAABnQAAAUgMAMQgLAMgVAAQgKgBgMgFgAgSgwQgIAKABAUQgBASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_262.setTransform(559.35,439);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_263.setTransform(548.425,436.925);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_264.setTransform(537.425,437.025);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_265.setTransform(529.575,434.8);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEABgEQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAEgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_266.setTransform(524.75,435.1);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhABABAkIAABGg");
	this.shape_267.setTransform(516.825,434.8);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_268.setTransform(506.125,437.025);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_269.setTransform(496.35,434.8);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgEgBgEQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_270.setTransform(480.85,435.1);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AggA9QgMgPABgZIAAgBQgBgXAMgPQALgPATAAQASAAAKANIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgIAJABAUQgBATAIAJQAHAKANAAQARAAAHgPIAAgwQgHgOgRAAQgNAAgHAKg");
	this.shape_271.setTransform(472.5,434.9);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_272.setTransform(461.625,437.025);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AgTBcIAAgPIAJABQAGAAADgDQACgDAAgJIAAh1IASAAIAAB1QAAAegbAAQgGAAgFgBgAABhLQgBgDAAgEQAAgEABgDQADgDAFAAQAFAAAEADQACADAAAEQAAAEgCADQgEADgFAAQgFAAgDgDg");
	this.shape_273.setTransform(452.75,437.225);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_274.setTransform(445.875,436.925);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_275.setTransform(435.175,437.025);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQAMgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_276.setTransform(421,436.925);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_277.setTransform(400.5,434.8);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgEABgEQgBgEADgDQADgDAEAAQAFAAADADQACADAAAEQABAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_278.setTransform(392.35,435.1);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_279.setTransform(387.05,436.925);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAABQAAAYgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARAAQAMAAAIgKQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_280.setTransform(377.775,434.9);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_281.setTransform(366.475,437.025);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAOQgLAQgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQAAQAMABAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_282.setTransform(355.675,438.95);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_283.setTransform(339.65,436.925);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_284.setTransform(330.275,437.025);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_285.setTransform(321.275,435.85);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEAAgEQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_286.setTransform(315.9,435.1);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_287.setTransform(309.05,434.8);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_288.setTransform(298.125,437.025);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNAMgJQALgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_289.setTransform(287.6,437.025);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_290.setTransform(271.525,435.85);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_291.setTransform(263.075,437.025);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_292.setTransform(253.25,434.8);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_293.setTransform(242.025,437.025);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAADACIAAAQIgJAAQgRAAgGAPIAABKg");
	this.shape_294.setTransform(233.75,436.925);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_295.setTransform(224.375,437.025);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFAAQAKAAAEgDQAGgEADgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgqB5QgJAagWAAg");
	this.shape_296.setTransform(214.2,439.15);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAGgEQAGgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_297.setTransform(204.35,437.025);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_298.setTransform(193.725,437.025);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_299.setTransform(179.5,436.925);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_300.setTransform(157.925,437.025);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgMQAMAPAQAAQANAAAHgIQAIgHgBgNIAAgJQgKAMgSAAQgTAAgLgPQgMgPABgZQgBgZAMgOQALgPATAAQASAAAMAOIAAgMIAQAAIAABnQAAAUgMAMQgLAMgVAAQgKgBgMgFgAgSgwQgIAKABAUQgBASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_301.setTransform(146.7,439);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgMQAMAPARAAQALAAAIgIQAHgHAAgNIAAgJQgKAMgSAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIAQAAIAABnQABAUgMAMQgNAMgUAAQgLgBgKgFgAgSgwQgHAKgBAUQABASAHAJQAHAKAMAAQARAAAIgPIAAgvQgIgPgRAAQgMAAgHAKg");
	this.shape_302.setTransform(135.5,439);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_303.setTransform(124.575,436.925);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgEAAgEQAAgEADgDQACgDAFAAQAFAAADADQACADABAEQgBAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_304.setTransform(116.65,435.1);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhABABAkIAABGg");
	this.shape_305.setTransform(108.725,434.8);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_306.setTransform(98.025,437.025);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_307.setTransform(87.5,437.025);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_308.setTransform(871.525,407.925);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_309.setTransform(860.525,408.025);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_310.setTransform(852.675,405.8);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEABgDQgBgFADgDQACgDAFAAQAFAAADADQADADgBAFQABADgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_311.setTransform(847.85,406.1);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgGAFAAAHQAAAGAGADQAFAEAMADQAOADAIAEQAJADAEAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_312.setTransform(840.25,408.025);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_313.setTransform(829.625,408.025);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgGgLAAQgIABgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_314.setTransform(818.725,405.8);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgLQAMAPAQAAQANAAAHgHQAIgIAAgNIAAgJQgMAMgRAAQgTAAgLgPQgLgPAAgYQAAgaALgOQALgOATAAQASAAAMANIAAgMIARAAIAABmQAAAVgNAMQgLALgVAAQgLAAgLgEgAgSgwQgIAKABAUQgBASAIAJQAHALANgBQAQAAAJgPIAAgvQgJgPgQgBQgMAAgIALg");
	this.shape_315.setTransform(807.4,410);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_316.setTransform(796.475,407.925);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_317.setTransform(785.775,408.025);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAOgTAAQgSAAgMgMIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_318.setTransform(775.025,409.95);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAADACIAAAQIgJAAQgRAAgGAPIAABKg");
	this.shape_319.setTransform(755.3,407.925);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_320.setTransform(746.225,408.025);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAABQAAAZgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_321.setTransform(735.475,405.9);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_322.setTransform(720.85,407.925);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_323.setTransform(706.55,408.125);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_324.setTransform(695.9,408.025);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEABgDQgBgFADgDQACgDAFAAQAFAAADADQADADgBAFQABADgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_325.setTransform(677.3,406.1);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_326.setTransform(669.375,408.025);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgFgJIAJgLQALAPARAAQAMAAAIgHQAHgIAAgNIAAgJQgLAMgRAAQgSAAgMgPQgMgPAAgYQAAgaAMgOQALgOATAAQATAAAKANIABgMIAQAAIAABmQABAVgMAMQgNALgUAAQgKAAgLgEgAgSgwQgIAKAAAUQAAASAIAJQAHALAMgBQASAAAHgPIAAgvQgIgPgRgBQgMAAgHALg");
	this.shape_327.setTransform(658.15,410);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_328.setTransform(647.275,408.025);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAABQAAAZgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_329.setTransform(636.475,405.9);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_330.setTransform(625.475,408.025);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgEgGAAgIQAAgNALgJQAMgJAPAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgJAAgFAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_331.setTransform(614.95,408.025);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_332.setTransform(595.175,406.85);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_333.setTransform(586.65,408.125);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAABQAAAZgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_334.setTransform(575.775,405.9);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_335.setTransform(564.775,408.025);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_336.setTransform(554.25,408.025);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_337.setTransform(546.25,407.925);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_338.setTransform(537.175,408.025);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_339.setTransform(528.225,406.85);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgEgBgDQABgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAADgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_340.setTransform(511.8,406.1);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_341.setTransform(505.775,406.85);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_342.setTransform(497.325,408.025);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgGgLAAQgIABgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_343.setTransform(486.425,405.8);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_344.setTransform(475.725,408.025);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoAsIAtA9g");
	this.shape_345.setTransform(465.95,405.8);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_346.setTransform(443.625,407.925);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_347.setTransform(432.625,408.025);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_348.setTransform(423.625,406.85);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_349.setTransform(415.175,408.025);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_350.setTransform(404.275,408.025);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#FFFFFF").s().p("AgOBMIAAhaIgRAAIAAgPIARAAIAAgKQAAgRAJgKQAIgJARAAIAMABIgBAPIgKAAQgJAAgEAEQgFAGAAAJIAAALIAWAAIAAAPIgWAAIAABag");
	this.shape_351.setTransform(395.675,405.7);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_352.setTransform(386.375,407.925);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_353.setTransform(375.375,408.025);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQAMgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_354.setTransform(361.15,407.925);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_355.setTransform(347.225,408.025);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAOgTAAQgSAAgMgMIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_356.setTransform(336.475,409.95);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgEABgDQgBgFADgDQADgDAEAAQAFAAADADQACADAAAFQAAADgCAEQgDACgFAAQgEAAgDgCg");
	this.shape_357.setTransform(317.2,406.1);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgGgLAAQgIABgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_358.setTransform(309.275,405.8);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_359.setTransform(298.2,408.125);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_360.setTransform(289.85,407.925);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_361.setTransform(280.475,408.025);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgFgJIAJgLQAMAPARAAQALAAAIgHQAHgIAAgNIAAgJQgKAMgSAAQgSAAgMgPQgMgPAAgYQAAgaAMgOQALgOATAAQASAAALANIABgMIAQAAIAABmQABAVgMAMQgNALgUAAQgLAAgKgEgAgSgwQgIAKAAAUQAAASAIAJQAHALAMgBQASAAAHgPIAAgvQgIgPgRgBQgMAAgHALg");
	this.shape_362.setTransform(269.25,410);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_363.setTransform(258.325,407.925);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_364.setTransform(247.625,408.025);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAOgTAAQgSAAgMgMIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_365.setTransform(236.875,409.95);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_366.setTransform(222.25,407.925);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_367.setTransform(208.325,408.025);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_368.setTransform(194.15,407.925);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_369.setTransform(168.825,407.925);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_370.setTransform(157.825,408.025);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAKgLIAggiIAWAAIgoAsIAtA9g");
	this.shape_371.setTransform(148,405.8);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_372.setTransform(136.775,408.025);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_373.setTransform(114.825,408.025);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgLQAMAPAQAAQANAAAHgHQAIgIAAgNIAAgJQgMAMgRAAQgTAAgLgPQgLgPAAgYQAAgaALgOQALgOATAAQASAAAMANIAAgMIARAAIAABmQAAAVgNAMQgLALgVAAQgLAAgLgEgAgSgwQgIAKABAUQgBASAIAJQAHALANgBQAQAAAJgPIAAgvQgJgPgQgBQgMAAgIALg");
	this.shape_374.setTransform(103.6,410);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_375.setTransform(92.65,408.125);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#FFFFFF").s().p("AgTBcIAAgPIAIABQAHAAACgDQADgDAAgJIAAh1IASAAIAAB1QAAAegbAAQgGAAgFgBgAAChLQgCgDAAgEQAAgEACgDQACgDAGAAQAEAAADADQADADAAAEQAAAEgDADQgDADgEAAQgGAAgCgDg");
	this.shape_376.setTransform(83.7,408.225);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDADQgDAEgFAAQgFAAgCgEg");
	this.shape_377.setTransform(874.7,377.1);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_378.setTransform(866.725,378.925);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgCgDAAgDQAAgFACgDQADgDAEAAQAFAAADADQACADABAFQgBADgCADQgDAEgFAAQgEAAgDgEg");
	this.shape_379.setTransform(858.8,377.1);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_380.setTransform(843.225,378.925);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_381.setTransform(832.225,379.025);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgDgDAAgDQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAADgDADQgDAEgFAAQgEAAgDgEg");
	this.shape_382.setTransform(824.4,377.1);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgYIAAgBQAAgYALgPQALgOATAAQARAAAMAMIAAg3IASAAIAACVIgRAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgHAJAAAVQAAARAHALQAHAKANgBQAQAAAJgPIAAgvQgJgPgQgBQgNAAgHALg");
	this.shape_383.setTransform(816.05,376.9);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_384.setTransform(805.175,379.025);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#FFFFFF").s().p("AgTBcIAAgPIAIABQAGAAADgDQADgDAAgJIAAh1IASAAIAAB1QAAAegbAAQgGAAgFgBgAABhLQgBgDAAgEQAAgEABgDQAEgDAEAAQAGAAACADQADADAAAEQAAAEgDADQgCADgGAAQgFAAgDgDg");
	this.shape_385.setTransform(796.3,379.225);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_386.setTransform(789.775,379.025);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAsA9g");
	this.shape_387.setTransform(780,376.8);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#FFFFFF").s().p("AgMASQAIgNABgNIAAgQIARAAIAAAOQgBAKgEAJQgFAKgGAGg");
	this.shape_388.setTransform(764.35,384.65);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_389.setTransform(757.175,378.925);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_390.setTransform(746.175,379.025);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgKQAMAOAQAAQANAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgYQAAgZALgPQALgOATAAQASAAAMANIAAgLIARAAIAABlQAAAVgNAMQgLALgVAAQgLAAgLgEgAgSgwQgIAKABAVQgBARAIAKQAHAKANgBQAQAAAJgPIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_391.setTransform(734.95,381);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_392.setTransform(724.025,378.925);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgIgKg");
	this.shape_393.setTransform(712.95,379.125);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAsA9g");
	this.shape_394.setTransform(703.05,376.8);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#FFFFFF").s().p("AgWBGQgLgFgGgJIAKgKQALAOASAAQAMAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgSAAgMgPQgLgPAAgYQAAgZALgPQALgOATAAQASAAAMANIAAgLIARAAIAABlQgBAVgMAMQgLALgVAAQgLAAgLgEgAgSgwQgHAKAAAVQAAARAHAKQAHAKAMgBQARAAAJgPIAAgvQgJgQgRAAQgLAAgIALg");
	this.shape_395.setTransform(691.5,381);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_396.setTransform(680.575,378.925);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDADQgDAEgFAAQgFAAgCgEg");
	this.shape_397.setTransform(672.65,377.1);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_398.setTransform(667.775,376.8);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_399.setTransform(648.95,378.925);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_400.setTransform(635.025,379.025);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_401.setTransform(626.075,377.85);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQAAgIgFgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQAAgNAMgJQAKgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgGAFAAAHQAAAGAGADQAFAEAMADQAOADAIAEQAJADAEAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_402.setTransform(617.95,379.025);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgCgDAAgDQAAgFACgDQACgDAFAAQAFAAADADQACADABAFQgBADgCADQgDAEgFAAQgFAAgCgEg");
	this.shape_403.setTransform(610.4,377.1);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgEgGABgIQgBgNALgJQAMgJAPAAQATAAALAJQALAKAAAOIgSAAQAAgHgHgGQgGgFgKAAQgIAAgGAEQgFAFAAAHQgBAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_404.setTransform(602.8,379.025);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgKAHQgMAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgMAAgJALg");
	this.shape_405.setTransform(591.95,379.025);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#FFFFFF").s().p("AAWBLIgjgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_406.setTransform(581.85,376.8);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_407.setTransform(570.925,379.025);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgSAAIAAgLQgLANgTAAQgRAAgIgKg");
	this.shape_408.setTransform(552.4,379.125);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#FFFFFF").s().p("AgWBGQgLgFgGgJIAKgKQALAOASAAQALAAAIgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgYQAAgZALgPQALgOATAAQASAAAMANIAAgLIARAAIAABlQAAAVgNAMQgMALgUAAQgLAAgLgEgAgSgwQgHAKAAAVQAAARAHAKQAHAKANgBQAQAAAJgPIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_409.setTransform(541.1,381);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgFgJIAJgKQALAOARAAQAMAAAIgHQAHgIAAgOIAAgJQgLANgRAAQgSAAgMgPQgMgPAAgYQAAgZAMgPQALgOATAAQATAAAKANIABgLIAQAAIAABlQABAVgMAMQgNALgUAAQgKAAgLgEgAgSgwQgIAKAAAVQAAARAIAKQAHAKAMgBQASAAAHgPIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_410.setTransform(529.9,381);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_411.setTransform(518.975,378.925);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_412.setTransform(507.975,379.025);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgGgJIAJgKQAMAOARAAQAMAAAHgHQAHgIABgOIAAgJQgMANgRAAQgSAAgMgPQgLgPgBgYQABgZALgPQALgOATAAQATAAALANIAAgLIARAAIAABlQgBAVgLAMQgMALgVAAQgKAAgMgEgAgSgwQgHAKAAAVQAAARAHAKQAHAKAMgBQARAAAJgPIAAgvQgJgQgRAAQgLAAgIALg");
	this.shape_413.setTransform(496.75,381);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgKQALAOARAAQANAAAHgHQAIgIgBgOIAAgJQgKANgSAAQgTAAgLgPQgMgPABgYQgBgZAMgPQALgOATAAQASAAAMANIAAgLIAQAAIAABlQAAAVgMAMQgMALgUAAQgKAAgMgEgAgSgwQgIAKABAVQgBARAIAKQAHAKANgBQARAAAHgPIAAgvQgIgQgQAAQgNAAgHALg");
	this.shape_414.setTransform(485.55,381);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_415.setTransform(474.625,378.925);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_416.setTransform(463.925,379.025);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_417.setTransform(449.75,378.925);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_418.setTransform(427.875,378.925);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_419.setTransform(416.875,379.025);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAsA9g");
	this.shape_420.setTransform(407.05,376.8);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_421.setTransform(395.825,379.025);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_422.setTransform(377.275,378.925);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDADQgDAEgFAAQgFAAgCgEg");
	this.shape_423.setTransform(369.35,377.1);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_424.setTransform(361.425,379.025);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_425.setTransform(353.575,376.8);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_426.setTransform(345.975,379.025);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_427.setTransform(335.45,379.025);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDADQgDAEgFAAQgFAAgCgEg");
	this.shape_428.setTransform(320.3,377.1);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_429.setTransform(314.275,377.85);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_430.setTransform(305.825,379.025);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_431.setTransform(291.6,378.925);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgFgJIAJgKQALAOARAAQAMAAAIgHQAIgIgBgOIAAgJQgKANgSAAQgTAAgLgPQgMgPAAgYQAAgZAMgPQALgOATAAQATAAAKANIABgLIAQAAIAABlQAAAVgMAMQgMALgUAAQgKAAgLgEgAgSgwQgIAKAAAVQAAARAIAKQAHAKANgBQARAAAHgPIAAgvQgIgQgQAAQgNAAgHALg");
	this.shape_432.setTransform(269.45,381);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_433.setTransform(258.525,378.925);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_434.setTransform(247.525,379.025);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFABQAJgBAGgDQAFgEADgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_435.setTransform(237.35,381.15);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgDgBgDQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAADgDADQgDAEgFAAQgFAAgCgEg");
	this.shape_436.setTransform(222.65,377.1);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_437.setTransform(216.625,377.85);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_438.setTransform(208.175,379.025);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhgBABAlIAABGg");
	this.shape_439.setTransform(197.275,376.8);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_440.setTransform(186.575,379.025);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#FFFFFF").s().p("AAgBHIgyhCIgRASIAAAwIgTAAIAAiNIATAAIAABGIA+hGIAXAAIg3A/IA7BOg");
	this.shape_441.setTransform(175.75,377.2);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_442.setTransform(158.375,383.325);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_443.setTransform(152.275,377.85);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#FFFFFF").s().p("AggAsQgJgKAAgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgJgKg");
	this.shape_444.setTransform(143.75,379.125);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgKQAHgLAAgTQAAgTgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_445.setTransform(132.875,376.9);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_446.setTransform(121.875,379.025);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_447.setTransform(111.35,379.025);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_448.setTransform(103.35,378.925);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_449.setTransform(94.275,379.025);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMAAgFgHg");
	this.shape_450.setTransform(85.325,377.85);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#FFFFFF").s().p("AAWBLIgjgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoAqIAsA+g");
	this.shape_451.setTransform(872.65,347.8);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_452.setTransform(861.425,350.025);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJAAAGgFQAFgDADgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_453.setTransform(851.25,352.15);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_454.setTransform(841.025,349.925);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCACQgDADgFABQgFgBgCgDg");
	this.shape_455.setTransform(833.1,348.1);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_456.setTransform(821.85,349.925);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_457.setTransform(801.575,347.8);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_458.setTransform(790.875,350.025);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_459.setTransform(783.075,347.8);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgLAHQgLAHgPAAQgVAAgNgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_460.setTransform(774.95,350.025);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_461.setTransform(757.65,350.125);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgJQgKANgSAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQASAAALAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUAAQgKAAgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAJAMABQASAAAHgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_462.setTransform(746.35,352);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgLQALAOASAAQAMAAAHgIQAIgHAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgZQAAgYALgPQALgPATAAQASAAAMAOIAAgLIARAAIAABlQgBAVgMAMQgLAMgVAAQgLAAgLgGgAgSgwQgHAKAAAVQAAARAHAKQAHAJAMABQARAAAJgQIAAgvQgJgQgRAAQgLAAgIALg");
	this.shape_463.setTransform(735.15,352);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_464.setTransform(724.225,349.925);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_465.setTransform(713.225,350.025);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgLQALAOARAAQANAAAHgIQAIgHgBgOIAAgJQgKANgSAAQgTAAgLgPQgMgPABgZQgBgYAMgPQALgPATAAQASAAAMAOIAAgLIAQAAIAABlQAAAVgMAMQgMAMgUAAQgKAAgMgGgAgSgwQgIAKABAVQgBARAIAKQAHAJANABQARAAAHgQIAAgvQgIgQgQAAQgNAAgHALg");
	this.shape_466.setTransform(702,352);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOARAAQALAAAIgIQAHgHABgOIAAgJQgLANgSAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIARAAIAABlQAAAVgMAMQgNAMgUAAQgLAAgKgGgAgSgwQgHAKgBAVQABARAHAKQAHAJAMABQARAAAJgQIAAgvQgJgQgRAAQgMAAgHALg");
	this.shape_467.setTransform(690.8,352);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_468.setTransform(679.875,349.925);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_469.setTransform(669.175,350.025);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_470.setTransform(660.225,348.85);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_471.setTransform(648.35,349.925);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFABQgFgBgCgDg");
	this.shape_472.setTransform(642.05,348.1);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_473.setTransform(634.125,350.025);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_474.setTransform(617.175,347.8);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_475.setTransform(606.475,350.025);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_476.setTransform(598.675,347.8);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgMAHQgLAHgOAAQgVAAgNgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_477.setTransform(590.55,350.025);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_478.setTransform(573.275,349.925);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_479.setTransform(562.575,350.025);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgJQgKANgSAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQASAAALAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUAAQgLAAgKgGgAgSgwQgIAKAAAVQAAARAIAKQAHAJAMABQARAAAIgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_480.setTransform(551.4,352);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgDgCAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFABQgEgBgDgDg");
	this.shape_481.setTransform(543.6,348.1);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_482.setTransform(536,350.025);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoAqIAtA+g");
	this.shape_483.setTransform(526.45,347.8);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgKAHQgMAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgMAAgJALg");
	this.shape_484.setTransform(515,350.025);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_485.setTransform(497.725,349.925);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_486.setTransform(486.725,350.025);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_487.setTransform(477.725,348.85);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_488.setTransform(469.275,350.025);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#FFFFFF").s().p("AAWBLIgjgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoAqIAsA+g");
	this.shape_489.setTransform(459.45,347.8);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgDgCABgFQgBgEADgDQADgDAEAAQAFAAADADQADADgBAEQABAFgDACQgDADgFABQgEgBgDgDg");
	this.shape_490.setTransform(451.3,348.1);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgJQgLANgRAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUAAQgKAAgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAJAMABQASAAAHgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_491.setTransform(443.05,352);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_492.setTransform(432.125,349.925);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_493.setTransform(421.425,350.025);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTAAQgSAAgMgMIAAAzgAgagrIAAAyQAJANAQAAQAMAAAIgKQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_494.setTransform(410.675,351.95);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_495.setTransform(393.325,350.025);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_496.setTransform(382.375,349.925);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_497.setTransform(371.675,350.025);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_498.setTransform(363.45,349.925);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_499.setTransform(354.075,350.025);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoAqIAsA+g");
	this.shape_500.setTransform(344.25,347.8);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_501.setTransform(326.975,350.025);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgDgCAAgFQAAgEADgDQACgDAFAAQAFAAADADQACADABAEQgBAFgCACQgDADgFABQgFgBgCgDg");
	this.shape_502.setTransform(319.15,348.1);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQALAAAFgEQAHgEAAgHQgBgIgFgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgGgGQgGgFgKAAQgJAAgFAEQgFAFAAAHQAAAGAEADQAGAEANADQANADAJAEQAIADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgKgFg");
	this.shape_503.setTransform(311.55,350.025);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#FFFFFF").s().p("AAXBLIglgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoAqIAtA+g");
	this.shape_504.setTransform(302,347.8);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgKAHQgMAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAIALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgIALg");
	this.shape_505.setTransform(290.55,350.025);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTAAQgSAAgMgMIAAAzgAgagrIAAAyQAJANAQAAQAMAAAIgKQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_506.setTransform(279.475,351.95);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFABQgFgBgCgDg");
	this.shape_507.setTransform(271.25,348.1);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_508.setTransform(263.325,347.8);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgDgCABgFQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAFgDACQgDADgFABQgFgBgCgDg");
	this.shape_509.setTransform(249.35,348.1);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_510.setTransform(238.1,349.925);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_511.setTransform(223.875,350.025);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_512.setTransform(216.025,347.8);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_513.setTransform(208.125,350.025);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgJQgLANgRAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUAAQgKAAgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAJAMABQASAAAHgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_514.setTransform(196.9,352);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_515.setTransform(185.975,349.925);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_516.setTransform(175.275,350.025);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_517.setTransform(161.1,349.925);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoAqIAsA+g");
	this.shape_518.setTransform(141.9,347.8);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_519.setTransform(130.675,350.025);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAKAAAEgFQAFgDAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgqB5QgJAagWAAg");
	this.shape_520.setTransform(120.5,352.15);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_521.setTransform(110.275,349.925);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgCgCAAgFQAAgEACgDQADgDAEAAQAFAAADADQACADABAEQgBAFgCACQgDADgFABQgEgBgDgDg");
	this.shape_522.setTransform(102.35,348.1);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQAMgOAUAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_523.setTransform(91.1,349.925);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_524.setTransform(871.625,318.8);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_525.setTransform(860.925,321.025);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_526.setTransform(853.125,318.8);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_527.setTransform(845,321.025);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAADACIAAAQIgJAAQgRAAgGAPIAABKg");
	this.shape_528.setTransform(825.5,320.925);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_529.setTransform(816.125,321.025);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_530.setTransform(801.9,320.925);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_531.setTransform(787.975,321.025);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#FFFFFF").s().p("AgfAoQgNgOAAgZIAAgCQABgQAFgMQAGgMAKgGQALgHANAAQASAAAMALQAMAKABARIgSAAQAAgKgIgGQgGgHgLAAQgMAAgIAKQgHAKgBATIAAACQABASAHAKQAIAKAMAAQAKAAAHgGQAIgGAAgJIASAAQgBAKgGAIQgFAIgKAFQgKAFgLAAQgUAAgNgPg");
	this.shape_532.setTransform(777.55,321.025);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_533.setTransform(769.35,320.925);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_534.setTransform(760.275,321.025);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_535.setTransform(751.325,319.85);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgGgIIAKgMQALAPARAAQAMAAAIgIQAIgHgBgNIAAgJQgLAMgRAAQgTAAgLgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIAQAAIAABnQAAAUgMAMQgMAMgUAAQgKgBgLgFgAgSgwQgIAKAAAUQAAASAIAJQAHALANAAQARgBAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_536.setTransform(731.6,323);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_537.setTransform(720.675,320.925);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_538.setTransform(709.675,321.025);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJgBAGgEQAFgDADgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgqB5QgJAagVAAg");
	this.shape_539.setTransform(699.5,323.15);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_540.setTransform(678.325,320.925);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_541.setTransform(667.325,321.025);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_542.setTransform(659.05,320.925);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCACQgDADgFAAQgFAAgCgDg");
	this.shape_543.setTransform(652.75,319.1);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_544.setTransform(644.825,321.025);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_545.setTransform(636.55,320.925);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_546.setTransform(627.475,321.025);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_547.setTransform(616.725,322.95);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#FFFFFF").s().p("AgMASQAIgNABgNIAAgQIARAAIAAAPQAAAJgFAJQgFAKgGAGg");
	this.shape_548.setTransform(597.65,326.65);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_549.setTransform(590.45,321.125);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_550.setTransform(581.375,319.85);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_551.setTransform(576,319.1);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_552.setTransform(557.075,320.925);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAFgCACQgDADgFAAQgFAAgCgDg");
	this.shape_553.setTransform(549.15,319.1);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_554.setTransform(541.225,321.025);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_555.setTransform(533.375,318.8);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_556.setTransform(525.775,321.025);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#FFFFFF").s().p("AgYBEQgNgHgHgJQgGgKgBgMIATAAQAAANAJAHQAKAIAPAAQAPgBAIgFQAIgHAAgKQAAgLgHgFQgIgGgSgGQgYgHgLgJQgLgKAAgPQAAgQAOgLQANgLAUAAQAPAAAMAGQALAFAGAKQAHAKgBAMIgTAAQAAgNgIgHQgIgIgPAAQgNAAgIAGQgHAHAAAKQAAAJAHAGQAHAGARAFQASAFAKAFQAKAGAFAIQAFAIgBALQAAARgNAKQgOALgWAAQgOAAgMgFg");
	this.shape_557.setTransform(514.55,319.2);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_558.setTransform(494.975,325.325);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_559.setTransform(490.025,318.8);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_560.setTransform(482.125,321.025);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_561.setTransform(467.9,320.925);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_562.setTransform(456.75,319.1);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_563.setTransform(450.725,319.85);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_564.setTransform(442.375,322.95);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgKAHQgMAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgMAAgJALg");
	this.shape_565.setTransform(430.85,321.025);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgTAAIAAiVIATAAIAABZIAJgLIAggiIAWAAIgoArIAtA+g");
	this.shape_566.setTransform(409.8,318.8);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_567.setTransform(398.575,321.025);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAgBQAAgXAMgPQAMgPASAAQASAAAKANIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgIAJAAAUQAAATAIAJQAHALAMAAQASgBAHgPIAAgwQgHgPgSABQgMAAgHAKg");
	this.shape_568.setTransform(387.25,318.9);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQACgDAFAAQAFAAADADQACADABAEQgBAFgCACQgDADgFAAQgFAAgCgDg");
	this.shape_569.setTransform(379.45,319.1);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_570.setTransform(373.425,319.85);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_571.setTransform(353.975,320.925);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_572.setTransform(342.975,321.025);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_573.setTransform(332.075,318.8);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_574.setTransform(321,321.125);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARABQAMAAAIgLQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_575.setTransform(310.125,318.9);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_576.setTransform(295.5,320.925);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_577.setTransform(281.2,321.125);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_578.setTransform(272.125,319.85);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_579.setTransform(252.725,318.8);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_580.setTransform(242.025,321.025);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_581.setTransform(234.225,318.8);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgKAHQgMAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgMAAgJALg");
	this.shape_582.setTransform(226.1,321.025);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_583.setTransform(204.075,322.95);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_584.setTransform(192.775,321.025);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_585.setTransform(184.5,320.925);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_586.setTransform(175.425,321.025);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgEgGgBgIQAAgNAMgJQAKgJARAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFAAAHQABAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_587.setTransform(164.9,321.025);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_588.setTransform(156.9,320.925);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_589.setTransform(147.825,321.025);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMAAgFgIg");
	this.shape_590.setTransform(138.875,319.85);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgGgIIAKgMQALAPARAAQAMAAAIgIQAIgHgBgNIAAgJQgKAMgSAAQgTAAgLgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIAQAAIAABnQAAAUgLAMQgNAMgUAAQgKgBgLgFgAgSgwQgIAKAAAUQAAASAIAJQAHALANAAQARgBAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_591.setTransform(119.15,323);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_592.setTransform(108.225,320.925);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_593.setTransform(97.225,321.025);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJgBAGgEQAFgDADgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_594.setTransform(87.05,323.15);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_595.setTransform(871.525,292.025);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_596.setTransform(863.25,291.925);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_597.setTransform(853.875,292.025);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_598.setTransform(842.975,289.8);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_599.setTransform(825.9,291.925);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgIgKg");
	this.shape_600.setTransform(816.45,292.125);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgKgFg");
	this.shape_601.setTransform(805.8,292.025);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_602.setTransform(795.125,291.925);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_603.setTransform(784.05,292.125);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_604.setTransform(764.375,292.025);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgHgJIAKgLQALAPASAAQAMAAAHgHQAIgIAAgNIAAgJQgMAMgRAAQgTAAgLgPQgLgPAAgYQAAgaALgOQALgOATAAQASAAAMANIAAgMIARAAIAABnQgBAUgMAMQgLALgVAAQgLAAgLgEgAgSgwQgHAKAAAUQAAASAHAJQAHAKAMAAQARAAAJgPIAAgvQgJgPgRAAQgLgBgIALg");
	this.shape_605.setTransform(753.15,294);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgGgJIAKgLQALAPARAAQAMAAAIgHQAIgIgBgNIAAgJQgLAMgRAAQgTAAgLgPQgMgPAAgYQAAgaAMgOQALgOATAAQATAAAKANIABgMIAQAAIAABnQAAAUgLAMQgNALgUAAQgKAAgLgEgAgSgwQgIAKAAAUQAAASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNgBgHALg");
	this.shape_606.setTransform(741.95,294);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_607.setTransform(731.025,291.925);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgDABgFQgBgEADgDQADgDAEAAQAFAAADADQACADAAAEQAAAFgCADQgDACgFAAQgEAAgDgCg");
	this.shape_608.setTransform(723.1,290.1);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_609.setTransform(715.175,289.8);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_610.setTransform(704.475,292.025);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNAMgJQALgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_611.setTransform(693.95,292.025);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgDAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_612.setTransform(677.7,290.1);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAGgEQAGgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQASAAALAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_613.setTransform(670.1,292.025);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgFgJIAJgLQALAPARAAQAMAAAIgHQAIgIgBgNIAAgJQgLAMgRAAQgTAAgLgPQgMgPAAgYQAAgaAMgOQALgOATAAQATAAAKANIABgMIAQAAIAABnQAAAUgMAMQgMALgUAAQgKAAgLgEgAgSgwQgIAKAAAUQAAASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNgBgHALg");
	this.shape_614.setTransform(659.15,294);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_615.setTransform(648.225,291.925);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_616.setTransform(637.15,292.125);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#FFFFFF").s().p("AgOBMIAAhaIgRAAIAAgPIARAAIAAgKQAAgRAJgKQAIgJARAAIAMABIgBAPIgKAAQgJAAgEAEQgFAGAAAJIAAALIAWAAIAAAPIgWAAIAABag");
	this.shape_617.setTransform(628.475,289.7);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_618.setTransform(610.475,291.925);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_619.setTransform(599.475,292.025);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_620.setTransform(588.525,291.925);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#FFFFFF").s().p("AgfAsQgKgKAAgTIAAhEIASAAIAABDQAAAYAUAAQAUAAAGgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_621.setTransform(577.45,292.125);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_622.setTransform(569.1,291.925);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_623.setTransform(559.65,292.125);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_624.setTransform(548.625,291.925);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_625.setTransform(537.925,292.025);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMgBAIgJQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_626.setTransform(527.175,293.95);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgDABgFQgBgEADgDQADgDAEAAQAFAAADADQADADgBAEQABAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_627.setTransform(510.25,290.1);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_628.setTransform(499,291.925);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_629.setTransform(484.775,292.025);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_630.setTransform(476.925,289.8);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_631.setTransform(469.025,292.025);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#FFFFFF").s().p("AgVBGQgMgFgFgJIAJgLQAMAPAQAAQAMAAAIgHQAHgIAAgNIAAgJQgKAMgSAAQgSAAgMgPQgMgPAAgYQAAgaAMgOQALgOATAAQASAAALANIABgMIAQAAIAABnQABAUgMAMQgNALgUAAQgLAAgKgEgAgSgwQgIAKAAAUQAAASAIAJQAHAKAMAAQASAAAHgPIAAgvQgIgPgRAAQgMgBgHALg");
	this.shape_632.setTransform(457.8,294);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_633.setTransform(446.875,291.925);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_634.setTransform(436.175,292.025);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_635.setTransform(422,291.925);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_636.setTransform(399.075,289.8);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_637.setTransform(388.075,292.025);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_638.setTransform(377.125,291.925);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_639.setTransform(366.125,292.025);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#FFFFFF").s().p("AgIBHIAAh+IguAAIAAgPIBtAAIAAAPIguAAIAAB+g");
	this.shape_640.setTransform(354.725,290.2);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_641.setTransform(337.375,296.325);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgDgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDADQgDACgFAAQgFAAgCgCg");
	this.shape_642.setTransform(332.45,290.1);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_643.setTransform(321.2,291.925);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#FFFFFF").s().p("AgfAsQgKgKABgTIAAhEIASAAIAABDQgBAYAUAAQAUAAAGgPIAAhMIASAAIAABpIgRAAIAAgLQgKANgUAAQgRAAgIgKg");
	this.shape_644.setTransform(306.9,292.125);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAPAAAYIAAABQAAAYgLAPQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMAAAIgKQAHgKAAgTQAAgTgHgJQgHgLgNABQgSAAgIAQg");
	this.shape_645.setTransform(296.025,289.9);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_646.setTransform(277.1,289.8);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_647.setTransform(265.875,292.025);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFAAQAKAAAEgDQAGgEADgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgqB5QgJAagWAAg");
	this.shape_648.setTransform(255.7,294.15);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_649.setTransform(245.475,291.925);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgDABgFQgBgEADgDQADgDAEAAQAFAAADADQADADgBAEQABAFgDADQgDACgFAAQgEAAgDgCg");
	this.shape_650.setTransform(237.55,290.1);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_651.setTransform(226.3,291.925);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLABQgIAAgGAEQgHAFgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_652.setTransform(203.375,289.8);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_653.setTransform(192.675,292.025);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_654.setTransform(184.875,289.8);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgVAAgMgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_655.setTransform(176.75,292.025);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAADACIAAAQIgJAAQgRAAgGAPIAABKg");
	this.shape_656.setTransform(159.5,291.925);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_657.setTransform(150.125,292.025);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_658.setTransform(135.9,291.925);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_659.setTransform(121.975,292.025);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#FFFFFF").s().p("AgfAoQgNgOAAgZIAAgCQABgQAFgMQAGgMAKgGQALgHANAAQASAAAMALQAMAKABARIgSAAQAAgKgIgGQgGgHgLAAQgMAAgIAKQgHAKAAATIAAACQAAASAHAKQAIAKAMAAQAKAAAHgGQAIgGAAgJIASAAQgBAKgGAIQgFAIgKAFQgKAFgLAAQgUAAgNgPg");
	this.shape_660.setTransform(111.55,292.025);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_661.setTransform(103.35,291.925);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_662.setTransform(94.275,292.025);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHABQgMAAgFgIg");
	this.shape_663.setTransform(85.325,290.85);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_664.setTransform(871.525,263.025);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFAAQAJAAAGgDQAEgEAEgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_665.setTransform(861.35,265.15);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_666.setTransform(851.125,262.925);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_667.setTransform(842.025,261.85);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_668.setTransform(833.575,263.025);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_669.setTransform(824.575,261.85);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg1QgCgEAAgDQAAgFACgDQACgDAFAAQAFAAADADQACADABAFQgBADgCAEQgDADgFAAQgFAAgCgDg");
	this.shape_670.setTransform(819.2,261.1);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_671.setTransform(811.375,260.9);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_672.setTransform(800.075,263.025);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLAAQgIABgGAFQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_673.setTransform(789.175,260.8);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_674.setTransform(768.975,263.025);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_675.setTransform(758.025,262.925);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_676.setTransform(747.325,263.025);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAADACIAAAQIgJAAQgRAAgGAPIAABKg");
	this.shape_677.setTransform(739.1,262.925);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_678.setTransform(729.725,263.025);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_679.setTransform(719.9,260.8);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_680.setTransform(701.375,261.85);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_681.setTransform(692.85,263.125);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_682.setTransform(681.975,260.9);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_683.setTransform(670.975,263.025);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgLAAgLgFg");
	this.shape_684.setTransform(660.45,263.025);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_685.setTransform(652.45,262.925);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_686.setTransform(643.375,263.025);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_687.setTransform(634.425,261.85);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg1QgCgEAAgDQAAgFACgDQADgDAEAAQAFAAADADQACADABAFQgBADgCAEQgDADgFAAQgEAAgDgDg");
	this.shape_688.setTransform(619.85,261.1);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_689.setTransform(613.825,261.85);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_690.setTransform(605.375,263.025);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_691.setTransform(591.15,262.925);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#FFFFFF").s().p("AgWBGQgKgFgGgJIAJgLQALAPASAAQAMAAAHgHQAHgIABgOIAAgJQgMANgRAAQgSAAgMgPQgMgPABgYQgBgZAMgPQALgOATAAQASAAALANIABgLIARAAIAABlQgBAVgLAMQgMALgVAAQgKAAgMgEgAgSgwQgHAKgBAVQABARAHAJQAHALAMgBQARAAAJgPIAAgvQgJgQgRAAQgLAAgIALg");
	this.shape_692.setTransform(567.4,265);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_693.setTransform(556.475,262.925);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_694.setTransform(545.475,263.025);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#FFFFFF").s().p("AgfBKIgHgBIAAgPIAFAAQAKAAAEgDQAFgEAEgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgqB5QgJAagWAAg");
	this.shape_695.setTransform(535.3,265.15);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgCgEAAgDQAAgFACgDQACgDAFAAQAFAAADADQACADAAAFQAAADgCAEQgDADgFAAQgFAAgCgDg");
	this.shape_696.setTransform(519,261.1);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_697.setTransform(512.975,261.85);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_698.setTransform(504.525,263.025);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgLgFgFQgFgGgLAAQgIABgGAFQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgOASAAQAhAAABAkIAABGg");
	this.shape_699.setTransform(493.625,260.8);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_700.setTransform(482.925,263.025);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAtA9g");
	this.shape_701.setTransform(473.15,260.8);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_702.setTransform(452.725,263.025);

	this.shape_703 = new cjs.Shape();
	this.shape_703.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAOgTAAQgSAAgMgMIAAAzgAgagrIAAAxQAJAPAQAAQAMgBAIgJQAIgLAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_703.setTransform(441.925,264.95);

	this.shape_704 = new cjs.Shape();
	this.shape_704.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_704.setTransform(430.625,263.025);

	this.shape_705 = new cjs.Shape();
	this.shape_705.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_705.setTransform(422.35,262.925);

	this.shape_706 = new cjs.Shape();
	this.shape_706.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_706.setTransform(413.275,263.025);

	this.shape_707 = new cjs.Shape();
	this.shape_707.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATAAALAOQALAOAAAZIAAACQAAAYgLAOQgLAPgTAAQgTAAgLgOgAgagBIAAAtQAJAQARAAQAMABAIgLQAHgKAAgTQAAgTgHgJQgHgLgNAAQgSAAgIARg");
	this.shape_707.setTransform(402.525,260.9);

	this.shape_708 = new cjs.Shape();
	this.shape_708.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_708.setTransform(391.525,263.025);

	this.shape_709 = new cjs.Shape();
	this.shape_709.graphics.f("#FFFFFF").s().p("AgvBHIAAiNIAuAAQAWAAAMAKQAMAJAAATQgBAJgFAIQgGAIgJAEQALADAHAJQAGAIAAANQAAATgMALQgMALgXAAgAgcA4IAdAAQANgBAIgGQAHgHAAgMQAAgZgcgBIgdAAgAgcgJIAcAAQALgBAHgFQAIgHAAgKQgBgMgGgGQgHgFgNAAIgbAAg");
	this.shape_709.setTransform(380.2,261.2);

	this.shape_710 = new cjs.Shape();
	this.shape_710.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_710.setTransform(361.825,267.325);

	this.shape_711 = new cjs.Shape();
	this.shape_711.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgDgEABgDQgBgFADgDQACgDAFAAQAFAAADADQADADgBAFQABADgDAEQgDADgFAAQgFAAgCgDg");
	this.shape_711.setTransform(356.9,261.1);

	this.shape_712 = new cjs.Shape();
	this.shape_712.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_712.setTransform(350.875,261.85);

	this.shape_713 = new cjs.Shape();
	this.shape_713.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_713.setTransform(342.425,263.025);

	this.shape_714 = new cjs.Shape();
	this.shape_714.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgLAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_714.setTransform(328.2,262.925);

	this.shape_715 = new cjs.Shape();
	this.shape_715.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg1QgDgEABgDQgBgFADgDQACgDAFAAQAFAAADADQADADgBAFQABADgDAEQgDADgFAAQgFAAgCgDg");
	this.shape_715.setTransform(307.85,261.1);

	this.shape_716 = new cjs.Shape();
	this.shape_716.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgYIAAgBQAAgYAMgPQAMgOASAAQASAAAKAMIAAg3IASAAIAACVIgQAAIgBgMQgLAOgSAAQgSAAgMgPgAgSgHQgIAJAAAVQAAARAIAKQAHALAMgBQASAAAHgPIAAgwQgHgPgSAAQgMAAgHALg");
	this.shape_716.setTransform(299.5,260.9);

	this.shape_717 = new cjs.Shape();
	this.shape_717.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_717.setTransform(288.625,263.025);

	this.shape_718 = new cjs.Shape();
	this.shape_718.graphics.f("#FFFFFF").s().p("AgTBcIAAgPIAJABQAFAAAEgDQACgDAAgJIAAh1IASAAIAAB1QAAAegbAAQgGAAgFgBgAABhLQgBgDAAgEQAAgEABgDQAEgDAFAAQAFAAADADQACADAAAEQAAAEgCADQgDADgFAAQgGAAgDgDg");
	this.shape_718.setTransform(279.75,263.225);

	this.shape_719 = new cjs.Shape();
	this.shape_719.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_719.setTransform(272.875,262.925);

	this.shape_720 = new cjs.Shape();
	this.shape_720.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_720.setTransform(262.175,263.025);

	this.shape_721 = new cjs.Shape();
	this.shape_721.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAGgHAIgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_721.setTransform(248,262.925);

	this.shape_722 = new cjs.Shape();
	this.shape_722.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAtA9g");
	this.shape_722.setTransform(225.65,260.8);

	this.shape_723 = new cjs.Shape();
	this.shape_723.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_723.setTransform(214.425,263.025);

	this.shape_724 = new cjs.Shape();
	this.shape_724.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABAMQALgOASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAPQgLAOgTAAQgSAAgMgMIAAAzgAgagrIAAAxQAJAPAQAAQAMgBAIgJQAIgLAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_724.setTransform(203.625,264.95);

	this.shape_725 = new cjs.Shape();
	this.shape_725.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_725.setTransform(189,262.925);

	this.shape_726 = new cjs.Shape();
	this.shape_726.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_726.setTransform(174.775,263.025);

	this.shape_727 = new cjs.Shape();
	this.shape_727.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgYIAAgBQAAgYALgPQALgOATAAQARAAAMAMIAAg3IASAAIAACVIgRAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgIAJABAVQgBARAIAKQAHALANgBQAQAAAJgPIAAgwQgJgPgQAAQgNAAgHALg");
	this.shape_727.setTransform(163.45,260.9);

	this.shape_728 = new cjs.Shape();
	this.shape_728.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_728.setTransform(143.375,263.025);

	this.shape_729 = new cjs.Shape();
	this.shape_729.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_729.setTransform(132.425,262.925);

	this.shape_730 = new cjs.Shape();
	this.shape_730.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_730.setTransform(121.725,263.025);

	this.shape_731 = new cjs.Shape();
	this.shape_731.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_731.setTransform(111.95,260.8);

	this.shape_732 = new cjs.Shape();
	this.shape_732.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_732.setTransform(103.35,262.925);

	this.shape_733 = new cjs.Shape();
	this.shape_733.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_733.setTransform(94.275,263.025);

	this.shape_734 = new cjs.Shape();
	this.shape_734.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAOQgHACgHAAQgMABgFgIg");
	this.shape_734.setTransform(85.325,261.85);

	this.shape_735 = new cjs.Shape();
	this.shape_735.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgJIAKgKQAMAOAQAAQANAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgZQAAgYALgPQALgPATAAQASAAAMAOIAAgLIARAAIAABlQAAAVgNAMQgLAMgVgBQgLABgLgGgAgSgwQgIAKABAVQgBARAIAKQAHAKANAAQAQAAAJgQIAAgvQgJgQgQAAQgMAAgIALg");
	this.shape_735.setTransform(871.3,236);

	this.shape_736 = new cjs.Shape();
	this.shape_736.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_736.setTransform(860.375,233.925);

	this.shape_737 = new cjs.Shape();
	this.shape_737.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_737.setTransform(849.375,234.025);

	this.shape_738 = new cjs.Shape();
	this.shape_738.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJAAAGgFQAEgDAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_738.setTransform(839.2,236.15);

	this.shape_739 = new cjs.Shape();
	this.shape_739.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_739.setTransform(823.125,233.925);

	this.shape_740 = new cjs.Shape();
	this.shape_740.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_740.setTransform(812.125,234.025);

	this.shape_741 = new cjs.Shape();
	this.shape_741.graphics.f("#FFFFFF").s().p("AAZA1IgZhPIgYBPIgPAAIgfhpIASAAIAVBOIAZhOIANAAIAZBQIAVhQIASAAIgfBpg");
	this.shape_741.setTransform(799.125,234.025);

	this.shape_742 = new cjs.Shape();
	this.shape_742.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_742.setTransform(786.475,234.025);

	this.shape_743 = new cjs.Shape();
	this.shape_743.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_743.setTransform(775.625,231.8);

	this.shape_744 = new cjs.Shape();
	this.shape_744.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_744.setTransform(758.725,233.925);

	this.shape_745 = new cjs.Shape();
	this.shape_745.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_745.setTransform(747.725,234.025);

	this.shape_746 = new cjs.Shape();
	this.shape_746.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgYIAAgCQAAgXALgPQALgPATAAQARAAAMANIAAg3IASAAIAACVIgRAAIgBgMQgLAOgSAAQgTAAgLgPgAgSgHQgHAJAAAVQAAARAHALQAHAKANAAQAQAAAJgQIAAgvQgJgPgQgBQgNAAgHALg");
	this.shape_746.setTransform(736.4,231.9);

	this.shape_747 = new cjs.Shape();
	this.shape_747.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_747.setTransform(719.625,233.925);

	this.shape_748 = new cjs.Shape();
	this.shape_748.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_748.setTransform(708.625,234.025);

	this.shape_749 = new cjs.Shape();
	this.shape_749.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_749.setTransform(697.725,231.8);

	this.shape_750 = new cjs.Shape();
	this.shape_750.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_750.setTransform(686.65,234.125);

	this.shape_751 = new cjs.Shape();
	this.shape_751.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgagBIAAAtQAJARARAAQAMAAAIgKQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_751.setTransform(675.775,231.9);

	this.shape_752 = new cjs.Shape();
	this.shape_752.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_752.setTransform(661.15,233.925);

	this.shape_753 = new cjs.Shape();
	this.shape_753.graphics.f("#FFFFFF").s().p("AggAsQgJgKAAgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgRAAIAAgLQgLANgTAAQgRAAgJgKg");
	this.shape_753.setTransform(646.85,234.125);

	this.shape_754 = new cjs.Shape();
	this.shape_754.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_754.setTransform(637.775,232.85);

	this.shape_755 = new cjs.Shape();
	this.shape_755.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_755.setTransform(623.475,234.025);

	this.shape_756 = new cjs.Shape();
	this.shape_756.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAOQgLAQgTgBQgSAAgMgMIAAAzgAgagrIAAAyQAJANAQAAQAMAAAIgKQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_756.setTransform(612.675,235.95);

	this.shape_757 = new cjs.Shape();
	this.shape_757.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_757.setTransform(601.375,234.025);

	this.shape_758 = new cjs.Shape();
	this.shape_758.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_758.setTransform(593.1,233.925);

	this.shape_759 = new cjs.Shape();
	this.shape_759.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_759.setTransform(584.025,234.025);

	this.shape_760 = new cjs.Shape();
	this.shape_760.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgagBIAAAtQAJARARAAQAMAAAIgKQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_760.setTransform(573.275,231.9);

	this.shape_761 = new cjs.Shape();
	this.shape_761.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_761.setTransform(562.275,234.025);

	this.shape_762 = new cjs.Shape();
	this.shape_762.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgagBIAAAtQAJARARAAQAMAAAIgKQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_762.setTransform(551.525,231.9);

	this.shape_763 = new cjs.Shape();
	this.shape_763.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_763.setTransform(534.375,234.025);

	this.shape_764 = new cjs.Shape();
	this.shape_764.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgJIAJgKQALAOARAAQAMAAAIgHQAHgIAAgOIAAgJQgLANgRAAQgSAAgMgPQgMgPAAgZQAAgYAMgPQALgPATAAQATAAAKAOIABgLIAQAAIAABlQABAVgMAMQgNAMgUgBQgKABgLgGgAgSgwQgIAKAAAVQAAARAIAKQAHAKAMAAQASAAAHgQIAAgvQgIgQgRAAQgMAAgHALg");
	this.shape_764.setTransform(523.15,236);

	this.shape_765 = new cjs.Shape();
	this.shape_765.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgJIAKgKQALAOASAAQAMAAAHgHQAIgIAAgOIAAgJQgMANgRAAQgTAAgLgPQgLgPAAgZQAAgYALgPQALgPATAAQASAAAMAOIAAgLIARAAIAABlQgBAVgMAMQgLAMgVgBQgLABgLgGgAgSgwQgHAKAAAVQAAARAHAKQAHAKAMAAQARAAAJgQIAAgvQgJgQgRAAQgLAAgIALg");
	this.shape_765.setTransform(511.95,236);

	this.shape_766 = new cjs.Shape();
	this.shape_766.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_766.setTransform(501.025,233.925);

	this.shape_767 = new cjs.Shape();
	this.shape_767.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgEQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAAEgDACQgDAEgFAAQgFAAgCgEg");
	this.shape_767.setTransform(493.1,232.1);

	this.shape_768 = new cjs.Shape();
	this.shape_768.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_768.setTransform(485.175,231.8);

	this.shape_769 = new cjs.Shape();
	this.shape_769.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_769.setTransform(474.475,234.025);

	this.shape_770 = new cjs.Shape();
	this.shape_770.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEgBgHQAAgIgFgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgLAAgLgFg");
	this.shape_770.setTransform(463.95,234.025);

	this.shape_771 = new cjs.Shape();
	this.shape_771.graphics.f("#FFFFFF").s().p("AgNASQAKgNAAgNIAAgQIAQAAIAAAOQABAKgFAJQgFAKgHAGg");
	this.shape_771.setTransform(450.65,239.65);

	this.shape_772 = new cjs.Shape();
	this.shape_772.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_772.setTransform(445.425,232.85);

	this.shape_773 = new cjs.Shape();
	this.shape_773.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_773.setTransform(436.9,234.125);

	this.shape_774 = new cjs.Shape();
	this.shape_774.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgagBIAAAtQAJARARAAQAMAAAIgKQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_774.setTransform(426.025,231.9);

	this.shape_775 = new cjs.Shape();
	this.shape_775.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_775.setTransform(415.025,234.025);

	this.shape_776 = new cjs.Shape();
	this.shape_776.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAPAAQASAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_776.setTransform(404.5,234.025);

	this.shape_777 = new cjs.Shape();
	this.shape_777.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_777.setTransform(396.5,233.925);

	this.shape_778 = new cjs.Shape();
	this.shape_778.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_778.setTransform(387.425,234.025);

	this.shape_779 = new cjs.Shape();
	this.shape_779.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_779.setTransform(378.475,232.85);

	this.shape_780 = new cjs.Shape();
	this.shape_780.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAgghIAWAAIgoArIAtA9g");
	this.shape_780.setTransform(365.25,231.8);

	this.shape_781 = new cjs.Shape();
	this.shape_781.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_781.setTransform(354.025,234.025);

	this.shape_782 = new cjs.Shape();
	this.shape_782.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFABQAJAAAGgFQAEgDAEgKIAEgKIgmhoIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_782.setTransform(343.85,236.15);

	this.shape_783 = new cjs.Shape();
	this.shape_783.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_783.setTransform(333.625,233.925);

	this.shape_784 = new cjs.Shape();
	this.shape_784.graphics.f("#FFFFFF").s().p("AgJBIIAAhoIASAAIAABogAgHg2QgCgCgBgEQABgFACgDQACgDAFAAQAFAAADADQADADAAAFQAAAEgDACQgDAEgFAAQgFAAgCgEg");
	this.shape_784.setTransform(325.7,232.1);

	this.shape_785 = new cjs.Shape();
	this.shape_785.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_785.setTransform(314.45,233.925);

	this.shape_786 = new cjs.Shape();
	this.shape_786.graphics.f("#FFFFFF").s().p("AAXBLIAAhGQAAgKgFgGQgFgFgLgBQgIAAgGAGQgHAEgEAHIAABLIgSAAIAAiVIASAAIAAA5QANgPASAAQAhAAABAlIAABGg");
	this.shape_786.setTransform(294.375,231.8);

	this.shape_787 = new cjs.Shape();
	this.shape_787.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_787.setTransform(283.375,234.025);

	this.shape_788 = new cjs.Shape();
	this.shape_788.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgagBIAAAtQAJARARAAQAMAAAIgKQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_788.setTransform(272.575,231.9);

	this.shape_789 = new cjs.Shape();
	this.shape_789.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_789.setTransform(261.275,234.025);

	this.shape_790 = new cjs.Shape();
	this.shape_790.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAjAAAAAlIAABGg");
	this.shape_790.setTransform(247.05,233.925);

	this.shape_791 = new cjs.Shape();
	this.shape_791.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgDgCAAgEQAAgFADgDQACgDAFAAQAFAAADADQACADABAFQgBAEgCACQgDAEgFAAQgFAAgCgEg");
	this.shape_791.setTransform(235.9,232.1);

	this.shape_792 = new cjs.Shape();
	this.shape_792.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_792.setTransform(231.025,231.8);

	this.shape_793 = new cjs.Shape();
	this.shape_793.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_793.setTransform(219.9,233.925);

	this.shape_794 = new cjs.Shape();
	this.shape_794.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_794.setTransform(210.525,234.025);

	this.shape_795 = new cjs.Shape();
	this.shape_795.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgJAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgSAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAiAAABAlIAABGg");
	this.shape_795.setTransform(196.3,233.925);

	this.shape_796 = new cjs.Shape();
	this.shape_796.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_796.setTransform(182.375,234.025);

	this.shape_797 = new cjs.Shape();
	this.shape_797.graphics.f("#FFFFFF").s().p("AgeAoQgNgOgBgZIAAgCQABgQAFgMQAGgMALgGQAKgHANAAQASAAAMALQAMAKAAARIgRAAQAAgKgIgGQgGgHgLAAQgNAAgHAKQgHAKgBATIAAACQABASAHAKQAHAKANAAQAKAAAHgGQAIgGAAgJIARAAQAAAKgGAIQgFAIgKAFQgKAFgLAAQgUAAgMgPg");
	this.shape_797.setTransform(171.95,234.025);

	this.shape_798 = new cjs.Shape();
	this.shape_798.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_798.setTransform(163.75,233.925);

	this.shape_799 = new cjs.Shape();
	this.shape_799.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_799.setTransform(154.675,234.025);

	this.shape_800 = new cjs.Shape();
	this.shape_800.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_800.setTransform(145.725,232.85);

	this.shape_801 = new cjs.Shape();
	this.shape_801.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgOIAAhAIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABAQAAAHADADQADADAGAAIAJgBIAAAPQgHABgHAAQgMAAgFgHg");
	this.shape_801.setTransform(133.325,232.85);

	this.shape_802 = new cjs.Shape();
	this.shape_802.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_802.setTransform(124.875,234.025);

	this.shape_803 = new cjs.Shape();
	this.shape_803.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAPAAAYIAAACQAAAXgLAQQgLAOgTAAQgTAAgLgOgAgagBIAAAtQAJARARAAQAMAAAIgKQAHgKAAgVQAAgSgHgJQgHgLgNAAQgSABgIAQg");
	this.shape_803.setTransform(114.075,231.9);

	this.shape_804 = new cjs.Shape();
	this.shape_804.graphics.f("#FFFFFF").s().p("AgIBIIAAhoIARAAIAABogAgHg2QgDgCAAgEQAAgFADgDQACgDAFAAQAFAAADADQACADABAFQgBAEgCACQgDAEgFAAQgFAAgCgEg");
	this.shape_804.setTransform(105.85,232.1);

	this.shape_805 = new cjs.Shape();
	this.shape_805.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAgghIAWAAIgoArIAsA9g");
	this.shape_805.setTransform(99,231.8);

	this.shape_806 = new cjs.Shape();
	this.shape_806.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_806.setTransform(87.775,234.025);

	this.shape_807 = new cjs.Shape();
	this.shape_807.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_807.setTransform(871.475,204.925);

	this.shape_808 = new cjs.Shape();
	this.shape_808.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_808.setTransform(860.475,205.025);

	this.shape_809 = new cjs.Shape();
	this.shape_809.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAggiIAWAAIgoArIAtA+g");
	this.shape_809.setTransform(850.65,202.8);

	this.shape_810 = new cjs.Shape();
	this.shape_810.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_810.setTransform(839.425,205.025);

	this.shape_811 = new cjs.Shape();
	this.shape_811.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAPAAQASAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_811.setTransform(828.85,205.025);

	this.shape_812 = new cjs.Shape();
	this.shape_812.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQABAYATAAQAUAAAHgPIAAhMIASAAIAABpIgRAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_812.setTransform(818.15,205.125);

	this.shape_813 = new cjs.Shape();
	this.shape_813.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAACACIAAAQIgIAAQgRAAgHAPIAABKg");
	this.shape_813.setTransform(809.8,204.925);

	this.shape_814 = new cjs.Shape();
	this.shape_814.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_814.setTransform(800.725,205.025);

	this.shape_815 = new cjs.Shape();
	this.shape_815.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAggiIAWAAIgoArIAtA+g");
	this.shape_815.setTransform(790.95,202.8);

	this.shape_816 = new cjs.Shape();
	this.shape_816.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg2QgDgCABgFQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_816.setTransform(777.65,203.1);

	this.shape_817 = new cjs.Shape();
	this.shape_817.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_817.setTransform(769.725,205.025);

	this.shape_818 = new cjs.Shape();
	this.shape_818.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgMAAQgKAAgHAHQgGAFgCALIAABFIgRAAIAAhEQAAgYgXAAQgRAAgHAQIAABMIgSAAIAAhpIARAAIABAMQALgOAUAAQAWAAAHARQAFgHAJgFQAIgFAMAAQAiAAABAlIAABGg");
	this.shape_818.setTransform(755.5,204.925);

	this.shape_819 = new cjs.Shape();
	this.shape_819.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_819.setTransform(741.275,205.025);

	this.shape_820 = new cjs.Shape();
	this.shape_820.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_820.setTransform(733.425,202.8);

	this.shape_821 = new cjs.Shape();
	this.shape_821.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_821.setTransform(725.525,205.025);

	this.shape_822 = new cjs.Shape();
	this.shape_822.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgIQgKAMgSAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATAAQASAAALAOIABgMIAQAAIAABnQABAUgMAMQgNAMgUAAQgLAAgKgGgAgSgwQgIAKAAAUQAAASAIAKQAHAJAMABQASAAAHgQIAAgvQgIgPgRAAQgMAAgHAKg");
	this.shape_822.setTransform(714.3,207);

	this.shape_823 = new cjs.Shape();
	this.shape_823.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_823.setTransform(703.375,204.925);

	this.shape_824 = new cjs.Shape();
	this.shape_824.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_824.setTransform(692.675,205.025);

	this.shape_825 = new cjs.Shape();
	this.shape_825.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_825.setTransform(678.5,204.925);

	this.shape_826 = new cjs.Shape();
	this.shape_826.graphics.f("#FFFFFF").s().p("AAXBLIglgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAKgMIAggiIAWAAIgoArIAtA+g");
	this.shape_826.setTransform(660.2,202.8);

	this.shape_827 = new cjs.Shape();
	this.shape_827.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_827.setTransform(652.05,203.1);

	this.shape_828 = new cjs.Shape();
	this.shape_828.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOARAAQAFAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_828.setTransform(646.75,204.925);

	this.shape_829 = new cjs.Shape();
	this.shape_829.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgKgNAAQgSAAgIARg");
	this.shape_829.setTransform(637.475,202.9);

	this.shape_830 = new cjs.Shape();
	this.shape_830.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_830.setTransform(626.175,205.025);

	this.shape_831 = new cjs.Shape();
	this.shape_831.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_831.setTransform(615.375,206.95);

	this.shape_832 = new cjs.Shape();
	this.shape_832.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIASAAIAAAMQAHgOAQAAQAGAAACACIAAAQIgIAAQgRAAgGAPIAABKg");
	this.shape_832.setTransform(601.55,204.925);

	this.shape_833 = new cjs.Shape();
	this.shape_833.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_833.setTransform(592.175,205.025);

	this.shape_834 = new cjs.Shape();
	this.shape_834.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgaIARAAIAAAaIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAPQgHACgHAAQgMgBgFgHg");
	this.shape_834.setTransform(583.175,203.85);

	this.shape_835 = new cjs.Shape();
	this.shape_835.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgDgCAAgFQAAgEADgDQADgDAEAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_835.setTransform(577.8,203.1);

	this.shape_836 = new cjs.Shape();
	this.shape_836.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAggiIAWAAIgoArIAsA+g");
	this.shape_836.setTransform(570.95,202.8);

	this.shape_837 = new cjs.Shape();
	this.shape_837.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_837.setTransform(560.025,205.025);

	this.shape_838 = new cjs.Shape();
	this.shape_838.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_838.setTransform(549.5,205.025);

	this.shape_839 = new cjs.Shape();
	this.shape_839.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_839.setTransform(533.675,204.925);

	this.shape_840 = new cjs.Shape();
	this.shape_840.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_840.setTransform(522.675,205.025);

	this.shape_841 = new cjs.Shape();
	this.shape_841.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgFgIIAJgLQAMAOAQAAQAMAAAIgIQAHgHAAgOIAAgIQgLAMgRAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIAQAAIAABnQABAUgMAMQgNAMgUAAQgKAAgLgGgAgSgwQgIAKAAAUQAAASAIAKQAHAJAMABQASAAAHgQIAAgvQgIgPgRAAQgMAAgHAKg");
	this.shape_841.setTransform(511.45,207);

	this.shape_842 = new cjs.Shape();
	this.shape_842.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_842.setTransform(500.525,204.925);

	this.shape_843 = new cjs.Shape();
	this.shape_843.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_843.setTransform(489.45,205.125);

	this.shape_844 = new cjs.Shape();
	this.shape_844.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgTAAIAAiVIATAAIAABaIAJgMIAggiIAWAAIgoArIAtA+g");
	this.shape_844.setTransform(479.55,202.8);

	this.shape_845 = new cjs.Shape();
	this.shape_845.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgHgIIAKgLQAMAOAQAAQANAAAHgIQAIgHgBgOIAAgIQgKAMgSAAQgTAAgLgPQgMgPABgZQgBgZAMgOQALgPATAAQASAAAMAOIAAgMIAQAAIAABnQAAAUgMAMQgLAMgVAAQgKAAgMgGgAgSgwQgIAKABAUQgBASAIAKQAHAJANABQARAAAHgQIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_845.setTransform(468,207);

	this.shape_846 = new cjs.Shape();
	this.shape_846.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_846.setTransform(457.075,204.925);

	this.shape_847 = new cjs.Shape();
	this.shape_847.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgDgCABgFQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_847.setTransform(449.15,203.1);

	this.shape_848 = new cjs.Shape();
	this.shape_848.graphics.f("#FFFFFF").s().p("AgqBHIAAiNIATAAIAAB9IBCAAIAAAQg");
	this.shape_848.setTransform(441.9,203.2);

	this.shape_849 = new cjs.Shape();
	this.shape_849.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_849.setTransform(428.125,209.325);

	this.shape_850 = new cjs.Shape();
	this.shape_850.graphics.f("#FFFFFF").s().p("AAWBLIgjgxIgLAMIAAAlIgSAAIAAiVIASAAIAABaIAJgMIAggiIAWAAIgoArIAsA+g");
	this.shape_850.setTransform(421.2,202.8);

	this.shape_851 = new cjs.Shape();
	this.shape_851.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg2QgDgCABgFQgBgEADgDQADgDAEAAQAFAAADADQADADgBAEQABAFgDACQgDADgFAAQgEAAgDgDg");
	this.shape_851.setTransform(413.05,203.1);

	this.shape_852 = new cjs.Shape();
	this.shape_852.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_852.setTransform(407.75,204.925);

	this.shape_853 = new cjs.Shape();
	this.shape_853.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgOATAAQATAAALAPQALAOAAAZIAAABQAAAZgLAPQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJARARAAQAMgBAIgJQAHgKAAgVQAAgSgHgJQgHgKgNAAQgSAAgIARg");
	this.shape_853.setTransform(398.475,202.9);

	this.shape_854 = new cjs.Shape();
	this.shape_854.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_854.setTransform(387.175,205.025);

	this.shape_855 = new cjs.Shape();
	this.shape_855.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_855.setTransform(376.375,206.95);

	this.shape_856 = new cjs.Shape();
	this.shape_856.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_856.setTransform(362.975,202.8);

	this.shape_857 = new cjs.Shape();
	this.shape_857.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_857.setTransform(355.075,205.025);

	this.shape_858 = new cjs.Shape();
	this.shape_858.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_858.setTransform(344.125,204.925);

	this.shape_859 = new cjs.Shape();
	this.shape_859.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgVAAgMgPgAgUgcQgJAKAAATQAAASAJAKQAIALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgIALg");
	this.shape_859.setTransform(332.9,205.025);

	this.shape_860 = new cjs.Shape();
	this.shape_860.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg2QgCgCgBgFQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAFgDACQgDADgFAAQgFAAgCgDg");
	this.shape_860.setTransform(324.8,203.1);

	this.shape_861 = new cjs.Shape();
	this.shape_861.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgFgIQgGgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAHgEQAFgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_861.setTransform(317.2,205.025);

	this.shape_862 = new cjs.Shape();
	this.shape_862.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_862.setTransform(306.575,205.025);

	this.shape_863 = new cjs.Shape();
	this.shape_863.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_863.setTransform(298.3,204.925);

	this.shape_864 = new cjs.Shape();
	this.shape_864.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_864.setTransform(289.225,205.025);

	this.shape_865 = new cjs.Shape();
	this.shape_865.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_865.setTransform(278.475,206.95);

	this.shape_866 = new cjs.Shape();
	this.shape_866.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAWAAANAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgKAHgPAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgMAAgJALg");
	this.shape_866.setTransform(266.95,205.025);

	this.shape_867 = new cjs.Shape();
	this.shape_867.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgTAAgGAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAGgHAIgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_867.setTransform(247.3,204.925);

	this.shape_868 = new cjs.Shape();
	this.shape_868.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_868.setTransform(233.075,205.025);

	this.shape_869 = new cjs.Shape();
	this.shape_869.graphics.f("#FFFFFF").s().p("AgIBLIAAiVIARAAIAACVg");
	this.shape_869.setTransform(225.225,202.8);

	this.shape_870 = new cjs.Shape();
	this.shape_870.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_870.setTransform(217.325,205.025);

	this.shape_871 = new cjs.Shape();
	this.shape_871.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAgBQAAgXAMgPQALgPATAAQASAAAKANIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgTAAgLgPgAgSgHQgIAJAAAUQAAATAIAKQAHAJANABQARAAAHgQIAAgvQgHgQgRABQgNAAgHAKg");
	this.shape_871.setTransform(206,202.9);

	this.shape_872 = new cjs.Shape();
	this.shape_872.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_872.setTransform(189.925,204.925);

	this.shape_873 = new cjs.Shape();
	this.shape_873.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_873.setTransform(178.925,205.025);

	this.shape_874 = new cjs.Shape();
	this.shape_874.graphics.f("#FFFFFF").s().p("AgUAyQgKgEgGgIQgFgIAAgKIASAAQAAAJAHAGQAHAFAKAAQAKAAAGgEQAGgEABgHQAAgIgGgEQgGgEgMgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQgBgNALgJQAMgJAPAAQATAAAKAJQAMAKAAAOIgSAAQgBgHgFgGQgHgFgKAAQgJAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgMAAgJgFg");
	this.shape_874.setTransform(168.35,205.025);

	this.shape_875 = new cjs.Shape();
	this.shape_875.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_875.setTransform(157.725,205.025);

	this.shape_876 = new cjs.Shape();
	this.shape_876.graphics.f("#FFFFFF").s().p("AAZA1IgZhPIgYBPIgPAAIgfhpIASAAIAVBOIAZhOIANAAIAZBQIAVhQIASAAIgfBpg");
	this.shape_876.setTransform(144.725,205.025);

	this.shape_877 = new cjs.Shape();
	this.shape_877.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_877.setTransform(131.775,205.025);

	this.shape_878 = new cjs.Shape();
	this.shape_878.graphics.f("#FFFFFF").s().p("AgWBFQgKgEgGgIIAJgLQAMAOARAAQAMAAAHgIQAHgHABgOIAAgIQgMAMgRAAQgSAAgMgPQgMgPAAgZQAAgZAMgOQALgPATAAQATAAAKAOIABgMIARAAIAABnQgBAUgLAMQgMAMgVAAQgKAAgMgGgAgSgwQgHAKAAAUQAAASAHAKQAHAJAMABQARAAAJgQIAAgvQgJgPgRAAQgLAAgIAKg");
	this.shape_878.setTransform(120.55,207);

	this.shape_879 = new cjs.Shape();
	this.shape_879.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_879.setTransform(109.625,204.925);

	this.shape_880 = new cjs.Shape();
	this.shape_880.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_880.setTransform(98.925,205.025);

	this.shape_881 = new cjs.Shape();
	this.shape_881.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAOAAAaIAAACQAAAXgLAOQgLAPgTABQgSAAgMgNIAAAzgAgagrIAAAyQAJAOAQgBQAMABAIgLQAIgKAAgTQAAgSgIgKQgIgLgMAAQgQAAgJAPg");
	this.shape_881.setTransform(88.175,206.95);

	this.shape_882 = new cjs.Shape();
	this.shape_882.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_882.setTransform(871.625,175.925);

	this.shape_883 = new cjs.Shape();
	this.shape_883.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_883.setTransform(860.625,176.025);

	this.shape_884 = new cjs.Shape();
	this.shape_884.graphics.f("#FFFFFF").s().p("AggA9QgMgPAAgZIAAgBQAAgXAMgPQAMgPASABQASgBAKANIAAg3IASAAIAACVIgQAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgIAJAAAUQAAATAIAJQAHAKAMAAQASAAAHgPIAAgwQgHgOgSAAQgMAAgHAKg");
	this.shape_884.setTransform(849.3,173.9);

	this.shape_885 = new cjs.Shape();
	this.shape_885.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_885.setTransform(832.675,175.925);

	this.shape_886 = new cjs.Shape();
	this.shape_886.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_886.setTransform(821.675,176.025);

	this.shape_887 = new cjs.Shape();
	this.shape_887.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_887.setTransform(812.675,174.85);

	this.shape_888 = new cjs.Shape();
	this.shape_888.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_888.setTransform(804.225,176.025);

	this.shape_889 = new cjs.Shape();
	this.shape_889.graphics.f("#FFFFFF").s().p("AAZA1IgZhPIgYBPIgPAAIgfhpIASAAIAVBOIAZhOIANAAIAZBQIAVhQIASAAIgfBpg");
	this.shape_889.setTransform(791.225,176.025);

	this.shape_890 = new cjs.Shape();
	this.shape_890.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_890.setTransform(778.275,176.025);

	this.shape_891 = new cjs.Shape();
	this.shape_891.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_891.setTransform(770,175.925);

	this.shape_892 = new cjs.Shape();
	this.shape_892.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_892.setTransform(760.925,176.025);

	this.shape_893 = new cjs.Shape();
	this.shape_893.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMAAAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_893.setTransform(750.175,177.95);

	this.shape_894 = new cjs.Shape();
	this.shape_894.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_894.setTransform(733.175,176.025);

	this.shape_895 = new cjs.Shape();
	this.shape_895.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFAAQAJAAAGgEQAFgDADgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_895.setTransform(723,178.15);

	this.shape_896 = new cjs.Shape();
	this.shape_896.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_896.setTransform(712.775,175.925);

	this.shape_897 = new cjs.Shape();
	this.shape_897.graphics.f("#FFFFFF").s().p("AgVBFQgMgEgGgIIAKgMQALAPARAAQAMAAAIgIQAIgHgBgNIAAgJQgLAMgRAAQgTAAgLgPQgMgPAAgZQAAgZAMgOQALgPATABQATAAAKANIABgMIAQAAIAABnQAAAUgLAMQgNAMgUAAQgKgBgLgFgAgSgwQgIAKAAAUQAAASAIAJQAHAKANAAQARAAAHgPIAAgvQgIgPgQAAQgNAAgHAKg");
	this.shape_897.setTransform(701.45,178);

	this.shape_898 = new cjs.Shape();
	this.shape_898.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_898.setTransform(690.525,175.925);

	this.shape_899 = new cjs.Shape();
	this.shape_899.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_899.setTransform(679.525,176.025);

	this.shape_900 = new cjs.Shape();
	this.shape_900.graphics.f("#FFFFFF").s().p("AgYA2IAAhpIARAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_900.setTransform(671.25,175.925);

	this.shape_901 = new cjs.Shape();
	this.shape_901.graphics.f("#FFFFFF").s().p("AggAsQgIgKgBgTIAAhEIASAAIAABDQAAAYAUAAQATAAAHgPIAAhMIASAAIAABpIgQAAIgBgLQgLANgTAAQgRAAgJgKg");
	this.shape_901.setTransform(661.8,176.125);

	this.shape_902 = new cjs.Shape();
	this.shape_902.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAKgLIAggiIAWAAIgoArIAtA+g");
	this.shape_902.setTransform(651.9,173.8);

	this.shape_903 = new cjs.Shape();
	this.shape_903.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_903.setTransform(634.925,175.925);

	this.shape_904 = new cjs.Shape();
	this.shape_904.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_904.setTransform(623.925,176.025);

	this.shape_905 = new cjs.Shape();
	this.shape_905.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAKgLIAggiIAWAAIgoArIAtA+g");
	this.shape_905.setTransform(614.1,173.8);

	this.shape_906 = new cjs.Shape();
	this.shape_906.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATgBALAPQALAPAAAYIAAABQAAAYgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARAAQAMAAAIgKQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_906.setTransform(602.975,173.9);

	this.shape_907 = new cjs.Shape();
	this.shape_907.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_907.setTransform(591.675,176.025);

	this.shape_908 = new cjs.Shape();
	this.shape_908.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATgBALAPQALAPAAAYIAAABQAAAYgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARAAQAMAAAIgKQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_908.setTransform(580.875,173.9);

	this.shape_909 = new cjs.Shape();
	this.shape_909.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_909.setTransform(569.875,176.025);

	this.shape_910 = new cjs.Shape();
	this.shape_910.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgGgIQgFgIAAgKIASAAQABAJAGAGQAHAFAKAAQALAAAFgEQAHgEgBgHQAAgIgFgEQgFgEgNgDQgOgDgIgDQgIgEgDgFQgFgGAAgIQABgNAKgJQALgJARAAQARAAAMAJQALAKAAAOIgTAAQABgHgHgGQgGgFgJAAQgJAAgGAEQgFAFgBAHQAAAGAGADQAFAEANADQANADAIAEQAJADAEAGQAEAGAAAIQAAAPgLAIQgMAJgSAAQgMAAgKgFg");
	this.shape_910.setTransform(559.35,176.025);

	this.shape_911 = new cjs.Shape();
	this.shape_911.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgEAAgEQAAgEADgDQACgDAFAAQAFAAADADQACADABAEQgBAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_911.setTransform(551.8,174.1);

	this.shape_912 = new cjs.Shape();
	this.shape_912.graphics.f("#FFFFFF").s().p("AggA9QgLgPAAgZIAAgBQAAgXALgPQAMgPASABQARgBAMANIAAg3IASAAIAACVIgRAAIgBgLQgLANgSAAQgSAAgMgPgAgSgHQgHAJAAAUQAAATAHAJQAHAKAMAAQARAAAJgPIAAgwQgJgOgRAAQgMAAgHAKg");
	this.shape_912.setTransform(543.45,173.9);

	this.shape_913 = new cjs.Shape();
	this.shape_913.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAsA+g");
	this.shape_913.setTransform(527.95,173.8);

	this.shape_914 = new cjs.Shape();
	this.shape_914.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_914.setTransform(516.725,176.025);

	this.shape_915 = new cjs.Shape();
	this.shape_915.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFAAQAJAAAGgEQAFgDADgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_915.setTransform(506.55,178.15);

	this.shape_916 = new cjs.Shape();
	this.shape_916.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_916.setTransform(496.325,175.925);

	this.shape_917 = new cjs.Shape();
	this.shape_917.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgEAAgEQAAgEACgDQACgDAFAAQAFAAADADQACADAAAEQAAAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_917.setTransform(488.4,174.1);

	this.shape_918 = new cjs.Shape();
	this.shape_918.graphics.f("#FFFFFF").s().p("AA0BHIAAg3IACg7IgvByIgNAAIgvhyIACA7IAAA3IgTAAIAAiNIAYAAIAuBzIAuhzIAZAAIAACNg");
	this.shape_918.setTransform(477.225,174.2);

	this.shape_919 = new cjs.Shape();
	this.shape_919.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_919.setTransform(457.325,176.025);

	this.shape_920 = new cjs.Shape();
	this.shape_920.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgKAMIAAAlIgSAAIAAiVIASAAIAABZIAJgLIAggiIAWAAIgoArIAtA+g");
	this.shape_920.setTransform(447.5,173.8);

	this.shape_921 = new cjs.Shape();
	this.shape_921.graphics.f("#FFFFFF").s().p("AgfAsQgJgKAAgTIAAhEIASAAIAABDQAAAYATAAQATAAAIgPIAAhMIASAAIAABpIgRAAIgBgLQgKANgUAAQgRAAgIgKg");
	this.shape_921.setTransform(436.2,176.125);

	this.shape_922 = new cjs.Shape();
	this.shape_922.graphics.f("#FFFFFF").s().p("AgYBEQgNgHgHgJQgHgKAAgMIATAAQAAANAJAHQAKAIAPgBQAPAAAIgFQAIgHAAgKQAAgKgHgGQgIgGgSgFQgYgIgLgIQgLgLAAgPQAAgQANgLQANgLAVAAQAPAAALAGQALAFAHAKQAGAKABAMIgTAAQgBgNgHgIQgJgHgPAAQgNAAgHAGQgIAHAAAKQAAAJAHAGQAHAGASAFQARAFAKAFQAKAGAFAIQAEAIABALQAAARgOAKQgOALgWAAQgNAAgNgFg");
	this.shape_922.setTransform(424.85,174.2);

	this.shape_923 = new cjs.Shape();
	this.shape_923.graphics.f("#FFFFFF").s().p("AgHAIQgDgDAAgFQAAgDADgEQACgDAFAAQAGAAACADQADAEAAADQAAAFgDADQgCADgGAAQgFAAgCgDg");
	this.shape_923.setTransform(410.525,180.325);

	this.shape_924 = new cjs.Shape();
	this.shape_924.graphics.f("#FFFFFF").s().p("AgIBHIAAh+IguAAIAAgPIBtAAIAAAPIguAAIAAB+g");
	this.shape_924.setTransform(402.025,174.2);

	this.shape_925 = new cjs.Shape();
	this.shape_925.graphics.f("#FFFFFF").s().p("AgyBHIAAiNIAzAAQAYAAANALQANANAAATQAAAVgNAKQgNAMgYAAIggAAIAAA3gAgfAAIAgAAQAPAAAIgGQAIgHAAgOQAAgMgIgIQgIgHgOgBIghAAg");
	this.shape_925.setTransform(390.225,174.2);

	this.shape_926 = new cjs.Shape();
	this.shape_926.graphics.f("#FFFFFF").s().p("AAWBLIgkgxIgLAMIAAAlIgSAAIAAiVIASAAIAABZIAKgLIAggiIAWAAIgoArIAtA+g");
	this.shape_926.setTransform(373.35,173.8);

	this.shape_927 = new cjs.Shape();
	this.shape_927.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_927.setTransform(362.125,176.025);

	this.shape_928 = new cjs.Shape();
	this.shape_928.graphics.f("#FFFFFF").s().p("AgfBKIgHgCIAAgOIAFAAQAJAAAGgEQAEgDAEgKIAEgLIgmhnIAUAAIAZBOIAZhOIATAAIgrB5QgIAagVAAg");
	this.shape_928.setTransform(351.95,178.15);

	this.shape_929 = new cjs.Shape();
	this.shape_929.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_929.setTransform(341.725,175.925);

	this.shape_930 = new cjs.Shape();
	this.shape_930.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgCgEgBgEQABgEACgDQACgDAFAAQAFAAADADQADADAAAEQAAAEgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_930.setTransform(333.8,174.1);

	this.shape_931 = new cjs.Shape();
	this.shape_931.graphics.f("#FFFFFF").s().p("AA4A2IAAhFQAAgLgFgGQgFgGgNAAQgKAAgGAHQgHAFgBALIAABFIgRAAIAAhEQAAgYgWAAQgSAAgHAQIAABMIgSAAIAAhpIARAAIAAAMQANgOATAAQAWAAAHARQAFgHAJgFQAJgFALAAQAjAAAAAlIAABGg");
	this.shape_931.setTransform(322.55,175.925);

	this.shape_932 = new cjs.Shape();
	this.shape_932.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_932.setTransform(302.625,176.025);

	this.shape_933 = new cjs.Shape();
	this.shape_933.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMAAAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_933.setTransform(291.825,177.95);

	this.shape_934 = new cjs.Shape();
	this.shape_934.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgEAAgEQAAgEADgDQACgDAFAAQAFAAADADQACADABAEQgBAEgCAEQgDACgFAAQgFAAgCgCg");
	this.shape_934.setTransform(283.6,174.1);

	this.shape_935 = new cjs.Shape();
	this.shape_935.graphics.f("#FFFFFF").s().p("AgsBKIAAiRIARAAIABALQALgNASAAQAUAAALAOQALAPAAAZIAAACQAAAXgLAPQgLAPgTAAQgSAAgMgNIAAAzgAgagrIAAAxQAJAOAQABQAMAAAIgKQAIgLAAgTQAAgSgIgLQgIgKgMAAQgQAAgJAPg");
	this.shape_935.setTransform(275.775,177.95);

	this.shape_936 = new cjs.Shape();
	this.shape_936.graphics.f("#FFFFFF").s().p("AAXA2IAAhFQAAgMgFgFQgFgGgLAAQgIAAgGAFQgHAFgEAHIAABLIgSAAIAAhpIASAAIAAANQAMgPATAAQAhAAABAmIAABFg");
	this.shape_936.setTransform(258.725,175.925);

	this.shape_937 = new cjs.Shape();
	this.shape_937.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_937.setTransform(247.725,176.025);

	this.shape_938 = new cjs.Shape();
	this.shape_938.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAPAAQAGAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_938.setTransform(239.45,175.925);

	this.shape_939 = new cjs.Shape();
	this.shape_939.graphics.f("#FFFFFF").s().p("AghAoQgOgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgGAMgLAHQgLAHgOAAQgUAAgNgPgAgVgcQgIAKAAATQAAASAIAKQAJALAMAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgIgLgOAAQgMAAgJALg");
	this.shape_939.setTransform(229.85,176.025);

	this.shape_940 = new cjs.Shape();
	this.shape_940.graphics.f("#FFFFFF").s().p("AgfAoQgNgOAAgZIAAgCQABgQAFgMQAGgMAKgGQALgHANAAQASAAAMALQAMAKABARIgSAAQAAgKgIgGQgGgHgLAAQgMAAgIAKQgHAKgBATIAAACQABASAHAKQAIAKAMAAQAKAAAHgGQAIgGAAgJIASAAQgBAKgGAIQgFAIgKAFQgKAFgLAAQgUAAgNgPg");
	this.shape_940.setTransform(219.1,176.025);

	this.shape_941 = new cjs.Shape();
	this.shape_941.graphics.f("#FFFFFF").s().p("AgiAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMALgHQALgHANAAQAVAAAOAPQANAPAAAYIAAABQAAAQgGAMQgFAMgMAHQgLAHgOAAQgVAAgNgPgAgUgcQgJAKAAATQAAASAJAKQAHALANAAQAOAAAIgLQAIgLAAgSQAAgRgIgLQgJgLgNAAQgNAAgHALg");
	this.shape_941.setTransform(208.05,176.025);

	this.shape_942 = new cjs.Shape();
	this.shape_942.graphics.f("#FFFFFF").s().p("AgaA+IgBAMIgRAAIAAiVIASAAIAAA4QALgNATAAQATgBALAPQALAPAAAYIAAABQAAAYgLAQQgLAOgTAAQgTAAgLgOgAgaAAIAAAsQAJAQARAAQAMAAAIgKQAHgJAAgVQAAgSgHgJQgHgKgNAAQgSgBgIASg");
	this.shape_942.setTransform(196.975,173.9);

	this.shape_943 = new cjs.Shape();
	this.shape_943.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_943.setTransform(185.975,176.025);

	this.shape_944 = new cjs.Shape();
	this.shape_944.graphics.f("#FFFFFF").s().p("AAXBLIgkgxIgMAMIAAAlIgSAAIAAiVIASAAIAABZIAKgLIAggiIAWAAIgoArIAsA+g");
	this.shape_944.setTransform(176.2,173.8);

	this.shape_945 = new cjs.Shape();
	this.shape_945.graphics.f("#FFFFFF").s().p("AghAuQgKgJAAgOQAAgQANgIQAMgJAWAAIASAAIAAgJQAAgJgGgGQgGgFgKAAQgJAAgHAFQgGAEAAAHIgSAAQAAgIAFgHQAGgHAJgFQAKgEALAAQASAAAKAJQALAJAAAQIAAAwQAAAPAEAIIAAACIgTAAQgCgDgBgIQgMANgRAAQgQAAgKgJgAgZAVQAAAIAGAFQAGAFAJAAQAHAAAIgEQAHgFAEgHIAAgWIgOAAQghAAAAAUg");
	this.shape_945.setTransform(159.275,176.025);

	this.shape_946 = new cjs.Shape();
	this.shape_946.graphics.f("#FFFFFF").s().p("AAZA1IgZhPIgYBPIgPAAIgfhpIASAAIAVBOIAZhOIANAAIAZBQIAVhQIASAAIgfBpg");
	this.shape_946.setTransform(146.275,176.025);

	this.shape_947 = new cjs.Shape();
	this.shape_947.graphics.f("#FFFFFF").s().p("AgJBIIAAhpIASAAIAABpgAgHg1QgDgEABgEQgBgEADgDQACgDAFAAQAFAAADADQADADgBAEQABAEgDAEQgDACgFAAQgFAAgCgCg");
	this.shape_947.setTransform(136.4,174.1);

	this.shape_948 = new cjs.Shape();
	this.shape_948.graphics.f("#FFFFFF").s().p("AgCA7QgHgHAAgNIAAhBIgTAAIAAgOIATAAIAAgZIARAAIAAAZIAUAAIAAAOIgUAAIAABBQAAAGADADQADADAGAAIAJgBIAAAOQgHADgHAAQgMAAgFgIg");
	this.shape_948.setTransform(130.375,174.85);

	this.shape_949 = new cjs.Shape();
	this.shape_949.graphics.f("#FFFFFF").s().p("AgVAyQgJgEgFgIQgGgIAAgKIASAAQABAJAGAGQAHAFAKAAQAKAAAHgEQAFgEAAgHQABgIgGgEQgFgEgNgDQgOgDgIgDQgIgEgEgFQgDgGAAgIQAAgNALgJQALgJAQAAQARAAALAJQAMAKAAAOIgTAAQAAgHgFgGQgHgFgJAAQgKAAgFAEQgGAFABAHQAAAGAEADQAGAEAMADQAOADAJAEQAHADAFAGQAEAGAAAIQAAAPgMAIQgLAJgSAAQgLAAgLgFg");
	this.shape_949.setTransform(122.25,176.025);

	this.shape_950 = new cjs.Shape();
	this.shape_950.graphics.f("#FFFFFF").s().p("AgIBIIAAhpIARAAIAABpgAgHg1QgDgEABgEQgBgEADgDQADgDAEAAQAFAAADADQADADgBAEQABAEgDAEQgDACgFAAQgEAAgDgCg");
	this.shape_950.setTransform(114.7,174.1);

	this.shape_951 = new cjs.Shape();
	this.shape_951.graphics.f("#FFFFFF").s().p("AgZA2IAAhpIASAAIAAAMQAJgOAQAAQAFAAADACIAAAQIgJAAQgRAAgHAPIAABKg");
	this.shape_951.setTransform(109.4,175.925);

	this.shape_952 = new cjs.Shape();
	this.shape_952.graphics.f("#FFFFFF").s().p("AgeApQgOgPAAgXIAAgDQAAgPAGgMQAGgNALgHQALgHAMAAQAUAAAMAOQALANAAAaIAAAGIhHAAQABAQAJAJQAIAKANAAQAJAAAHgEQAHgEAFgGIALAIQgOAVgaAAQgVAAgNgOgAgQgfQgHAIgCAOIA0AAIAAgBQgBgOgHgHQgGgIgLAAQgKAAgIAIg");
	this.shape_952.setTransform(100.325,176.025);

	this.shape_953 = new cjs.Shape();
	this.shape_953.graphics.f("#FFFFFF").s().p("AgyBHIAAiNIAzAAQAYAAANALQANANAAATQAAAVgNAKQgNAMgYAAIggAAIAAA3gAgfAAIAgAAQAPAAAIgGQAIgHAAgOQAAgMgIgIQgIgHgOgBIghAAg");
	this.shape_953.setTransform(89.125,174.2);

	this.judulKI_4 = new lib.gambarLapisan();
	this.judulKI_4.name = "judulKI_4";
	this.judulKI_4.setTransform(526.45,310.95,2.2889,5.4196,0,0,0,0.8,0.6);
	this.judulKI_4.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.shape_954 = new cjs.Shape();
	this.shape_954.graphics.f("#FFFFFF").s().p("AAOBDIgWgmIgKAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgiAmIAlA3g");
	this.shape_954.setTransform(723.9,95.8);

	this.shape_955 = new cjs.Shape();
	this.shape_955.graphics.f("#FFFFFF").s().p("AAOBDIgWgmIgKAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_955.setTransform(650.9,95.8);

	this.shape_956 = new cjs.Shape();
	this.shape_956.graphics.f("#FFFFFF").s().p("AgXA8QgMgFgHgKQgGgJAAgNIAaAAQAAAWAZAAQAJAAAGgEQAFgEAAgHQAAgHgFgEQgGgEgMgFQgOgEgIgEQgWgLAAgUQAAgLAGgIQAGgIAKgEQAMgFAMAAQAOAAALAFQAKAFAHAJQAFAJAAAMIgaAAQAAgJgFgFQgGgFgKAAQgJAAgGAEQgEAEAAAHQgBAGAHAEQAGAFALADQAXAHAKAJQAKAKAAAPQAAARgNAJQgMAKgVAAQgOAAgMgGg");
	this.shape_956.setTransform(629.95,96.175);

	this.shape_957 = new cjs.Shape();
	this.shape_957.graphics.f("#FFFFFF").s().p("AgJAKQgFgEAAgGQAAgFAFgEQAEgDAFAAQAGAAAEADQAEAEAAAFQAAAGgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_957.setTransform(617.25,101.3);

	this.shape_958 = new cjs.Shape();
	this.shape_958.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAxAAQAPAAAKAFQALAGAGAJQAGAKAAAMQAAATgNAKQgNALgXAAIgWAAIAAAtgAgWgBIAXAAQAKgBAGgEQAGgFgBgKQABgJgGgFQgGgHgKAAIgXAAg");
	this.shape_958.setTransform(598,96.15);

	this.shape_959 = new cjs.Shape();
	this.shape_959.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgEgJAAQgKABgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgMAPAAQAfAAAAAjIAAA8g");
	this.shape_959.setTransform(582.425,95.8);

	this.shape_960 = new cjs.Shape();
	this.shape_960.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgEgEQgCgDgJgBQgLABgFAKIAABAIgYAAIAAg7QAAgIgDgEQgEgDgHgBQgLAAgFAJIAABCIgZAAIAAhdIAXAAIABAKQALgMAQAAQASAAAHAOQAKgOASAAQAQAAAIAJQAHAIAAATIAAA7g");
	this.shape_960.setTransform(486.5,97.7);

	this.shape_961 = new cjs.Shape();
	this.shape_961.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgCgEQgEgDgIgBQgLABgEAKIAABAIgZAAIAAg7QAAgIgDgEQgEgDgHgBQgLAAgFAJIAABCIgZAAIAAhdIAXAAIABAKQAKgMARAAQASAAAHAOQAKgOASAAQAQAAAIAJQAHAIAAATIAAA7g");
	this.shape_961.setTransform(430.45,97.7);

	this.shape_962 = new cjs.Shape();
	this.shape_962.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQATAAAMAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgLAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgHAAgEAFg");
	this.shape_962.setTransform(417.85,97.8);

	this.shape_963 = new cjs.Shape();
	this.shape_963.graphics.f("#FFFFFF").s().p("AgdAkQgLgNAAgXIAAAAQAAgWALgOQAMgMATAAQASAAAKAKQAMAKgBARIgXAAQgBgIgEgEQgEgFgHAAQgIAAgFAHQgEAGAAAPIAAABQgBAPAFAHQAFAGAIAAQAHAAAEgEQAEgEABgGIAXAAQAAAKgEAIQgGAHgJAFQgJAFgLAAQgTAAgMgOg");
	this.shape_963.setTransform(408.25,97.8);

	this.shape_964 = new cjs.Shape();
	this.shape_964.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgNAFgMQAGgLAKgGQAKgHAMABQATAAAMAMQALAMAAAXIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgLAFQgJAFgMAAQgUAAgNgOgAgKgXQgFAFgBAKIAiAAIAAgCQAAgJgEgEQgFgFgIAAQgHAAgEAFg");
	this.shape_964.setTransform(388.6,97.8);

	this.shape_965 = new cjs.Shape();
	this.shape_965.graphics.f("#FFFFFF").s().p("AAPBDIgYgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgjAmIAmA3g");
	this.shape_965.setTransform(334.15,95.8);

	this.shape_966 = new cjs.Shape();
	this.shape_966.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_966.setTransform(323.925,97.8);

	this.shape_967 = new cjs.Shape();
	this.shape_967.graphics.f("#FFFFFF").s().p("AAPBDIgYgmIgJAJIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAYgbIAeAAIgjAmIAmA3g");
	this.shape_967.setTransform(310.4,95.8);

	this.shape_968 = new cjs.Shape();
	this.shape_968.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_968.setTransform(300.175,97.8);

	this.shape_969 = new cjs.Shape();
	this.shape_969.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgGgDgFQgEgDgGAAQgGAAgEACQgEADAAAGIgZAAQAAgIAFgIQAFgHAJgEQAKgDAKAAQASAAAKAJQAKAIAAAQIAAAoQABAOADAHIAAABIgZAAQgCgDgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgPIgJAAQgTAAgBAMg");
	this.shape_969.setTransform(264.775,97.8);

	this.shape_970 = new cjs.Shape();
	this.shape_970.graphics.f("#FFFFFF").s().p("AgwBAIAAh/IAoAAQAPAAAOAIQANAHAIAOQAHAPAAARIAAAFQAAASgHAOQgIAOgNAHQgNAIgQAAgAgVArIAMAAQAPAAAIgLQAIgJAAgTIAAgGQAAgTgIgLQgIgKgOAAIgNAAg");
	this.shape_970.setTransform(254.325,96.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.judulKI},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95,p:{x:250.725}},{t:this.shape_94},{t:this.shape_93,p:{x:270.525}},{t:this.shape_92},{t:this.shape_91,p:{x:294.125}},{t:this.shape_90,p:{x:303.975}},{t:this.shape_89,p:{x:311.725,y:82.125}},{t:this.shape_88,p:{x:319.925}},{t:this.shape_87},{t:this.shape_86,p:{x:345.075}},{t:this.shape_85,p:{x:349.825,y:81.2}},{t:this.shape_84,p:{x:357.025}},{t:this.shape_83},{t:this.shape_82,p:{x:375.675}},{t:this.shape_81,p:{x:385.525}},{t:this.shape_80},{t:this.shape_79,p:{x:408.875}},{t:this.shape_78,p:{x:418.725}},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75,p:{x:453.6}},{t:this.shape_74},{t:this.shape_73,p:{x:469.775}},{t:this.shape_72},{t:this.shape_71,p:{x:489.575}},{t:this.shape_70},{t:this.shape_69,p:{x:511.425}},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66,p:{x:542.875,y:82.125}},{t:this.shape_65,p:{x:550.875}},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62,p:{x:588.75}},{t:this.shape_61,p:{x:601.375}},{t:this.shape_60},{t:this.shape_59,p:{x:617.575}},{t:this.shape_58,p:{x:627.425}},{t:this.shape_57},{t:this.shape_56,p:{x:652.475}},{t:this.shape_55},{t:this.shape_54,p:{x:670.775}},{t:this.shape_53,p:{x:678.525}},{t:this.shape_52,p:{x:686.175}},{t:this.shape_51,p:{x:692.225}},{t:this.shape_50,p:{x:697.475}},{t:this.shape_49},{t:this.shape_48,p:{x:718.625}},{t:this.shape_47,p:{x:728.475}},{t:this.shape_46,p:{x:736.225,y:82.125}},{t:this.shape_45,p:{x:744.425}},{t:this.shape_44,p:{x:258.125,y:110.525}},{t:this.shape_43},{t:this.shape_42,p:{x:276.425}},{t:this.shape_41,p:{x:284.325}},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34,p:{x:357.475,y:110.525}},{t:this.shape_33,p:{x:367.3}},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{x:506.775,y:110.725}},{t:this.shape_19,p:{x:516.075}},{t:this.shape_18},{t:this.shape_17,p:{x:540.275}},{t:this.shape_16,p:{x:550.175}},{t:this.shape_15},{t:this.shape_14,p:{x:573.175}},{t:this.shape_13},{t:this.shape_12,p:{x:597.225,y:107.15}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9,p:{x:628.575}},{t:this.shape_8},{t:this.shape_7,p:{x:648.025}},{t:this.shape_6},{t:this.shape_5,p:{x:675.475}},{t:this.shape_4,p:{x:682.875}},{t:this.shape_3,p:{x:692.475,y:110.725}},{t:this.shape_2,p:{x:701.775}},{t:this.shape_1},{t:this.shape,p:{x:719.775,y:102.375}},{t:this.instance},{t:this.btnMenuDasar1,p:{x:755.75,y:504.8}},{t:this.btnNextDasar1,p:{x:885.8,y:504.8}}]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.judulKI_1},{t:this.shape_123,p:{x:222.15}},{t:this.shape_122},{t:this.shape_95,p:{x:241.975}},{t:this.shape_53,p:{x:251.675}},{t:this.shape_93,p:{x:261.775}},{t:this.shape_121},{t:this.shape_91,p:{x:285.375}},{t:this.shape_90,p:{x:295.225}},{t:this.shape_46,p:{x:302.975,y:82.125}},{t:this.shape_88,p:{x:311.175}},{t:this.shape_81,p:{x:325.725}},{t:this.shape_84,p:{x:335.575}},{t:this.shape_54,p:{x:344.075}},{t:this.shape_120,p:{x:349.325}},{t:this.shape_119},{t:this.shape_118},{t:this.shape_82,p:{x:374.675}},{t:this.shape_117,p:{x:381.875}},{t:this.shape_48,p:{x:389.275}},{t:this.shape_51,p:{x:397.975}},{t:this.shape_79,p:{x:405.675}},{t:this.shape_116,p:{x:415.525}},{t:this.shape_44,p:{x:430.375,y:84.925}},{t:this.shape_86,p:{x:437.625}},{t:this.shape_34,p:{x:445.275,y:84.925}},{t:this.shape_73,p:{x:454.975}},{t:this.shape_115},{t:this.shape_69,p:{x:482.275}},{t:this.shape_114,p:{x:489.675}},{t:this.shape_20,p:{x:499.275,y:85.125}},{t:this.shape_71,p:{x:508.575}},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111,p:{x:544.675}},{t:this.shape_110},{t:this.shape_109},{t:this.shape_45,p:{x:576.025}},{t:this.shape_108},{t:this.shape_65,p:{x:595.475}},{t:this.shape_107,p:{x:612.675,y:81.55}},{t:this.shape_52,p:{x:622.925}},{t:this.shape_78,p:{x:630.325}},{t:this.shape_3,p:{x:639.925,y:85.125}},{t:this.shape_61,p:{x:649.225}},{t:this.shape_106},{t:this.shape_105,p:{x:675.95}},{t:this.shape_104},{t:this.shape_58,p:{x:698.525}},{t:this.shape_103},{t:this.shape_59,p:{x:718.625}},{t:this.shape_85,p:{x:725.825,y:81.2}},{t:this.shape_47,p:{x:733.025}},{t:this.shape_102},{t:this.shape_50,p:{x:755.825}},{t:this.shape_101},{t:this.shape_33,p:{x:456.3}},{t:this.shape_17,p:{x:466.375}},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_42,p:{x:504.725}},{t:this.shape_2,p:{x:512.425}},{t:this.shape_4,p:{x:522.275}},{t:this.shape,p:{x:530.925,y:102.375}},{t:this.instance_3},{t:this.btnNextDasar1,p:{x:878.8,y:508.25}},{t:this.btnMenuDasar1,p:{x:616.75,y:508.25}},{t:this.btnBack3,p:{x:749,y:508.25}}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.judulKI_2},{t:this.shape_169},{t:this.shape_107,p:{x:244.825,y:96.15}},{t:this.shape_168},{t:this.shape_167},{t:this.shape_3,p:{x:272.075,y:99.725}},{t:this.shape_166,p:{x:281.375}},{t:this.shape_165},{t:this.shape_164,p:{x:305.125}},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159,p:{x:349.425}},{t:this.shape_66,p:{x:357.175,y:96.725}},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156,p:{x:389.475}},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151,p:{x:435.525}},{t:this.shape_150,p:{x:445.375}},{t:this.shape_44,p:{x:460.225,y:99.525}},{t:this.shape_149},{t:this.shape_34,p:{x:475.125,y:99.525}},{t:this.shape_148,p:{x:484.825}},{t:this.shape_147,p:{x:501.95}},{t:this.shape_146},{t:this.shape_145,p:{x:524.525}},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141,p:{x:569.175}},{t:this.shape_140},{t:this.shape_139,p:{x:582.925}},{t:this.shape_85,p:{x:592.175,y:95.8}},{t:this.shape_138,p:{x:596.925}},{t:this.shape_137,p:{x:604.325}},{t:this.shape_136},{t:this.shape_135,p:{x:625}},{t:this.shape_134,p:{x:634.225}},{t:this.shape_133,p:{x:644.275}},{t:this.shape_132,p:{x:654.3,y:99.575}},{t:this.shape_131,p:{x:664.375}},{t:this.shape_130,p:{x:674.225}},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126,p:{x:714.775}},{t:this.shape_46,p:{x:720.075,y:96.725}},{t:this.shape_125,p:{x:728.075}},{t:this.shape_124,p:{x:736.575}},{t:this.shape,p:{x:743.025,y:91.375}},{t:this.instance_4},{t:this.btnNextDasar1,p:{x:878.8,y:508.25}},{t:this.btnMenuDasar1,p:{x:616.75,y:508.25}},{t:this.btnBack3,p:{x:749,y:508.25}}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.judulKI_3},{t:this.shape_123,p:{x:221.15}},{t:this.shape_111,p:{x:230.125}},{t:this.shape_88,p:{x:240.725}},{t:this.shape_197},{t:this.shape_56,p:{x:266.625}},{t:this.shape_90,p:{x:276.325}},{t:this.shape_196},{t:this.shape_84,p:{x:296.025}},{t:this.shape_116,p:{x:305.875}},{t:this.shape_62,p:{x:323.25}},{t:this.shape_195},{t:this.shape_114,p:{x:340.825}},{t:this.shape_3,p:{x:350.425,y:85.125}},{t:this.shape_82,p:{x:359.725}},{t:this.shape_194},{t:this.shape_193},{t:this.shape_79,p:{x:392.725}},{t:this.shape_192},{t:this.shape_191},{t:this.shape_73,p:{x:428.125}},{t:this.shape_120,p:{x:435.325}},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_71,p:{x:471.125}},{t:this.shape_48,p:{x:480.975}},{t:this.shape_187},{t:this.shape_105,p:{x:504.4}},{t:this.shape_75,p:{x:517.15}},{t:this.shape_117,p:{x:524.325}},{t:this.shape_65,p:{x:531.525}},{t:this.shape_85,p:{x:538.725,y:81.2}},{t:this.shape_45,p:{x:546.125}},{t:this.shape_86,p:{x:553.525}},{t:this.shape_186},{t:this.shape_185},{t:this.shape_54,p:{x:584.425}},{t:this.shape_69,p:{x:589.675}},{t:this.shape_184},{t:this.shape_44,p:{x:604.325,y:84.925}},{t:this.shape_183},{t:this.shape_51,p:{x:623.075}},{t:this.shape_52,p:{x:628.325}},{t:this.shape_182},{t:this.shape_61,p:{x:646.125}},{t:this.shape_78,p:{x:655.975}},{t:this.shape_59,p:{x:665.875}},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_81,p:{x:709.275}},{t:this.shape_50,p:{x:716.675}},{t:this.shape_58,p:{x:724.075}},{t:this.shape_178},{t:this.shape_132,p:{x:744.3,y:84.975}},{t:this.shape_47,p:{x:754.375}},{t:this.shape_19,p:{x:389.775}},{t:this.shape_14,p:{x:396.975}},{t:this.shape_177},{t:this.shape_176},{t:this.shape_7,p:{x:419.975}},{t:this.shape_41,p:{x:429.825}},{t:this.shape_89,p:{x:437.775,y:107.725}},{t:this.shape_34,p:{x:446.225,y:110.525}},{t:this.shape_16,p:{x:456.125}},{t:this.shape_4,p:{x:466.175}},{t:this.shape_5,p:{x:478.125}},{t:this.shape_175},{t:this.shape_9,p:{x:495.125}},{t:this.shape_66,p:{x:503.075,y:107.725}},{t:this.shape_46,p:{x:513.675,y:107.725}},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_2,p:{x:572.725}},{t:this.shape_42,p:{x:581.225}},{t:this.shape,p:{x:587.675,y:102.375}},{t:this.instance_5},{t:this.btnNextDasar1,p:{x:878.8,y:508.25}},{t:this.btnMenuDasar1,p:{x:616.75,y:508.25}},{t:this.btnBack3,p:{x:749,y:508.25}}]},1).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.judulKI},{t:this.shape_970},{t:this.shape_969},{t:this.shape_147,p:{x:277.4}},{t:this.shape_44,p:{x:290.475,y:99.525}},{t:this.shape_968},{t:this.shape_967},{t:this.shape_966},{t:this.shape_965},{t:this.shape_139,p:{x:340.725}},{t:this.shape_156,p:{x:348.375}},{t:this.shape_166,p:{x:358.075}},{t:this.shape_66,p:{x:365.825,y:96.725}},{t:this.shape_34,p:{x:378.775,y:99.525}},{t:this.shape_964},{t:this.shape_150,p:{x:398.425}},{t:this.shape_963},{t:this.shape_962},{t:this.shape_961},{t:this.shape_164,p:{x:443.075}},{t:this.shape_124,p:{x:451.575}},{t:this.shape_159,p:{x:459.275}},{t:this.shape_145,p:{x:469.125}},{t:this.shape_960},{t:this.shape_138,p:{x:496.675}},{t:this.shape_137,p:{x:504.075}},{t:this.shape_20,p:{x:513.675,y:99.725}},{t:this.shape_151,p:{x:522.975}},{t:this.shape_135,p:{x:533.2}},{t:this.shape_46,p:{x:544.825,y:96.725}},{t:this.shape_148,p:{x:552.825}},{t:this.shape_133,p:{x:562.675}},{t:this.shape_141,p:{x:572.575}},{t:this.shape_959},{t:this.shape_958},{t:this.shape_12,p:{x:609.125,y:96.15}},{t:this.shape_957},{t:this.shape_956},{t:this.shape_134,p:{x:640.475}},{t:this.shape_955},{t:this.shape_131,p:{x:659.925}},{t:this.shape_107,p:{x:677.125,y:96.15}},{t:this.shape_126,p:{x:687.375}},{t:this.shape_130,p:{x:694.775}},{t:this.shape_3,p:{x:704.375,y:99.725}},{t:this.shape_125,p:{x:713.675}},{t:this.shape_954},{t:this.judulKI_4},{t:this.btnMenuDasar1,p:{x:623.75,y:504.8}},{t:this.btnNextDasar1,p:{x:885.8,y:504.8}},{t:this.btnBack3,p:{x:756,y:504.8}},{t:this.shape_953},{t:this.shape_952},{t:this.shape_951},{t:this.shape_950},{t:this.shape_949},{t:this.shape_948},{t:this.shape_947},{t:this.shape_946},{t:this.shape_945},{t:this.shape_944},{t:this.shape_943},{t:this.shape_942},{t:this.shape_941},{t:this.shape_940},{t:this.shape_939},{t:this.shape_938},{t:this.shape_937},{t:this.shape_936},{t:this.shape_935},{t:this.shape_934},{t:this.shape_933},{t:this.shape_932},{t:this.shape_931},{t:this.shape_930},{t:this.shape_929},{t:this.shape_928},{t:this.shape_927},{t:this.shape_926},{t:this.shape_925},{t:this.shape_924},{t:this.shape_923},{t:this.shape_922},{t:this.shape_921},{t:this.shape_920},{t:this.shape_919},{t:this.shape_918},{t:this.shape_917},{t:this.shape_916},{t:this.shape_915},{t:this.shape_914},{t:this.shape_913},{t:this.shape_912},{t:this.shape_911},{t:this.shape_910},{t:this.shape_909},{t:this.shape_908},{t:this.shape_907},{t:this.shape_906},{t:this.shape_905},{t:this.shape_904},{t:this.shape_903},{t:this.shape_902},{t:this.shape_901},{t:this.shape_900},{t:this.shape_899},{t:this.shape_898},{t:this.shape_897},{t:this.shape_896},{t:this.shape_895},{t:this.shape_894},{t:this.shape_893},{t:this.shape_892},{t:this.shape_891},{t:this.shape_890},{t:this.shape_889},{t:this.shape_888},{t:this.shape_887},{t:this.shape_886},{t:this.shape_885},{t:this.shape_884},{t:this.shape_883},{t:this.shape_882},{t:this.shape_881},{t:this.shape_880},{t:this.shape_879},{t:this.shape_878},{t:this.shape_877},{t:this.shape_876},{t:this.shape_875},{t:this.shape_874},{t:this.shape_873},{t:this.shape_872},{t:this.shape_871},{t:this.shape_870},{t:this.shape_869},{t:this.shape_868},{t:this.shape_867},{t:this.shape_866},{t:this.shape_865},{t:this.shape_864},{t:this.shape_863},{t:this.shape_862},{t:this.shape_861},{t:this.shape_860},{t:this.shape_859},{t:this.shape_858},{t:this.shape_857},{t:this.shape_856},{t:this.shape_855},{t:this.shape_854},{t:this.shape_853},{t:this.shape_852},{t:this.shape_851},{t:this.shape_850},{t:this.shape_849},{t:this.shape_848},{t:this.shape_847},{t:this.shape_846},{t:this.shape_845},{t:this.shape_844},{t:this.shape_843},{t:this.shape_842},{t:this.shape_841},{t:this.shape_840},{t:this.shape_839},{t:this.shape_838},{t:this.shape_837},{t:this.shape_836},{t:this.shape_835},{t:this.shape_834},{t:this.shape_833},{t:this.shape_832},{t:this.shape_831},{t:this.shape_830},{t:this.shape_829},{t:this.shape_828},{t:this.shape_827},{t:this.shape_826},{t:this.shape_825},{t:this.shape_824},{t:this.shape_823},{t:this.shape_822},{t:this.shape_821},{t:this.shape_820},{t:this.shape_819},{t:this.shape_818},{t:this.shape_817},{t:this.shape_816},{t:this.shape_815},{t:this.shape_814},{t:this.shape_813},{t:this.shape_812},{t:this.shape_811},{t:this.shape_810},{t:this.shape_809},{t:this.shape_808},{t:this.shape_807},{t:this.shape_806},{t:this.shape_805},{t:this.shape_804},{t:this.shape_803},{t:this.shape_802},{t:this.shape_801},{t:this.shape_800},{t:this.shape_799},{t:this.shape_798},{t:this.shape_797},{t:this.shape_796},{t:this.shape_795},{t:this.shape_794},{t:this.shape_793},{t:this.shape_792},{t:this.shape_791},{t:this.shape_790},{t:this.shape_789},{t:this.shape_788},{t:this.shape_787},{t:this.shape_786},{t:this.shape_785},{t:this.shape_784},{t:this.shape_783},{t:this.shape_782},{t:this.shape_781},{t:this.shape_780},{t:this.shape_779},{t:this.shape_778},{t:this.shape_777},{t:this.shape_776},{t:this.shape_775},{t:this.shape_774},{t:this.shape_773},{t:this.shape_772},{t:this.shape_771},{t:this.shape_770},{t:this.shape_769},{t:this.shape_768},{t:this.shape_767},{t:this.shape_766},{t:this.shape_765},{t:this.shape_764},{t:this.shape_763},{t:this.shape_762},{t:this.shape_761},{t:this.shape_760},{t:this.shape_759},{t:this.shape_758},{t:this.shape_757},{t:this.shape_756},{t:this.shape_755},{t:this.shape_754},{t:this.shape_753},{t:this.shape_752},{t:this.shape_751},{t:this.shape_750},{t:this.shape_749},{t:this.shape_748},{t:this.shape_747},{t:this.shape_746},{t:this.shape_745},{t:this.shape_744},{t:this.shape_743},{t:this.shape_742},{t:this.shape_741},{t:this.shape_740},{t:this.shape_739},{t:this.shape_738},{t:this.shape_737},{t:this.shape_736},{t:this.shape_735},{t:this.shape_734},{t:this.shape_733},{t:this.shape_732},{t:this.shape_731},{t:this.shape_730},{t:this.shape_729},{t:this.shape_728},{t:this.shape_727},{t:this.shape_726},{t:this.shape_725},{t:this.shape_724},{t:this.shape_723},{t:this.shape_722},{t:this.shape_721},{t:this.shape_720},{t:this.shape_719},{t:this.shape_718},{t:this.shape_717},{t:this.shape_716},{t:this.shape_715},{t:this.shape_714},{t:this.shape_713},{t:this.shape_712},{t:this.shape_711},{t:this.shape_710},{t:this.shape_709},{t:this.shape_708},{t:this.shape_707},{t:this.shape_706},{t:this.shape_705},{t:this.shape_704},{t:this.shape_703},{t:this.shape_702},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_693},{t:this.shape_692},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_679},{t:this.shape_678},{t:this.shape_677},{t:this.shape_676},{t:this.shape_675},{t:this.shape_674},{t:this.shape_673},{t:this.shape_672},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_667},{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_662},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#2ECC71",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap28.png", id:"Bitmap28"},
		{src:"images/flash0ai.png", id:"flash0ai"},
		{src:"images/flash0aiAssets.png", id:"flash0aiAssets"},
		{src:"images/flash0aiAssets_1.png", id:"flash0aiAssets_1"},
		{src:"images/Bitmap5.png", id:"Bitmap5"},
		{src:"images/flash0aiAssets_2.png", id:"flash0aiAssets_2"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"}
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