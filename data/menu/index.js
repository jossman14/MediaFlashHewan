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



(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,966,544);// helper functions:

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


(lib.menuListTujuan = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAqBhIAAh9QAAgVgJgKQgJgJgUAAQgPAAgLAIQgMAJgHANIAACHIghAAIAAi9IAfAAIABAXQAWgbAiAAQA8AAABBEIAAB9g");
	this.shape.setTransform(40.125,-7.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPAAgZQAAgdAWgQQAXgRAoAAIAfAAIAAgPQAAgQgKgLQgKgJgTgBQgRABgMAIQgMAJAAANIghAAQABgOAJgOQALgNARgIQASgIATAAQAhAAASARQAUAQAAAdIAABXQAAAaAGAPIAAADIghAAQgEgFgBgPQgXAYgegBQgdABgRgRgAgtAlQAAAQALAIQAJAJARAAQAOAAAOgIQAOgHAFgNIAAgnIgZAAQg7AAAAAig");
	this.shape_1.setTransform(20.35,-6.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag6BPQgQgSAAgiIAAh7IAhAAIAAB6QAAArAjAAQAkAAAMgcIAAiJIAhAAIAAC9IgfAAIgBgTQgTAXgjAAQgfAAgQgSg");
	this.shape_2.setTransform(0.675,-6.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgjClIAAgaIAPABQALAAAFgGQAFgFAAgPIAAjUIAhAAIAADTQgBA3gwAAQgLAAgJgDgAACiHQgDgFAAgIQAAgIADgGQAGgFAJAAQAKAAAEAFQAFAGAAAIQAAAIgFAFQgEAFgKAAQgJAAgGgFg");
	this.shape_3.setTransform(-15.35,-6.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag6BPQgQgSAAgiIAAh7IAhAAIAAB6QAAArAjAAQAkAAAMgcIAAiJIAhAAIAAC9IgfAAIgBgTQgTAXgjAAQgfAAgQgSg");
	this.shape_4.setTransform(-27.725,-6.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgQCAIAAjkIhSAAIAAgbIDFAAIAAAbIhSAAIAADkg");
	this.shape_5.setTransform(-48.35,-10.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_6.setTransform(0,25.2625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_7.setTransform(0,-10.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Ag7BTQgSgQAAgZQAAgeAWgPQAXgQAogBIAfAAIAAgOQAAgRgKgKQgKgKgTAAQgRAAgMAJQgMAIAAAMIghAAQABgOAJgNQALgNARgIQASgHATAAQAhAAASAQQAUAQAAAdIAABWQAAAaAGAQIAAADIghAAQgEgGgBgOQgXAXgeABQgdAAgRgQgAgtAmQAAAPALAJQAJAIARAAQAOAAAOgHQAOgJAFgNIAAgnIgZAAQg7AAAAAkg");
	this.shape_8.setTransform(20.35,-2.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgQCAIAAjjIhSAAIAAgcIDFAAIAAAcIhSAAIAADjg");
	this.shape_9.setTransform(-48.35,-6.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0954D2").s().p("A54AqQgwAAAAgYIAAg7QABAXAvAAMAzxAAAQAvAAABgXIAAA7QAAAYgwAAg");
	this.shape_10.setTransform(0,27.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_11.setTransform(0,-6.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag7BTQgSgRAAgYQAAgdAWgQQAXgRAoAAIAfAAIAAgPQAAgRgKgKQgKgJgTgBQgRABgMAIQgMAJAAANIghAAQABgOAJgOQALgNARgIQASgIATAAQAhABASAQQAUAQAAAdIAABWQAAAbAGAPIAAADIghAAQgEgGgBgOQgXAXgeAAQgdAAgRgPgAgtAmQAAAPALAIQAJAJARAAQAOAAAOgIQAOgHAFgOIAAgmIgZAAQg7AAAAAjg");
	this.shape_12.setTransform(20.35,3.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#0954D2").s().p("A54AMQgvAAgBgXQABAWAvAAMAzxAAAQAvAAABgWQgBAXgvAAg");
	this.shape_13.setTransform(0,30.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_14.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{y:-6.775}},{t:this.shape_3,p:{y:-6.575}},{t:this.shape_2,p:{y:-6.775}},{t:this.shape_1},{t:this.shape,p:{y:-7.125}}]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9,p:{y:-6.25}},{t:this.shape_4,p:{y:-2.775}},{t:this.shape_3,p:{y:-2.575}},{t:this.shape_2,p:{y:-2.775}},{t:this.shape_8},{t:this.shape,p:{y:-3.125}}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_9,p:{y:-0.25}},{t:this.shape_4,p:{y:3.225}},{t:this.shape_3,p:{y:3.425}},{t:this.shape_2,p:{y:3.225}},{t:this.shape_12},{t:this.shape,p:{y:2.875}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


(lib.menuListKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape.setTransform(120.925,-10.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFBrQgLgOAAgYIAAh1IgjAAIAAgZIAjAAIAAguIAfAAIAAAuIAkAAIAAAZIgkAAIAAB1QAAAMAFAFQAFAGALAAQAGAAAKgCIAAAaQgNAEgMAAQgWAAgKgNg");
	this.shape_1.setTransform(110.075,-9.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAqBhIAAh9QAAgVgJgKQgJgJgUAAQgPAAgLAIQgMAJgHANIAACHIghAAIAAi9IAfAAIABAXQAWgbAiAAQA8AAABBEIAAB9g");
	this.shape_2.setTransform(94.875,-7.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgQCAIAAj/IAhAAIAAD/g");
	this.shape_3.setTransform(80.05,-10.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape_4.setTransform(61.925,-10.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgIQALgHAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhAAAUARQAUAQAAAbIghAAQAAgNgLgLQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWABgRgJg");
	this.shape_5.setTransform(48.175,-6.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAqBhIAAh9QAAgVgJgKQgJgJgUAAQgPAAgLAIQgMAJgHANIAACHIghAAIAAi9IAfAAIABAXQAWgbAiAAQA8AAABBEIAAB9g");
	this.shape_6.setTransform(29.075,-7.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ag3BJQgYgagBgqIAAgFQABgcAKgWQALgXAUgMQATgNAVAAQAmAAAUAYQAVAZAAAuIAAAMIiAAAQAAAdAQAQQAQASAYAAQAQAAAMgHQANgHAIgMIAVAQQgZAkgvAAQgmABgYgagAgdg4QgOANgDAaIBeAAIAAgCQgBgYgMgOQgMgOgVAAQgSAAgNAPg");
	this.shape_7.setTransform(9.85,-6.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgFBrQgLgOAAgYIAAh1IgjAAIAAgZIAjAAIAAguIAfAAIAAAuIAkAAIAAAZIgkAAIAAB1QAAAMAFAFQAFAGALAAQAGAAAKgCIAAAaQgNAEgMAAQgWAAgKgNg");
	this.shape_8.setTransform(-6.275,-9.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("Ag4BJQgYgaAAgqIAAgFQAAgcALgWQALgXAUgMQATgNAWAAQAkAAAVAYQAVAZgBAuIAAAMIh/AAQAAAdARAQQAPASAXAAQASAAALgHQAMgHAKgMIATAQQgXAkgxAAQglABgZgagAgdg4QgOANgDAaIBeAAIAAgCQgBgYgMgOQgMgOgUAAQgTAAgNAPg");
	this.shape_9.setTransform(-20.9,-6.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhPCFIAAkGIAdAAIACAVQAUgYAiAAQAiAAAUAZQAVAaAAAuIAAADQAAArgVAaQgTAbgjAAQghAAgUgWIAABbgAgvhPIAABaQAPAaAeAAQAWAAAOgSQAOgTAAgjQAAghgOgSQgOgTgXAAQgdAAgPAag");
	this.shape_10.setTransform(-40.3,-3.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("ABlBhIAAh9QAAgUgJgKQgKgKgWAAQgSAAgMALQgMAKgCATIAAB9IgfAAIAAh8QAAgpgpAAQggAAgMAbIAACKIggAAIAAi9IAeAAIABAVQAVgZAkAAQAoAAANAfQAKgOAPgJQAPgIAVAAQA+AAABBCIAAB/g");
	this.shape_11.setTransform(-66.575,-7.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag+BHQgYgaAAgtIAAgBQAAgcAMgWQAKgXAUgLQAUgNAYAAQAmAAAYAbQAZAbAAAsIAAACQAAAcgLAWQgKAWgVAMQgTAMgaAAQglAAgZgbgAgmg0QgPATAAAjQAAAfAPAUQAOATAYAAQAZAAAOgUQAPgTAAgiQAAgfgPgUQgPgTgYAAQgYAAgOATg");
	this.shape_12.setTransform(-92.65,-6.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB+IBwh+IApAAIhkBxIBsCOg");
	this.shape_13.setTransform(-112.675,-10.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_14.setTransform(0,25.2625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_15.setTransform(0,-10.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AglBbQgSgJgKgOQgKgPAAgQIAhAAQABAQAMAKQAMAJATAAQATAAALgHQALgIAAgMQAAgNgKgIQgKgHgXgGQgZgFgPgGQgOgHgHgKQgHgLAAgOQAAgXAUgQQAUgRAdABQAhAAAUAQQAUARAAAZIghAAQAAgNgLgJQgMgKgRAAQgQAAgLAIQgKAIAAAMQAAALAKAHQAJAFAYAGQAYAGAPAHQAPAHAHALQAIAKAAAQQAAAZgVAPQgUAQghAAQgWgBgRgHg");
	this.shape_16.setTransform(48.175,-1.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("Ag3BJQgYgZgBgrIAAgFQABgcAKgWQALgWAUgNQATgMAVAAQAmAAAUAYQAVAYAAAtIAAANIiAAAQAAAcAQASQAQARAYAAQAQAAAMgHQANgHAIgLIAVAPQgZAlgvAAQgmgBgYgZgAgdg5QgOAOgDAbIBeAAIAAgDQgBgZgMgOQgMgNgVAAQgSAAgNAOg");
	this.shape_17.setTransform(9.85,-1.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ag4BJQgYgZAAgrIAAgFQAAgcALgWQALgWAUgNQATgMAWAAQAkAAAVAYQAVAYgBAtIAAANIh/AAQAAAcARASQAPARAXAAQASAAALgHQAMgHAKgLIATAPQgXAlgxAAQglgBgZgZgAgdg5QgOAOgDAbIBeAAIAAgDQgBgZgMgOQgMgNgUAAQgTAAgNAOg");
	this.shape_18.setTransform(-20.9,-1.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ag+BIQgYgcAAgrIAAgCQAAgcAMgWQAKgXAUgMQAUgMAYABQAmgBAYAbQAZAbAAAsIAAACQAAAcgLAWQgKAWgVAMQgTANgaAAQglAAgZgbgAgmg0QgPAUAAAiQAAAgAPATQAOATAYAAQAZAAAOgTQAPgUAAgiQAAgfgPgUQgPgTgYAAQgYAAgOATg");
	this.shape_19.setTransform(-92.65,-1.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAhIAABWIgiAAIAAj/IAiAAIAAB+IBwh+IApAAIhkBxIBsCOg");
	this.shape_20.setTransform(-112.675,-5.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#0954D2").s().p("A54AlQgwAAAAgYIAAgxQABAXAvAAMAzxAAAQAvAAABgXIAAAxQAAAYgwAAg");
	this.shape_21.setTransform(0,27.775);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_22.setTransform(0,-5.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgHQALgIAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhABAUAQQAUAQAAAaIghAAQAAgNgLgKQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWAAgRgIg");
	this.shape_23.setTransform(48.175,3.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("Ag3BJQgYgZgBgrIAAgFQABgcAKgWQALgWAUgNQATgNAVAAQAmAAAUAYQAVAZAAAuIAAAMIiAAAQAAAcAQARQAQASAYAAQAQAAAMgHQANgHAIgLIAVAPQgZAkgvAAQgmAAgYgZgAgdg5QgOAPgDAZIBeAAIAAgCQgBgYgMgOQgMgOgVAAQgSAAgNAOg");
	this.shape_24.setTransform(9.85,3.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("Ag4BJQgYgZAAgrIAAgFQAAgcALgWQALgWAUgNQATgNAWAAQAkAAAVAYQAVAZgBAuIAAAMIh/AAQAAAcARARQAPASAXAAQASAAALgHQAMgHAKgLIATAPQgXAkgxAAQglAAgZgZgAgdg5QgOAPgDAZIBeAAIAAgCQgBgYgMgOQgMgOgUAAQgTAAgNAOg");
	this.shape_25.setTransform(-20.9,3.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("Ag+BHQgYgaAAgtIAAgBQAAgcAMgWQAKgXAUgLQAUgNAYAAQAmAAAYAbQAZAbAAAsIAAACQAAAcgLAWQgKAWgVAMQgTAMgaAAQglAAgZgbgAgmg0QgPATAAAjQAAAfAPAUQAOATAYAAQAZAAAOgUQAPgTAAgiQAAgfgPgTQgPgUgYAAQgYAAgOATg");
	this.shape_26.setTransform(-92.65,3.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB/IBwh/IApAAIhkBxIBsCOg");
	this.shape_27.setTransform(-112.675,-0.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#0954D2").s().p("A54AMQgvAAgBgXQABAWAvAAMAzxAAAQAvAAABgWQgBAXgvAAg");
	this.shape_28.setTransform(0,30.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_29.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{y:-7.125}},{t:this.shape_10,p:{y:-3.475}},{t:this.shape_9},{t:this.shape_8,p:{y:-9.075}},{t:this.shape_7},{t:this.shape_6,p:{y:-7.125}},{t:this.shape_5},{t:this.shape_4,p:{y:-10.425}},{t:this.shape_3,p:{y:-10.25}},{t:this.shape_2,p:{y:-7.125}},{t:this.shape_1,p:{y:-9.075}},{t:this.shape,p:{y:-10.425}}]}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_11,p:{y:-2.125}},{t:this.shape_10,p:{y:1.525}},{t:this.shape_18},{t:this.shape_8,p:{y:-4.075}},{t:this.shape_17},{t:this.shape_6,p:{y:-2.125}},{t:this.shape_16},{t:this.shape_4,p:{y:-5.425}},{t:this.shape_3,p:{y:-5.25}},{t:this.shape_2,p:{y:-2.125}},{t:this.shape_1,p:{y:-4.075}},{t:this.shape,p:{y:-5.425}}]},1).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_11,p:{y:2.875}},{t:this.shape_10,p:{y:6.525}},{t:this.shape_25},{t:this.shape_8,p:{y:0.925}},{t:this.shape_24},{t:this.shape_6,p:{y:2.875}},{t:this.shape_23},{t:this.shape_4,p:{y:-0.425}},{t:this.shape_3,p:{y:-0.25}},{t:this.shape_2,p:{y:2.875}},{t:this.shape_1,p:{y:0.925}},{t:this.shape,p:{y:-0.425}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


(lib.menuListKD = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB+IBwh+IApAAIhkBxIBsCOg");
	this.shape.setTransform(79.475,-10.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhbCAIAAj/IBdAAQAqAAAYAWQAYAVAAAjQAAAlgXAUQgYAUgrAAIg7AAIAABkgAg5AAIA7AAQAbAAAPgMQAOgNAAgYQAAgXgOgNQgPgOgZgBIg9AAg");
	this.shape_1.setTransform(56.175,-10.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQCAIAAj/IAhAAIAAD/g");
	this.shape_2.setTransform(39.1,-10.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAqBhIAAh9QAAgVgJgKQgJgJgUAAQgPAAgLAIQgMAJgHANIAACHIghAAIAAi9IAfAAIABAXQAWgbAiAAQA8AAABBEIAAB9g");
	this.shape_3.setTransform(15.425,-7.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPgBgZQAAgdAXgQQAXgRAoAAIAgAAIAAgPQAAgQgLgLQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOAKgOQAKgNASgIQARgIAUAAQAhAAASARQATAQABAdIAABXQAAAaAHAPIAAADIgjAAQgDgFgBgPQgXAYgegBQgdABgRgRgAgtAlQAAAQAKAIQALAJAPAAQAPAAANgIQAOgHAHgNIAAgnIgaAAQg7AAAAAig");
	this.shape_4.setTransform(-4.35,-6.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag6BuQgVgbAAgsIAAgCQAAgrAVgbQAUgaAiAAQAgAAAUAWIAAhjIAgAAIAAENIgdAAIgCgUQgUAYghAAQghAAgVgbgAghgNQgOARAAAkQAAAhAOASQANASAXAAQAfAAAOgcIAAhWQgPgbgeAAQgXAAgNATg");
	this.shape_5.setTransform(-24.725,-10.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhcCAIAAj/IBJAAQAgAAAaAPQAZAPAOAbQAOAbABAkIAAAPQAAAkgOAbQgOAcgaAOQgaAOgiABgAg6BlIAkAAQAmgBAWgYQAVgYAAgtIAAgOQAAgrgUgZQgVgYgkgBIgoAAg");
	this.shape_6.setTransform(-54.675,-10.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB+IBwh+IApAAIhkBxIBsCOg");
	this.shape_7.setTransform(-76.675,-10.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_8.setTransform(0,25.2625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_9.setTransform(0,-10.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAhIAABWIgiAAIAAj/IAiAAIAAB/IBwh/IApAAIhkBxIBsCOg");
	this.shape_10.setTransform(79.475,-6.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhbCAIAAj/IBdAAQAqAAAYAVQAYAWAAAkQAAAkgXAUQgYAUgrAAIg7AAIAABkgAg5AAIA7AAQAbAAAPgLQAOgOAAgXQAAgYgOgNQgPgOgZAAIg9AAg");
	this.shape_11.setTransform(56.175,-6.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag7BTQgSgQgBgZQAAgeAXgPQAXgQAogBIAgAAIAAgOQAAgRgLgKQgKgKgTAAQgRAAgMAJQgMAIAAAMIggAAQgBgOAKgNQAKgNASgIQARgHAUAAQAhAAASAQQATAQABAdIAABWQAAAaAHAQIAAADIgjAAQgDgGgBgOQgXAXgeABQgdAAgRgQgAgtAmQAAAPAKAJQALAIAPAAQAPAAANgHQAOgJAHgNIAAgnIgaAAQg7AAAAAkg");
	this.shape_12.setTransform(-4.35,-2.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhcCAIAAj/IBJAAQAgAAAaAPQAZAPAOAbQAOAbABAjIAAAQQAAAkgOAbQgOAbgaAPQgaAPgiAAgAg6BkIAkAAQAmABAWgZQAVgYAAgtIAAgOQAAgsgUgXQgVgZgkAAIgoAAg");
	this.shape_13.setTransform(-54.675,-6.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAhIAABWIgiAAIAAj/IAiAAIAAB/IBwh/IApAAIhkBxIBsCOg");
	this.shape_14.setTransform(-76.675,-6.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0954D2").s().p("A54AqQgwAAAAgYIAAg7QABAXAvAAMAzxAAAQAvAAABgXIAAA7QAAAYgwAAg");
	this.shape_15.setTransform(0,27.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_16.setTransform(0,-6.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB/IBwh/IApAAIhkBxIBsCOg");
	this.shape_17.setTransform(79.475,-0.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhbCAIAAj/IBdAAQAqAAAYAWQAYAVAAAjQAAAmgXATQgYAUgrAAIg7AAIAABkgAg5AAIA7AAQAbAAAPgMQAOgNAAgYQAAgWgOgOQgPgOgZAAIg9AAg");
	this.shape_18.setTransform(56.175,-0.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ag7BTQgSgRgBgYQAAgdAXgQQAXgRAoAAIAgAAIAAgPQAAgRgLgKQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOAKgOQAKgNASgIQARgIAUAAQAhABASAQQATAQABAdIAABWQAAAbAHAPIAAADIgjAAQgDgGgBgOQgXAXgeAAQgdAAgRgPgAgtAmQAAAPAKAIQALAJAPAAQAPAAANgIQAOgHAHgOIAAgmIgaAAQg7AAAAAjg");
	this.shape_19.setTransform(-4.35,3.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AhcCAIAAj/IBJAAQAgAAAaAPQAZAOAOAcQAOAbABAkIAAAPQAAAkgOAbQgOAcgaAOQgaAOgiABgAg6BlIAkAAQAmgBAWgYQAVgYAAgtIAAgOQAAgsgUgYQgVgYgkAAIgoAAg");
	this.shape_20.setTransform(-54.675,-0.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB/IBwh/IApAAIhkBxIBsCOg");
	this.shape_21.setTransform(-76.675,-0.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#0954D2").s().p("A54AMQgvAAgBgXQABAWAvAAMAzxAAAQAvAAABgWQgBAXgvAAg");
	this.shape_22.setTransform(0,30.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_23.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{y:-10.775}},{t:this.shape_4},{t:this.shape_3,p:{y:-7.125}},{t:this.shape_2,p:{y:-10.25}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_5,p:{y:-6.775}},{t:this.shape_12},{t:this.shape_3,p:{y:-3.125}},{t:this.shape_2,p:{y:-6.25}},{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_5,p:{y:-0.775}},{t:this.shape_19},{t:this.shape_3,p:{y:2.875}},{t:this.shape_2,p:{y:-0.25}},{t:this.shape_18},{t:this.shape_17}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


(lib.menuListGame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBjQgZgBgQgPQgQgQACgXQABgeAZgQQAZgRAnAAIAhAAIACgPQACgRgIgKQgJgKgQAAQgQgBgMAJQgNAIgDAOIggAAQACgRALgNQAMgNASgHQARgHATAAQAeABAQARQARASgDAcIgPBeIgBANQgBAKADAJIgBADIggAAIgBgKIAAgKQgZAYgcAAIgBAAgAgcAMQgQAKgCARQgBAOAHAJQAIAIAPABQAPAAANgIQAOgHAKgOIAGgnIgYAAQgdAAgQAJg");
	this.shape.setTransform(226.035,37.1255);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgdBqQgKgOACgXIATh1IghAAIAEgZIAiAAIAIguIAeAAIgIAuIAjAAIgEAZIgjAAIgSB1IgBAJQABAOANAAQAGAAAJgCIgCAaQgLAEgLAAQgTgBgJgNg");
	this.shape_1.setTransform(211.85,35.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgXBjQgZgBgQgPQgQgQACgXQABgeAZgQQAZgRAnAAIAhAAIACgPQACgRgIgKQgJgKgQAAQgQgBgMAJQgNAIgDAOIggAAQACgRALgNQAMgNASgHQARgHATAAQAeABAQARQARASgDAcIgPBeIgBANQgBAKADAJIgBADIggAAIgBgKIAAgKQgZAYgcAAIgBAAgAgcAMQgQAKgCARQgBAOAHAJQAIAIAPABQAPAAANgIQAOgHAKgOIAGgnIgYAAQgdAAgQAJg");
	this.shape_2.setTransform(195.235,37.1255);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("ABXBhIAVh9QABgJgBgHQgEgYgcgBQgRAAgOALQgOALgEASIgWB+IgfAAIAVh8QACgUgIgKQgIgLgRAAQgegBgSAcIgYCKIgfAAIAhi9IAdgBIgEAWQAYgaAiABQASAAAMAIQAMAIAFAPQAbggAkABQAdABANASQAOATgEAfIgVB8g");
	this.shape_3.setTransform(170.011,36.9731);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Ag8BhIAhi9IAeAAIgEAWQATgbAbABQAHAAAJADIgDAeIgQgCQgfAAgQAcIgXCGg");
	this.shape_4.setTransform(150.1,36.9482);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgGBiQgkAAgUgaQgUgZAEgoIAAgHQADgcAOgXQAOgYAUgLQAUgMAWAAQAdABARATQARASABAhQABALgCAMIgCANIh7AAQgDAaAMASQALASAYABQAbAAAYgaIASAQQgMARgTAKQgSAKgVAAIgCgBgAgUg6QgPAOgIAbIBbAAIABgCQADgWgKgPQgKgPgTAAIgBAAQgSAAgOANg");
	this.shape_5.setTransform(134.2552,37.1501);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AghCJQgbgBgPgUQgQgUgBghQgBgLACgOQADgdANgXQAMgXATgMQASgLAWAAQAfABARAXIAShkIAgAAIgvENIgdAAIADgUQgVAYggAAIgBAAgAgfgVQgOAMgIAUQgHAWgBAXQAAAZAJAOQAKAOASAAQAbABAVgdIAPhWQgKgagcgBIgBAAQgSAAgNALg");
	this.shape_6.setTransform(115.6938,33.3255);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgMBjQgYgBgRgMQgRgNgIgWQgIgVADgbQACgcAOgYQANgXAVgNQAVgNAYABQAYAAARANQARAMAJAXQAIAWgDAaIAAADQgEAcgNAWQgNAXgVAMQgUAMgXAAIgCAAgAgeg0QgRAUgEAgIAAADQgCAMACAMQABAUALANQALAMARAAQAPABAOgIQANgJAJgRQAJgRADgUQABgPgBgLQgCgWgKgMQgLgMgSgBIgBAAQgXAAgRATg");
	this.shape_7.setTransform(94.775,37.1474);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAeBhIAVh8QABgJgBgHQgDgZgaAAQgbgBgWAfIgXCHIggAAIAhi9IAegBIgFAYQAZgcAhABQAaABANASQANASgDAgIgVB8g");
	this.shape_8.setTransform(74.3371,36.9733);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AglCCIAhi9IAeAAIggC9gAAGhgQgFgFAAgIQAAgJAFgFQAFgGAIAAQAIAAAGAFQAFAFAAAJQAAAIgFAFQgFAFgJABIgBAAQgHAAgFgFg");
	this.shape_9.setTransform(61.475,33.6729);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAeCHIAVh9QABgJgBgGQgDgZgagBQgcAAgVAfIgXCHIggAAIAvkNIAfAAIgTBnQAYgbAhAAQAaABANASQANASgDAgIgVB8g");
	this.shape_10.setTransform(46.2871,33.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgJBjQgYgBgQgMQgRgMgIgVQgHgWACgbIABgHQADgcANgVQANgWAUgMQAUgMAYABQAeAAASAUQASATAAAeIgegBQAAgSgKgMQgKgLgRgBQgYAAgRATQgQATgEAhIgBAEQgBALABAMQABAVALAMQAKAMASAAQAQABAOgKQAOgLAEgRIAeAAQgDASgLAPQgMAPgSAIQgRAIgQAAIgCAAg");
	this.shape_11.setTransform(28.4438,37.1476);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AhjCAIAsj/ICbAAIgFAbIh6AAIgOBTIBrAAIgFAbIhrAAIgQBbIB9AAIgFAbg");
	this.shape_12.setTransform(10.025,33.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAqBhIAAh9QAAgVgJgKQgJgJgUAAQgPAAgLAIQgMAJgHANIAACHIghAAIAAi9IAfAAIABAXQAWgbAiAAQA8AAABBEIAAB9g");
	this.shape_13.setTransform(-19.825,36.975);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPAAgZQAAgdAWgQQAXgRAoAAIAgAAIAAgPQAAgQgLgLQgKgJgTgBQgRABgMAIQgMAJAAANIghAAQABgOAJgOQALgNARgIQASgIATAAQAhAAASARQAUAQAAAdIAABXQAAAaAGAPIAAADIgiAAQgCgFgCgPQgWAYgfgBQgcABgSgRgAgtAlQAAAQALAIQAJAJAQAAQAPAAAOgIQANgHAHgNIAAgnIgaAAQg7AAAAAig");
	this.shape_14.setTransform(-39.6,37.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("Ag6BuQgVgbAAgsIAAgCQAAgrAVgbQAUgaAiAAQAgAAAUAWIAAhjIAgAAIAAENIgdAAIgCgUQgUAYghAAQghAAgVgbgAghgNQgOARAAAkQAAAhAOASQANASAXAAQAfAAAOgcIAAhWQgPgbgeAAQgXAAgNATg");
	this.shape_15.setTransform(-59.975,33.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgXBjQgZgBgQgPQgQgQACgXQABgeAZgQQAZgRAnAAIAhAAIACgPQACgRgIgKQgJgKgQAAQgQgBgMAJQgNAIgDAOIggAAQACgRALgNQAMgNASgHQARgHATAAQAeABAQARQARASgDAcIgPBeIgBANQgBAKADAJIgBADIggAAIgBgKIAAgKQgZAYgcAAIgBAAgAgcAMQgQAKgCARQgBAOAHAJQAIAIAPABQAPAAANgIQAOgHAKgOIAGgnIgYAAQgdAAgQAJg");
	this.shape_16.setTransform(-88.765,37.1255);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AghCJQgbgBgPgUQgQgUgBghQgBgLACgOQADgdANgXQAMgXATgMQASgLAWAAQAfABARAXIAShkIAgAAIgvENIgdAAIADgUQgVAYggAAIgBAAgAgfgVQgOAMgIAUQgHAWgBAXQAAAZAJAOQAKAOASAAQAbABAVgdIAPhWQgKgagcgBIgBAAQgSAAgNALg");
	this.shape_17.setTransform(-106.8562,33.3255);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AglCCIAhi9IAeAAIggC9gAAGhgQgFgFAAgIQAAgJAFgFQAFgGAIAAQAIAAAGAFQAFAFAAAJQAAAIgFAFQgFAFgJABIgBAAQgHAAgFgFg");
	this.shape_18.setTransform(-121.525,33.6729);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgmCHIAtkNIAgAAIguENg");
	this.shape_19.setTransform(-130.075,33.15);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgGBiQgkAAgUgaQgUgZAEgoIAAgHQADgcAOgXQAOgYAUgLQAUgMAWAAQAdABARATQARASABAhQABALgCAMIgCANIh7AAQgDAaAMASQALASAYABQAbAAAYgaIASAQQgMARgTAKQgSAKgVAAIgCgBgAgUg6QgPAOgIAbIBbAAIABgCQADgWgKgPQgKgPgTAAIgBAAQgSAAgOANg");
	this.shape_20.setTransform(-144.0448,37.1501);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AAeBhIAVh8QABgJgBgHQgDgZgaAAQgbgBgWAfIgXCHIggAAIAhi9IAegBIgFAYQAZgcAhABQAaABANASQANASgDAgIgVB8g");
	this.shape_21.setTransform(-164.0629,36.9733);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AAeBhIAVh8QABgJgBgHQgDgZgaAAQgbgBgWAfIgXCHIggAAIAhi9IAegBIgFAYQAZgcAhABQAaABANASQANASgDAgIgVB8g");
	this.shape_22.setTransform(-183.5129,36.9733);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("ABNCAIgMhDIhnAAIgjBDIgjAAICKj/IAdAAIAyD/gAgYAhIBUAAIgWh2g");
	this.shape_23.setTransform(-205.825,33.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape_24.setTransform(218.025,-11.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgtBhIAAi9IAgAAIAAAWQAPgaAdAAQAKAAAFADIAAAeIgQgBQgfAAgMAbIAACGg");
	this.shape_25.setTransform(208.45,-8.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("Ag3BJQgZgaABgqIAAgFQAAgcAKgWQALgXAUgMQATgNAVAAQAmAAAUAZQAVAYAAAuIAAAMIiAAAQAAAdAQAQQAQASAYAAQAQAAAMgHQANgHAIgMIAVAQQgZAkgvAAQgmABgYgagAgdg4QgOAOgDAZIBeAAIAAgCQgBgYgMgOQgMgOgVAAQgSAAgNAPg");
	this.shape_26.setTransform(192.1,-8.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgFBrQgLgOAAgYIAAh1IgjAAIAAgZIAjAAIAAguIAfAAIAAAuIAkAAIAAAZIgkAAIAAB1QAAAMAFAFQAFAGALAAQAGAAAKgCIAAAaQgNAEgMAAQgWAAgKgNg");
	this.shape_27.setTransform(175.975,-10.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPgBgYQAAgeAXgQQAXgQAoAAIAgAAIAAgQQAAgQgLgLQgKgKgTAAQgRAAgMAJQgMAJAAAMIggAAQgBgOAKgNQAKgNASgIQARgHAUgBQAhAAATARQASAQABAdIAABXQAAAaAHAPIAAADIgjAAQgDgFgBgPQgXAYgegBQgdAAgRgQgAgtAlQAAAQAKAJQALAIAPAAQAPAAANgIQAOgIAHgMIAAgoIgaAAQg7ABAAAig");
	this.shape_28.setTransform(160.8,-8.05);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("ABdCAIAAhjIAEhrIhUDOIgZAAIhUjNIADBqIAABjIghAAIAAj/IAsAAIBSDQIBTjQIAtAAIAAD/g");
	this.shape_29.setTransform(135.3,-11.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AhMCGIgTgEIADgaIAIABQAPABALgIQALgHAIgRIAMgWIghi5IAhAAIAVCNIBDiNIAjAAIhwDdQgXAugkAAIgBAAg");
	this.shape_30.setTransform(102.025,-4.1747);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgdBqQgKgOACgXIATh1IghAAIAEgZIAiAAIAIguIAeAAIgIAuIAjAAIgFAZIgiAAIgTB1IAAAJQACAOAMAAQAGAAAKgCIgDAaQgMAEgKAAQgTgBgJgNg");
	this.shape_31.setTransform(88.8,-10.175);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AglCCIAhi9IAeAAIggC9gAAGhgQgFgFAAgIQAAgJAFgFQAFgGAIAAQAIAAAGAFQAFAFAAAJQAAAIgFAFQgFAFgJABIgBAAQgHAAgFgFg");
	this.shape_32.setTransform(78.425,-11.5271);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgmCHIAtkNIAgAAIguENg");
	this.shape_33.setTransform(69.875,-12.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AglCCIAhi9IAeAAIggC9gAAGhgQgFgFAAgIQAAgJAFgFQAFgGAIAAQAIAAAGAFQAFAFAAAJQAAAIgFAFQgFAFgJABIgBAAQgHAAgFgFg");
	this.shape_34.setTransform(61.125,-11.5271);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AAACJQghgBgRgZIgHAWIgdAAIAvkNIAgAAIgUBlQAYgZAfABQAcAAAPAUQAPATABAiIgBAVIAAAEQgEAdgNAYQgMAXgRALQgSALgUAAIgCAAgAgfgCIgOBSQALAdAdAAQASABANgMQAOgMAIgVQAHgVABgXQAAgZgJgOQgKgNgSgBIgCAAQgcAAgUAeg");
	this.shape_35.setTransform(45.9,-11.8739);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgXBjQgZgBgQgPQgQgQACgXQABgeAZgQQAZgRAnAAIAhAAIACgPQACgRgIgKQgJgKgQAAQgQgBgMAJQgNAIgDAOIggAAQACgRALgNQAMgNASgHQARgHATAAQAeABAQARQARASgDAcIgPBeIgBANQgBAKADAJIgBADIggAAIgBgKIAAgKQgZAYgcAAIgBAAgAgcAMQgQAKgCARQgBAOAHAJQAIAIAPABQAPAAANgIQAOgHAKgOIAGgnIgYAAQgdAAgQAJg");
	this.shape_36.setTransform(26.435,-8.0745);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AAeBhIAVh8QABgJgBgHQgDgZgaAAQgbgBgWAfIgXCHIggAAIAhi9IAegBIgFAYQAZgcAhABQAaABANASQANASgDAgIgVB8g");
	this.shape_37.setTransform(6.8871,-8.2267);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AglCCIAhi9IAeAAIggC9gAAGhgQgFgFAAgIQAAgJAFgFQAFgGAIAAQAIAAAGAFQAFAFAAAJQAAAIgFAFQgFAFgJABIgBAAQgHAAgFgFg");
	this.shape_38.setTransform(-5.975,-11.5271);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgXBjQgZgBgQgPQgQgQACgXQABgeAZgQQAZgRAnAAIAhAAIACgPQACgRgIgKQgJgKgQAAQgQgBgMAJQgNAIgDAOIggAAQACgRALgNQAMgNASgHQARgHATAAQAeABAQARQARASgDAcIgPBeIgBANQgBAKADAJIgBADIggAAIgBgKIAAgKQgZAYgcAAIgBAAgAgcAMQgQAKgCARQgBAOAHAJQAIAIAPABQAPAAANgIQAOgHAKgOIAGgnIgYAAQgdAAgQAJg");
	this.shape_39.setTransform(-20.865,-8.0745);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgdBqQgKgOACgXIATh1IghAAIAEgZIAhAAIAJguIAfAAIgJAuIAjAAIgFAZIgiAAIgTB1IAAAJQABAOANAAQAGAAAKgCIgDAaQgMAEgKAAQgTgBgJgNg");
	this.shape_40.setTransform(-35.05,-10.175);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgJBiQgeAAgUgRQgUgSABgbIAgAAQAAAQAKAKQAKAKASAAQAQAAANgIQANgHABgOQADgTgYgJIgggJQgqgOABghQACgZAVgQQAWgQAcAAQAdAAASARQASAQAAAbIgggBQAAgOgJgJQgJgJgQAAQgPAAgMAIQgLAIgCANQgCAQAWAIIAPAEQAhAJANAMQAOAOgBAUQgBASgKANQgLANgSAHQgQAHgSAAIgCgBg");
	this.shape_41.setTransform(-50.8767,-8.0491);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AggBhQgbgBgNgTQgNgTADggIAUh6IAgAAIgUB6IgBAQQABAMAHAHQAHAIAMAAQAhABASgcIAYiKIAgAAIghC9IgeAAIAEgTQgWAXggAAIgCAAg");
	this.shape_42.setTransform(-68.8371,-7.8745);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgPCDQgYABgUgKQgUgLgLgRQgKgSABgXIAhABQgBAXAOANQAOANAZABQAZAAAQgLQARgMACgTQAEgcghgNIgdgLIgKgFQg0gWAEgqQABgWANgQQANgQAVgJQAVgJAXABQAYAAASAKQASAKAJARQAKASgBAWIghAAQABgYgMgNQgMgNgXAAQgXAAgQALQgRAMgCAUQgDAbAjANIAZAJIAOAGQAxAWgEAsQgBAXgNAPQgNAQgVAIQgVAJgWAAIgDgBg");
	this.shape_43.setTransform(-89.1748,-11.3499);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgGBiQgkAAgUgaQgUgZAEgoIAAgHQADgbAOgYQAOgYAUgMQAUgLAWAAQAdABARATQARASABAhQABALgCALIgCAOIh7AAQgDAaAMASQALATAYAAQAbAAAYgaIASAQQgMASgTAJQgSAKgVAAIgCgBgAgUg6QgPAOgIAbIBbAAIABgCQADgWgKgPQgKgPgTAAIgBAAQgSAAgOANg");
	this.shape_44.setTransform(-118.0448,-8.0499);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("ABXBhIAVh9QABgJgBgHQgEgYgcgBQgRAAgOALQgOALgEASIgWB+IgfAAIAVh8QACgUgIgKQgIgLgRAAQgegBgSAcIgYCKIgfAAIAhi9IAdgBIgEAWQAYgaAiABQASAAAMAIQAMAIAFAPQAbggAkABQAdABANASQAOATgEAfIgVB8g");
	this.shape_45.setTransform(-143.739,-8.2269);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgXBjQgZgBgQgPQgQgQACgXQABgeAZgQQAZgRAnAAIAhAAIACgPQACgRgIgKQgJgKgQAAQgQgBgMAJQgNAIgDAOIggAAQACgRALgNQAMgNASgHQARgHATAAQAeABAQARQARASgDAcIgPBeIgBANQgBAKADAJIgBADIggAAIgBgKIAAgKQgZAYgcAAIgBAAgAgcAMQgQAKgCARQgBAOAHAJQAIAIAPABQAPAAANgIQAOgHAKgOIAGgnIgYAAQgdAAgQAJg");
	this.shape_46.setTransform(-168.515,-8.0745);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgPCDQgZAAgTgLQgTgMgKgVQgLgVgCgaQgBgVAHgjQAGgkAQgZQAQgbAYgOQAYgNAeAAQAjABAWAVQAVAUADAmIghAAQgCgZgMgNQgNgNgWgBQghgBgWAZQgWAZgHAwIgDAXIgBAOQAAAjAOASQAPATAZABQAkABAWgUIALg5Ig5AAIAEgcIBaAAIgPBeQgMASgZAKQgXAKgdAAIgDgBg");
	this.shape_47.setTransform(-189.0317,-11.3497);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#0954D2").s().p("EgkvABoQhEAAAAgpIAAimQABAnBDAAMBJeAAAQBDAAACgnIAACmQAAAphFAAg");
	this.shape_48.setTransform(10.45,70.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#0984E3").s().p("EgkvAISQhDAAgBgnIAAvUQAAgoBEAAMBJeAAAQBFAAAAAoIAAPUQgCAnhDAAg");
	this.shape_49.setTransform(10.45,11.45);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgGBiQgkAAgUgaQgUgZAEgoIAAgHQADgbAOgYQAOgYAUgMQAUgLAWAAQAdABARATQARASABAhQABALgCAMIgCANIh7AAQgDAaAMASQALASAYABQAbAAAYgaIASAQQgMARgTAKQgSAKgVAAIgCgBgAgUg6QgPAOgIAbIBbAAIABgCQADgXgKgOQgKgPgTAAIgBAAQgSAAgOANg");
	this.shape_50.setTransform(134.2552,45.1501);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPAAgYQAAgfAWgPQAXgQAoAAIAgAAIAAgQQAAgQgLgLQgKgKgTAAQgRAAgMAJQgMAJAAAMIghAAQABgOAJgNQALgNARgIQASgIATAAQAhAAASARQAUAQAAAdIAABXQAAAaAGAPIAAADIgiAAQgCgFgCgPQgWAYgfgBQgcABgSgRgAgtAlQAAAQALAIQAJAJAQAAQAPAAAOgIQANgHAHgNIAAgoIgaAAQg7ABAAAig");
	this.shape_51.setTransform(-39.6,45.15);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgGBiQgkAAgUgaQgUgZAEgoIAAgHQADgbAOgYQAOgYAUgMQAUgLAWAAQAdABARATQARASABAhQABALgCAMIgCANIh7AAQgDAaAMASQALASAYABQAbAAAYgaIASAQQgMARgTAKQgSAKgVAAIgCgBgAgUg6QgPAOgIAbIBbAAIABgCQADgXgKgOQgKgPgTAAIgBAAQgSAAgOANg");
	this.shape_52.setTransform(-144.0448,45.1501);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AgtBhIAAi9IAgAAIAAAWQAQgaAcAAQAKAAAFADIAAAeIgQgBQgfAAgMAbIAACGg");
	this.shape_53.setTransform(211.35,-0.225);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("Ag3BJQgZgZAAgrIAAgFQAAgcALgWQALgXAUgMQATgNAVAAQAmAAAUAZQAVAYgBAtIAAANIh/AAQAAAdARARQAPARAXAAQARAAAMgHQAMgHAKgMIAUAQQgZAlgvAAQgmgBgYgZgAgdg4QgOAOgDAZIBeAAIAAgCQgBgZgMgOQgMgNgVAAQgSAAgNAPg");
	this.shape_54.setTransform(195,-0.05);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("Ag7BSQgSgQAAgXQAAgfAWgPQAXgQAoAAIAgAAIAAgQQAAgQgLgLQgKgKgTABQgRgBgMAKQgMAIAAAMIghAAQAAgNAKgOQAKgNASgIQARgHAUgBQAhAAASARQAUAQAAAdIAABXQAAAZAGAQIAAADIgiAAQgDgFgBgPQgWAYgfAAQgcgBgSgQgAgtAlQAAAQAKAJQAKAIAQAAQAPAAAOgHQANgJAHgMIAAgoIgaAAQg7ABAAAig");
	this.shape_55.setTransform(163.7,-0.05);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("ABdCAIAAhkIAEhqIhUDOIgZAAIhUjNIAEBpIAABkIgiAAIAAj/IAsAAIBSDQIBTjQIAsAAIAAD/g");
	this.shape_56.setTransform(138.2,-3.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("Ag5CFIgMgDIAAgaIAJABQAQAAAKgHQAIgGAGgSIAHgTIhDi7IAkAAIAuCNIAsiNIAjAAIhNDaQgQAvgnABg");
	this.shape_57.setTransform(105.05,3.8);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgFBrQgLgOAAgYIAAh1IgjAAIAAgZIAjAAIAAguIAfAAIAAAuIAkAAIAAAZIgkAAIAAB1QAAAMAFAFQAFAGALAAQAGAAAKgCIAAAaQgNAEgMAAQgWAAgKgNg");
	this.shape_58.setTransform(90.125,-2.175);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape_59.setTransform(80.475,-3.525);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgPCHIAAkNIAfAAIAAENg");
	this.shape_60.setTransform(71.675,-4.05);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape_61.setTransform(62.975,-3.525);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgwBvIgBAWIgfAAIAAkNIAhAAIAABlQAUgYAiAAQAiAAAUAaQATAaAAAsIAAADQAAAsgUAaQgTAbgiAAQgjAAgUgagAgvgCIAABRQAPAeAfAAQAXAAANgSQANgSAAgkQAAgigNgRQgNgSgXAAQggAAgOAeg");
	this.shape_62.setTransform(48.85,-3.875);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("Ag7BSQgSgQgBgXQAAgfAXgPQAXgQAoAAIAgAAIAAgQQAAgQgLgLQgKgKgTABQgRgBgMAKQgMAIAAAMIggAAQgBgNAKgOQAKgNASgIQARgHAUgBQAhAAATARQASAQABAdIAABXQAAAZAHAQIAAADIgjAAQgDgFgBgPQgXAYgeAAQgdgBgRgQgAgtAlQAAAQAKAJQALAIAPAAQAPAAANgHQAOgJAHgMIAAgoIgaAAQg7ABAAAig");
	this.shape_63.setTransform(28.5,-0.05);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAqBhIAAh9QAAgVgJgKQgJgJgUAAQgPAAgLAIQgMAJgHANIAACHIghAAIAAi9IAfAAIABAXQAWgbAiAAQA8AAABBEIAAB9g");
	this.shape_64.setTransform(8.875,-0.225);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape_65.setTransform(-5.375,-3.525);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("Ag7BSQgSgQgBgXQAAgfAXgPQAXgQAoAAIAgAAIAAgQQAAgQgLgLQgKgKgTABQgRgBgMAKQgMAIAAAMIggAAQgBgNAKgOQAKgNASgIQARgHAUgBQAhAAASARQATAQABAdIAABXQAAAZAHAQIAAADIgjAAQgDgFgBgPQgXAYgeAAQgdgBgRgQgAgtAlQAAAQAKAJQALAIAPAAQAPAAANgHQAOgJAHgMIAAgoIgaAAQg7ABAAAig");
	this.shape_66.setTransform(-19.65,-0.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgFBrQgLgOAAgYIAAh1IgjAAIAAgZIAjAAIAAguIAfAAIAAAuIAkAAIAAAZIgkAAIAAB1QAAAMAFAFQAFAGALAAQAGAAAKgCIAAAaQgNAEgMAAQgWAAgKgNg");
	this.shape_67.setTransform(-35.825,-2.175);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AglBbQgSgJgKgOQgKgPAAgRIAhAAQABARAMAKQAMAJATAAQATAAALgIQALgHAAgMQAAgNgKgIQgKgHgXgGQgZgFgPgGQgOgHgHgKQgHgLAAgOQAAgYAUgPQAUgQAdgBQAhAAAUARQAUARAAAaIghAAQAAgNgLgLQgMgJgRAAQgQAAgLAIQgKAHAAANQAAALAKAGQAJAGAYAGQAYAGAPAHQAPAHAHALQAIAKAAAQQAAAZgVAPQgUAQghAAQgWAAgRgIg");
	this.shape_68.setTransform(-50.475,-0.05);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("Ag6BPQgQgSAAgiIAAh7IAhAAIAAB6QAAArAjAAQAkAAAMgcIAAiJIAhAAIAAC9IgfAAIgBgTQgTAXgjAAQgfAAgQgSg");
	this.shape_69.setTransform(-69.625,0.125);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgsB6QgXgLgMgRQgNgSAAgWIAiAAQAAAXARANQASAOAbAAQAbAAAOgLQAOgLAAgTQAAgSgNgLQgNgKgigKQgrgMgUgSQgUgSAAgbQAAgeAYgTQAZgVAlABQAbAAAUAKQAVAKAMASQALASgBAVIgiAAQAAgXgOgOQgPgNgbAAQgYAAgNALQgOALgBATQABARANAKQANALAfAJQAgAJARAKQATALAIAOQAJAOAAAUQAAAfgYATQgZATgoAAQgaAAgWgKg");
	this.shape_70.setTransform(-90.15,-3.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("Ag4BJQgXgZAAgrIAAgFQAAgcAKgWQALgXATgMQAUgNAVAAQAlAAAVAZQAUAYABAtIAAANIiAAAQABAdAPARQAQARAYAAQAQAAANgHQAMgHAIgMIAUAQQgXAlgxAAQglgBgZgZgAgeg4QgNAOgDAZIBeAAIAAgCQgBgZgMgOQgMgNgVAAQgSAAgOAPg");
	this.shape_71.setTransform(-119.05,-0.05);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("ABlBhIAAh9QAAgUgJgKQgKgKgWAAQgSAAgMALQgMAKgCATIAAB9IgfAAIAAh8QAAgpgpAAQggAAgMAbIAACKIggAAIAAi9IAeAAIABAVQAVgZAkAAQAoAAANAfQAKgOAPgJQAPgIAVAAQA+AAABBCIAAB/g");
	this.shape_72.setTransform(-144.525,-0.225);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("Ag7BSQgTgQAAgXQAAgfAYgPQAWgQAoAAIAfAAIAAgQQAAgQgKgLQgKgKgTABQgRgBgMAKQgMAIAAAMIggAAQAAgNAKgOQAKgNARgIQASgHATgBQAhAAATARQASAQABAdIAABXQAAAZAHAQIAAADIgiAAQgDgFgCgPQgXAYgeAAQgcgBgSgQgAgtAlQAAAQAKAJQALAIAQAAQAOAAANgHQAPgJAFgMIAAgoIgZAAQg7ABAAAig");
	this.shape_73.setTransform(-170.15,-0.05);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgvB1QgXgPgOgbQgNgbAAgjIAAgWQAAg6AbggQAbgfAvAAQAoAAAZAUQAYAVAGAlIgiAAQgJgzg0AAQggAAgSAYQgRAYAAAtIAAAUQAAArATAaQAUAZAhAAQASAAAOgFQAPgDAJgKIAAg6Ig7AAIAAgcIBdAAIAABfQgOASgWAKQgYAJgfAAQgeAAgZgPg");
	this.shape_74.setTransform(-192.4,-3.35);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#0954D2").s().p("EgkvABAQhEAAAAgpIAAhWQABAnBDAAMBJeAAAQBDAAACgnIAABWQAAAphFAAg");
	this.shape_75.setTransform(10.45,74.975);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("Ag3BJQgZgZAAgrIAAgFQAAgcALgWQALgXAUgMQATgNAVAAQAmAAAUAZQAVAYgBAtIAAANIh/AAQAAAdARAQQAPASAXAAQARAAAMgHQAMgHAKgMIAUAQQgZAlgvAAQgmgBgYgZgAgdg4QgOAOgDAZIBeAAIAAgCQgBgZgMgOQgMgNgVAAQgSAAgNAPg");
	this.shape_76.setTransform(195,8.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("Ag7BSQgSgQAAgXQAAgfAWgPQAXgQAoAAIAgAAIAAgPQAAgRgLgKQgKgLgTABQgRgBgMAKQgMAIAAAMIghAAQAAgNAKgOQAKgNASgIQARgHAUgBQAhAAASARQAUAQAAAdIAABXQAAAZAGAQIAAADIgiAAQgDgFgBgPQgWAYgfAAQgcgBgSgQgAgtAlQAAAQAKAJQAKAIAQAAQAPAAAOgHQANgIAHgNIAAgoIgaAAQg7ABAAAig");
	this.shape_77.setTransform(163.7,8.95);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("Ag7BSQgSgQgBgXQAAgfAXgPQAXgQAoAAIAgAAIAAgPQAAgRgLgKQgKgLgTABQgRgBgMAKQgMAIAAAMIggAAQgBgNAKgOQAKgNASgIQARgHAUgBQAhAAATARQASAQABAdIAABXQAAAZAHAQIAAADIgjAAQgDgFgBgPQgXAYgeAAQgdgBgRgQgAgtAlQAAAQAKAJQALAIAPAAQAPAAANgHQAOgIAHgNIAAgoIgaAAQg7ABAAAig");
	this.shape_78.setTransform(28.5,8.95);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("Ag7BSQgSgQgBgXQAAgfAXgPQAXgQAoAAIAgAAIAAgPQAAgRgLgKQgKgLgTABQgRgBgMAKQgMAIAAAMIggAAQgBgNAKgOQAKgNASgIQARgHAUgBQAhAAASARQATAQABAdIAABXQAAAZAHAQIAAADIgjAAQgDgFgBgPQgXAYgeAAQgdgBgRgQgAgtAlQAAAQAKAJQALAIAPAAQAPAAANgHQAOgIAHgNIAAgoIgaAAQg7ABAAAig");
	this.shape_79.setTransform(-19.65,8.95);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AglBaQgSgIgKgOQgKgPAAgRIAhAAQABARAMAKQAMAJATAAQATAAALgIQALgHAAgMQAAgNgKgIQgKgHgXgGQgZgFgPgGQgOgHgHgKQgHgLAAgOQAAgYAUgPQAUgQAdgBQAhAAAUARQAUARAAAaIghAAQAAgNgLgKQgMgKgRAAQgQAAgLAIQgKAHAAANQAAALAKAGQAJAGAYAGQAYAGAPAHQAPAHAHALQAIAKAAAQQAAAZgVAPQgUAQghAAQgWAAgRgJg");
	this.shape_80.setTransform(-50.475,8.95);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("Ag4BJQgXgZAAgrIAAgFQAAgcAKgWQALgXATgMQAUgNAVAAQAlAAAVAZQAUAYABAtIAAANIiAAAQABAdAPAQQAQASAYAAQAQAAANgHQAMgHAIgMIAUAQQgXAlgxAAQglgBgZgZgAgeg4QgNAOgDAZIBeAAIAAgCQgBgZgMgOQgMgNgVAAQgSAAgOAPg");
	this.shape_81.setTransform(-119.05,8.95);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("Ag7BSQgTgQAAgXQAAgfAYgPQAWgQAoAAIAfAAIAAgPQAAgRgKgKQgKgLgTABQgRgBgMAKQgMAIAAAMIggAAQAAgNAKgOQAKgNARgIQASgHATgBQAhAAATARQASAQABAdIAABXQAAAZAHAQIAAADIgiAAQgDgFgCgPQgXAYgeAAQgcgBgSgQgAgtAlQAAAQAKAJQALAIAQAAQAOAAANgHQAPgIAFgNIAAgoIgZAAQg7ABAAAig");
	this.shape_82.setTransform(-170.15,8.95);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#0984E3").s().p("EgkvAISQghAAgRgKIgSgdIAAvUQAAgoBEAAMBJeAAAQBFAAAAAoIAAPUIgSAdQgRAKgiAAg");
	this.shape_83.setTransform(10.45,28.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_49,p:{y:11.45}},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27,p:{x:175.975,y:-10.175}},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24,p:{x:218.025,y:-11.525}},{t:this.shape_23,p:{y:33.85}},{t:this.shape_22,p:{y:36.9733}},{t:this.shape_21,p:{y:36.9733}},{t:this.shape_20},{t:this.shape_19,p:{y:33.15}},{t:this.shape_18,p:{y:33.6729}},{t:this.shape_17,p:{y:33.3255}},{t:this.shape_16,p:{y:37.1255}},{t:this.shape_15,p:{y:33.325}},{t:this.shape_14},{t:this.shape_13,p:{y:36.975}},{t:this.shape_12,p:{y:33.85}},{t:this.shape_11,p:{y:37.1476}},{t:this.shape_10,p:{y:33.15}},{t:this.shape_9,p:{y:33.6729}},{t:this.shape_8,p:{y:36.9733}},{t:this.shape_7,p:{y:37.1474}},{t:this.shape_6,p:{y:33.3255}},{t:this.shape_5},{t:this.shape_4,p:{y:36.9482}},{t:this.shape_3,p:{y:36.9731}},{t:this.shape_2,p:{y:37.1255}},{t:this.shape_1,p:{y:35.025}},{t:this.shape,p:{y:37.1255}}]}).to({state:[{t:this.shape_49,p:{y:19.45}},{t:this.shape_75},{t:this.shape_74,p:{y:-3.35}},{t:this.shape_73},{t:this.shape_72,p:{y:-0.225}},{t:this.shape_71},{t:this.shape_70,p:{y:-3.35}},{t:this.shape_69,p:{y:0.125}},{t:this.shape_68},{t:this.shape_67,p:{y:-2.175}},{t:this.shape_66},{t:this.shape_65,p:{y:-3.525}},{t:this.shape_64,p:{y:-0.225}},{t:this.shape_63},{t:this.shape_62,p:{y:-3.875}},{t:this.shape_61,p:{y:-3.525}},{t:this.shape_60,p:{y:-4.05}},{t:this.shape_59,p:{y:-3.525}},{t:this.shape_58,p:{y:-2.175}},{t:this.shape_57,p:{y:3.8}},{t:this.shape_56,p:{y:-3.35}},{t:this.shape_55},{t:this.shape_27,p:{x:178.875,y:-2.175}},{t:this.shape_54},{t:this.shape_53,p:{y:-0.225}},{t:this.shape_24,p:{x:220.925,y:-3.525}},{t:this.shape_23,p:{y:41.85}},{t:this.shape_22,p:{y:44.9733}},{t:this.shape_21,p:{y:44.9733}},{t:this.shape_52,p:{y:45.1501}},{t:this.shape_19,p:{y:41.15}},{t:this.shape_18,p:{y:41.6729}},{t:this.shape_17,p:{y:41.3255}},{t:this.shape_16,p:{y:45.1255}},{t:this.shape_15,p:{y:41.325}},{t:this.shape_51,p:{y:45.15}},{t:this.shape_13,p:{y:44.975}},{t:this.shape_12,p:{y:41.85}},{t:this.shape_11,p:{y:45.1476}},{t:this.shape_10,p:{y:41.15}},{t:this.shape_9,p:{y:41.6729}},{t:this.shape_8,p:{y:44.9733}},{t:this.shape_7,p:{y:45.1474}},{t:this.shape_6,p:{y:41.3255}},{t:this.shape_50,p:{y:45.1501}},{t:this.shape_4,p:{y:44.9482}},{t:this.shape_3,p:{y:44.9731}},{t:this.shape_2,p:{y:45.1255}},{t:this.shape_1,p:{y:43.025}},{t:this.shape,p:{y:45.1255}}]},1).to({state:[{t:this.shape_83},{t:this.shape_74,p:{y:5.65}},{t:this.shape_82},{t:this.shape_72,p:{y:8.775}},{t:this.shape_81},{t:this.shape_70,p:{y:5.65}},{t:this.shape_69,p:{y:9.125}},{t:this.shape_80},{t:this.shape_67,p:{y:6.825}},{t:this.shape_79},{t:this.shape_65,p:{y:5.475}},{t:this.shape_64,p:{y:8.775}},{t:this.shape_78},{t:this.shape_62,p:{y:5.125}},{t:this.shape_61,p:{y:5.475}},{t:this.shape_60,p:{y:4.95}},{t:this.shape_59,p:{y:5.475}},{t:this.shape_58,p:{y:6.825}},{t:this.shape_57,p:{y:12.8}},{t:this.shape_56,p:{y:5.65}},{t:this.shape_77},{t:this.shape_27,p:{x:178.875,y:6.825}},{t:this.shape_76},{t:this.shape_53,p:{y:8.775}},{t:this.shape_24,p:{x:220.925,y:5.475}},{t:this.shape_23,p:{y:50.85}},{t:this.shape_22,p:{y:53.9733}},{t:this.shape_21,p:{y:53.9733}},{t:this.shape_52,p:{y:54.1501}},{t:this.shape_19,p:{y:50.15}},{t:this.shape_18,p:{y:50.6729}},{t:this.shape_17,p:{y:50.3255}},{t:this.shape_16,p:{y:54.1255}},{t:this.shape_15,p:{y:50.325}},{t:this.shape_51,p:{y:54.15}},{t:this.shape_13,p:{y:53.975}},{t:this.shape_12,p:{y:50.85}},{t:this.shape_11,p:{y:54.1476}},{t:this.shape_10,p:{y:50.15}},{t:this.shape_9,p:{y:50.6729}},{t:this.shape_8,p:{y:53.9733}},{t:this.shape_7,p:{y:54.1474}},{t:this.shape_6,p:{y:50.3255}},{t:this.shape_50,p:{y:54.1501}},{t:this.shape_4,p:{y:53.9482}},{t:this.shape_3,p:{y:53.9731}},{t:this.shape_2,p:{y:54.1255}},{t:this.shape_1,p:{y:52.025}},{t:this.shape,p:{y:54.1255}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.5,-41.5,484,123);


(lib.menuListDasar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape.setTransform(129.075,-10.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgIQALgHAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhAAAUARQAUAQAAAbIghAAQAAgNgLgLQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWABgRgJg");
	this.shape_1.setTransform(115.325,-6.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Ag7BSQgTgPAAgZQAAgdAYgQQAWgRAoAAIAfAAIAAgPQAAgQgKgLQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQAAgOAKgOQAKgNARgIQASgIATAAQAhAAATARQASAQABAdIAABXQAAAaAHAPIAAADIgiAAQgDgFgCgPQgXAYgegBQgcABgSgRgAgtAlQAAAQAKAIQALAJAQAAQAOAAANgIQAPgHAFgNIAAgnIgZAAQg7AAAAAig");
	this.shape_2.setTransform(96.25,-6.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AApCHIhChYIgUAVIAABDIggAAIAAkNIAgAAIAACiIARgUIA7g+IAnAAIhJBPIBRBug");
	this.shape_3.setTransform(78.65,-10.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape_4.setTransform(63.975,-10.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgbCJIAAikIgeAAIAAgZIAeAAIAAgUQAAgfARgQQAQgRAdAAQAMAAALADIgCAaQgJgBgJAAQgPAAgJAJQgJAJAAASIAAAUIAoAAIAAAZIgoAAIAACkg");
	this.shape_5.setTransform(53.9,-11.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQCCIAAi9IAgAAIAAC9gAgOhhQgEgFAAgIQAAgIAEgFQAFgGAJAAQAJAAAFAGQAFAFAAAIQAAAIgFAFQgFAGgJAAQgJAAgFgGg");
	this.shape_6.setTransform(42.775,-10.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgIQALgHAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhAAAUARQAUAQAAAbIghAAQAAgNgLgLQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWABgRgJg");
	this.shape_7.setTransform(29.025,-6.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPgBgZQAAgdAYgQQAWgRAoAAIAfAAIAAgPQABgQgLgLQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOALgOQAKgNARgIQASgIATAAQAhAAATARQASAQABAdIAABXQAAAaAHAPIAAADIgjAAQgCgFgCgPQgXAYgegBQgdABgRgRgAgtAlQAAAQAKAIQALAJAPAAQAPAAANgIQAOgHAGgNIAAgnIgZAAQg7AAAAAig");
	this.shape_8.setTransform(9.95,-6.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgPCHIAAkNIAfAAIAAENg");
	this.shape_9.setTransform(-4.175,-10.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB+IBwh+IApAAIhkBxIBsCOg");
	this.shape_10.setTransform(-18.325,-10.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgtBhIAAi9IAgAAIAAAWQAQgaAcAAQAKAAAFADIAAAeIgQgBQgfAAgMAbIAACGg");
	this.shape_11.setTransform(-45.15,-7.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPgBgZQAAgdAYgQQAWgRAoAAIAfAAIAAgPQABgQgLgLQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOALgOQAKgNARgIQASgIATAAQAhAAATARQASAQABAdIAABXQAAAaAHAPIAAADIgjAAQgCgFgCgPQgXAYgegBQgdABgRgRgAgtAlQAAAQAKAIQALAJAPAAQAPAAANgIQAOgHAGgNIAAgnIgZAAQg7AAAAAig");
	this.shape_12.setTransform(-62.05,-6.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgIQALgHAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhAAAUARQAUAQAAAbIghAAQAAgNgLgLQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWABgRgJg");
	this.shape_13.setTransform(-81.125,-6.95);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Ag7BSQgSgPgBgZQAAgdAXgQQAXgRAoAAIAgAAIAAgPQAAgQgLgLQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOAKgOQAKgNASgIQARgIAUAAQAhAAASARQATAQABAdIAABXQAAAaAHAPIAAADIgjAAQgDgFgBgPQgXAYgegBQgdABgRgRgAgtAlQAAAQAKAIQALAJAPAAQAPAAANgIQAOgHAHgNIAAgnIgaAAQg7AAAAAig");
	this.shape_14.setTransform(-100.2,-6.95);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhcCAIAAj/IBJAAQAgAAAaAPQAZAPAOAbQAOAbABAkIAAAPQAAAkgOAbQgOAcgaAOQgaAOgiABgAg6BlIAkAAQAmgBAWgYQAVgYAAgtIAAgOQAAgrgUgZQgVgYgkgBIgoAAg");
	this.shape_15.setTransform(-121.325,-10.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_16.setTransform(0,25.2625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_17.setTransform(0,-10.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AglBbQgSgJgKgOQgKgOAAgRIAhAAQABAQAMAKQAMAJATAAQATAAALgHQALgIAAgMQAAgOgKgHQgKgHgXgGQgZgFgPgGQgOgIgHgJQgHgLAAgOQAAgXAUgQQAUgRAdABQAhAAAUAQQAUAQAAAaIghAAQAAgMgLgKQgMgKgRAAQgQAAgLAIQgKAHAAANQAAALAKAHQAJAFAYAGQAYAFAPAIQAPAHAHALQAIAKAAAPQAAAagVAPQgUAQghAAQgWgBgRgHg");
	this.shape_18.setTransform(115.325,-2.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("Ag7BTQgTgQAAgZQAAgeAYgPQAWgQAogBIAfAAIAAgOQAAgRgKgKQgKgKgTAAQgRAAgMAJQgMAIAAAMIggAAQAAgOAKgNQAKgNARgIQASgHATAAQAhAAATAQQASAQABAdIAABWQAAAaAHAQIAAADIgiAAQgDgGgCgOQgXAXgeABQgcAAgSgQgAgtAmQAAAPAKAJQALAIAQAAQAOAAANgHQAPgJAFgNIAAgnIgZAAQg7AAAAAkg");
	this.shape_19.setTransform(96.25,-2.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AApCHIhChYIgUAVIAABDIggAAIAAkNIAgAAIAACiIARgVIA7g9IAnAAIhJBOIBRBvg");
	this.shape_20.setTransform(78.65,-6.95);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AglBbQgSgJgKgOQgKgOAAgRIAhAAQABAQAMAKQAMAJATAAQATAAALgHQALgIAAgMQAAgOgKgHQgKgHgXgGQgZgFgPgGQgOgIgHgJQgHgLAAgOQAAgXAUgQQAUgRAdABQAhAAAUAQQAUAQAAAaIghAAQAAgMgLgKQgMgKgRAAQgQAAgLAIQgKAHAAANQAAALAKAHQAJAFAYAGQAYAFAPAIQAPAHAHALQAIAKAAAPQAAAagVAPQgUAQghAAQgWgBgRgHg");
	this.shape_21.setTransform(29.025,-2.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("Ag7BTQgSgQgBgZQAAgeAYgPQAWgQAogBIAfAAIAAgOQABgRgLgKQgKgKgTAAQgRAAgMAJQgMAIAAAMIggAAQgBgOALgNQAKgNARgIQASgHATAAQAhAAATAQQASAQABAdIAABWQAAAaAHAQIAAADIgjAAQgCgGgCgOQgXAXgeABQgdAAgRgQgAgtAmQAAAPAKAJQALAIAPAAQAPAAANgHQAOgJAGgNIAAgnIgZAAQg7AAAAAkg");
	this.shape_22.setTransform(9.95,-2.95);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAhIAABWIgiAAIAAj/IAiAAIAAB/IBwh/IApAAIhkBxIBsCOg");
	this.shape_23.setTransform(-18.325,-6.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("Ag7BTQgSgQgBgZQAAgeAYgPQAWgQAogBIAfAAIAAgOQABgRgLgKQgKgKgTAAQgRAAgMAJQgMAIAAAMIggAAQgBgOALgNQAKgNARgIQASgHATAAQAhAAATAQQASAQABAdIAABWQAAAaAHAQIAAADIgjAAQgCgGgCgOQgXAXgeABQgdAAgRgQgAgtAmQAAAPAKAJQALAIAPAAQAPAAANgHQAOgJAGgNIAAgnIgZAAQg7AAAAAkg");
	this.shape_24.setTransform(-62.05,-2.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AglBbQgSgJgKgOQgKgOAAgRIAhAAQABAQAMAKQAMAJATAAQATAAALgHQALgIAAgMQAAgOgKgHQgKgHgXgGQgZgFgPgGQgOgIgHgJQgHgLAAgOQAAgXAUgQQAUgRAdABQAhAAAUAQQAUAQAAAaIghAAQAAgMgLgKQgMgKgRAAQgQAAgLAIQgKAHAAANQAAALAKAHQAJAFAYAGQAYAFAPAIQAPAHAHALQAIAKAAAPQAAAagVAPQgUAQghAAQgWgBgRgHg");
	this.shape_25.setTransform(-81.125,-2.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("Ag7BTQgSgQgBgZQAAgeAXgPQAXgQAogBIAgAAIAAgOQAAgRgLgKQgKgKgTAAQgRAAgMAJQgMAIAAAMIggAAQgBgOAKgNQAKgNASgIQARgHAUAAQAhAAASAQQATAQABAdIAABWQAAAaAHAQIAAADIgjAAQgDgGgBgOQgXAXgeABQgdAAgRgQgAgtAmQAAAPAKAJQALAIAPAAQAPAAANgHQAOgJAHgNIAAgnIgaAAQg7AAAAAkg");
	this.shape_26.setTransform(-100.2,-2.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AhcCAIAAj/IBJAAQAgAAAaAPQAZAPAOAbQAOAbABAjIAAAQQAAAkgOAbQgOAbgaAPQgaAPgiAAgAg6BkIAkAAQAmABAWgZQAVgYAAgtIAAgOQAAgsgUgXQgVgZgkAAIgoAAg");
	this.shape_27.setTransform(-121.325,-6.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#0954D2").s().p("A54AqQgwAAAAgYIAAg7QABAXAvAAMAzxAAAQAvAAABgXIAAA7QAAAYgwAAg");
	this.shape_28.setTransform(0,27.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_29.setTransform(0,-6.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgHQALgIAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhABAUAQQAUAQAAAaIghAAQAAgNgLgKQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWAAgRgIg");
	this.shape_30.setTransform(115.325,3.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("Ag7BTQgTgRAAgYQAAgdAYgQQAWgRAoAAIAfAAIAAgPQAAgRgKgKQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQAAgOAKgOQAKgNARgIQASgIATAAQAhABATAQQASAQABAdIAABWQAAAbAHAPIAAADIgiAAQgDgGgCgOQgXAXgeAAQgcAAgSgPgAgtAmQAAAPAKAIQALAJAQAAQAOAAANgIQAPgHAFgOIAAgmIgZAAQg7AAAAAjg");
	this.shape_31.setTransform(96.25,3.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgHQALgIAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhABAUAQQAUAQAAAaIghAAQAAgNgLgKQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWAAgRgIg");
	this.shape_32.setTransform(29.025,3.05);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("Ag7BTQgSgRgBgYQAAgdAYgQQAWgRAoAAIAfAAIAAgPQABgRgLgKQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOALgOQAKgNARgIQASgIATAAQAhABATAQQASAQABAdIAABWQAAAbAHAPIAAADIgjAAQgCgGgCgOQgXAXgeAAQgdAAgRgPgAgtAmQAAAPAKAIQALAJAPAAQAPAAANgIQAOgHAGgOIAAgmIgZAAQg7AAAAAjg");
	this.shape_33.setTransform(9.95,3.05);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AA6CAIhah3IgfAgIAABXIgiAAIAAj/IAiAAIAAB/IBwh/IApAAIhkBxIBsCOg");
	this.shape_34.setTransform(-18.325,-0.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("Ag7BTQgSgRgBgYQAAgdAYgQQAWgRAoAAIAfAAIAAgPQABgRgLgKQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOALgOQAKgNARgIQASgIATAAQAhABATAQQASAQABAdIAABWQAAAbAHAPIAAADIgjAAQgCgGgCgOQgXAXgeAAQgdAAgRgPgAgtAmQAAAPAKAIQALAJAPAAQAPAAANgIQAOgHAGgOIAAgmIgZAAQg7AAAAAjg");
	this.shape_35.setTransform(-62.05,3.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AglBaQgSgHgKgPQgKgOAAgSIAhAAQABARAMAJQAMAKATAAQATAAALgHQALgIAAgNQAAgNgKgHQgKgHgXgFQgZgGgPgGQgOgIgHgKQgHgKAAgOQAAgYAUgQQAUgQAdAAQAhABAUAQQAUAQAAAaIghAAQAAgNgLgKQgMgJgRAAQgQAAgLAHQgKAJAAAMQAAAMAKAFQAJAHAYAFQAYAGAPAHQAPAGAHALQAIALAAAPQAAAagVAPQgUAPghAAQgWAAgRgIg");
	this.shape_36.setTransform(-81.125,3.05);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("Ag7BTQgSgRgBgYQAAgdAXgQQAXgRAoAAIAgAAIAAgPQAAgRgLgKQgKgJgTgBQgRABgMAIQgMAJAAANIggAAQgBgOAKgOQAKgNASgIQARgIAUAAQAhABASAQQATAQABAdIAABWQAAAbAHAPIAAADIgjAAQgDgGgBgOQgXAXgeAAQgdAAgRgPgAgtAmQAAAPAKAIQALAJAPAAQAPAAANgIQAOgHAHgOIAAgmIgaAAQg7AAAAAjg");
	this.shape_37.setTransform(-100.2,3.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AhcCAIAAj/IBJAAQAgAAAaAPQAZAOAOAcQAOAbABAkIAAAPQAAAkgOAbQgOAcgaAOQgaAOgiABgAg6BlIAkAAQAmgBAWgYQAVgYAAgtIAAgOQAAgsgUgYQgVgYgkAAIgoAAg");
	this.shape_38.setTransform(-121.325,-0.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#0954D2").s().p("A54AMQgvAAgBgXQABAWAvAAMAzxAAAQAvAAABgWQgBAXgvAAg");
	this.shape_39.setTransform(0,30.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_40.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11,p:{y:-7.125}},{t:this.shape_10},{t:this.shape_9,p:{y:-10.95}},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{y:-10.425}},{t:this.shape_5,p:{y:-11.125}},{t:this.shape_4,p:{y:-10.425}},{t:this.shape_3,p:{y:-10.95}},{t:this.shape_2},{t:this.shape_1},{t:this.shape,p:{y:-10.425}}]}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_11,p:{y:-3.125}},{t:this.shape_23},{t:this.shape_9,p:{y:-6.95}},{t:this.shape_22},{t:this.shape_21},{t:this.shape_6,p:{y:-6.425}},{t:this.shape_5,p:{y:-7.125}},{t:this.shape_4,p:{y:-6.425}},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape,p:{y:-6.425}}]},1).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_11,p:{y:2.875}},{t:this.shape_34},{t:this.shape_9,p:{y:-0.95}},{t:this.shape_33},{t:this.shape_32},{t:this.shape_6,p:{y:-0.425}},{t:this.shape_5,p:{y:-1.125}},{t:this.shape_4,p:{y:-0.425}},{t:this.shape_3,p:{y:-0.95}},{t:this.shape_31},{t:this.shape_30},{t:this.shape,p:{y:-0.425}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


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


(lib.btnMenuBack = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ED4F44").s().p("AgfAzQgGgEAAgHIAAhQQAAgGAGgEQAHgDAFAEIAzAoQAGAEAAAFQAAAHgGAEIgzAmQgDADgDAAIgGgBg");
	this.shape.setTransform(-38.9397,-3.6581,0.7125,0.7885,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2276,-3.6778,0.7125,0.7885,180);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgEBKIAAhoIAJAAIAABogAgEg/IAAgKIAJAAIAAAKg");
	this.shape_2.setTransform(50.45,-3.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgLBDQgGgGgBgIIAAh+IAKAAIAAB+QAAAFAEADQADADAEAAIAEAAIAEgDIABgBIABABIAFAFIABABIgBABQgDADgEACQgEABgEAAQgIAAgGgHg");
	this.shape_3.setTransform(45.875,-3.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAqA0IAAgWQgHALgLAFQgLAGgNAAQgNAAgMgHQgMgHgHgMQgHgLAAgPQAAgOAHgLQAHgMAMgHQAMgHANAAQAOAAANAHQALAHAHAMQAHALABAOIAAA0gAgVgkQgJAGgGAJQgFAKgBALQABAMAFAJQAGAKAJAGQAKAFALAAQAMAAAJgFQAKgGAGgKQAGgJgBgMQABgLgGgKQgGgJgKgGQgJgGgMAAQgLAAgKAGg");
	this.shape_4.setTransform(36.65,-1.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgXBEQgLgGgIgKIAAAWIgJAAIAAiTIAJAAIAABBQAIgKALgGQALgGAMAAQAOABANAGQALAHAHAMQAHALABAOQgBAPgHAMQgHAMgLAHQgNAHgOAAQgMAAgLgGgAgVgOQgJAGgGAIQgFAJgBAMQABAMAFAKQAGAKAJAFQAKAGALAAQAMAAAJgGQAKgFAGgKQAGgKgBgMQABgMgGgJQgGgIgKgGQgJgGgMAAQgLAAgKAGg");
	this.shape_5.setTransform(24.5,-3.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ABEA0IAAg+QAAgJgEgHQgEgHgIgEQgGgFgKAAQgIAAgHAFQgIAEgEAHQgEAHAAAJIAAA+IgJAAIAAg+QAAgJgEgHQgEgHgIgEQgGgFgKAAQgIAAgHAFQgHAEgFAHQgEAHAAAJIAAA+IgKAAIAAhnIAKAAIAAAOQAGgHAIgEQAJgDAIAAQAMAAAKAGQAJAFAFAKQAFgKAKgFQAKgGALAAQAMAAAKAFQAIAGAGAJQAFAJABAMIAAA+g");
	this.shape_6.setTransform(9.35,-1.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgaAtQgLgHgHgMQgHgLgBgPQABgOAHgLQAHgMALgHQANgHANAAQAOAAAMAHQAMAHAHAMQAHALAAAOIAAABIgCAAIhbAAQAAAMAFAJQAHAJAJAGQAJAFALAAQAOAAAKgHQALgIAFgMIABgBIABAAIAGADIACAAIgBABQgEALgIAHQgHAIgJAEQgKAEgLAAQgNAAgNgHgAAqgIQgDgKgGgHQgFgIgJgEQgIgFgLAAQgKAAgIAFQgJAEgFAIQgHAHgCAKIBTAAIAAAAg");
	this.shape_7.setTransform(-5.6,-1.575);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAvBLIgBgBIguhBIgwBBIAAABIgBAAIgJAAIAAiVIAKAAIAACDIAqg5IAFgGIAvhDIABgBIAMAAIgCACIg0BIIA0BJIACACg");
	this.shape_8.setTransform(-16.725,-3.825);

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
	this.shape_12.graphics.f("#FFFFFF").s().p("AgEBKIAAhnIAJAAIAABngAgEg/IAAgKIAJAAIAAAKg");
	this.shape_12.setTransform(50.45,-1.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgLBEQgGgGgBgJIAAh+IAKAAIAAB+QAAAEAEAEQADADAEAAIAEgBIAEgCIABgBIABABIAFAFIABABIgBABQgDADgEABQgEACgEAAQgIAAgGgGg");
	this.shape_13.setTransform(45.875,-1.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgXBEQgLgFgIgLIAAAWIgJAAIAAiTIAJAAIAABBQAIgKALgGQALgGAMABQAOAAANAGQALAIAHAMQAHAKABAOQgBAQgHALQgHAMgLAHQgNAHgOAAQgMAAgLgGgAgVgOQgJAFgGAJQgFAKgBALQABANAFAJQAGAKAJAGQAKAFALAAQAMAAAJgFQAKgGAGgKQAGgJgBgNQABgLgGgKQgGgJgKgFQgJgGgMAAQgLAAgKAGg");
	this.shape_14.setTransform(24.5,-1.75);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#535353").s().p("AnHBSQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAghQACAxAhAkIAFAFQAnAoA4AAIClAAILqAAQA3AAAogoIAFgFQASgUAJgXQAHgVAAgVIAAAhIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_15.setTransform(-0.35,15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgLBDQgGgGgBgIIAAh+IAKAAIAAB+QAAAEAEAEQADADAEAAIAEgBIAEgCIABgBIABABIAFAFIABABIgBABQgDADgEACQgEABgEAAQgIAAgGgHg");
	this.shape_16.setTransform(45.875,1.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgXBEQgLgFgIgLIAAAWIgJAAIAAiTIAJAAIAABBQAIgKALgGQALgGAMABQAOAAANAGQALAIAHALQAHALABAOQgBAPgHAMQgHAMgLAHQgNAHgOAAQgMAAgLgGgAgVgOQgJAGgGAIQgFAJgBAMQABANAFAJQAGAKAJAFQAKAGALAAQAMAAAJgGQAKgFAGgKQAGgJgBgNQABgMgGgJQgGgIgKgGQgJgGgMAAQgLAAgKAGg");
	this.shape_17.setTransform(24.5,1.75);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#9E392B").s().p("AgPDZQg3AAgngnIgGgFQgfgjgDgwIAAgBIAAgCIAAgCIAAinQAAg3AogoQAngnA3AAIClAAIAAGxg");
	this.shape_18.setTransform(-44.4,1.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#535353").s().p("AAAgBIAAACIAAABIAAgDg");
	this.shape_19.setTransform(58.6875,10.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E74C3C").s().p("Am4DZIAAmxILqAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpIAAADQgBAUgGASQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_20.setTransform(14.65,1.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8,p:{y:-3.825}},{t:this.shape_7,p:{y:-1.575}},{t:this.shape_6,p:{y:-1.575}},{t:this.shape_5},{t:this.shape_4,p:{y:-1.575}},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{y:-3.6778}},{t:this.shape,p:{y:-3.6581}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_15},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_8,p:{y:-1.825}},{t:this.shape_7,p:{y:0.425}},{t:this.shape_6,p:{y:0.425}},{t:this.shape_14},{t:this.shape_4,p:{y:0.425}},{t:this.shape_13},{t:this.shape_12,p:{y:-1.75}},{t:this.shape_1,p:{y:-1.9778}},{t:this.shape,p:{y:-1.9581}}]},1).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_8,p:{y:1.675}},{t:this.shape_7,p:{y:3.925}},{t:this.shape_6,p:{y:3.925}},{t:this.shape_17},{t:this.shape_4,p:{y:3.925}},{t:this.shape_16},{t:this.shape_12,p:{y:1.75}},{t:this.shape_1,p:{y:1.3722}},{t:this.shape,p:{y:1.3919}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49);


(lib.awan4Dalem = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E7EAF9").s().p("Ag7BxQgqgUgjgcQk6CLj9jlICahMQDbA0DShTIAOgHQATA5A2AWQAZAKATgRQAjgdAPgrICpAPQCmCBDOgrQA1gLAwgWQhJD2lIhsQgggLgigFQhTBZhjAAQg2AAg7gbg");
	this.shape.setTransform(70.35,48.1017);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FBFCFD").s().p("ACZCCIiogPQgOAqgjAeQgUAQgZgJQg2gWgTg5IgPAHQjRBTjcg0QBGAAAxg1QAxg2AAhKQAkAgAzgDIANgBIAXhKIAegtIAAgPIAfgfQBxhCCEAGIAOAAIBcA8QAYCgCeghIAQgFQBugPBmAoIAdALQgEAxgjAmQglArgyAdIDtAfQgxAVg0ALQg0AMgyAAQiTAAh8hhg");
	this.shape_1.setTransform(78,22.6618);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.awan4Dalem, new cjs.Rectangle(0,0,140.7,62.1), null);


(lib.awan3Dalem = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FBFCFC").s().p("AkLCeIAIgcQAbhkg6hTQDHjKDSCuIANAMQgFA2AbAqQAqBGBTgaIALgEQjbBgjrAAQgzAAg0gFg");
	this.shape.setTransform(51.5,16.2706);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E5EBF7").s().p("AmpAaIALgUIAAgOQALgCALgEQCBgbA/h3QA5BUgbBjIgHAdQEiAZELhzQATAAANAWQAOAVAAAfQjSB9jRAAQjYAAjYiHg");
	this.shape_1.setTransform(42.575,26.9399);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.awan3Dalem, new cjs.Rectangle(0,0,85.2,43.1), null);


(lib.awan4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.awan3Dalem();
	this.instance.setTransform(42.6,21.5,1,1,0,0,0,42.6,21.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:42.4,regY:21.4,scaleX:2.4307,scaleY:2.4307,x:-487.85,y:21.35},158).to({regX:42.6,regY:21.5,scaleX:1,scaleY:1,x:42.6,y:21.5},170).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-590.9,-30.7,676.1,104.7);


(lib.awan3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.awan4Dalem();
	this.instance.setTransform(70.4,31,1,1,0,0,0,70.4,31);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:30.9,scaleX:1.3412,scaleY:1.3412,x:648.55,y:38.9},91).to({regY:31,scaleX:1,scaleY:1,x:70.4,y:31},96).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-2.6,742.9,83.3);


// stage content:
(lib.menu_temp = function(mode,startPosition,loop) {
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
		var _this = this
		
		_this.setup = function(){
			document.body.style.backgroundColor = lib.properties.color;
		}
		
		_this.setup();
		
		_this.stop();
		
		_this.btnMenuBack.on('click', function(){
		
		window.location.replace('../../index.html');
		});
		
		
		_this.menuListKI.on('click', function(){
		
		window.location.replace('../materi1/index.html');
		});
		
		_this.menuListTujuan.on('click', function(){
		
		window.location.replace('../materi3/index.html');
		});
		
		_this.menuListKD.on('click', function(){
		
		window.location.replace('../materi2/index.html');
		});
		
		_this.menuListDasar.on('click', function(){
		
		window.location.replace('../materi4/index.html');
		});
		
		_this.menuListGame.on('click', function(){
		
		window.location.replace('../materi5/index.html');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// suara
	this.nyala = new lib.ggg();
	this.nyala.name = "nyala";
	this.nyala.setTransform(919.4,48.7,0.7266,0.7266,0,0,0,-16.4,-1.2);
	new cjs.ButtonHelper(this.nyala, 0, 1, 2, false, new lib.ggg(), 3);

	this.tandaSuaraOn = new lib.an_Image({'id': 'tandaSuaraOn', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOn.name = "tandaSuaraOn";
	this.tandaSuaraOn.setTransform(849.1,42.1,0.4414,0.4414,0,0,0,50,45);

	this.hening = new lib.dsdsd();
	this.hening.name = "hening";
	this.hening.setTransform(919.4,48.7,0.7266,0.7266,0,0,0,-16.4,-1.2);
	new cjs.ButtonHelper(this.hening, 0, 1, 2, false, new lib.dsdsd(), 3);

	this.tandaSuaraOff = new lib.an_Image({'id': 'tandaSuaraOff', 'src':'images/animation_500_kdvpuxkb.gif', 'alt':'image', 'border':'0', 'visible':true, 'class':'ui-image'});

	this.tandaSuaraOff.name = "tandaSuaraOff";
	this.tandaSuaraOff.setTransform(849.4,42.1,0.4414,0.4414,0,0,0,50,45);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgOAUQgEgEAAgGQAAgHAFgDQAGgEAJAAIAIAAIAAgEQAAgEgDgCQgCgCgFgBQgDAAgDACQgDADAAACIgIAAQAAgDACgDQADgDAEgCQAEgCAEAAQAIAAAFAEQAEAEAAAHIAAAUQAAAGACAFIAAAAIgIAAIgBgFQgGAGgGAAQgHAAgFgEgAgKAJQAAAEACACQADACAEAAQACAAAEgCQADgCACgDIAAgKIgHAAQgNAAAAAJg");
	this.shape.setTransform(857.025,72.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgKAXIAAgtIAHAAIABAGQACgHAIAAIADABIAAAIIgEgBQgHAAgCAHIAAAfg");
	this.shape_1.setTransform(853.425,72.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgOAUQgEgEAAgGQAAgHAFgDQAGgEAJAAIAIAAIAAgEQAAgEgDgCQgCgCgFgBQgDAAgDACQgDADAAACIgIAAQAAgDACgDQADgDAEgCQAEgCAEAAQAIAAAFAEQAEAEAAAHIAAAUQAAAGACAFIAAAAIgIAAIgBgFQgGAGgGAAQgHAAgFgEgAgKAJQAAAEACACQADACAEAAQACAAAEgCQADgCACgDIAAgKIgHAAQgNAAAAAJg");
	this.shape_2.setTransform(849.325,72.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgNATQgEgEAAgJIAAgdIAHAAIAAAdQABALAIAAQAIAAAEgHIAAghIAHAAIAAAtIgHAAIAAgEQgFAGgIgBQgIABgDgFg");
	this.shape_3.setTransform(844.55,72.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgKAeQgFgDgDgEQgEgFAAgFIAIAAQAAAGAFADQAEADAGAAQAGAAAEgCQADgDAAgFQAAgEgDgDQgDgDgIgBQgKgEgFgDQgFgEABgHQAAgHAFgFQAGgFAJAAQAGAAAFACQAFADADAFQACAEAAAFIgIAAQAAgGgEgDQgDgEgGAAQgGABgDADQgEACAAAFQAAAEAEACQADADAHACQAIACAEACQAEACACAEQACAEAAAEQAAAIgFAEQgGAFgKAAQgGAAgFgCg");
	this.shape_4.setTransform(839.55,71.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(849.3,47.85);

	this.instance = new lib.hehe();
	this.instance.setTransform(890.65,47.85,0.7682,1,0,0,0,86.1,35.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// base
	this.menuListGame = new lib.menuListGame();
	this.menuListGame.name = "menuListGame";
	this.menuListGame.setTransform(504.7,434.9);
	new cjs.ButtonHelper(this.menuListGame, 0, 1, 2, false, new lib.menuListGame(), 3);

	this.menuListDasar = new lib.menuListDasar();
	this.menuListDasar.name = "menuListDasar";
	this.menuListDasar.setTransform(682.45,330.8);
	new cjs.ButtonHelper(this.menuListDasar, 0, 1, 2, false, new lib.menuListDasar(), 3);

	this.menuListTujuan = new lib.menuListTujuan();
	this.menuListTujuan.name = "menuListTujuan";
	this.menuListTujuan.setTransform(682.45,216.45);
	new cjs.ButtonHelper(this.menuListTujuan, 0, 1, 2, false, new lib.menuListTujuan(), 3);

	this.menuListKD = new lib.menuListKD();
	this.menuListKD.name = "menuListKD";
	this.menuListKD.setTransform(294.35,330.8);
	new cjs.ButtonHelper(this.menuListKD, 0, 1, 2, false, new lib.menuListKD(), 3);

	this.menuListKI = new lib.menuListKI();
	this.menuListKI.name = "menuListKI";
	this.menuListKI.setTransform(294.35,216.45);
	new cjs.ButtonHelper(this.menuListKI, 0, 1, 2, false, new lib.menuListKI(), 3);

	this.btnMenuBack = new lib.btnMenuBack();
	this.btnMenuBack.name = "btnMenuBack";
	this.btnMenuBack.setTransform(886.15,504.85);
	new cjs.ButtonHelper(this.btnMenuBack, 0, 1, 2, false, new lib.btnMenuBack(), 3);

	this.instance_1 = new lib.awan4();
	this.instance_1.setTransform(980.35,163.05);

	this.instance_2 = new lib.awan3();
	this.instance_2.setTransform(490.95,51.05,1,1,0,0,0,70.4,31);

	this.instance_3 = new lib.Bitmap3();
	this.instance_3.setTransform(-4,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.btnMenuBack},{t:this.menuListKI},{t:this.menuListKD},{t:this.menuListTujuan},{t:this.menuListDasar},{t:this.menuListGame}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(476,269,589.5,274);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#009999",
	opacity: 1.00,
	manifest: [
		{src:"images/Bitmap3.png?1597754990532", id:"Bitmap3"},
		{src:"components/lib/jquery-3.4.1.min.js?1597754990532", id:"lib/jquery-3.4.1.min.js"},
		{src:"components/sdk/anwidget.js?1597754990532", id:"sdk/anwidget.js"},
		{src:"components/ui/src/image.js?1597754990532", id:"an.Image"},
		{src:"components/ui/src/image.js?1597754990532", id:"an.Image"}
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