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
	this.shape.graphics.f("#FFFFFF").s().p("AA1BYIAAhqQAAgPgHgMQgHgLgMgIQgMgHgPAAQgOAAgMAHQgMAIgHALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAPAAQATAAAQAJQAQAJAJAQQAKAQAAATIAABqg");
	this.shape.setTransform(36.175,-7.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ABHBYIAAglQgMASgSAJQgUAKgVAAQgYAAgUgMQgUgMgLgUQgMgTgBgZQABgYAMgUQALgUAUgLQAUgMAYAAQAYAAAUAMQAVALALAUQAMAUAAAYIAABYgAgkg9QgQAJgJARQgJAQgBATQABAUAJAQQAJAQAQAKQARAKATAAQAUAAAQgKQAQgKAKgQQAJgQAAgUQAAgTgJgQQgKgRgQgJQgQgKgUAAQgTAAgRAKg");
	this.shape_1.setTransform(16.8,-7.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AA1BYIAAgZQgKAMgOAHQgNAGgQAAQgSAAgQgJQgQgKgJgPQgJgQgBgUIAAhpIARAAIAABpQAAAPAHAMQAHAMAMAIQAMAHAOAAQAPAAAMgHQAMgIAHgMQAHgMAAgPIAAgCIAAhnIARAAIAACvg");
	this.shape_2.setTransform(-2.275,-7.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRCfQgHgDgFgFIgCgBIACgCIAIgJIACgBIABABQADADAEACQADABAEAAQAIAAAFgGQAGgFAAgIIAAjVIARAAIAADVQgBAPgKAKQgKAKgPABQgHAAgGgDgAAPiQIAAgRIARAAIAAARg");
	this.shape_3.setTransform(-16.025,-7.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AA1BYIAAgZQgKAMgOAHQgNAGgQAAQgSAAgQgJQgQgKgJgPQgJgQgBgUIAAhpIARAAIAABpQAAAPAHAMQAHAMAMAIQAMAHAOAAQAPAAAMgHQAMgIAHgMQAHgMAAgPIAAgCIAAhnIARAAIAACvg");
	this.shape_4.setTransform(-25.075,-7.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHB+IAAjqIhbAAIAAgRIDFAAIAAARIhbAAIAADqg");
	this.shape_5.setTransform(-36.625,-11.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_6.setTransform(0,25.2625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_7.setTransform(0,-10.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgHB+IAAjrIhbAAIAAgQIDFAAIAAAQIhbAAIAADrg");
	this.shape_8.setTransform(-36.625,-8.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0954D2").s().p("A54AuQgwAAAAgYIAAhDQABAXAvAAMAzxAAAQAvAAABgXIAABDQAAAYgwAAg");
	this.shape_9.setTransform(0,26.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_10.setTransform(0,-6.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#0954D2").s().p("A54AOQgwAAAAgXIAAgEQABAWAvAAMAzxAAAQAvAAABgWIAAAEQAAAXgwAAg");
	this.shape_11.setTransform(0,30.075);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#0984E3").s().p("A54E6QgvABgBgXIAApGQAAgYAwABMAzxAAAQAwgBAAAYIAAJGQgBAXgvgBg");
	this.shape_12.setTransform(0,-0.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5,p:{y:-11.65}},{t:this.shape_4,p:{y:-7.875}},{t:this.shape_3,p:{y:-7.875}},{t:this.shape_2,p:{y:-7.875}},{t:this.shape_1,p:{y:-7.875}},{t:this.shape,p:{y:-7.875}}]}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_4,p:{y:-4.675}},{t:this.shape_3,p:{y:-4.675}},{t:this.shape_2,p:{y:-4.675}},{t:this.shape_1,p:{y:-4.675}},{t:this.shape,p:{y:-4.675}}]},1).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_5,p:{y:-2.05}},{t:this.shape_4,p:{y:1.725}},{t:this.shape_3,p:{y:1.725}},{t:this.shape_2,p:{y:1.725}},{t:this.shape_1,p:{y:1.725}},{t:this.shape,p:{y:1.725}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


(lib.menuListKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhrIAAgRIAPAAIAAARg");
	this.shape.setTransform(115.325,-9.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgOBzQgKgLgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAFQAEAHAJgBQAEAAADgBQAEgBADgEIABgBIACABIAIAJIACACIgCACQgFAFgGACQgHADgHAAQgPgBgKgJg");
	this.shape_1.setTransform(107.075,-9.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AA1BYIAAhqQAAgPgHgMQgHgLgMgIQgMgHgPAAQgOAAgMAHQgMAIgHALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAPAAQATAAAQAJQAQAJAJAQQAKAQAAATIAABqg");
	this.shape_2.setTransform(93.625,-6.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAGB+IgNAAIAAj7IAPAAIAAD7g");
	this.shape_3.setTransform(82.175,-10.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhrIAAgRIAPAAIAAARg");
	this.shape_4.setTransform(64.925,-9.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgiBSQgQgHgJgKQgJgLgBgNIAAgCIAQAAIAAACQABAOAOAIQAPAJAXAAQAYAAAOgJQAPgIAAgOQAAgJgHgIQgHgHgMgFQgMgEgPAAQgSAAgQgHQgQgFgJgMQgJgLgBgNQABgNAJgLQAJgLAQgGQAQgGASAAQATAAAQAGQAQAGAJALQAKALAAANIAAACIgQAAIAAgCQAAgOgPgIQgPgJgYAAQgXAAgOAJQgPAIAAAOQAAAJAHAIQAHAHAMAEQAMAFAOAAQATAAAQAGQAQAGAJALQAKAMAAANQAAANgKALQgJAKgQAHQgQAGgTAAQgSAAgQgGg");
	this.shape_5.setTransform(53.525,-6.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AA1BYIAAhqQAAgPgHgMQgHgLgMgIQgMgHgPAAQgOAAgMAHQgMAIgHALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAPAAQATAAAQAJQAQAJAJAQQAKAQAAATIAABqg");
	this.shape_6.setTransform(35.975,-6.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgsBMQgTgMgMgUQgMgTgBgZQABgYAMgUQAMgUATgLQAUgMAYAAQAZAAATAMQAVALALAUQAMAUAAAYIAAACIgEAAIibAAQABAUAJAPQAKAQAQAJQAQAKATAAQAWgBATgMQASgNAIgVIABgCIACABIALAEIADABIgCACQgGARgNANQgMANgRAHQgQAHgSAAQgYAAgUgMgABGgOQgEgQgJgNQgLgNgOgIQgPgHgRAAQgRAAgOAHQgPAIgKANQgKANgEAQICMAAIAAAAg");
	this.shape_7.setTransform(16.9,-6.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgOBzQgKgLgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAFQAEAHAJgBQAEAAADgBQAEgBADgEIABgBIACABIAIAJIACACIgCACQgFAFgGACQgHADgHAAQgPgBgKgJg");
	this.shape_8.setTransform(3.875,-9.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgsBMQgTgMgMgUQgMgTgBgZQABgYAMgUQAMgUATgLQAUgMAYAAQAZAAATAMQAVALALAUQAMAUAAAYIAAACIgEAAIibAAQABAUAJAPQAKAQAQAJQAQAKATAAQAWgBATgMQASgNAIgVIABgCIACABIALAEIADABIgCACQgGARgNANQgMANgRAHQgQAHgSAAQgYAAgUgMgABGgOQgEgQgJgNQgLgNgOgIQgPgHgRAAQgRAAgOAHQgPAIgKANQgKANgEAQICMAAIAAAAg");
	this.shape_9.setTransform(-10.55,-6.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhXB9IAAj5IAQAAIAAAlQAMgRAUgKQASgKAVAAQAZAAATAMQAUAMAMAUQAMAUAAAYQAAAZgMATQgMAUgUAMQgTALgZABQgVgBgSgJQgUgKgMgRIAABugAgkhiQgPAKgKAQQgKAQAAAUQAAAUAKAQQAKAQAPAJQARAKATAAQAUAAAQgKQAQgJAKgQQAJgQAAgUQAAgUgJgQQgKgQgQgKQgQgJgUgBQgTABgRAJg");
	this.shape_10.setTransform(-31.15,-2.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("ABzBYIAAhqQgBgPgGgMQgIgLgLgIQgMgHgPAAQgPAAgMAHQgNAIgGALQgIAMAAAPIAABqIgQAAIAAhqQABgPgIgMQgHgLgMgIQgMgHgPAAQgOAAgNAHQgLAIgIALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAQAAQAUAAAQAKQARAJAIASQAJgSARgJQAQgKAUAAQATAAAQAJQAQAJAIAQQAKAQABATIAABqg");
	this.shape_11.setTransform(-56.75,-6.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgsBMQgTgMgMgUQgMgTAAgZQAAgYAMgUQAMgUATgLQAUgMAYAAQAZAAATAMQAUALAMAUQAMAUAAAYQAAASgHAQQgGAQgNAMQgNANgQAHQgQAGgRAAQgYAAgUgMgAgkg9QgPAJgKARQgKAQAAATQAAAUAKAQQAKAQAPAKQARAKATAAQAOAAANgGQANgFALgLQAKgKAGgNQAEgNAAgOQAAgTgJgQQgKgRgQgJQgQgKgUAAQgTAAgRAKg");
	this.shape_12.setTransform(-82,-6.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhPhvIhQBvIgBABIgBAAIgPAAIAAj7IARAAIAADeIBGhhIAIgLIBRhxIABgBIAUAAIgCADIhZB6IBZB6IACAEg");
	this.shape_13.setTransform(-100.75,-10.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_14.setTransform(0,25.2625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_15.setTransform(0,-10.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_16.setTransform(115.325,-5.95);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAGQAEAFAJAAQAEAAADgBQAEgBADgDIABgBIACABIAIAJIACABIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_17.setTransform(107.075,-5.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_18.setTransform(64.925,-5.95);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAGQAEAFAJAAQAEAAADgBQAEgBADgDIABgBIACABIAIAJIACABIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_19.setTransform(3.875,-5.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhPhvIhQBvIgBABIgBAAIgPAAIAAj7IARAAIAADdIBGhhIAIgKIBRhxIABgBIAUAAIgCAEIhZB5IBZB7IACADg");
	this.shape_20.setTransform(-100.75,-6.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#0954D2").s().p("A54AqQgwAAAAgYIAAg7QABAXAvAAMAzxAAAQAvAAABgXIAAA7QAAAYgwAAg");
	this.shape_21.setTransform(0,27.275);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_22.setTransform(0,-6.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh7IgMAAIAAgRIAMAAIAAhJIARAAIAABJIALAAIAAARIgLAAIAAB7QAAAIAGAGQAEAFAJABQAEAAADgCQAEgBADgDIABgBIACABIAIAJIACABIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_23.setTransform(107.075,0.45);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh7IgMAAIAAgRIAMAAIAAhJIARAAIAABJIALAAIAAARIgLAAIAAB7QAAAIAGAGQAEAFAJABQAEAAADgCQAEgBADgDIABgBIACABIAIAJIACABIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_24.setTransform(3.875,0.45);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhPhvIhQBvIgBABIgBAAIgPAAIAAj7IARAAIAADdIBGhhIAIgKIBRhxIABgBIAUAAIgCAEIhZB5IBZB6IACAEg");
	this.shape_25.setTransform(-100.75,0.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12,p:{y:-6.275}},{t:this.shape_11,p:{y:-6.275}},{t:this.shape_10,p:{y:-2.625}},{t:this.shape_9,p:{y:-6.275}},{t:this.shape_8},{t:this.shape_7,p:{y:-6.275}},{t:this.shape_6,p:{y:-6.275}},{t:this.shape_5,p:{y:-6.275}},{t:this.shape_4},{t:this.shape_3,p:{y:-10.05}},{t:this.shape_2,p:{y:-6.275}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_22,p:{y:-6.05}},{t:this.shape_21},{t:this.shape_20},{t:this.shape_12,p:{y:-2.275}},{t:this.shape_11,p:{y:-2.275}},{t:this.shape_10,p:{y:1.375}},{t:this.shape_9,p:{y:-2.275}},{t:this.shape_19},{t:this.shape_7,p:{y:-2.275}},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_5,p:{y:-2.275}},{t:this.shape_18,p:{y:-5.95}},{t:this.shape_3,p:{y:-6.05}},{t:this.shape_2,p:{y:-2.275}},{t:this.shape_17},{t:this.shape_16,p:{y:-5.95}}]},1).to({state:[{t:this.shape_22,p:{y:0.35}},{t:this.shape_25},{t:this.shape_12,p:{y:4.125}},{t:this.shape_11,p:{y:4.125}},{t:this.shape_10,p:{y:7.775}},{t:this.shape_9,p:{y:4.125}},{t:this.shape_24},{t:this.shape_7,p:{y:4.125}},{t:this.shape_6,p:{y:4.125}},{t:this.shape_5,p:{y:4.125}},{t:this.shape_18,p:{y:0.45}},{t:this.shape_3,p:{y:0.35}},{t:this.shape_2,p:{y:4.125}},{t:this.shape_23},{t:this.shape_16,p:{y:0.45}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73.3);


(lib.menuListKD = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhPhvIhQBvIgBABIgCAAIgOAAIAAj7IARAAIAADeIBGhhIAIgLIBRhxIABgBIAUAAIgCADIhZB6IBZB6IACAEg");
	this.shape.setTransform(84.9,-10.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhUB+IgPAAIAAj7IBtAAQAZAAAUAMQAUAMAMAVQAMATAAAaQAAAYgMAUQgMAUgUALQgUAMgZABIhcAAIAABJgAhSAlIBcAAQAUgBAQgJQARgLAKgPQAKgQgBgUQABgVgKgQQgKgRgRgJQgQgKgUAAIhcAAg");
	this.shape_1.setTransform(61.45,-10.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAGB+IgNAAIAAj7IAPAAIAAD7g");
	this.shape_2.setTransform(47.025,-10.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AA1BYIAAhqQAAgPgHgMQgHgLgMgIQgMgHgPAAQgOAAgMAHQgMAIgHALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAPAAQATAAAQAJQAQAJAJAQQAKAQAAATIAABqg");
	this.shape_3.setTransform(23.625,-6.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ABIBYIAAglQgNASgTAJQgSAKgWAAQgYAAgUgMQgTgMgNgUQgLgTAAgZQAAgYALgUQANgUATgLQAUgMAYAAQAYAAAVAMQATALAMAUQAMAUABAYIAABYgAgjg9QgRAJgJARQgJAQgBATQABAUAJAQQAJAQARAKQAQAKATAAQAUAAAQgKQAQgKAKgQQAKgQAAgUQAAgTgKgQQgKgRgQgJQgQgKgUAAQgTAAgQAKg");
	this.shape_4.setTransform(4.25,-6.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABIB9IAAglQgNASgTAKQgSAJgWAAQgYgBgUgLQgUgMgMgUQgLgTgBgaQABgYALgTQAMgUAUgLQAUgMAYgBQAWAAASAKQATAJANASIAAhuIARAAIAAD5gAgjgZQgRAKgJAPQgKARAAATQAAAUAKARQAJAQARAKQAQAKATgBQAUABAQgKQAQgKAKgQQAKgRAAgUQAAgTgKgRQgKgPgQgKQgQgJgUAAQgTAAgQAJg");
	this.shape_5.setTransform(-16.7,-9.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AhtB+IAAj7IBeAAQAiAAAdARQAcARARAdQARAcAAAiQAAAjgRAdQgRAcgcARQgdARgiAAgAhdBtIBOAAQAeAAAYgPQAZgOAOgZQAPgYABgfQgBgdgPgZQgOgZgZgPQgYgOgeAAIhOAAg");
	this.shape_6.setTransform(-52.2,-10.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ABOB+IAAgBIhQhvIhPBvIgCABIgBAAIgOAAIAAj7IARAAIAADeIBGhhIAIgLIBRhxIAAgBIAVAAIgDADIhYB6IBYB6IADAEg");
	this.shape_7.setTransform(-76.75,-10.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_8.setTransform(0,25.2625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_9.setTransform(0,-10.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhPhvIhQBvIgBABIgCAAIgOAAIAAj7IARAAIAADeIBGhiIAIgKIBRhxIABgBIAUAAIgCAEIhZB5IBZB7IACADg");
	this.shape_10.setTransform(84.9,-7.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AhUB+IgPAAIAAj7IBtAAQAZABAUALQAUAMAMAUQAMAVAAAYQAAAagMASQgMAVgUAMQgUAMgZAAIhcAAIAABJgAhSAkIBcAAQAUAAAQgKQARgKAKgQQAKgPgBgVQABgUgKgRQgKgPgRgLQgQgJgUgBIhcAAg");
	this.shape_11.setTransform(61.45,-7.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABIB9IAAglQgNARgTAKQgSAKgWAAQgYAAgUgMQgUgMgMgUQgLgUgBgZQABgYALgTQAMgUAUgLQAUgMAYAAQAWgBASAKQATAJANATIAAhvIARAAIAAD5gAgjgZQgRAKgJAPQgKARAAATQAAAVAKAQQAJAQARAJQAQAKATAAQAUAAAQgKQAQgJAKgQQAKgQAAgVQAAgTgKgRQgKgPgQgKQgQgJgUAAQgTAAgQAJg");
	this.shape_12.setTransform(-16.7,-6.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhtB+IAAj7IBeAAQAiAAAdARQAcARARAcQARAdAAAiQAAAjgRAcQgRAdgcARQgdARgiAAgAhdBtIBOAAQAeAAAYgOQAZgPAOgZQAPgZABgeQgBgegPgYQgOgZgZgOQgYgPgegBIhOAAg");
	this.shape_13.setTransform(-52.2,-7.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("ABOB+IAAgBIhQhvIhPBvIgCABIgBAAIgOAAIAAj7IARAAIAADeIBGhiIAIgKIBRhxIAAgBIAVAAIgDAEIhYB5IBYB7IADADg");
	this.shape_14.setTransform(-76.75,-7.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#0954D2").s().p("A54AvQgwAAAAgYIAAhFQABAXAvAAMAzxAAAQAvAAABgXIAABFQAAAYgwAAg");
	this.shape_15.setTransform(0,26.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApFQAAgZAwAAMAzxAAAQAwAAAAAZIAAJFQgBAWgvAAg");
	this.shape_16.setTransform(0,-7.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhPhvIhQBvIgBABIgCAAIgOAAIAAj7IARAAIAADeIBGhhIAIgLIBRhxIABgBIAUAAIgCADIhZB6IBZB7IACADg");
	this.shape_17.setTransform(84.9,-0.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhUB+IgPAAIAAj7IBtAAQAZAAAUAMQAUAMAMAVQAMATAAAaQAAAYgMAUQgMAUgUALQgUAMgZABIhcAAIAABJgAhSAkIBcAAQAUAAAQgJQARgLAKgQQAKgPgBgUQABgVgKgQQgKgQgRgKQgQgKgUAAIhcAAg");
	this.shape_18.setTransform(61.45,-0.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("ABIB9IAAglQgNASgTAKQgSAJgWAAQgYgBgUgLQgUgMgMgUQgLgUgBgZQABgYALgTQAMgUAUgLQAUgNAYAAQAWAAASAKQATAKANARIAAhuIARAAIAAD5gAgjgZQgRAKgJAPQgKARAAATQAAAUAKARQAJAQARAJQAQALATgBQAUABAQgLQAQgJAKgQQAKgRAAgUQAAgTgKgRQgKgPgQgKQgQgJgUAAQgTAAgQAJg");
	this.shape_19.setTransform(-16.7,0.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AhtB+IAAj7IBeAAQAiAAAdARQAcARARAdQARAcAAAiQAAAjgRAcQgRAdgcARQgdAQgiABgAhdBtIBOAAQAeAAAYgPQAZgOAOgZQAPgYABgfQgBgegPgYQgOgZgZgPQgYgOgeAAIhOAAg");
	this.shape_20.setTransform(-52.2,-0.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("ABOB+IAAgBIhQhvIhPBvIgCABIgBAAIgOAAIAAj7IARAAIAADeIBGhhIAIgLIBRhxIAAgBIAVAAIgDADIhYB6IBYB7IADADg");
	this.shape_21.setTransform(-76.75,-0.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#0954D2").s().p("A54AMQgvAAgBgXQABAWAvAAMAzxAAAQAvAAABgWQgBAXgvAAg");
	this.shape_22.setTransform(0,30.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_23.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{y:-6.275}},{t:this.shape_3,p:{y:-6.275}},{t:this.shape_2,p:{y:-10.05}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_4,p:{y:-3.275}},{t:this.shape_3,p:{y:-3.275}},{t:this.shape_2,p:{y:-7.05}},{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_4,p:{y:3.725}},{t:this.shape_3,p:{y:3.725}},{t:this.shape_2,p:{y:-0.05}},{t:this.shape_18},{t:this.shape_17}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


(lib.menuListGame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag3B6IgCAAIABgCIAEgLIABgCIACAAQADABADABQAHgBAFgDQAFgEACgGIAQguIg9irIgBgCIASAAIAAABIA0CUIABgDIA0iRIAAgBIASAAIgBACIgIAWIgBACIg1CUIgQAyQgFAMgJAHQgJAFgMABQgGAAgGgDg");
	this.shape.setTransform(147.175,-4.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgOBzQgKgLgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAGQAEAFAJAAQAEABADgCQAEgCADgCIABgCIACACIAIAJIACABIgCACQgFAEgGADQgHADgHAAQgPAAgKgKg");
	this.shape_1.setTransform(135.925,-11.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_2.setTransform(127.725,-11.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgUBzQgKgLgBgPIAAjVIARAAIAADVQAAAIAGAGQAFAFAIAAIAHgBQAEgCACgCIACgCIABACIAJAJIACABIgCACQgFAEgHADQgGADgHAAQgPAAgKgKg");
	this.shape_3.setTransform(120.125,-11.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_4.setTransform(112.525,-11.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgnBzQgUgJgMgSIAAAlIgRAAIAAj5IARAAIAABvQAMgSAUgKQASgKAVAAQAYAAAUANQAVALALAUQAMATAAAYQAAAZgMAUQgLAUgVAMQgUAMgYAAQgVAAgSgKgAgkgZQgQAKgJAPQgJAQgBAUQABAVAJAQQAJAQAQAJQARALATgBQAUABAQgLQAQgJAKgQQAJgQAAgVQAAgUgJgQQgKgPgQgKQgQgJgUAAQgTAAgRAJg");
	this.shape_5.setTransform(99.6,-11.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ABIBYIAAglQgNASgSAJQgUAKgVAAQgYAAgUgMQgUgMgLgUQgMgTgBgZQABgYAMgUQALgUAUgLQAUgMAYAAQAYAAAUAMQAUALAMAUQAMAUABAYIAABYgAgkg9QgQAJgJARQgJAQgBATQABAUAJAQQAJAQAQAKQARAKATAAQAUAAAQgKQAQgKAKgQQAJgQABgUQgBgTgJgQQgKgRgQgJQgQgKgUAAQgTAAgRAKg");
	this.shape_6.setTransform(78.35,-7.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AA1BYIAAhqQAAgPgHgMQgHgLgMgIQgMgHgPAAQgOAAgMAHQgMAIgHALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAPAAQATAAAQAJQAQAJAJAQQAKAQAAATIAABqg");
	this.shape_7.setTransform(59.275,-7.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_8.setTransform(47.875,-11.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ABHBYIAAglQgMASgSAJQgTAKgWAAQgYAAgUgMQgTgMgMgUQgMgTAAgZQAAgYAMgUQAMgUATgLQAUgMAYAAQAZAAATAMQAVALALAUQAMAUAAAYIAABYgAgkg9QgPAJgKARQgKAQAAATQAAAUAKAQQAKAQAPAKQARAKATAAQAUAAAQgKQAQgKAKgQQAKgQgBgUQABgTgKgQQgKgRgQgJQgQgKgUAAQgTAAgRAKg");
	this.shape_9.setTransform(34.65,-7.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgOBzQgKgLgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAGQAEAFAJAAQAEABADgCQAEgCADgCIABgCIACACIAIAJIACABIgCACQgFAEgGADQgHADgHAAQgPAAgKgKg");
	this.shape_10.setTransform(21.625,-11.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgiBSQgQgHgJgKQgJgLgBgNIAAgCIAQAAIAAACQABAOAOAIQAPAJAXAAQAYAAAOgJQAPgIAAgOQAAgJgHgIQgHgHgMgFQgMgEgPAAQgSAAgQgHQgQgFgJgMQgJgLgBgNQABgNAJgLQAJgLAQgGQAQgGASAAQATAAAQAGQAQAGAJALQAKALAAANIAAACIgQAAIAAgCQAAgOgPgIQgPgJgYAAQgXAAgOAJQgPAIAAAOQAAAJAHAIQAHAHAMAEQAMAFAOAAQATAAAQAGQAQAGAJALQAKAMAAANQAAANgKALQgJAKgQAHQgQAGgTAAQgSAAgQgGg");
	this.shape_11.setTransform(8.175,-7.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AA1BYIAAgZQgKAMgOAHQgNAGgQAAQgSAAgQgJQgQgKgJgPQgJgQgBgUIAAhpIARAAIAABpQAAAPAHAMQAHAMAMAIQAMAHAOAAQAPAAAMgHQAMgIAHgMQAHgMAAgPIAAgCIAAhnIARAAIAACvg");
	this.shape_12.setTransform(-9.375,-7.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgxB1QgWgJgOgPQgNgOAAgTIAAgCIAQAAIAAACQAAAKAHAKQAGAJALAHQAMAGAPAEQAPAEAQgBQARABAPgEQAPgEAMgGQAMgHAGgJQAGgKAAgKQAAgOgLgMQgLgMgTgGQgSgIgYAAQgTAAgSgFQgSgEgOgKQgOgJgIgNQgHgMAAgOQAAgSANgPQAOgPAWgJQAWgIAbgBQAcABAWAIQAXAJANAPQANAPAAASIAAACIgQAAIAAgCQAAgKgGgKQgGgIgMgIQgMgGgPgEQgPgDgRAAQgQAAgPADQgPAEgMAGQgLAIgGAIQgHAKAAAKQABAPAKALQALAMATAGQATAIAWgBQAUABASAFQASAEAOAKQAOAKAIAMQAHAMAAAOQAAATgNAOQgNAPgXAJQgWAJgcAAQgbAAgWgJg");
	this.shape_13.setTransform(-29.925,-11.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgrBMQgVgMgMgUQgLgTAAgZQAAgYALgUQAMgUAVgLQATgMAYAAQAYAAAVAMQATALAMAUQAMAUAAAYIAAACIgEAAIibAAQABAUAKAPQAJAQAQAJQAQAKATAAQAXgBARgMQASgNAJgVIABgCIACABIALAEIADABIgBACQgHARgMANQgNANgRAHQgQAHgSAAQgYAAgTgMgABGgOQgDgQgKgNQgLgNgOgIQgPgHgRAAQgQAAgPAHQgPAIgKANQgKANgDAQICLAAIAAAAg");
	this.shape_14.setTransform(-64.25,-7.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ABzBYIAAhqQAAgPgIgMQgHgLgLgIQgNgHgOAAQgPAAgMAHQgNAIgGALQgIAMAAAPIAABqIgQAAIAAhqQABgPgIgMQgHgLgMgIQgMgHgPAAQgPAAgMAHQgLAIgIALQgHAMAAAPIAABqIgRAAIAAivIARAAIAAAYQAKgLAOgHQANgGAQAAQAUAAAQAKQAQAJAJASQAJgSARgJQAQgKAUAAQATAAAQAJQAPAJAKAQQAJAQABATIAABqg");
	this.shape_15.setTransform(-89.5,-7.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("ABHBYIAAglQgMASgSAJQgUAKgVAAQgYAAgUgMQgUgMgLgUQgMgTgBgZQABgYAMgUQALgUAUgLQAUgMAYAAQAYAAAUAMQAVALALAUQAMAUAAAYIAABYgAgkg9QgQAJgJARQgJAQgBATQABAUAJAQQAJAQAQAKQARAKATAAQAUAAAQgKQAQgKAKgQQAJgQAAgUQAAgTgJgQQgKgRgQgJQgQgKgUAAQgTAAgRAKg");
	this.shape_16.setTransform(-115.05,-7.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("ABtB+IAAhAQgHANgLAMQgKALgNAIQgQAKgRAFQgRAFgSAAQgiAAgdgRQgcgRgRgdQgRgcAAgjQAAgiARgdQARgcAcgRQAdgQAigBQAUAAASAGQASAFAQAMQAQAKALAPQAMAPAGASIABACIgCABIgLAEIgCABIAAgCQgHgPgJgNQgLgNgOgKQgNgKgQgFQgQgEgRAAQgeAAgYAPQgZAOgOAZQgPAYgBAeQABAfAPAYQAOAZAZAPQAYAOAeAAQAcAAAXgMQAXgNAPgVQAPgVAEgbIhfAAIAAgQIBxAAIAAB/g");
	this.shape_17.setTransform(-140.15,-11.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_18.setTransform(0,25.2625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_19.setTransform(0,-10.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("Ag3B7IgCgBIABgCIAEgMIABgCIACABQADABADAAQAHABAFgEQAFgEACgFIAQguIg9irIgBgDIASAAIAAABIA0CUIABgCIA0iSIAAgBIASAAIgBADIgIAVIgBACIg1CUIgQAyQgFAMgJAGQgJAHgMAAQgGAAgGgCg");
	this.shape_20.setTransform(147.175,-0.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh7IgMAAIAAgRIAMAAIAAhJIARAAIAABJIALAAIAAARIgLAAIAAB7QAAAIAGAGQAEAFAJABQAEAAADgCQAEgCADgCIABgBIACABIAIAIIACACIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_21.setTransform(135.925,-7.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhrIAAgRIAPAAIAAARg");
	this.shape_22.setTransform(127.725,-7.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUByQgKgKgBgPIAAjVIARAAIAADVQAAAIAGAGQAFAFAIABIAHgCQAEgCACgCIACgBIABABIAJAIIACACIgCABQgFAFgHADQgGADgHAAQgPAAgKgLg");
	this.shape_23.setTransform(120.125,-7.55);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhrIAAgRIAPAAIAAARg");
	this.shape_24.setTransform(112.525,-7.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgnBzQgUgKgMgRIAAAlIgRAAIAAj5IARAAIAABuQAMgRAUgKQASgJAVAAQAYgBAUAMQAVAMALAUQAMATAAAZQAAAZgMATQgLAUgVAMQgUAMgYAAQgVAAgSgKgAgkgYQgQAJgJAQQgJAPgBAVQABATAJARQAJAQAQAKQARAJATABQAUgBAQgJQAQgKAKgQQAJgRAAgTQAAgVgJgPQgKgQgQgJQgQgKgUAAQgTAAgRAKg");
	this.shape_25.setTransform(99.6,-7.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhrIAAgRIAPAAIAAARg");
	this.shape_26.setTransform(47.875,-7.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh7IgMAAIAAgRIAMAAIAAhJIARAAIAABJIALAAIAAARIgLAAIAAB7QAAAIAGAGQAEAFAJABQAEAAADgCQAEgCADgCIABgBIACABIAIAIIACACIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_27.setTransform(21.625,-7.55);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgxB1QgWgJgOgOQgNgPAAgTIAAgCIAQAAIAAACQAAAKAHAJQAGAKALAGQAMAIAPADQAPAEAQAAQARAAAPgEQAPgDAMgIQAMgGAGgKQAGgJAAgKQAAgOgLgNQgLgLgTgHQgSgGgYgBQgTAAgSgFQgSgEgOgKQgOgKgIgMQgHgNAAgNQAAgSANgPQAOgPAWgJQAWgJAbAAQAcAAAWAJQAXAJANAPQANAPAAASIAAACIgQAAIAAgCQAAgKgGgJQgGgKgMgGQgMgHgPgEQgPgEgRAAQgQAAgPAEQgPAEgMAHQgLAGgGAKQgHAJAAAKQABAPAKAMQALALATAHQATAGAWABQAUgBASAGQASAEAOAKQAOAKAIAMQAHANAAANQAAATgNAPQgNAOgXAJQgWAJgcAAQgbAAgWgJg");
	this.shape_28.setTransform(-29.925,-7.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("ABtB+IAAhAQgHANgLAMQgKALgNAIQgQAKgRAFQgRAFgSAAQgigBgdgQQgcgRgRgcQgRgdAAgjQAAgiARgdQARgcAcgRQAdgQAigBQAUAAASAFQASAHAQALQAQAKALAQQAMAOAGASIABACIgCABIgLAEIgCABIAAgCQgHgPgJgOQgLgMgOgJQgNgLgQgEQgQgFgRgBQgeABgYAOQgZAPgOAZQgPAZgBAdQABAeAPAZQAOAZAZAOQAYAPAeABQAcgBAXgMQAXgMAPgWQAPgVAEgcIhfAAIAAgPIBxAAIAAB/g");
	this.shape_29.setTransform(-140.15,-7.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#0954D2").s().p("A54AqQgwAAAAgYIAAg7QABAXAvAAMAzxAAAQAvAAABgXIAAA7QAAAYgwAAg");
	this.shape_30.setTransform(0,27.275);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_31.setTransform(0,-6.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("Ag3B7IgCgBIABgCIAEgMIABgBIACAAQADABADAAQAHAAAFgDQAFgEACgFIAQgvIg9irIgBgCIASAAIAAABIA0CUIABgDIA0iRIAAgBIASAAIgBACIgIAWIgBACIg1CUIgQAyQgFAMgJAGQgJAHgMAAQgGAAgGgCg");
	this.shape_32.setTransform(147.175,5.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAGQAEAFAJAAQAEAAADgBQAEgBADgDIABgBIACABIAIAJIACABIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_33.setTransform(135.925,-1.55);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_34.setTransform(127.725,-1.55);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgUByQgKgKgBgPIAAjVIARAAIAADVQAAAIAGAGQAFAFAIAAIAHgBQAEgBACgDIACgBIABABIAJAJIACABIgCABQgFAFgHADQgGADgHAAQgPAAgKgLg");
	this.shape_35.setTransform(120.125,-1.55);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_36.setTransform(112.525,-1.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgnBzQgUgKgMgRIAAAlIgRAAIAAj5IARAAIAABvQAMgSAUgKQASgKAVABQAYAAAUAMQAVALALAUQAMATAAAYQAAAZgMAUQgLAUgVAMQgUAMgYAAQgVAAgSgKgAgkgZQgQAKgJAPQgJARgBATQABAVAJAQQAJAQAQAJQARAKATAAQAUAAAQgKQAQgJAKgQQAJgQAAgVQAAgTgJgRQgKgPgQgKQgQgJgUAAQgTAAgRAJg");
	this.shape_37.setTransform(99.6,-1.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgHB9IAAivIAPAAIAACvgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_38.setTransform(47.875,-1.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgOByQgKgKgBgPIAAh8IgMAAIAAgQIAMAAIAAhJIARAAIAABJIALAAIAAAQIgLAAIAAB8QAAAIAGAGQAEAFAJAAQAEAAADgBQAEgBADgDIABgBIACABIAIAJIACABIgCABQgFAFgGADQgHADgHAAQgPAAgKgLg");
	this.shape_39.setTransform(21.625,-1.55);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgxB1QgWgJgOgOQgNgQAAgSIAAgCIAQAAIAAACQAAAKAHAJQAGAJALAIQAMAGAPAEQAPAEAQgBQARABAPgEQAPgEAMgGQAMgIAGgJQAGgJAAgKQAAgOgLgMQgLgMgTgGQgSgIgYAAQgTAAgSgFQgSgEgOgKQgOgJgIgNQgHgNAAgNQAAgSANgPQAOgPAWgJQAWgIAbgBQAcABAWAIQAXAJANAPQANAPAAASIAAACIgQAAIAAgCQAAgLgGgJQgGgIgMgHQgMgHgPgEQgPgDgRgBQgQABgPADQgPAEgMAHQgLAHgGAIQgHAJAAALQABAPAKALQALAMATAGQATAIAWgBQAUABASAFQASAEAOAKQAOAKAIAMQAHAMAAAOQAAASgNAQQgNAOgXAJQgWAJgcAAQgbAAgWgJg");
	this.shape_40.setTransform(-29.925,-1.65);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("ABtB+IAAhAQgHANgLAMQgKALgNAIQgQAKgRAFQgRAFgSAAQgiAAgdgRQgcgRgRgdQgRgcAAgjQAAgiARgdQARgcAcgRQAdgRAiAAQAUAAASAGQASAFAQAMQAQAKALAQQAMAOAGASIABACIgCABIgLAEIgCABIAAgCQgHgPgJgNQgLgNgOgKQgNgKgQgEQgQgGgRAAQgeABgYAPQgZAOgOAZQgPAYgBAeQABAeAPAZQAOAZAZAPQAYAOAeAAQAcAAAXgMQAXgMAPgWQAPgVAEgbIhfAAIAAgQIBxAAIAAB/g");
	this.shape_41.setTransform(-140.15,-1.65);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#0954D2").s().p("A54AMQgvAAgBgXQABAWAvAAMAzxAAAQAvAAABgWQgBAXgvAAg");
	this.shape_42.setTransform(0,30.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgZAwAAMAzxAAAQAwAAAAAZIAAJEQgBAYgvAAg");
	this.shape_43.setTransform(0,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16,p:{y:-7.875}},{t:this.shape_15,p:{y:-7.875}},{t:this.shape_14,p:{y:-7.875}},{t:this.shape_13},{t:this.shape_12,p:{y:-7.875}},{t:this.shape_11,p:{y:-7.875}},{t:this.shape_10},{t:this.shape_9,p:{y:-7.875}},{t:this.shape_8},{t:this.shape_7,p:{y:-7.875}},{t:this.shape_6,p:{y:-7.875}},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_16,p:{y:-3.875}},{t:this.shape_15,p:{y:-3.875}},{t:this.shape_14,p:{y:-3.875}},{t:this.shape_28},{t:this.shape_12,p:{y:-3.875}},{t:this.shape_11,p:{y:-3.875}},{t:this.shape_27},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_26},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_16,p:{y:2.125}},{t:this.shape_15,p:{y:2.125}},{t:this.shape_14,p:{y:2.125}},{t:this.shape_40},{t:this.shape_12,p:{y:2.125}},{t:this.shape_11,p:{y:2.125}},{t:this.shape_39},{t:this.shape_9,p:{y:2.125}},{t:this.shape_38},{t:this.shape_7,p:{y:2.125}},{t:this.shape_6,p:{y:2.125}},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73);


(lib.menuListDasar = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhsIAAgQIAPAAIAAAQg");
	this.shape.setTransform(124.175,-11.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgiBSQgQgHgJgKQgJgLgBgNIAAgCIAQAAIAAACQABAOAOAIQAPAJAXAAQAYAAAOgJQAPgIAAgOQAAgJgHgIQgHgHgMgFQgMgEgPAAQgSAAgQgHQgQgFgJgMQgJgLgBgNQABgNAJgLQAJgLAQgGQAQgGASAAQATAAAQAGQAQAGAJALQAKALAAANIAAACIgQAAIAAgCQAAgOgPgIQgPgJgYAAQgXAAgOAJQgPAIAAAOQAAAJAHAIQAHAHAMAEQAMAFAOAAQATAAAQAGQAQAGAJALQAKAMAAANQAAANgKALQgJAKgQAHQgQAGgTAAQgSAAgQgGg");
	this.shape_1.setTransform(112.775,-7.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("ABIBYIAAglQgNASgTAJQgSAKgWAAQgYAAgUgMQgTgMgNgUQgLgTAAgZQAAgYALgUQANgUATgLQAUgMAYAAQAYAAAVAMQATALAMAUQAMAUAAAYIAABYgAgjg9QgRAJgJARQgJAQgBATQABAUAJAQQAJAQARAKQAQAKATAAQAUAAAQgKQAQgKAKgQQAKgQAAgUQAAgTgKgQQgKgRgQgJQgQgKgUAAQgTAAgQAKg");
	this.shape_2.setTransform(93.7,-7.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAzB9IgBgBIgyhJIgzBJIgBABIgSAAIAAj5IARAAIAADeIAsg/IAHgKIA0hLIABgBIAUAAIgCAEIg8BTIA8BWIACADg");
	this.shape_3.setTransform(77.425,-11.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_4.setTransform(65.925,-11.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgZB9IAAifIgMAAIAAgRIAMAAIAAglQABgPAKgLQAKgKAPAAQAHAAAHADQAGADAFAEIACACIgCACIgKAKIgBgCIgHgEQgDgBgEgBQgJABgEAFQgGAGAAAIIAAAlIALAAIAAARIgLAAIAACfg");
	this.shape_5.setTransform(59.475,-11.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhsIAAgQIAPAAIAAAQg");
	this.shape_6.setTransform(52.175,-11.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgiBSQgQgHgJgKQgJgLgBgNIAAgCIAQAAIAAACQABAOAOAIQAPAJAXAAQAYAAAOgJQAPgIAAgOQAAgJgHgIQgHgHgMgFQgMgEgPAAQgSAAgQgHQgQgFgJgMQgJgLgBgNQABgNAJgLQAJgLAQgGQAQgGASAAQATAAAQAGQAQAGAJALQAKALAAANIAAACIgQAAIAAgCQAAgOgPgIQgPgJgYAAQgXAAgOAJQgPAIAAAOQAAAJAHAIQAHAHAMAEQAMAFAOAAQATAAAQAGQAQAGAJALQAKAMAAANQAAANgKALQgJAKgQAHQgQAGgTAAQgSAAgQgGg");
	this.shape_7.setTransform(40.775,-7.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("ABIBYIAAglQgNASgTAJQgSAKgWAAQgYAAgUgMQgTgMgNgUQgLgTAAgZQAAgYALgUQANgUATgLQAUgMAYAAQAYAAAVAMQATALAMAUQAMAUAAAYIAABYgAgjg9QgRAJgJARQgJAQgBATQABAUAJAQQAJAQARAKQAQAKATAAQAUAAAQgKQAQgKAKgQQAKgQAAgUQAAgTgKgQQgKgRgQgJQgQgKgUAAQgTAAgQAKg");
	this.shape_8.setTransform(21.7,-7.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgUBzQgKgLgBgPIAAjVIARAAIAADVQAAAIAGAGQAFAFAIAAIAHgBQAEgCACgCIACgCIABACIAJAJIACABIgCACQgFAEgHADQgGADgHAAQgPAAgKgKg");
	this.shape_9.setTransform(9.325,-11.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhQhvIhQBvIgBABIAAAAIgPAAIAAj7IAQAAIAADeIBHhhIAIgLIBRhxIABgBIAUAAIgDADIhYB6IBYB7IADADg");
	this.shape_10.setTransform(-6.5,-11.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgsBYIAAivIAQAAIAAAlIAKgMQAMgMAPgHQAQgGASAAIACAAIAAAQIgCAAQgOAAgNAGQgOAFgJAKQgKALgFANQgGAMAAAOIAABYg");
	this.shape_11.setTransform(-36.525,-7.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABIBYIAAglQgNASgTAJQgSAKgWAAQgYAAgUgMQgTgMgNgUQgLgTAAgZQAAgYALgUQANgUATgLQAUgMAYAAQAYAAAVAMQATALAMAUQAMAUAAAYIAABYgAgjg9QgRAJgJARQgJAQgBATQABAUAJAQQAJAQARAKQAQAKATAAQAUAAAQgKQAQgKAKgQQAKgQAAgUQAAgTgKgQQgKgRgQgJQgQgKgUAAQgTAAgQAKg");
	this.shape_12.setTransform(-53.45,-7.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgiBSQgQgHgJgKQgJgLgBgNIAAgCIAQAAIAAACQABAOAOAIQAPAJAXAAQAYAAAOgJQAPgIAAgOQAAgJgHgIQgHgHgMgFQgMgEgPAAQgSAAgQgHQgQgFgJgMQgJgLgBgNQABgNAJgLQAJgLAQgGQAQgGASAAQATAAAQAGQAQAGAJALQAKALAAANIAAACIgQAAIAAgCQAAgOgPgIQgPgJgYAAQgXAAgOAJQgPAIAAAOQAAAJAHAIQAHAHAMAEQAMAFAOAAQATAAAQAGQAQAGAJALQAKAMAAANQAAANgKALQgJAKgQAHQgQAGgTAAQgSAAgQgGg");
	this.shape_13.setTransform(-72.175,-7.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("ABIBYIAAglQgNASgTAJQgSAKgWAAQgYAAgUgMQgTgMgNgUQgLgTAAgZQAAgYALgUQANgUATgLQAUgMAYAAQAYAAAVAMQATALAMAUQAMAUAAAYIAABYgAgjg9QgRAJgJARQgJAQgBATQABAUAJAQQAJAQARAKQAQAKATAAQAUAAAQgKQAQgKAKgQQAKgQAAgUQAAgTgKgQQgKgRgQgJQgQgKgUAAQgTAAgQAKg");
	this.shape_14.setTransform(-91.25,-7.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhtB+IAAj7IBeAAQAiABAdAQQAcARARAcQAQAdABAiQgBAjgQAcQgRAdgcARQgdARgiAAgAhcBtIBNAAQAdAAAZgOQAZgPAOgZQAPgYABgfQgBgegPgYQgOgZgZgOQgZgPgdAAIhNAAg");
	this.shape_15.setTransform(-114.05,-11.65);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#0954D2").s().p("A54A+QgwAAAAgYIAAhjQABAXAvAAMAzxAAAQAvAAABgXIAABjQAAAYgwAAg");
	this.shape_16.setTransform(0,25.2625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#0984E3").s().p("A54E7QgvAAgBgYIAApEQAAgYAwAAMAzxAAAQAwAAAAAYIAAJEQgBAYgvAAg");
	this.shape_17.setTransform(0,-10.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhrIAAgRIAPAAIAAARg");
	this.shape_18.setTransform(124.175,-8.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAzB9IgBgBIgyhJIgzBJIgBABIgSAAIAAj5IARAAIAADfIAsg/IAHgLIA0hLIABgBIAUAAIgCADIg8BVIA8BUIACAEg");
	this.shape_19.setTransform(77.425,-8.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhrIAAgRIAPAAIAAARg");
	this.shape_20.setTransform(65.925,-8.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgZB9IAAifIgMAAIAAgRIAMAAIAAglQABgPAKgLQAKgKAPAAQAHAAAHACQAGAEAFAEIACACIgCABIgKAKIgBgBIgHgEQgDgBgEAAQgJgBgEAGQgGAGAAAIIAAAlIALAAIAAARIgLAAIAACfg");
	this.shape_21.setTransform(59.475,-8.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHB9IAAiwIAPAAIAACwgAgHhrIAAgRIAPAAIAAARg");
	this.shape_22.setTransform(52.175,-8.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgUByQgKgKgBgPIAAjVIARAAIAADVQAAAIAGAFQAFAHAIAAIAHgCQAEgCACgDIACgBIABABIAJAJIACACIgCABQgFAGgHACQgGADgHAAQgPgBgKgKg");
	this.shape_23.setTransform(9.325,-8.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("ABPB+IgBgBIhQhvIhQBvIgBABIAAAAIgPAAIAAj7IAQAAIAADdIBHhhIAIgKIBRhxIABgBIAUAAIgDADIhYB6IBYB6IADAEg");
	this.shape_24.setTransform(-6.5,-8.45);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AhtB+IAAj7IBeAAQAiABAdAQQAcARARAdQAQAcABAiQgBAjgQAdQgRAcgcARQgdAQgiABgAhcBuIBNAAQAdgBAZgPQAZgOAOgZQAPgZABgeQgBgdgPgZQgOgZgZgPQgZgOgdgBIhNAAg");
	this.shape_25.setTransform(-114.05,-8.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#0954D2").s().p("A54AuQgwAAAAgYIAAhDQABAXAvAAMAzxAAAQAvAAABgXIAABDQAAAYgwAAg");
	this.shape_26.setTransform(0,26.875);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#0984E3").s().p("A54E6QgvAAgBgWIAApGQAAgYAwAAMAzxAAAQAwAAAAAYIAAJGQgBAWgvAAg");
	this.shape_27.setTransform(0,-6.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgUByQgKgKgBgPIAAjVIARAAIAADVQAAAIAGAFQAFAHAIAAIAHgCQAEgCACgDIACAAIABAAIAJAJIACACIgCABQgFAGgHACQgGADgHAAQgPgBgKgKg");
	this.shape_28.setTransform(9.325,-1.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14,p:{y:-7.875}},{t:this.shape_13,p:{y:-7.875}},{t:this.shape_12,p:{y:-7.875}},{t:this.shape_11,p:{y:-7.875}},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8,p:{y:-7.875}},{t:this.shape_7,p:{y:-7.875}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{y:-7.875}},{t:this.shape_1,p:{y:-7.875}},{t:this.shape}]}).to({state:[{t:this.shape_27,p:{y:-6.85}},{t:this.shape_26},{t:this.shape_25,p:{y:-8.45}},{t:this.shape_14,p:{y:-4.675}},{t:this.shape_13,p:{y:-4.675}},{t:this.shape_12,p:{y:-4.675}},{t:this.shape_11,p:{y:-4.675}},{t:this.shape_24,p:{y:-8.45}},{t:this.shape_23},{t:this.shape_8,p:{y:-4.675}},{t:this.shape_7,p:{y:-4.675}},{t:this.shape_22,p:{y:-8.35}},{t:this.shape_21,p:{y:-8.35}},{t:this.shape_20,p:{y:-8.35}},{t:this.shape_19,p:{y:-8.35}},{t:this.shape_2,p:{y:-4.675}},{t:this.shape_1,p:{y:-4.675}},{t:this.shape_18,p:{y:-8.35}}]},1).to({state:[{t:this.shape_27,p:{y:0.35}},{t:this.shape_25,p:{y:-1.25}},{t:this.shape_14,p:{y:2.525}},{t:this.shape_13,p:{y:2.525}},{t:this.shape_12,p:{y:2.525}},{t:this.shape_11,p:{y:2.525}},{t:this.shape_24,p:{y:-1.25}},{t:this.shape_28},{t:this.shape_8,p:{y:2.525}},{t:this.shape_7,p:{y:2.525}},{t:this.shape_22,p:{y:-1.15}},{t:this.shape_21,p:{y:-1.15}},{t:this.shape_20,p:{y:-1.15}},{t:this.shape_19,p:{y:-1.15}},{t:this.shape_2,p:{y:2.525}},{t:this.shape_1,p:{y:2.525}},{t:this.shape_18,p:{y:-1.15}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-170.5,-41.5,341,73.3);


(lib.btnMenuBack = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#ED4F44").s().p("AgfAzQgGgEAAgHIAAhQQAAgGAGgEQAHgDAFAEIAzAoQAGAEAAAFQAAAHgGAEIgzAmQgDADgDAAIgGgBg");
	this.shape.setTransform(-38.9406,-3.5115,0.7127,0.7887,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2305,-3.5312,0.7127,0.7887,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8,p:{y:-3.825}},{t:this.shape_7,p:{y:-1.575}},{t:this.shape_6,p:{y:-1.575}},{t:this.shape_5},{t:this.shape_4,p:{y:-1.575}},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{y:-3.5312}},{t:this.shape,p:{y:-3.5115}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_15},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_8,p:{y:-1.825}},{t:this.shape_7,p:{y:0.425}},{t:this.shape_6,p:{y:0.425}},{t:this.shape_14},{t:this.shape_4,p:{y:0.425}},{t:this.shape_13},{t:this.shape_12,p:{y:-1.75}},{t:this.shape_1,p:{y:-1.7812}},{t:this.shape,p:{y:-1.7615}}]},1).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_8,p:{y:1.675}},{t:this.shape_7,p:{y:3.925}},{t:this.shape_6,p:{y:3.925}},{t:this.shape_17},{t:this.shape_4,p:{y:3.925}},{t:this.shape_16},{t:this.shape_12,p:{y:1.75}},{t:this.shape_1,p:{y:1.6188}},{t:this.shape,p:{y:1.6385}}]},1).wait(2));

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

	// base
	this.menuListGame = new lib.menuListGame();
	this.menuListGame.name = "menuListGame";
	this.menuListGame.setTransform(504.7,434.9);
	new cjs.ButtonHelper(this.menuListGame, 0, 1, 2);

	this.menuListDasar = new lib.menuListDasar();
	this.menuListDasar.name = "menuListDasar";
	this.menuListDasar.setTransform(682.45,330.8);
	new cjs.ButtonHelper(this.menuListDasar, 0, 1, 2);

	this.menuListTujuan = new lib.menuListTujuan();
	this.menuListTujuan.name = "menuListTujuan";
	this.menuListTujuan.setTransform(682.45,216.45);
	new cjs.ButtonHelper(this.menuListTujuan, 0, 1, 2);

	this.menuListKD = new lib.menuListKD();
	this.menuListKD.name = "menuListKD";
	this.menuListKD.setTransform(294.35,330.8);
	new cjs.ButtonHelper(this.menuListKD, 0, 1, 2);

	this.menuListKI = new lib.menuListKI();
	this.menuListKI.name = "menuListKI";
	this.menuListKI.setTransform(294.35,216.45);
	new cjs.ButtonHelper(this.menuListKI, 0, 1, 2);

	this.btnMenuBack = new lib.btnMenuBack();
	this.btnMenuBack.name = "btnMenuBack";
	this.btnMenuBack.setTransform(886.15,504.85);
	new cjs.ButtonHelper(this.btnMenuBack, 0, 1, 2, false, new lib.btnMenuBack(), 3);

	this.instance = new lib.awan4();
	this.instance.setTransform(980.35,163.05);

	this.instance_1 = new lib.awan3();
	this.instance_1.setTransform(490.95,51.05,1,1,0,0,0,70.4,31);

	this.instance_2 = new lib.Bitmap3();
	this.instance_2.setTransform(-4,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance},{t:this.btnMenuBack},{t:this.menuListKI},{t:this.menuListKD},{t:this.menuListTujuan},{t:this.menuListDasar},{t:this.menuListGame}]}).wait(1));

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
		{src:"images/Bitmap3.png", id:"Bitmap3"}
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