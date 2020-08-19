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



(lib._16 = function() {
	this.initialize(img._16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,292);


(lib._28 = function() {
	this.initialize(img._28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,259,194);


(lib._32 = function() {
	this.initialize(img._32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,489);


(lib._36 = function() {
	this.initialize(img._36);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,690,518);


(lib.Bitmap122 = function() {
	this.initialize(img.Bitmap122);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,261,174);


(lib.bookpngcopy = function() {
	this.initialize(img.bookpngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,288,399);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,249,87);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);// helper functions:

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


(lib.Tween8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#603AD8").s().p("EhB5AkqMAAAhJSMCDzAAAMAAABJSg");

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


(lib.Tween6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(23.875,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(18.125,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(14.275,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_3.setTransform(6.9,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_4.setTransform(0.525,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgGgEgCQgEgEgJgCQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgFAAgFADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_5.setTransform(-6.85,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_6.setTransform(-14.075,1.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_7.setTransform(-22.725,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,58.9,20.8);


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(23.875,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(18.125,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(14.275,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_3.setTransform(6.9,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_4.setTransform(0.525,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgGgEgCQgEgEgJgCQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgFAAgFADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_5.setTransform(-6.85,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_6.setTransform(-14.075,1.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_7.setTransform(-22.725,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,58.9,20.8);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgcASIAsgSIgsgRIAAgNIA5AaIAAAJIg5Aag");
	this.shape.setTransform(23.875,0.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_1.setTransform(18.125,0.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQAFIAAgJIAhAAIAAAJg");
	this.shape_2.setTransform(14.275,0.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgRAmIAAhJIANAAIAAAIQAFgKALAAIAGABIAAAMIgHAAQgLAAgEAKIAAA0g");
	this.shape_3.setTransform(6.9,1.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_4.setTransform(0.525,1.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAjQgHgDgDgFQgFgGAAgHIANAAQABAGAEAFQAFADAHAAQAHAAAFgDQADgDAAgEQABgGgEgCQgEgEgJgCQgJgCgGgCQgGgCgCgEQgDgEAAgGQAAgJAHgGQAJgHAKABQANgBAIAHQAIAGAAALIgNAAQAAgGgEgDQgFgEgHAAQgFAAgFADQgDADAAAFQAAAFADACIANAEQAJADAFACQAHACACAFQAEADAAAHQgBAJgHAGQgJAHgMgBQgIAAgHgDg");
	this.shape_5.setTransform(-6.85,1.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVAcQgJgKAAgQIAAgCQAAgKAEgJQAEgJAIgFQAHgEAIAAQAOgBAIAKQAIAJAAATIAAADIgxAAQABAMAGAGQAGAHAIAAQAHAAAFgCQAEgEAEgEIAHAGQgJAOgSAAQgPABgJgLgAgLgWQgFAGgBAKIAkAAIAAgBQgBgJgEgGQgFgFgIAAQgHAAgFAFg");
	this.shape_6.setTransform(-14.075,1.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgSAtQgJgFgFgLQgFgKAAgOIAAgIQAAgWAKgNQALgMASAAQAPAAAKAIQAJAIACAOIgNAAQgEgTgTAAQgNAAgGAJQgHAJAAASIAAAHQAAARAHAJQAIAKAMAAQAIAAAFgBQAGgCADgEIAAgWIgXAAIAAgLIAkAAIAAAlQgFAHgJAEQgJADgMAAQgLAAgKgGg");
	this.shape_7.setTransform(-22.725,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,58.9,20.8);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape.setTransform(94.0233,1.0292);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgEACAAAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgHAAQgKAAgEADg");
	this.shape_1.setTransform(87.7,1.0265);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_2.setTransform(83.4,-0.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_3.setTransform(78.7433,1.0281);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUA3IABgJIAFABQAIAAABgJIALhGIALAAIgMBGQgBAJgEAEQgFAFgIAAIgHgBgAAKgsQAAgBgBAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_4.setTransform(73.425,1.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_5.setTransform(70.975,0.9737);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_6.setTransform(65.6933,1.0281);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_7.setTransform(58.8125,2.1986);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_8.setTransform(50.5591,0.9736);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_9.setTransform(42.6433,1.0281);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_10.setTransform(34.1091,0.9736);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_11.setTransform(23.525,-0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_12.setTransform(17.265,1.0765);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAjQgDgEAAgIIAHgmIgLAAIABgJIALAAIADgPIAKAAIgDAPIALAAIgBAJIgMAAIgFAmIAAADQAAAFAEAAIAFgBIgBAJIgHABQgGAAgDgFg");
	this.shape_13.setTransform(12.125,0.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAKAgIAHgoIAAgGQgBgIgJAAQgIAAgHAKIgIAsIgLAAIALg+IAKAAIgBAIQAHgKALABQAJAAAEAGQAFAGgCALIgGAog");
	this.shape_14.setTransform(6.4688,0.9738);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_15.setTransform(0.415,1.0765);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_16.setTransform(-7.725,0.9737);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_17.setTransform(-13.35,1.0265);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAAAtQgKAAgGgIIgCAHIgKAAIAPhZIALAAIgGAiQAHgJAKABQAJAAAGAGQAFAHAAAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgJAAIgGAaQAEAKAKAAQAFABAFgEQAFgEACgHQACgHAAgIQAAgIgCgEQgEgFgGAAQgJAAgGAKg");
	this.shape_18.setTransform(-19.85,-0.2472);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_19.setTransform(-28.3409,0.9736);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgDACgBAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgIAAQgIAAgFADg");
	this.shape_20.setTransform(-36.6,1.0265);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIAtQgHAAgGgDQgGgDgDgFIAGgHQAGAJAJAAQAIAAAEgEQAFgFACgIIABgGQgIAIgJAAQgGAAgEgDQgFgDgCgGQgCgGgBgGIABgIQABgKAEgIQAEgIAGgDQAGgEAHAAQALAAAFAIIACgHIAKAAIgKA9QgCANgIAHQgIAHgKAAIgBAAgAgIgcQgGAIgBAMIAAADQAAAHADAFQADAEAGABQAJAAAGgKIAFgcQgDgIgJgBQgIAAgFAHg");
	this.shape_21.setTransform(-43.075,2.2238);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIAAgFQABgFgDgEQgDgDgFAAQgFAAgEADQgDACgBAFIgMAAQABgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQgBAEABADIAAABIgKAAIgBgEIABgDQgJAIgIAAIgBAAgAgIAEQgGADAAAGQgBAFACADQADACAFABQAFAAADgDQAFgCAEgFIABgNIgIAAQgJAAgEADg");
	this.shape_22.setTransform(-52.55,1.0265);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_23.setTransform(-58.575,-0.2486);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_24.setTransform(-65.55,1.0265);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_25.setTransform(-72.2875,2.1986);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_26.setTransform(-80.875,-0.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_27.setTransform(-85.375,-0.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_28.setTransform(-88.25,-0.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AANArIgVgoIgNALIgFAdIgLAAIAPhVIALAAIgIAqIArgqIAOAAIgnAnIAaAug");
	this.shape_29.setTransform(-93.05,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,18.4);


(lib.Tween2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape.setTransform(94.0233,1.0292);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgEACAAAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgHAAQgKAAgEADg");
	this.shape_1.setTransform(87.7,1.0265);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_2.setTransform(83.4,-0.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_3.setTransform(78.7433,1.0281);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUA3IABgJIAFABQAIAAABgJIALhGIALAAIgMBGQgBAJgEAEQgFAFgIAAIgHgBgAAKgsQAAgBgBAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_4.setTransform(73.425,1.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_5.setTransform(70.975,0.9737);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_6.setTransform(65.6933,1.0281);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_7.setTransform(58.8125,2.1986);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_8.setTransform(50.5591,0.9736);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_9.setTransform(42.6433,1.0281);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_10.setTransform(34.1091,0.9736);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_11.setTransform(23.525,-0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_12.setTransform(17.265,1.0765);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAjQgDgEAAgIIAHgmIgLAAIABgJIALAAIADgPIAKAAIgDAPIALAAIgBAJIgMAAIgFAmIAAADQAAAFAEAAIAFgBIgBAJIgHABQgGAAgDgFg");
	this.shape_13.setTransform(12.125,0.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAKAgIAHgoIAAgGQgBgIgJAAQgIAAgHAKIgIAsIgLAAIALg+IAKAAIgBAIQAHgKALABQAJAAAEAGQAFAGgCALIgGAog");
	this.shape_14.setTransform(6.4688,0.9738);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_15.setTransform(0.415,1.0765);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_16.setTransform(-7.725,0.9737);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_17.setTransform(-13.35,1.0265);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAAAtQgKAAgGgIIgCAHIgKAAIAPhZIALAAIgGAiQAHgJAKABQAJAAAGAGQAFAHAAAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgJAAIgGAaQAEAKAKAAQAFABAFgEQAFgEACgHQACgHAAgIQAAgIgCgEQgEgFgGAAQgJAAgGAKg");
	this.shape_18.setTransform(-19.85,-0.2472);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_19.setTransform(-28.3409,0.9736);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgDACgBAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgIAAQgIAAgFADg");
	this.shape_20.setTransform(-36.6,1.0265);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIAtQgHAAgGgDQgGgDgDgFIAGgHQAGAJAJAAQAIAAAEgEQAFgFACgIIABgGQgIAIgJAAQgGAAgEgDQgFgDgCgGQgCgGgBgGIABgIQABgKAEgIQAEgIAGgDQAGgEAHAAQALAAAFAIIACgHIAKAAIgKA9QgCANgIAHQgIAHgKAAIgBAAgAgIgcQgGAIgBAMIAAADQAAAHADAFQADAEAGABQAJAAAGgKIAFgcQgDgIgJgBQgIAAgFAHg");
	this.shape_21.setTransform(-43.075,2.2238);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIAAgFQABgFgDgEQgDgDgFAAQgFAAgEADQgDACgBAFIgMAAQABgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQgBAEABADIAAABIgKAAIgBgEIABgDQgJAIgIAAIgBAAgAgIAEQgGADAAAGQgBAFACADQADACAFABQAFAAADgDQAFgCAEgFIABgNIgIAAQgJAAgEADg");
	this.shape_22.setTransform(-52.55,1.0265);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_23.setTransform(-58.575,-0.2486);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_24.setTransform(-65.55,1.0265);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_25.setTransform(-72.2875,2.1986);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_26.setTransform(-80.875,-0.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_27.setTransform(-85.375,-0.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_28.setTransform(-88.25,-0.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AANArIgVgoIgNALIgFAdIgLAAIAPhVIALAAIgIAqIArgqIAOAAIgnAnIAaAug");
	this.shape_29.setTransform(-93.05,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,18.4);


(lib.Tween1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCAhQgKAAgHgGQgHgGABgJIAKAAQAAAGAEADQADADAGAAQAFAAAEgCQAEgDABgEQABgHgIgDIgKgDQgOgEAAgLQABgIAHgGQAHgFAJAAQAJAAAGAGQAGAFAAAJIgKAAQAAgFgDgDQgDgDgGAAQgEAAgEADQgEACAAAFQgBAFAHADIAFABQALADAEAEQAFAEgBAHQAAAGgDAEQgEAEgGADQgFACgEAAIgCAAg");
	this.shape.setTransform(94.0233,1.0292);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgEACAAAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgHAAQgKAAgEADg");
	this.shape_1.setTransform(87.7,1.0265);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_2.setTransform(83.4,-0.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_3.setTransform(78.7433,1.0281);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgUA3IABgJIAFABQAIAAABgJIALhGIALAAIgMBGQgBAJgEAEQgFAFgIAAIgHgBgAAKgsQAAgBgBAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQABgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAAAABQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAg");
	this.shape_4.setTransform(73.425,1.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_5.setTransform(70.975,0.9737);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_6.setTransform(65.6933,1.0281);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_7.setTransform(58.8125,2.1986);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_8.setTransform(50.5591,0.9736);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgBAhQgMAAgHgJQgGgIABgOIAAgCQABgIAFgIQAEgIAHgEQAHgEAGAAQAKAAAGAHQAFAGABALIgBAHIAAAEIgpAAQgBAJAEAGQAEAGAIAAQAIAAAIgIIAGAFQgEAGgGADQgGADgGAAIgBAAgAgGgTQgFAFgCAJIAdAAIABgBQABgHgEgFQgDgFgGAAIgCAAQgEAAgFAEg");
	this.shape_9.setTransform(42.6433,1.0281);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_10.setTransform(34.1091,0.9736);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_11.setTransform(23.525,-0.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_12.setTransform(17.265,1.0765);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAjQgDgEAAgIIAHgmIgLAAIABgJIALAAIADgPIAKAAIgDAPIALAAIgBAJIgMAAIgFAmIAAADQAAAFAEAAIAFgBIgBAJIgHABQgGAAgDgFg");
	this.shape_13.setTransform(12.125,0.325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AAKAgIAHgoIAAgGQgBgIgJAAQgIAAgHAKIgIAsIgLAAIALg+IAKAAIgBAIQAHgKALABQAJAAAEAGQAFAGgCALIgGAog");
	this.shape_14.setTransform(6.4688,0.9738);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgKAgQgJAAgFgGQgEgGABgLIAHgoIALAAIgHAoIAAAFQAAAEACADQACACAEAAQALABAGgKIAIgtIALAAIgMA+IgKAAIACgGQgHAHgKAAIgBAAg");
	this.shape_15.setTransform(0.415,1.0765);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgTAgIALg+IAJAAIgBAHQAGgJAJABIAFAAIgBALIgFgBQgKAAgFAJIgIAsg");
	this.shape_16.setTransform(-7.725,0.9737);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_17.setTransform(-13.35,1.0265);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAAAtQgKAAgGgIIgCAHIgKAAIAPhZIALAAIgGAiQAHgJAKABQAJAAAGAGQAFAHAAAKIgBAIIAAABQgBAKgEAHQgEAIgGAEQgFAEgGAAIgCgBgAgJAAIgGAaQAEAKAKAAQAFABAFgEQAFgEACgHQACgHAAgIQAAgIgCgEQgEgFgGAAQgJAAgGAKg");
	this.shape_18.setTransform(-19.85,-0.2472);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAdAgIAHgpIAAgFQgBgIgKAAQgGAAgEADQgFAEgBAGIgIApIgJAAIAHgoQABgHgDgDQgDgEgGAAQgJAAgGAJIgIAtIgLAAIALg+IAKAAIgBAHQAIgJALABQAGAAADACQAEADACAFQAJgLAMABQAJAAAFAGQAEAGgBALIgHAog");
	this.shape_19.setTransform(-28.3409,0.9736);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIABgFQABgFgEgEQgDgDgFAAQgFAAgEADQgDACgBAFIgLAAQAAgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQAAAEAAADIAAABIgLAAIAAgEIAAgDQgIAIgIAAIgBAAgAgIAEQgGADgBAGQAAAFACADQADACAFABQAFAAADgDQAFgCADgFIACgNIgIAAQgIAAgFADg");
	this.shape_20.setTransform(-36.6,1.0265);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgIAtQgHAAgGgDQgGgDgDgFIAGgHQAGAJAJAAQAIAAAEgEQAFgFACgIIABgGQgIAIgJAAQgGAAgEgDQgFgDgCgGQgCgGgBgGIABgIQABgKAEgIQAEgIAGgDQAGgEAHAAQALAAAFAIIACgHIAKAAIgKA9QgCANgIAHQgIAHgKAAIgBAAgAgIgcQgGAIgBAMIAAADQAAAHADAFQADAEAGABQAJAAAGgKIAFgcQgDgIgJgBQgIAAgFAHg");
	this.shape_21.setTransform(-43.075,2.2238);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgHAhQgIAAgGgFQgFgGABgHQAAgKAJgFQAHgGANAAIALAAIAAgFQABgFgDgEQgDgDgFAAQgFAAgEADQgDACgBAFIgMAAQABgGAEgEQAEgEAGgDQAFgCAGAAQAKAAAFAGQAGAGAAAJIgGAfIAAAEQgBAEABADIAAABIgKAAIgBgEIABgDQgJAIgIAAIgBAAgAgIAEQgGADAAAGQgBAFACADQADACAFABQAFAAADgDQAFgCAEgFIABgNIgIAAQgJAAgEADg");
	this.shape_22.setTransform(-52.55,1.0265);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgLAtQgIAAgGgGQgFgHAAgLIAAgJQABgJAEgHQAFgIAGgEQAGgEAHABQAKAAAFAHIAHghIAKAAIgPBZIgKAAIABgHQgHAJgKAAIgBgBgAgKgGQgFAEgCAGQgDAHAAAHQAAAJADAEQADAFAHAAQAIABAHgKIAFgcQgEgJgJAAQgFAAgFAEg");
	this.shape_23.setTransform(-58.575,-0.2486);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgHAhQgJAAgEgFQgGgGAAgHQABgKAIgFQAJgGAMAAIALAAIABgFQAAgFgCgEQgEgDgFAAQgFAAgDADQgFACgBAFIgKAAQABgGADgEQAEgEAGgDQAFgCAGAAQAKAAAGAGQAFAGgBAJIgFAfIAAAEQgBAEACADIAAABIgMAAIAAgEIAAgDQgIAIgIAAIgBAAgAgJAEQgFADgBAGQAAAFADADQACACAFABQAFAAAEgDQAEgCADgFIADgNIgIAAQgKAAgFADg");
	this.shape_24.setTransform(-65.55,1.0265);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgeAtIAPhXIAKAAIgBAHQAGgJALABQAJAAAGAGQAFAHAAALIAAAIIgBABQgBAKgEAGQgEAIgGAEQgGAEgHgBQgKAAgGgHIgGAfgAgHgZIgGAdQAEAIAJABQAHAAAGgHQAFgGACgLIAAgFQAAgJgDgEQgDgFgGAAQgJAAgGAJg");
	this.shape_25.setTransform(-72.2875,2.1986);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAJAtIgPgdIgJAHIgDAWIgLAAIAQhZIAKAAIgJA1IAHgHIAVgUIAOAAIgdAaIAUAlg");
	this.shape_26.setTransform(-80.875,-0.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMArIALg+IAKAAIgKA+gAACgfQgBgBAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAABAAAAQABABAAABQAAAAAAABQAAAAgBABQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAAAg");
	this.shape_27.setTransform(-85.375,-0.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgMAtIAOhZIALAAIgOBZg");
	this.shape_28.setTransform(-88.25,-0.3);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AANArIgVgoIgNALIgFAdIgLAAIAPhVIALAAIgIAqIArgqIAOAAIgnAnIAaAug");
	this.shape_29.setTransform(-93.05,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,18.4);


(lib.target = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgDAeIAAg7IAHAAIAAA7g");
	this.shape.setTransform(2.575,36.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgDAdIAAgqIAHAAIAAAqgAgCgVIgBgDIABgDIACgBIADABIABADIgBADIgDABIgCgBg");
	this.shape_1.setTransform(0.625,36.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIAUQgDgCgCgDQgDgDAAgEIAHAAQAAAEAEACQACACADAAQAEAAADgCQABAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQAAgBAAgBQAAAAgBgBQAAAAgBAAQgCgDgFgBQgFgBgDgBQgDgBgCgDQgBgCAAgCQgBgGAFgDQAFgEAFAAQAIAAAEAEQAEADAAAGIgHAAQAAgDgDgCQgCgCgEAAQgDAAgCABQgBABAAABQAAAAAAABQgBAAAAABQAAAAAAABQAAABAAAAQAAABABAAQAAABAAAAQAAABABAAQACABAEACIAJACQADABACACQACADAAAEQAAAFgEADQgGAEgHAAQgDAAgFgCg");
	this.shape_2.setTransform(-2.45,37.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgEQAAgHAFgDQAFgEAIAAIAHAAIAAgDQAAgEgDgCQgCgCgEAAQgDAAgDABQgCACAAAEIgIAAQAAgEADgDQACgCAEgCQAEgCADAAQAHAAAFAEQAEAEAAAFIAAATQAAAGABADIAAABIgHAAIgBgEQgFAFgGAAQgGAAgEgEgAgJAJQAAACACACQACADAEAAQACAAADgDQADgBACgDIAAgJIgGAAQgMAAAAAJg");
	this.shape_3.setTransform(-6.675,37.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAOAdIAAgbIgbAAIAAAbIgIAAIAAg5IAIAAIAAAZIAbAAIAAgZIAIAAIAAA5g");
	this.shape_4.setTransform(-11.7,37);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(2,1,1).p("Aopn+IRTAAIAAP9IxTAAg");
	this.shape_5.setTransform(-5.5,37.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(89,89,89,0.247)").s().p("AopH/IAAv9IRTAAIAAP9g");
	this.shape_6.setTransform(-5.5,37.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.target, new cjs.Rectangle(-61.9,-15,112.8,104.2), null);


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


(lib.drop10G10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape.setTransform(184.23,92.1758);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_1.setTransform(173.1232,92.1769);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUBTQgQAAgKgMQgJgMgBgVIABgPQACgSAHgNQAIgOALgHQALgIAOABQASAAALAOIALg9IATAAIgcCkIgSAAIACgMQgNAPgTAAIgBgBgAgTgMQgIAHgFAMQgFANAAAOQAAAPAGAJQAGAIALABQAQAAANgRIAJg1QgGgQgRAAIgBAAQgKAAgJAHg");
	this.shape_2.setTransform(161.7417,89.8508);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgXBPIAUhzIATAAIgTBzgAADg6QgCgDAAgFQAAgGACgDQAEgDAFAAQAFgBADAEQAEADgBAFQABAFgEADQgDADgFABQgFAAgEgDg");
	this.shape_3.setTransform(152.75,90.0719);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_4.setTransform(143.6348,92.1751);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AASA7IANhLIAAgKQgBgPgQAAQgRgBgNATIgOBSIgUAAIAUhzIATAAIgDAPQAPgSAUABQAQAAAIALQAIALgCAUIgNBLg");
	this.shape_5.setTransform(131.145,92.0743);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgXBPIAVhzIASAAIgTBzgAADg6QgDgDAAgFQAAgGADgDQAEgDAFAAQAFgBADAEQAEADAAAFQAAAFgEADQgDADgFABQgFAAgEgDg");
	this.shape_6.setTransform(123.25,90.0719);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AASBTIANhNIAAgJQgBgPgQAAQgRgBgNATIgOBTIgUAAIAdikIATAAIgMA/QAPgRAUAAQAQAAAIALQAIAMgCASIgNBNg");
	this.shape_7.setTransform(113.995,89.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgFA8QgPAAgKgHQgKgIgFgNQgEgNABgQIABgFQACgQAIgOQAHgNANgHQAMgIAOABQATAAALAMQAKAMAAASIgSAAQAAgLgGgHQgGgHgLgBQgOAAgKALQgKAMgCAUIgBADIAAAOQABAMAGAIQAHAHALAAQAJABAIgHQAJgGACgKIATAAQgCALgHAJQgHAJgLAFQgKAEgJAAIgCAAg");
	this.shape_8.setTransform(103.0313,92.1757);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("Ag8BOIAbibIBeAAIgDARIhKAAIgJAyIBBAAIgDAQIhBAAIgJA3IBLAAIgDARg");
	this.shape_9.setTransform(91.775,90.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_10.setTransform(160.75,94.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,42.6,322.5,104.30000000000001);


(lib.drop10G9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape.setTransform(189.58,92.1758);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_1.setTransform(178.4732,92.1769);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUBTQgQAAgKgMQgJgMgBgVIABgPQACgSAHgNQAIgOALgHQALgIAOABQASAAALAOIALg9IATAAIgcCkIgSAAIACgMQgNAPgTAAIgBgBgAgTgMQgIAHgFAMQgFANAAAOQAAAPAGAJQAGAIALABQAQAAANgRIAJg1QgGgQgRAAIgBAAQgKAAgJAHg");
	this.shape_2.setTransform(167.0917,89.8508);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_3.setTransform(154.2848,92.1751);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgkA7IAUhzIASAAIgCANQALgQARABIAJABIgCATIgJgBQgTAAgKARIgOBRg");
	this.shape_4.setTransform(144.975,92.0742);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgTA7QgQgBgIgLQgIgMACgTIAMhKIATAAIgMBKIAAAJQAAAIAEAEQAEAFAIAAQAUABALgSIAPhTIATAAIgUBzIgTAAIADgMQgNAOgTAAIgCAAg");
	this.shape_5.setTransform(135.28,92.3009);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgWBPIAUhzIASAAIgTBzgAAEg6QgEgDAAgFQAAgGAEgDQADgDAFAAQAFgBADAEQADADABAFQgBAFgDADQgDADgFABQgFAAgDgDg");
	this.shape_6.setTransform(126.6,90.0719);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AASBTIANhNIAAgJQgBgPgQAAQgRgBgNATIgOBTIgUAAIAdikIATAAIgMA/QAPgRAUAAQAQAAAIALQAIAMgCASIgNBNg");
	this.shape_7.setTransform(117.345,89.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("Ag4BSIAcigIARAAIgCANQAOgQAUABQARAAAJAMQAKAMAAAVIgBANIAAADQgCARgHAOQgIAOgLAHQgLAHgNAAQgUgBgKgNIgKA4gAgOgvIgKA2QAHAQARAAQAOABAJgMQALgMADgVIABgJQAAgQgHgJQgFgIgMAAIAAgBQgQAAgMARg");
	this.shape_8.setTransform(105.05,94.2992);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgMBQQgOAAgLgHQgMgHgGgNQgGgNgBgRQAAgNADgSQAEgTAIgQQAKgPALgJQASgNAUABQAXAAANAQQANAPABAaQABAMgDAQQgDARgHAPQgHAPgLAKQgSARgYAAIgCAAgAgOg2QgLAIgHARQgIAQgCAYIAAAHQAAAVAIAMQAIAMAPAAQAUABANgQQANgPAFgbQACgNAAgKQABgVgIgMQgIgLgQgBIgCAAQgMAAgLAIg");
	this.shape_9.setTransform(92.6004,90.1747);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_10.setTransform(160.75,94.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,42.6,322.5,104.30000000000001);


(lib.drop10G8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AguBdQgRgQgDgcIAaAAQACASAKAKQAMAJAQAAQATAAALgNQAKgNAAgWQAAgWgMgNQgLgMgSAAQgSAAgKAIIgIAFIgVgFIALhqIBsAAIAAAZIhWAAIgGA6QAPgJAUAAQAdAAARATQARASAAAhQAAAhgRATQgTATgfAAQgcAAgSgPg");
	this.shape.setTransform(236.05,49.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_1.setTransform(156.325,56.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_2.setTransform(144.25,56.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AAaBSIAAhNQAAgLgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABAoIAABNg");
	this.shape_3.setTransform(132.275,53.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAaAWABQAVgBAIgQIAAhUIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_4.setTransform(120.075,56.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgVgBQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgWQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_5.setTransform(108.125,53.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AA9A7IAAhLQAAgNgFgGQgGgGgOAAQgKAAgIAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQANgPAVAAQAYAAAJATQAFgJAKgFQAJgFAMAAQAnAAAAAoIAABNg");
	this.shape_6.setTransform(92.05,56.175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAaAWABQAVgBAIgQIAAhUIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_7.setTransform(76.275,56.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgCBBQgIgIABgPIAAhHIgVAAIAAgPIAVAAIAAgcIASAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_8.setTransform(66.3,54.975);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_9.setTransform(194.425,23.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_10.setTransform(187.8,24.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_11.setTransform(181.4,25.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_12.setTransform(171.425,25.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgwBSIAAigIASAAIABAMQANgOAUAAQAVAAAMAPQAMAQAAAcIAAACQAAAZgMARQgMAQgVAAQgUAAgMgOIAAA5gAgcgwIAAA3QAJAQASAAQANAAAJgLQAJgMAAgVQAAgUgJgLQgJgMgNAAQgSAAgJAQg");
	this.shape_13.setTransform(159.55,28);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_14.setTransform(147.475,25.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_15.setTransform(135.825,25.875);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgHAGgBAHIgTAAQAAgIAGgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgBgJQgPAOgRAAQgSAAgKgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAIgFAEgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_16.setTransform(118.75,25.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgjBRIgHgCIAAgQIAGABQAKAAAFgEQAGgEAEgLIAEgMIgphyIAVAAIAcBWIAbhWIAWAAIgwCFQgJAdgYAAg");
	this.shape_17.setTransform(107.6,28.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_18.setTransform(96.325,25.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABApIAABMg");
	this.shape_19.setTransform(84.225,23.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_20.setTransform(72.025,26);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAyQAJASATAAQANAAAIgMQAIgKAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_21.setTransform(60.075,23.55);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_22.setTransform(47.525,26);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgJBOIAAiKIgyAAIAAgRIB3AAIAAARIgyAAIAACKg");
	this.shape_23.setTransform(34.925,23.875);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyYAAAIAAQRg");
	this.shape_24.setTransform(116.25,42.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45,-9.7,322.5,104.3);


(lib.drop10G7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAUBrIAAgyIhgAAIAAgQIBfiTIAcAAIAACNIAeAAIAAAWIgeAAIAAAygAARg/Ig+BiIBBAAIAAhng");
	this.shape.setTransform(236.475,50.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgYBNQgMgGgHgJIALgMQANAQATAAQANAAAIgIQAIgJAAgOIAAgKQgMANgTAAQgVAAgNgQQgMgQAAgcQAAgbAMgQQANgQAVAAQAUAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMANAAQATAAAJgSIAAg0QgJgQgTAAQgNAAgIALg");
	this.shape_1.setTransform(182.75,61.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_2.setTransform(170.725,59.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_3.setTransform(158.65,59.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_4.setTransform(148.75,58.475);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_5.setTransform(139.425,59.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_6.setTransform(130.675,57.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgdBEIgBAOIgSAAIAAikIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAbgMAPQgMARgVgBQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgWQAAgUgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_7.setTransform(122.075,57.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_8.setTransform(107.525,57.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgDBBQgGgIgBgPIAAhHIgVAAIAAgPIAVAAIAAgcIAUAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHADADQADAEAGAAIAJgCIAAAQQgHACgIAAQgNAAgGgIg");
	this.shape_9.setTransform(100.9,58.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_10.setTransform(94.5,59.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_11.setTransform(84.525,59.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AgwBRIAAifIASAAIABANQAMgPAVgBQAVABAMAPQAMAQAAAdIAAABQAAAagMAQQgMAQgVAAQgUAAgMgOIAAA4gAgcgvIAAA2QAJAQASAAQANAAAJgLQAIgLAAgWQAAgTgIgMQgJgMgNAAQgSABgJAQg");
	this.shape_12.setTransform(72.65,61.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_13.setTransform(60.575,59.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_14.setTransform(48.925,59.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_15.setTransform(211.325,26.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_16.setTransform(198.875,29.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQABAHADADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_17.setTransform(188.9,28.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_18.setTransform(179.575,29.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_19.setTransform(167.825,29.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_20.setTransform(155.975,27.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_21.setTransform(146.4,29.275);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_22.setTransform(136.425,29.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_23.setTransform(124.575,27.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgTAAQAAgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgVAAQgBgDgBgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAGAFAJAAQAIAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_24.setTransform(106.7,29.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgjBRIgHgCIAAgQIAFABQALAAAFgEQAGgEAEgLIAEgMIgphyIAVAAIAcBXIAbhXIAWAAIgwCFQgJAdgYAAg");
	this.shape_25.setTransform(95.55,31.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_26.setTransform(84.275,29.275);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABApIAABMg");
	this.shape_27.setTransform(72.175,26.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_28.setTransform(59.975,29.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_29.setTransform(48.025,27.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_30.setTransform(35.475,29.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2C3E50").s().p("AgJBOIAAiKIgyAAIAAgRIB3AAIAAARIgyAAIAACKg");
	this.shape_31.setTransform(22.875,27.375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyYAAAIAAQRg");
	this.shape_32.setTransform(116.25,42.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45,-9.7,322.5,104.3);


(lib.drop10G6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape.setTransform(214.98,92.1758);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_1.setTransform(203.8732,92.1769);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUBTQgQAAgKgMQgJgMgBgVIABgPQACgSAHgNQAIgOALgHQALgIAOABQASAAALAOIALg9IATAAIgcCkIgSAAIACgMQgNAPgTAAIgBgBgAgTgMQgIAHgFAMQgFANAAAOQAAAPAGAJQAGAIALABQAQAAANgRIAJg1QgGgQgRAAIgBAAQgKAAgJAHg");
	this.shape_2.setTransform(192.4917,89.8508);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgWBPIAThzIATAAIgTBzgAAEg6QgDgDgBgFQABgGADgDQADgDAFAAQAFgBADAEQADADAAAFQAAAFgDADQgDADgFABQgFAAgDgDg");
	this.shape_3.setTransform(183.5,90.0719);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_4.setTransform(174.3848,92.1751);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgkA7IAUhzIASAAIgCANQALgQARABIAJABIgCATIgJgBQgTAAgKARIgOBRg");
	this.shape_5.setTransform(165.075,92.0742);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgTA7QgQgBgIgLQgIgMACgTIAMhKIATAAIgMBKIAAAJQAAAIAEAEQAEAFAIAAQAUABALgSIAPhTIATAAIgUBzIgTAAIADgMQgNAOgTAAIgCAAg");
	this.shape_6.setTransform(155.38,92.3009);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AASBTIANhNIAAgJQgBgPgQAAQgRgBgNATIgOBTIgUAAIAdikIATAAIgMA/QAPgRAUAAQAQAAAIALQAIAMgCASIgNBNg");
	this.shape_7.setTransform(142.745,89.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgSBBQgGgJACgOIALhHIgUAAIADgPIAVAAIAEgcIASAAIgEAcIAVAAIgDAPIgVAAIgLBIIAAAFQABAIAHAAIAJgBIgBAQQgHACgGAAQgMAAgGgIg");
	this.shape_8.setTransform(134.1,90.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_9.setTransform(123.9348,92.1751);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgXBTIAbikIAUAAIgcCkg");
	this.shape_10.setTransform(115.5,89.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_11.setTransform(106.3348,92.1751);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAZBOIAMhIIhLAAIgNBIIgUAAIAbibIAUAAIgMBDIBMAAIAMhDIAUAAIgcCbg");
	this.shape_12.setTransform(92.85,90.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_13.setTransform(160.75,94.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,42.6,322.5,104.30000000000001);


(lib.drop10G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape.setTransform(189.18,93.9258);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_1.setTransform(178.0732,93.9269);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUBTQgQAAgKgMQgJgMgBgVIABgPQACgSAHgNQAIgOALgHQALgIAOABQASAAALAOIALg9IATAAIgcCkIgSAAIACgMQgNAPgTAAIgBgBgAgTgMQgIAHgFAMQgFANAAAOQAAAPAGAJQAGAIALABQAQAAANgRIAJg1QgGgQgRAAIgBAAQgKAAgJAHg");
	this.shape_2.setTransform(166.6917,91.6008);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_3.setTransform(153.8848,93.9251);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AASA7IANhLIAAgKQgBgPgQAAQgRgBgNATIgOBSIgUAAIAUhzIATAAIgDAPQAPgSAUABQAQAAAIALQAIALgCAUIgNBLg");
	this.shape_4.setTransform(141.395,93.8243);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgXBPIAUhzIATAAIgTBzgAADg6QgCgDAAgFQAAgGACgDQAEgDAFAAQAFgBADAEQADADAAAFQAAAFgDADQgDADgFABQgFAAgEgDg");
	this.shape_5.setTransform(133.5,91.8219);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgkA7IAUhzIASAAIgCANQALgQARABIAJABIgCATIgJgBQgTAAgKARIgOBRg");
	this.shape_6.setTransform(127.375,93.8242);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgMBQQgOAAgLgHQgLgHgGgMQgGgNgBgQQAAgJABgIIACgMQAFgjAUgUQATgVAbABQAWAAANAOQANAOABAYIgUAAQgBghgZgCIgDAAQgUgBgNAQQgOAPgEAbIgCAQIgBAJQgBAUAIAMQAIALAPABQAPAAALgIQALgJAFgSIAUgBQgFAZgRAOQgRANgVAAIgDAAg");
	this.shape_7.setTransform(116.7667,91.9276);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_8.setTransform(160.75,94.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,42.6,322.5,104.30000000000001);


(lib.drop10G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgOA8QgPAAgKgJQgJgKABgOQABgTAPgJQAPgKAXAAIAVAAIABgJQABgLgFgGQgFgGgKAAQgKAAgHAFQgIAFgBAIIgUAAQABgKAHgIQAHgIALgEQAKgEAMAAQASAAAKALQAKAKgCASIgJA4IgBAJQAAAGACAFIgBACIgTAAIgBgGIAAgGQgPAOgRAAIgBAAgAgQAIQgKAFgCALQgBAIAFAGQAFAFAJAAQAKAAAHgEQAIgFAGgIIAEgYIgOAAQgSAAgJAGg");
	this.shape.setTransform(202.23,92.1758);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_1.setTransform(191.1232,92.1769);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgUBTQgQAAgKgMQgJgMgBgVIABgPQACgSAHgNQAIgOALgHQALgIAOABQASAAALAOIALg9IATAAIgcCkIgSAAIACgMQgNAPgTAAIgBgBgAgTgMQgIAHgFAMQgFANAAAOQAAAPAGAJQAGAIALABQAQAAANgRIAJg1QgGgQgRAAIgBAAQgKAAgJAHg");
	this.shape_2.setTransform(179.7417,89.8508);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgXBPIAUhzIATAAIgTBzgAADg6QgCgDAAgFQAAgGACgDQAEgDAFAAQAFgBADAEQAEADgBAFQABAFgEADQgDADgFABQgFAAgEgDg");
	this.shape_3.setTransform(170.75,90.0719);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgHA8QgOAAgLgIQgKgHgFgOQgFgNACgQQABgRAIgOQAIgPANgIQANgIAPABQAOAAALAIQAKAIAFANQAFAOgCAQIAAABQgCARgIAOQgIAOgNAHQgMAHgNAAIgCAAgAgSgfQgKAMgDATIAAACQgBAHABAHQABANAHAHQAGAIALAAQAJABAIgFQAIgGAGgKQAFgKACgNIAAgPQgBgNgHgIQgGgHgLgBIgCAAQgNAAgKAMg");
	this.shape_4.setTransform(161.6348,92.1751);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgkA7IAUhzIASAAIgCANQALgQARABIAJABIgCATIgJgBQgTAAgKARIgOBRg");
	this.shape_5.setTransform(152.325,92.0742);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgDA8QgWAAgMgQQgMgPACgYIAAgFQACgQAIgPQAJgOAMgHQAMgHANAAQASAAAKAMQALALAAAUIAAAOIgBAIIhLAAQgCAQAHALQAHALAOAAQARABAOgQIALAJQgHALgLAGQgLAFgMAAIgCAAgAgMgjQgJAJgFARIA3AAIABgCQACgOgGgJQgHgJgLAAIgBAAQgKAAgJAIg");
	this.shape_6.setTransform(142.6232,92.1769);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgSBBQgGgJACgOIALhHIgUAAIADgPIAVAAIAEgcIASAAIgEAcIAVAAIgDAPIgVAAIgLBIIAAAFQABAIAHAAIAJgBIgBAQQgHACgGAAQgMAAgGgIg");
	this.shape_7.setTransform(133.65,90.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgFA8QgSAAgNgKQgMgLABgRIATAAQAAAKAHAGQAGAGALAAQAJAAAIgEQAIgFABgIQABgMgPgFIgTgGQgZgIAAgUQABgQAOgJQANgKARAAQASAAAKAKQALAKAAAQIgTAAQAAgJgFgFQgHgFgJgBQgJAAgHAFQgHAFgBAIQgBAKAOAFIAIACQAUAFAIAIQAJAIgBAMQgBALgGAIQgHAIgKAFQgKADgJAAIgDAAg");
	this.shape_8.setTransform(124.0001,92.1778);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AAvBOIgIgpIg+AAIgVApIgWAAIBUibIASAAIAfCbgAgOAUIAyAAIgNhHg");
	this.shape_9.setTransform(110.425,90.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyZAAAIAAQRg");
	this.shape_10.setTransform(160.75,94.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,42.6,322.5,104.30000000000001);


(lib.drop10G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgwBdQgSgQAAgbIAbAAQgBARAMAKQAKALASAAQATAAALgLQALgKAAgUQAAgSgMgKQgLgKgVAAIgUAAIAAgWIAUAAQASAAALgKQALgJAAgRQAAgmglAAQgRAAgKAKQgLAKAAARIgbAAQAAgZATgRQASgQAcAAQAeAAARAPQARAQAAAcQAAAOgJANQgJAOgPAGQASAEAJAOQAKANAAASQgBAdgSAQQgTARgeABQgdAAgTgRg");
	this.shape.setTransform(238.75,52.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AAZBTIgog2IgMAMIAAAqIgUAAIAAikIAUAAIAABjIAKgOIAkgkIAYAAIgsAvIAxBEg");
	this.shape_1.setTransform(143.875,57.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_2.setTransform(131.55,59.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgjBDQgNgQAAgbIAAgCQAAgaANgPQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACkIgSAAIgBgNQgMAOgUAAQgVAAgMgQgAgUgHQgIAKAAAWQAAATAIALQAIAMAOAAQASAAAJgRIAAg1QgJgQgSAAQgOAAgIAMg");
	this.shape_3.setTransform(119.125,57.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_4.setTransform(107.125,59.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_5.setTransform(95.05,59.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgJBTIAAikIATAAIAACkg");
	this.shape_6.setTransform(86.425,57.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_7.setTransform(235.025,27.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_8.setTransform(228.4,28.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_9.setTransform(222,29.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_10.setTransform(212.025,29.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgwBSIAAigIASAAIABAMQAMgPAVAAQAVAAAMAQQAMAQAAAcIAAACQAAAZgMARQgMAQgVAAQgUAAgMgOIAAA5gAgcgwIAAA3QAJAQASAAQAOAAAIgLQAJgMAAgVQAAgUgJgLQgIgMgOAAQgSAAgJAQg");
	this.shape_11.setTransform(200.15,31.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_12.setTransform(188.075,29.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_13.setTransform(176.425,29.375);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_14.setTransform(162.675,27.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_15.setTransform(156.85,29.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_16.setTransform(146.425,29.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgjBDQgNgQAAgbIAAgBQAAgaANgQQAMgRAVAAQATAAAMAOIAAg8IAUAAIAACjIgSAAIgBgMQgMAOgUAAQgVAAgMgQgAgUgIQgIAKAAAXQAAATAIALQAIAMAOAAQASAAAJgRIAAg0QgJgRgSAAQgOAAgIALg");
	this.shape_17.setTransform(133.925,27.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAJgPASAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_18.setTransform(124.85,29.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_19.setTransform(114.875,29.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_20.setTransform(103.025,27.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgjAzQgMgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgHAGAAAHIgUAAQgBgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgUAAQgCgDgCgJQgOAOgRAAQgSAAgKgJgAgbAXQAAAKAGAFQAHAFAJAAQAJAAAIgFQAJgFADgHIAAgYIgPAAQgkAAAAAVg");
	this.shape_21.setTransform(85.15,29.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgiBRIgIgCIAAgQIAGABQAJAAAGgEQAGgEADgLIAFgMIgqhyIAWAAIAcBXIAbhXIAVAAIguCFQgKAdgYAAg");
	this.shape_22.setTransform(74,31.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_23.setTransform(62.725,29.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAijIAUAAIAAA/QANgRAVAAQAkAAABApIAABMg");
	this.shape_24.setTransform(50.625,26.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_25.setTransform(38.425,29.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_26.setTransform(26.475,27.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_27.setTransform(13.925,29.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJBOIAAiKIgyAAIAAgRIB3AAIAAARIgyAAIAACKg");
	this.shape_28.setTransform(1.325,27.375);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyYAAAIAAQRg");
	this.shape_29.setTransform(116.25,42.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45,-9.7,322.5,104.3);


(lib.drop10G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhDBsIAAgUIBJhRQAQgSAHgLQAGgMAAgNQAAgQgKgLQgLgLgPAAQgUAAgMAMQgLALAAAUIgbAAQAAgdATgSQATgSAgAAQAcAAASAQQARAPAAAaQAAAfgoArIg4A+IBqAAIAAAWg");
	this.shape.setTransform(237.55,52.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAJgPARAAQAGAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_1.setTransform(167.7,59.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDgBgJQgNAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_2.setTransform(157.4,59.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AgJBTIAAikIATAAIAACkg");
	this.shape_3.setTransform(148.775,57.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgjAwQgKgKAAgVIAAhLIAUAAIAABKQAAAaAWABQAVgBAIgQIAAhUIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgLg");
	this.shape_4.setTransform(139.975,59.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_5.setTransform(125.825,57.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AgCBBQgIgIABgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQAEAEAGAAIAJgCIAAAQQgHACgHAAQgOAAgFgIg");
	this.shape_6.setTransform(119.2,58.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAJgPASAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_7.setTransform(112.8,59.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_8.setTransform(102.825,59.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgwBRIAAifIASAAIABANQAMgPAVgBQAVABAMAPQAMAQAAAdIAAABQAAAagMAQQgMAQgVAAQgUAAgMgOIAAA4gAgcgvIAAA2QAJAQASAAQANAAAJgLQAJgLgBgWQABgTgJgMQgJgMgNAAQgSABgJAQg");
	this.shape_9.setTransform(90.95,61.9);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_10.setTransform(78.875,59.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_11.setTransform(67.225,59.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_12.setTransform(212.525,26.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWAAQAVgBAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_13.setTransform(200.075,29.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AgDBBQgGgIAAgPIAAhHIgWAAIAAgPIAWAAIAAgcIATAAIAAAcIAVAAIAAAPIgVAAIAABIQAAAHACADQAEAEAGAAIAJgCIAAAQQgHACgHAAQgOAAgGgIg");
	this.shape_14.setTransform(190.1,28.075);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_15.setTransform(180.775,29.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_16.setTransform(169.025,29.375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_17.setTransform(157.175,27.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAIgPATAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_18.setTransform(147.6,29.275);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_19.setTransform(137.625,29.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAijIAUAAIAAA9QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAACQAAAagMARQgMAPgVAAQgVAAgMgPgAgcgBIAAAxQAJATATAAQANAAAIgMQAIgLAAgVQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_20.setTransform(125.775,27.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAijIAUAAIAABjIAKgOIAkglIAYAAIgsAwIAxBDg");
	this.shape_21.setTransform(109.075,26.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgGgGgMAAQgKAAgHAFQgIAGABAHIgVAAQAAgIAHgJQAGgIAKgEQALgFAMAAQAUAAALAKQALAKABASIAAA0QAAAQAEAKIAAABIgUAAQgDgDgBgJQgOAOgRAAQgSAAgLgJgAgbAXQAAAKAGAFQAHAFAKAAQAIAAAIgFQAIgFAEgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_22.setTransform(96.75,29.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAJgPATAAQAFAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_23.setTransform(87.65,29.275);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_24.setTransform(77.675,29.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AgYBNQgMgGgGgJIAKgMQANAQASAAQAOAAAIgIQAIgJAAgOIAAgKQgMANgUAAQgUAAgMgQQgNgQAAgcQAAgbANgQQAMgQAUAAQAVAAAMAPIABgNIASAAIAABwQAAAXgNANQgOANgWAAQgMAAgMgFgAgUg1QgIALAAAWQAAAUAIAKQAIAMAOAAQASAAAJgSIAAg0QgJgQgSAAQgOAAgIALg");
	this.shape_25.setTransform(65.35,31.575);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgCBBQgIgIABgPIAAhHIgVAAIAAgPIAVAAIAAgcIASAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHADADQAEAEAHAAIAJgCIAAAQQgIACgHAAQgOAAgFgIg");
	this.shape_26.setTransform(50,28.075);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgkAzQgLgKAAgPQAAgSAOgJQAOgKAYAAIATAAIAAgJQAAgLgGgGQgHgGgLAAQgKAAgHAFQgIAGAAAHIgUAAQABgIAGgJQAGgIALgEQAKgFAMAAQAUAAALAKQAMAKAAASIAAA0QAAAQAEAKIAAABIgVAAQgCgDAAgJQgOAOgTAAQgRAAgLgJgAgbAXQAAAKAHAFQAFAFALAAQAHAAAJgFQAJgFADgHIAAgYIgQAAQgjAAAAAVg");
	this.shape_27.setTransform(40.75,29.375);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgJBSIAAijIATAAIAACjg");
	this.shape_28.setTransform(32.125,26.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AAwBOIgPgpIhBAAIgOApIgWAAIA8ibIARAAIA8CbgAgaAUIA1AAIgbhIg");
	this.shape_29.setTransform(22.275,27.375);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5MIJIAAwRMAyYAAAIAAQRg");
	this.shape_30.setTransform(116.25,42.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45,-9.7,322.5,104.3);


(lib.drop10G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AANBrIAAizIg1AUIAAgZIBMgdIAFAAIAADVg");
	this.shape.setTransform(247,64.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_1.setTransform(169.575,66.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#2C3E50").s().p("AgjAxQgKgLAAgWIAAhKIAUAAIAABKQAAAbAWgBQAVAAAIgRIAAhTIAUAAIAABzIgTAAIAAgMQgMAOgWAAQgSAAgKgKg");
	this.shape_2.setTransform(157.375,66.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#2C3E50").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgKAAgHAGQgIAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgTAAgIAQIAABUIgTAAIAAhzIASAAIABANQAMgPAXAAQAYAAAIATQAFgJAJgFQAKgFANAAQAlAAABAoIAABNg");
	this.shape_3.setTransform(141.7,66.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_4.setTransform(129.375,64.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#2C3E50").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQABAHADADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_5.setTransform(122.75,65.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_6.setTransform(113.425,66.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_7.setTransform(101.675,66.825);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#2C3E50").s().p("AA+A7IAAhLQgBgNgFgGQgGgGgOAAQgLAAgHAGQgHAHgBALIAABMIgTAAIAAhLQAAgZgZAAQgUAAgHAQIAABUIgUAAIAAhzIATAAIABANQAMgPAWAAQAYAAAJATQAFgJAJgFQAKgFANAAQAmAAAAAoIAABNg");
	this.shape_8.setTransform(86.1,66.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2C3E50").s().p("AgJBPIAAhzIATAAIAABzgAgIg7QgDgDAAgFQAAgFADgDQADgDAFAAQAGAAADADQADADAAAFQAAAFgDADQgDADgGAAQgFAAgDgDg");
	this.shape_9.setTransform(242.225,34.325);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#2C3E50").s().p("AgCBBQgIgIAAgPIAAhHIgUAAIAAgPIAUAAIAAgcIATAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHAEADQACAEAIAAIAJgCIAAAQQgIACgIAAQgNAAgFgIg");
	this.shape_10.setTransform(235.6,35.125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2C3E50").s().p("AgbA7IAAhzIATAAIAAANQAKgPARAAQAGAAADABIAAATIgKgBQgSAAgHARIAABRg");
	this.shape_11.setTransform(229.2,36.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_12.setTransform(219.225,36.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#2C3E50").s().p("AgwBSIAAigIASAAIABAMQAMgPAVABQAVgBAMARQAMAPAAAcIAAACQAAAagMAQQgMAQgVAAQgUAAgMgNIAAA4gAgcgwIAAA3QAJAQASAAQAOAAAIgMQAJgKAAgWQAAgUgJgLQgIgLgOAAQgSAAgJAPg");
	this.shape_13.setTransform(207.35,38.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_14.setTransform(195.275,36.425);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#2C3E50").s().p("AgWA3QgLgEgGgJQgGgJAAgLIAUAAQAAAKAIAGQAHAGAMAAQALAAAHgEQAGgFAAgIQAAgIgGgEQgGgFgOgDQgPgDgJgEQgJgEgEgGQgEgGAAgJQAAgOAMgKQAMgKASAAQAUAAAMAKQAMAKAAAQIgUAAQAAgIgHgGQgHgGgKAAQgKAAgGAFQgGAFAAAHQAAAHAFAEQAGAEAOADQAPADAJAFQAJAEAFAGQAEAHAAAJQAAAQgMAJQgNAJgTAAQgNAAgLgFg");
	this.shape_15.setTransform(183.625,36.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#2C3E50").s().p("AAZBSIgog2IgMAOIAAAoIgUAAIAAikIAUAAIAABjIAKgMIAkglIAYAAIgsAvIAxBDg");
	this.shape_16.setTransform(167.725,34);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#2C3E50").s().p("AgjAwQgKgLAAgVIAAhKIAUAAIAABKQAAAaAWAAQAVABAIgSIAAhTIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_17.setTransform(155.275,36.55);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#2C3E50").s().p("AgCBBQgIgIABgPIAAhHIgWAAIAAgPIAWAAIAAgcIASAAIAAAcIAWAAIAAAPIgWAAIAABIQAAAHADADQAEAEAGAAIAJgCIAAAQQgHACgHAAQgOAAgFgIg");
	this.shape_18.setTransform(145.3,35.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#2C3E50").s().p("AAaA7IAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAFgEAIIAABSIgUAAIAAhzIATAAIABAPQANgRAVAAQAkAAABApIAABMg");
	this.shape_19.setTransform(135.975,36.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_20.setTransform(124.225,36.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAikIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAcgMAQQgMAQgVAAQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_21.setTransform(112.375,34.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#2C3E50").s().p("AgbA7IAAhzIAUAAIAAANQAJgPASAAQAFAAADABIAAATIgJgBQgTAAgHARIAABRg");
	this.shape_22.setTransform(102.8,36.325);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#2C3E50").s().p("AghAtQgPgQAAgaIAAgDQAAgRAGgNQAHgOAMgHQAMgIANAAQAWAAANAPQAMAPAAAcIAAAHIhNAAQAAARAKALQAJAKAOAAQALAAAHgEQAHgEAGgIIAMAKQgPAWgdAAQgXAAgOgPgAgSgiQgIAJgCAQIA5AAIAAgCQAAgPgIgIQgHgJgMAAQgLAAgJAJg");
	this.shape_23.setTransform(92.825,36.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAikIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAcgMAQQgMAQgVAAQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_24.setTransform(80.975,34.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#2C3E50").s().p("AAaBSIAAhMQAAgMgGgGQgGgGgLAAQgJAAgHAFQgIAGgEAHIAABSIgUAAIAAikIAUAAIAAA/QANgQAVAAQAkAAABApIAABMg");
	this.shape_25.setTransform(63.075,34);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#2C3E50").s().p("AgjAwQgKgLAAgVIAAhKIAUAAIAABKQAAAaAWAAQAVABAIgSIAAhTIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_26.setTransform(50.875,36.55);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#2C3E50").s().p("AgdBEIgBANIgSAAIAAikIAUAAIAAA+QAMgPAUAAQAVAAAMAQQAMAQAAAbIAAABQAAAcgMAQQgMAQgVAAQgVAAgMgQgAgcgBIAAAyQAJASATAAQANAAAIgLQAIgLAAgWQAAgVgIgKQgHgLgOAAQgUAAgIASg");
	this.shape_27.setTransform(38.925,34.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#2C3E50").s().p("AgjAwQgKgLAAgVIAAhKIAUAAIAABKQAAAaAWAAQAVABAIgSIAAhTIAUAAIAABzIgTAAIAAgLQgMANgWAAQgSAAgKgLg");
	this.shape_28.setTransform(26.375,36.55);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2C3E50").s().p("AgJBOIAAiKIgyAAIAAgRIB3AAIAAARIgyAAIAACKg");
	this.shape_29.setTransform(13.775,34.425);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.bf(img.Bitmap3, null, new cjs.Matrix2D(1.295,0,0,1.199,-161.1,-52.1)).s().p("A5LIJIAAwRMAyXAAAIAAQRg");
	this.shape_30.setTransform(129.55,52.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.7,0.9,322.5,104.19999999999999);


(lib.drag10G5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("Ao/iKIR/AAIAAEWIx/AAg");
	this.shape.setTransform(74.075,28.1);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape_1.setTransform(28.675,35.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGA6QgPAAgJgJQgIgIAAgOIAPAAQgBAJAFAFQAEAFAJABQAJAAAHgGQAHgGABgKQAAgKgFgFQgFgFgJAAIgLAAIACgLIAKAAQAJAAAHgFQAHgGABgJQABgJgEgFQgFgGgIAAQgIAAgGAFQgGAGgCAJIgOAAQACgOAKgJQALgJAOAAQAOABAIAIQAIAJgBAOQAAAIgGAHQgFAGgKAFQAIACADAHQAEAGAAAJQgCAQgLAJQgKAKgOAAIgBgBg");
	this.shape_2.setTransform(22.9042,30.7013);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAbAeIAGgmIAAgFQgBgHgJAAQgFAAgEADQgEAEgCAFIgGAmIgJAAIAGglQABgGgCgEQgDgDgFAAQgJAAgGAIIgHAqIgKAAIAKg5IAKAAIgCAGQAIgIAKABQAFAAADACQAEADACAEQAIgKALABQAJAAAEAFQAEAGgBAKIgHAlg");
	this.shape_3.setTransform(122.835,31.7485);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAdQgIAAgEgGQgEgFABgKIAGglIAKAAIgHAlIAAAEQAAAEADADQACACADAAQAKAAAFgJIAIgpIAJAAIgKA5IgJAAIABgFQgGAHgJAAIgBgBg");
	this.shape_4.setTransform(115.565,31.8517);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAZQgGgFAAgJIAKAAQAAAFADADQADADAFAAQAFAAADgCQAEgCABgEQABgHgIgCIgJgDQgNgDABgLQAAgHAHgFQAGgFAIAAQAJAAAGAFQAFAFAAAIIgKAAQAAgEgCgDQgDgDgFAAQgEAAgEADQgDACgBAEQAAAFAHACIADACQAKACAFAEQAEAEgBAGQAAAFgDAEQgDAEgGACQgFACgFAAQgJAAgGgFg");
	this.shape_5.setTransform(109.5521,31.7977);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgFgEQgGgEgCgGQgDgHABgIQABgIAEgIQAEgGAHgEQAGgEAHAAQAHAAAFAEQAFAEADAGQACAHAAAIIgBABQgBAIgEAHQgEAGgGAFQgFADgGAAIgCAAgAgIgPQgGAGgBAJIAAABIAAAHQAAAHAEADQADAEAFAAQAEAAAEgDQAEgCADgFQADgFABgGIAAgIQgBgGgDgEQgDgEgGAAQgGAAgFAGg");
	this.shape_6.setTransform(103.7649,31.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgJAgQgCgEABgHIAGgjIgLAAIACgIIAKAAIACgNIAJAAIgCANIAKAAIgBAIIgLAAIgFAjIAAADQAAAEADAAIAFAAIAAAIIgHABQgFAAgEgFg");
	this.shape_7.setTransform(99.15,31.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAWQgGgHABgNIAAgCQABgIAEgHQAFgHAGgDQAGgEAGAAQAJAAAFAGQAFAGAAAKIAAAHIgBADIgkAAQgBAIADAFQAEAGAHAAQAHAAAIgIIAFAFQgDAFgGADQgGADgGAAQgLAAgGgIgAgFgRQgFAEgCAJIAbAAIAAgBQABgHgDgEQgDgFgGAAQgFAAgEAEg");
	this.shape_8.setTransform(94.3683,31.7972);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAZQgGgFAAgJIAKAAQAAAFADADQADADAFAAQAFAAADgCQAEgCABgEQABgHgIgCIgJgDQgNgDABgLQAAgHAHgFQAGgFAIAAQAJAAAGAFQAFAFAAAIIgKAAQAAgEgCgDQgDgDgFAAQgEAAgEADQgDACgBAEQAAAFAHACIADACQAKACAFAEQAEAEgBAGQAAAFgDAEQgDAEgGACQgFACgFAAQgJAAgGgFg");
	this.shape_9.setTransform(88.6521,31.7977);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgGAeQgIAAgFgFQgFgEABgHQAAgKAIgEQAIgFALAAIAKAAIABgFQAAgFgCgDQgDgDgFAAQgFAAgDACQgEADgBAEIgJAAQAAgFAEgEQADgEAGgCQAEgCAGAAQAJAAAFAGQAFAFgBAJIgEAbIgBAEIABAGIAAABIgKAAIAAgDIAAgDQgIAHgHAAIgBAAgAgIAEQgFADAAAFQgBAEADADQACADAFAAQAEAAAEgCQAEgDADgEIACgMIgIAAQgIAAgFADg");
	this.shape_10.setTransform(80.1804,31.7974);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAbAeIAGgmIAAgFQgBgHgJAAQgFAAgEADQgEAEgCAFIgGAmIgJAAIAGglQABgGgCgEQgDgDgFAAQgJAAgGAIIgHAqIgKAAIAKg5IAKAAIgCAGQAIgIAKABQAFAAADACQAEADACAEQAIgKALABQAJAAAEAFQAEAGgBAKIgHAlg");
	this.shape_11.setTransform(72.485,31.7485);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgSAWQgGgHABgNIAAgCQABgIAEgHQAFgHAGgDQAGgEAGAAQAJAAAFAGQAFAGAAAKIAAAHIgBADIgkAAQgBAIADAFQAEAGAHAAQAHAAAIgIIAFAFQgDAFgGADQgGADgGAAQgLAAgGgIgAgFgRQgFAEgCAJIAbAAIAAgBQABgHgDgEQgDgFgGAAQgFAAgEAEg");
	this.shape_12.setTransform(65.2183,31.7972);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJAqQgJAAgEgGQgFgHAAgKIAAgHQABgJAEgGQADgIAGgDQAGgEAGABQAJAAAGAHIAFgfIAJAAIgNBSIgJAAIABgGQgHAHgIAAIgBAAgAgJgGQgEAEgDAGQgCAGAAAHQAAAIADAEQADAEAFAAQAIABAGgJIAFgaQgDgIgJAAQgFAAgEADg");
	this.shape_13.setTransform(59.55,30.6266);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgGAeQgIAAgFgFQgFgEABgHQAAgKAIgEQAIgFALAAIAKAAIABgFQAAgFgCgDQgDgDgFAAQgFAAgDACQgEADgBAEIgJAAQAAgFAEgEQADgEAGgCQAEgCAGAAQAJAAAFAGQAFAFgBAJIgEAbIgBAEIABAGIAAABIgKAAIAAgDIAAgDQgIAHgHAAIgBAAgAgIAEQgFADAAAFQgBAEADADQACADAFAAQAEAAAEgCQAEgDADgEIACgMIgIAAQgIAAgFADg");
	this.shape_14.setTransform(53.2304,31.7974);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgLAoIAKg5IAJAAIgJA5gAACgdQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQAAAAABgBIAEgCQAAAAABAAQABAAAAABQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAQgBAAAAAAIgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAgBg");
	this.shape_15.setTransform(49.275,30.725);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgeAnIANhNIAUAAQAJAAAHAFQAHAEADAJQADAIgBAKIgBAEQgCARgLAKQgLAKgPAAgAgTAeIAKAAQALABAIgIQAIgGACgNQACgJgBgHQgBgIgEgFQgFgFgIAAIgLAAg");
	this.shape_16.setTransform(44.225,30.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8C2D").s().p("AoBh1IQDgHIAADzIwDAGg");
	this.shape_17.setTransform(83.425,30.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_4
	this.instance = new lib.Bitmap122();
	this.instance.setTransform(14,47,0.4636,0.4598);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_3
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(0,0,0,0.227)").s().p("Ao/CLIAAkWIR/AAIAAEWg");
	this.shape_18.setTransform(68.425,31.45);
	this.shape_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.9,13.2,124.1,113.8);


(lib.drag10G4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("Ao/iKIR/AAIAAEWIx/AAg");
	this.shape.setTransform(74.075,28.1);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape_1.setTransform(27.675,35.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgnA6IABgLIApgpIAIgHQANgNABgLQACgJgFgFQgEgFgIgBQgKAAgGAGQgHAHgCAKIgOABQABgLAGgIQAFgIAJgEQAIgFAKAAQAOABAJAIQAIAIgBANQgBAPgQAQIgIAHIgjAjIA2AAIgCAMg");
	this.shape_2.setTransform(21.8113,30.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgEAEQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAgBAAgBQAAAAAAAAQAAAAAAgBQABAAAAgBQAAgBAAAAQABAAAAgBQABAAAAAAQABgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAQAAABAAAAQAAABgBABQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgBAAAAAAIAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBgBg");
	this.shape_3.setTransform(112.6,34.755);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbApIANhQIAJAAIgBAHQAGgIAKAAQAJAAAEAGQAFAGAAALIAAAGIAAABQgBAJgEAGQgEAIgFADQgFAEgHgBQgJAAgGgGIgFAcgAgGgYIgFAbQADAIAIAAQAHAAAFgFQAFgGABgLIABgEQAAgIgDgEQgDgEgGgBQgHAAgGAIg");
	this.shape_4.setTransform(108.275,33.4735);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgRAZQgGgFAAgJIAKAAQAAAFADADQADADAFAAQAFAAADgCQAEgCABgEQABgHgIgCIgJgDQgNgDABgLQAAgHAHgFQAGgFAIAAQAJAAAGAFQAFAFAAAIIgKAAQAAgEgCgDQgDgDgFAAQgEAAgEADQgDACgBAEQAAAFAHACIADACQAKACAFAEQAEAEgBAGQAAAFgDAEQgDAEgGACQgFACgFAAQgJAAgGgFg");
	this.shape_5.setTransform(102.7521,32.3977);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAJAdIgJgWIgQAWIgMAAIAYgdIgOgcIALAAIAIAVIAQgVIAMAAIgYAcIAOAdg");
	this.shape_6.setTransform(94.625,32.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgLAoIAKg5IAJAAIgJA5gAACgdQgBAAAAgBQAAAAAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAAAABgBIAEgCQAAAAABAAQABAAAAABQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAQAAABAAAAQAAABgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAQgBAAAAAAIgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAgBg");
	this.shape_7.setTransform(90.825,31.325);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSAeIAKg5IAJAAIgBAGQAGgIAIAAIAFABIgBAJIgFAAQgJAAgFAIIgHApg");
	this.shape_8.setTransform(87.825,32.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgIAhQgDgFABgHIAFgjIgKAAIABgHIALAAIACgPIAJAAIgCAPIAKAAIgBAHIgLAAIgFAjIAAADQAAAEADAAIAFgBIAAAIIgHABQgFAAgDgDg");
	this.shape_9.setTransform(84.2,31.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgDAeQgHAAgFgEQgGgEgCgHQgDgGABgIQABgIAEgHQAEgIAHgDQAGgFAHABQAHAAAFAEQAFADADAIQACAGAAAIIgBABQgBAIgEAHQgEAGgGAEQgFAEgGAAIgCAAgAgIgPQgGAGgBAJIAAABIAAAHQAAAGAEAEQADAEAFAAQAEAAAEgCQAEgDADgFQADgFABgGIAAgIQgBgGgDgEQgDgEgGAAQgGAAgFAGg");
	this.shape_10.setTransform(79.1149,32.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgLAoIAKg5IAJAAIgJA5gAACgdQgBAAAAgBQAAAAAAAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAAAABgBIAEgCQAAAAABAAQABAAAAABQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQABAAAAABQAAABAAAAQAAABAAAAQAAABgBABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAABgBAAQgBAAAAAAIgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAgBg");
	this.shape_11.setTransform(74.875,31.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAJApIAGgmIAAgEQAAgHgIgBQgIAAgHAJIgHApIgKAAIAPhRIAJAAIgFAfQAGgIAKAAQAIAAAEAGQAEAFgBAJIgGAmg");
	this.shape_12.setTransform(70.21,31.175);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgbApIANhQIAJAAIgBAHQAGgIAKAAQAJAAAEAGQAFAGAAALIAAAGIAAABQgBAJgEAGQgEAIgFADQgFAEgHgBQgJAAgGgGIgFAcgAgGgYIgFAbQADAIAIAAQAHAAAFgFQAFgGABgLIABgEQAAgIgDgEQgDgEgGgBQgHAAgGAIg");
	this.shape_13.setTransform(64.075,33.4735);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgFAoQgHAAgGgDQgFgEgEgGQgDgHAAgIIABgPQACgKAFgIQAEgHAGgFQAIgGAKAAQAMAAAGAIQAHAIAAANQABAFgCAIQgBAJgEAHQgDAIgGAFQgJAIgLAAIgBAAgAgGgaQgGAEgDAIQgEAIgBALIAAAEQAAAKAEAGQAEAGAIABQAJAAAGgIQAHgHACgOIABgLQABgKgEgGQgEgGgIAAQgGAAgGAEg");
	this.shape_14.setTransform(57.8313,31.3763);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF8C2D").s().p("AoBh1IQDgHIAADzIwDAGg");
	this.shape_15.setTransform(83.425,30.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_4
	this.instance = new lib._32();
	this.instance.setTransform(14,47,0.1681,0.1636);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_3
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(0,0,0,0.227)").s().p("Ao/CLIAAkWIR/AAIAAEWg");
	this.shape_16.setTransform(68.425,31.45);
	this.shape_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.9,13.2,124.1,113.8);


(lib.drag10G3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("Ao/iKIR/AAIAAEWIx/AAg");
	this.shape.setTransform(74.075,28.1);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgGAdQgIAAgEgEQgFgFAAgHQABgJAHgEQAIgFALAAIAJAAIABgFQABgFgDgDQgCgDgFAAQgFAAgDADQgEACgBAEIgJAAQAAgFAEgDQADgEAGgCQAEgDAGABQAIAAAFAFQAFAFgBAJIgEAbIAAAEQgBADABACIAAABIgKAAIAAgDIAAgDQgHAHgHAAIgBAAgAgIAEQgEACgBAGQAAAEACACQACADAFAAQAEAAADgCQAEgDADgEIACgLIgHAAQgIAAgFADg");
	this.shape_1.setTransform(123.5561,32.3724);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgRAdIAKg4IAIAAIgBAHQAFgIAJAAIAEABIgBAJIgEgBQgJAAgFAJIgHAng");
	this.shape_2.setTransform(119.325,32.3235);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAAApQgJAAgFgIIgCAHIgJAAIAOhQIAJAAIgFAeQAHgHAIAAQAJAAAEAGQAFAGAAAJIgBAHIAAABQgBAIgDAHQgEAHgFAEQgFADgFAAIgCAAgAgJAAIgDAYQACAIAJABQAEAAAFgEQAEgDACgGQADgHgBgHQABgGgDgEQgDgEgFgBQgIAAgHAJg");
	this.shape_3.setTransform(114.2,31.2281);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgGAdQgIAAgEgEQgFgFAAgHQABgJAHgEQAIgFALAAIAJAAIABgFQABgFgDgDQgCgDgFAAQgFAAgDADQgEACgBAEIgJAAQAAgFAEgDQADgEAGgCQAEgDAGABQAIAAAFAFQAFAFgBAJIgEAbIAAAEQgBADABACIAAABIgKAAIAAgDIAAgDQgHAHgHAAIgBAAgAgIAEQgEACgBAGQAAAEACACQACADAFAAQAEAAADgCQAEgDADgEIACgLIgHAAQgIAAgFADg");
	this.shape_4.setTransform(108.4061,32.3724);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgOAaQgFgEgCgGQgDgHABgIIAAgBQABgJAEgGQAEgGAGgEQAGgEAGABQAJAAAGAGQAFAFAAAJIgJAAQAAgFgDgEQgDgDgFAAQgGgBgFAGQgFAGgBAJIgBABIAAAHQABAGADAEQADADAFAAQAEABAEgDQAEgEACgFIAJAAQgBAGgEAEQgDAFgFACQgGACgEAAQgHAAgFgDg");
	this.shape_5.setTransform(103.0607,32.3722);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRAYQgFgFAAgIIAJAAQAAAFADACQADADAFAAQAEAAAEgCQAEgCAAgEQACgGgIgCIgIgDQgNgDAAgKQAAgIAHgFQAGgEAJAAQAIAAAFAFQAGAFAAAHIgKAAQAAgEgCgDQgDgCgFAAQgEAAgDACQgEACgBAEQAAAFAGACIAFACQAJACAEADQAEAEAAAGQgBAFgDAEQgDAEgFACQgFACgFAAQgJAAgGgFg");
	this.shape_6.setTransform(97.45,32.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgGAdQgIAAgEgEQgFgFAAgHQABgJAHgEQAIgFALAAIAJAAIABgFQABgFgDgDQgCgDgFAAQgFAAgDADQgEACgBAEIgJAAQAAgFAEgDQADgEAGgCQAEgDAGABQAIAAAFAFQAFAFgBAJIgEAbIAAAEQgBADABACIAAABIgKAAIAAgDIAAgDQgHAHgHAAIgBAAgAgIAEQgEACgBAGQAAAEACACQACADAFAAQAEAAADgCQAEgDADgEIACgLIgHAAQgIAAgFADg");
	this.shape_7.setTransform(89.1561,32.3724);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgKAnIAKg4IAIAAIgJA4gAACgcQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAgBABAAQAAAAABABQAAAAABAAQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABIgBAEQgBAAAAABQgBAAAAAAQgBAAAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_8.setTransform(85.275,31.345);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgRAdIAKg4IAIAAIgBAHQAFgIAJAAIAEABIgBAJIgEgBQgJAAgFAJIgHAng");
	this.shape_9.setTransform(82.325,32.3235);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgJAdQgIAAgEgGQgDgGAAgJIAHgkIAJAAIgGAkIAAAEQAAAEACACQACACAEABQAJAAAFgJIAHgoIAKAAIgKA4IgJAAIABgGQgGAHgIAAIgCAAg");
	this.shape_10.setTransform(77.5719,32.4267);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAJAoIAGglIAAgEQAAgHgIAAQgIAAgGAIIgHAoIgKAAIAOhPIAKAAIgGAfQAGgJAKABQAIAAAEAFQAEAGgBAIIgGAlg");
	this.shape_11.setTransform(71.435,31.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgIAgQgDgFAAgGIAGgiIgKAAIACgIIAKAAIACgOIAJAAIgDAOIAKAAIgBAIIgKAAIgFAiIAAACQABAEADAAIAEgBIgBAIIgGABQgFAAgDgDg");
	this.shape_12.setTransform(67.25,31.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgDAdQgHAAgFgEQgFgDgCgHQgDgGABgIQABgIAEgHQAEgHAGgEQAGgEAHABQAHAAAFAEQAFADACAHQADAHgBAHIAAAAQgBAJgEAGQgEAHgGAEQgGADgFAAIgCAAgAgIgPQgFAGgBAJIAAABIAAAHQAAAGADAEQADADAGAAQADABAEgDQAEgCADgFQADgFABgHIAAgHQgBgGgDgEQgDgDgGAAIgBAAQgFAAgFAFg");
	this.shape_13.setTransform(62.3399,32.375);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgLAoIANhPIAKAAIgNBPg");
	this.shape_14.setTransform(58.225,31.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgDAdQgHAAgFgEQgFgDgCgHQgDgGABgIQABgIAEgHQAEgHAGgEQAGgEAHABQAHAAAFAEQAFADACAHQADAHgBAHIAAAAQgBAJgEAGQgEAHgGAEQgGADgFAAIgCAAgAgIgPQgFAGgBAJIAAABIAAAHQAAAGADAEQADADAGAAQADABAEgDQAEgCADgFQADgFABgHIAAgHQgBgGgDgEQgDgDgGAAIgBAAQgFAAgFAFg");
	this.shape_15.setTransform(53.7399,32.375);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AAMAmIAGgjIgkAAIgGAjIgKAAIAOhLIAJAAIgGAhIAlAAIAFghIAKAAIgNBLg");
	this.shape_16.setTransform(47.15,31.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FF8C2D").s().p("AoCh5IQFgIIAAD8IwFAHg");
	this.shape_17.setTransform(83.5,31);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_4
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape_18.setTransform(28.425,36.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgJA5IAQhfIgdALIACgOIApgPIADAAIgUBxg");
	this.shape_19.setTransform(22.65,31.575);

	this.instance = new lib._36();
	this.instance.setTransform(14,47,0.1754,0.1544);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_19},{t:this.shape_18}]}).wait(4));

	// Layer_3
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(0,0,0,0.227)").s().p("Ao/CLIAAkWIR/AAIAAEWg");
	this.shape_20.setTransform(68.425,31.45);
	this.shape_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.9,13.2,124.1,113.8);


(lib.drag10G2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("Ao/iKIR/AAIAAEWIx/AAg");
	this.shape.setTransform(74.075,28.1);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape_1.setTransform(28.225,35.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIA5QgOAAgIgIQgIgJgBgOIANAAQABAJAFAFQAEAFAJABQAJAAAGgIQAHgHABgMQACgLgFgGQgFgGgIAAQgGgBgEACIgJAFIgMgDIAPg4IA4AAIgDANIgrAAIgJAfQAJgFAJABQAOAAAHAKQAIAKgBAQQgCARgLALQgKALgPAAIgBgBg");
	this.shape_2.setTransform(23.025,30.8011);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgPAWQgGgGABgHIAIAAQAAAFADACQADADAFAAQAEAAADgCQADgCABgDQABgFgHgDIgIgCQgLgDAAgJQAAgGAGgFQAGgEAHAAQAIAAAFAFQAFAEAAAGIgJAAQAAgDgCgCQgDgDgEAAQgEAAgDACQgDACAAADQgBAFAGACIADABQAJADAEACQAEADAAAGQgBAEgDAEQgCADgFACIgJACQgJAAgFgEg");
	this.shape_3.setTransform(124.3479,31.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgTAUQgDgEABgJIAFggIAJAAIgGAgIAAAEQAAADACACQACACADAAQAJAAAFgHIAGgkIAJAAIgJAyIgIAAIABgGQgGAHgJAAQgHgBgEgFg");
	this.shape_4.setTransform(119.4389,31.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgHAbQgDgDABgGIAFgeIgJAAIABgHIAJAAIADgLIAHAAIgCALIAJAAIgBAHIgJAAIgFAeIAAADQABADACAAIAFAAIgBAHIgGABQgFAAgCgFg");
	this.shape_5.setTransform(115.175,30.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgRAWQgEgFAAgFQABgJAGgDQAHgFAKABIAJAAIABgFQAAgEgCgCQgCgDgFAAQgEAAgDACQgDACgBAEIgJAAQABgFADgDQADgDAFgCIAJgCQAIAAAFAFQAEAEgBAIIgEAXIAAAEIABAFIgBABIgIAAIgBgCIAAgDQgHAGgHAAQgHAAgEgEgAgHADQgEADgBAEQAAAEACACQACACAEAAQAEAAADgCQAEgCACgDIACgLIgGAAQgIAAgEADg");
	this.shape_6.setTransform(110.6566,31.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAIAaIAGggIAAgEQgBgHgHAAQgHAAgGAIIgGAjIgJAAIAJgyIAJAAIgCAHQAGgIAJAAQAIAAADAGQAEAEgBAJIgGAgg");
	this.shape_7.setTransform(105.3361,31.35);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAIAaIAGggIAAgEQgBgHgHAAQgHAAgGAIIgGAjIgJAAIAJgyIAJAAIgCAHQAGgIAJAAQAIAAADAGQAEAEgBAJIgGAgg");
	this.shape_8.setTransform(99.9861,31.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgJAiIAJgxIAHAAIgIAxgAACgYQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAIABAEIgBADQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgDgBg");
	this.shape_9.setTransform(96.475,30.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgZAjIANhEIAIAAIgBAFQAFgGAKAAQAHAAAEAFQAFAFAAAJIAAAGIgBABQgBAIgDAFQgEAGgFADQgEADgGAAQgJAAgEgGIgFAYgAgGgUIgEAXQADAHAHAAQAGAAAFgFQAEgFACgJIAAgEQAAgHgDgDQgCgEgFAAIgBAAQgGAAgGAHg");
	this.shape_10.setTransform(92.1,32.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgPAWQgGgGABgHIAIAAQAAAFADACQADADAFAAQAEAAADgCQADgCABgDQABgFgHgDIgIgCQgLgDAAgJQAAgGAGgFQAGgEAHAAQAIAAAFAFQAFAEAAAGIgJAAQAAgDgCgCQgDgDgEAAQgEAAgDACQgDACAAADQgBAFAGACIADABQAJADAEACQAEADAAAGQgBAEgDAEQgCADgFACIgJACQgJAAgFgEg");
	this.shape_11.setTransform(84.7979,31.4);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgTAUQgDgEABgJIAFggIAJAAIgGAgIAAAEQAAADACACQACACADAAQAJAAAFgHIAGgkIAJAAIgJAyIgIAAIABgGQgGAHgJAAQgHgBgEgFg");
	this.shape_12.setTransform(79.8389,31.45);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAIAaIAGggIAAgEQgBgHgHAAQgHAAgGAIIgGAjIgJAAIAJgyIAJAAIgCAHQAGgIAJAAQAIAAADAGQAEAEgBAJIgGAgg");
	this.shape_13.setTransform(74.1361,31.35);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgJAiIAJgxIAHAAIgIAxgAACgYQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAAAIABAEIgBADQAAABgBAAQAAAAAAAAQgBABgBAAQAAAAgBAAIgDgBg");
	this.shape_14.setTransform(70.625,30.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgQAaIAJgxIAIAAIgBAFQAFgHAHABIAFAAIgBAIIgEAAQgJAAgEAHIgGAjg");
	this.shape_15.setTransform(67.925,31.3483);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgNAXQgEgDgCgGQgCgGAAgHIABgBQAAgHAEgGQADgGAGgDQAGgDAFAAQAIAAAFAFQAFAFAAAIIgIAAQAAgFgDgDQgCgDgFAAQgGAAgEAFQgFAFgBAIIAAABIAAAGQAAAFADADQADAEAFAAQADAAAEgDQAEgCABgFIAIAAQAAAFgEAEQgDADgFADQgFACgEAAQgGAAgFgDg");
	this.shape_16.setTransform(63.595,31.4);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgNAXQgGgEgBgFQgCgHAAgGQABgHADgGQAEgGAGgEQAFgDAHAAQAGAAAFAEQAEACADAHQABAFAAAHIAAAAQgBAHgEAHQgDAFgGAEQgGADgFAAQgHAAgEgDgAgIgNQgEAGgBAHIAAABIAAAGQAAAFADADQADAEAFAAQADAAAEgCQADgCADgEQACgFABgGIABgGQgBgFgDgDQgDgEgFAAQgFAAgGAFg");
	this.shape_17.setTransform(58.2,31.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgKAkIAMhGIAJAAIgMBGg");
	this.shape_18.setTransform(54.475,30.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgJAiIAJgxIAHAAIgIAxgAACgYQgBgBAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAIABAEIgBADQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgDgBg");
	this.shape_19.setTransform(52.025,30.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgHAbQgDgDABgGIAFgeIgJAAIABgHIAJAAIADgLIAHAAIgCALIAJAAIgBAHIgJAAIgFAeIAAADQABADACAAIAFAAIgBAHIgGABQgFAAgCgFg");
	this.shape_20.setTransform(49.325,30.85);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgcAiIAMhDIAXAAQAKAAAGAGQAGAFgBAKQAAAJgIAFQgHAFgLAAIgQAAIgFAbgAgNAAIAPAAQAHAAAFgCQAFgEAAgGQABgGgDgEQgDgDgGAAIgQAAg");
	this.shape_21.setTransform(44.6571,30.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF8C2D").s().p("Ao+iHIR9gJIAAEZIx9AIg");
	this.shape_22.setTransform(83.5173,30.5105,0.8956,0.8621);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_4
	this.instance = new lib._28();
	this.instance.setTransform(14,47,0.4672,0.4124);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_3
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(0,0,0,0.227)").s().p("Ao/CLIAAkWIR/AAIAAEWg");
	this.shape_23.setTransform(68.425,31.45);
	this.shape_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_23).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.9,13.2,124.1,113.8);


(lib.drag10G1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("Ao/iKIR/AAIAAEWIx/AAg");
	this.shape.setTransform(74.075,28.1);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).wait(3));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgFAHQgDgDAAgEQAAgCADgDQACgCADgBQAEAAACADQADACAAADQAAAEgDACQgCADgEAAQgDAAgCgCg");
	this.shape_1.setTransform(24.675,35.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAEA5IAFgbIgxAAIABgJIA+hNIAPAAIgMBLIAPAAIgDALIgPAAIgEAbgAATghIgpA0IAhAAIAKg3g");
	this.shape_2.setTransform(18.75,30.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgLAlIALg1IAIAAIgJA1gAACgbQgBAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAABgBIADgBQABAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAIgBAAIgCgBg");
	this.shape_3.setTransform(119.45,30.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgRAXQgGgFAAgIIAKAAQAAAFADADQADADAFAAQAEAAAEgCQAEgDABgEQAAgFgHgDIgJgCQgMgDAAgKQABgHAGgFQAGgFAIABQAJAAAFAEQAGAFgBAIIgJAAQAAgEgDgDQgDgDgEAAQgEAAgEADQgDACAAAEQgBAEAHADIADABQAKACAEADQAEAEAAAGQAAAFgDAEQgEADgFACQgFACgFAAQgJAAgGgFg");
	this.shape_4.setTransform(115.2521,31.3227);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgSAVQgGgIABgLIABgCQAAgHAFgHQAEgHAGgDQAGgEAFABQAJAAAFAFQAFAGABAJIgBAGIAAAEIgkAAQgBAHADAFQAEAFAHABQAHAAAHgIIAGAFQgEAFgFADQgGACgGAAQgLAAgGgHgAgFgQQgFAEgCAIIAaAAIABgBQAAgGgDgEQgDgFgFAAQgFAAgEAEg");
	this.shape_5.setTransform(109.9179,31.3219);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgOAgIgCAGIgJAAIAOhMIAJAAIgFAdQAHgIAIABQAJAAAEAFQAFAGAAAJIAAAGIgBABQAAAJgEAGQgEAHgFADQgGADgGAAQgJAAgFgHgAgJAAIgEAXQAEAIAIAAQAFABAEgEQAEgDACgGQACgGAAgHQABgGgDgEQgDgEgGAAIAAAAQgHAAgHAIg");
	this.shape_6.setTransform(103.95,30.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgRAcIAKg1IAIAAIgBAFQAGgHAIAAIAEABIgBAJIgEgBQgJAAgFAIIgHAmg");
	this.shape_7.setTransform(99.575,31.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgPAZQgFgEgDgGQgCgHABgHQAAgIAFgGQAEgHAGgEQAGgEAGABQAIAAAFADQAFAEADAGQACAHgBAHIAAAAQgBAIgEAHQgEAGgGAEQgGADgHAAQgHAAgFgDgAgIgOQgGAFgBAJIAAABIAAAHQABAFADAEQADAEAGAAQAEAAADgDQAEgCADgFQADgFABgGIAAgGQgBgHgDgDQgDgEgGAAQgGAAgFAGg");
	this.shape_8.setTransform(94.55,31.3222);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgSAnIAJguIgJAAIABgHIAJAAIABgHQABgIAFgFQAFgFAIABIAHAAIgBAIIgFgBQgFAAgDADQgDADgBAFIgBAGIAMAAIgBAHIgLAAIgJAug");
	this.shape_9.setTransform(90.475,30.1227);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgRAXQgGgFAAgIIAKAAQAAAFADADQADADAFAAQAEAAAEgCQAEgDABgEQAAgFgHgDIgJgCQgMgDAAgKQABgHAGgFQAGgFAIABQAJAAAFAEQAGAFgBAIIgJAAQAAgEgDgDQgDgDgEAAQgEAAgEADQgDACAAAEQgBAEAHADIADABQAKACAEADQAEAEAAAGQAAAFgDAEQgEADgFACQgFACgFAAQgJAAgGgFg");
	this.shape_10.setTransform(82.4521,31.3227);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgSAYQgFgFAAgGQABgJAHgEQAIgFALAAIAKAAIAAgEQABgFgDgDQgCgDgFAAQgFAAgDACQgEADAAAEIgKAAQAAgFAEgEQADgDAGgCQAEgDAGABQAJAAAEAFQAFAFAAAIIgFAaIAAAEIAAAFIAAABIgJAAIgBgDIAAgDQgHAHgIAAQgIAAgEgEgAgIADQgEADgBAFQAAAEACADQACACAFAAQAEAAADgCQAEgCADgEIACgLIgHAAQgIAAgFACg");
	this.shape_11.setTransform(76.825,31.3208);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgKAlIAKg1IAIAAIgJA1gAABgbQAAAAAAgBQAAAAgBAAQAAgBAAgBQAAAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAAAQAAAAAAgBIAFgBQAAAAABAAQAAAAABAAQAAAAABABQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgBAAIgEgBg");
	this.shape_12.setTransform(72.95,30.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgRAcIAKg1IAIAAIgBAFQAGgHAIAAIAEABIgBAJIgEgBQgJAAgFAIIgHAmg");
	this.shape_13.setTransform(69.925,31.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgSAVQgGgIABgLIABgCQAAgHAFgHQAEgHAGgDQAGgEAFABQAJAAAFAFQAFAGABAJIgBAGIAAAEIgkAAQgBAHADAFQAEAFAHABQAHAAAHgIIAGAFQgEAFgFADQgGACgGAAQgLAAgGgHgAgFgQQgFAEgCAIIAaAAIABgBQAAgGgDgEQgDgFgFAAQgFAAgEAEg");
	this.shape_14.setTransform(65.2179,31.3219);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgIAfQgDgEABgHIAFghIgJAAIABgHIAKAAIACgNIAIAAIgCANIAKAAIgBAHIgKAAIgFAhIAAACQABAEADABIAEgBIgBAHIgGABQgFAAgDgDg");
	this.shape_15.setTransform(60.85,30.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgRAXQgGgFAAgIIAKAAQAAAFADADQADADAFAAQAEAAAEgCQAEgDABgEQAAgFgHgDIgJgCQgMgDAAgKQABgHAGgFQAGgFAIABQAJAAAFAEQAGAFgBAIIgJAAQAAgEgDgDQgDgDgEAAQgEAAgEADQgDACAAAEQgBAEAHADIADABQAKACAEADQAEAEAAAGQAAAFgDAEQgEADgFACQgFACgFAAQgJAAgGgFg");
	this.shape_16.setTransform(56.1521,31.3227);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAXAlIgEgTIgeAAIgKATIgLAAIAphJIAJAAIAPBJgAgGAKIAYAAIgGgig");
	this.shape_17.setTransform(49.525,30.375);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FF8C2D").s().p("AoCh1IQFgHIAADzIwFAGg");
	this.shape_18.setTransform(83.5,30.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(4));

	// Layer_4
	this.instance = new lib._16();
	this.instance.setTransform(14,47,0.3781,0.274);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer_3
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(0,0,0,0.227)").s().p("Ao/CLIAAkWIR/AAIAAEWg");
	this.shape_19.setTransform(68.425,31.45);
	this.shape_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_19).wait(1).to({_off:false},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.9,13.2,124.1,113.8);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2818,1.4238,0.5329,0.5329,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2818,-6.9027,0.5329,0.5329,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.9027}},{t:this.shape,p:{y:1.4238}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.3027}},{t:this.shape,p:{y:3.0238}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.3027}},{t:this.shape,p:{y:7.0238}}]},1).wait(2));

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
	this.shape.setTransform(-38.9394,-3.0044,0.7124,0.7883,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2265,-3.0241,0.7124,0.7883,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7883,x:-45.2265,y:-3.0241}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7883,x:-38.9394,y:-3.0044}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7877,x:-45.2195,y:-2.364}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7877,x:-38.9373,y:-2.3443}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7877,x:-45.2195,y:-0.414}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7877,x:-38.9373,y:-0.3943}}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49);


(lib.btnInfo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#735D07").s().p("AgwA4QgSgVAAgjIAAAAQAAgWAIgRQAJgSAPgJQAPgKATABQAegBATAWQASAUAAAiIAAABQAAAWgIASQgIAQgQAKQgPAKgUAAQgdgBgTgUgAgdgoQgMAPAAAaQAAAaAMAOQALAPASAAQATAAAMgPQALgPAAgaQAAgYgLgPQgMgQgTAAQgSAAgLAPg");
	this.shape.setTransform(16.325,-2.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#735D07").s().p("AgUBrIAAiAIgYAAIAAgUIAYAAIAAgOQAAgYANgNQALgNAXgBQAJABAJACIgCAVQgGgCgHAAQgMAAgHAHQgHAIAAANIAAAPIAgAAIAAAUIggAAIAACAg");
	this.shape_1.setTransform(3.925,-5.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#735D07").s().p("AAhBLIAAhhQAAgQgHgHQgIgIgPAAQgLAAgJAHQgKAGgFALIAABoIgZAAIAAiTIAYAAIABATQARgVAaAAQAvAAAAA1IAABgg");
	this.shape_2.setTransform(-9.075,-2.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#735D07").s().p("AgMBkIAAjGIAZAAIAADGg");
	this.shape_3.setTransform(-20.575,-4.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F2C50F").s().p("AnHDZQg4AAgngnIgFgFQghglgCgxIAAipQAAg3AogoQAngnA4AAIOPAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpQAAAVgHAUQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_4.setTransform(-0.35,-3.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#535353").s().p("AnHBcQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAg1QACAxAhAlIAFAFQAnAmA4AAIOPAAQA3AAAogmIAFgFQASgVAJgYQAHgTAAgWIAAA1IAAAEIAAAFQgBAPgEAOIgCACQgJAZgSAUIgFAGQgoAng3AAg");
	this.shape_5.setTransform(-0.35,14);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#735D07").s().p("AgwA4QgSgVAAgiIAAgBQAAgWAIgSQAJgRAPgJQAPgKATAAQAeAAATAWQASAUAAAiIAAACQAAAWgIAQQgIARgQAKQgPAJgUAAQgdABgTgVgAgdgoQgMAPAAAbQAAAZAMAOQALAPASAAQATAAAMgPQALgPAAgaQAAgZgLgPQgMgPgTAAQgSAAgLAPg");
	this.shape_6.setTransform(16.325,0.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#735D07").s().p("AgUBqIAAh/IgYAAIAAgUIAYAAIAAgPQAAgXANgOQALgNAXABQAJgBAJADIgCAUQgGgBgHAAQgMAAgHAHQgHAIAAANIAAAPIAgAAIAAAUIggAAIAAB/g");
	this.shape_7.setTransform(3.925,-3.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#735D07").s().p("AgMBjIAAjGIAZAAIAADGg");
	this.shape_8.setTransform(-20.575,-2.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#535353").s().p("AnHBQQg4AAgngnIgFgGQgagdgHglQgCgJAAgKIAAgdQACAyAhAjIAFAFQAnAoA4AAIOPAAQA3AAAogoIAFgFQASgUAJgYQAHgTAAgWIAAAdIAAAEIAAAFQgBAPgEAOIgCADQgJAYgSAUIgFAGQgoAng3AAg");
	this.shape_9.setTransform(-0.35,15.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#735D07").s().p("AgwA4QgSgVAAgjIAAgBQAAgVAIgRQAJgSAPgJQAPgJATAAQAeAAATAUQASAVAAAiIAAABQAAAXgIARQgIARgQAJQgPAKgUAAQgdAAgTgVgAgdgoQgMAPAAAaQAAAZAMAPQALAPASAAQATAAAMgPQALgPAAgbQAAgYgLgOQgMgQgTAAQgSAAgLAPg");
	this.shape_10.setTransform(16.325,3.4);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#735D07").s().p("AgUBrIAAiAIgYAAIAAgTIAYAAIAAgPQAAgYANgNQALgOAXAAQAJAAAJADIgCAVQgGgCgHAAQgMAAgHAIQgHAGAAAOIAAAQIAgAAIAAATIggAAIAACAg");
	this.shape_11.setTransform(3.925,0.15);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F2C50F").s().p("AnHDZQg4AAgngnIgFgFQgggjgCgvIgBgEIAAgDIAAimQAAg3AogoQAngnA4AAIOPAAQA3AAAoAnQAWAWAKAcQAHAVAAAYIAACpIAAABQAAAVgHATQgJAYgSAVIgFAFQgoAng3AAg");
	this.shape_12.setTransform(-0.35,1.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4,p:{y:-3.875}},{t:this.shape_3,p:{y:-4.75}},{t:this.shape_2,p:{y:-2.325}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4,p:{y:-1.475}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_2,p:{y:0.075}},{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_12},{t:this.shape_3,p:{y:0.85}},{t:this.shape_2,p:{y:3.275}},{t:this.shape_11},{t:this.shape_10}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.4,-25.6,118.1,49.1);


(lib.bg1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.Slots12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.kotakKartu2 = new lib.target();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(127.4,185.15);

	this.tiga = new lib.drop10G10();
	this.tiga.name = "tiga";
	this.tiga.setTransform(797.65,456.25,0.4979,0.4979,0,0,0,160.8,94.8);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop10G9();
	this.dua.name = "dua";
	this.dua.setTransform(797.65,410.35,0.4979,0.4979,0,0,0,160.8,94.8);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop10G6();
	this.satu.name = "satu";
	this.satu.setTransform(797.65,364.9,0.4979,0.4979,0,0,0,160.8,94.8);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.lima = new lib.drop10G5();
	this.lima.name = "lima";
	this.lima.setTransform(797.65,315.15,0.4979,0.4979,0,0,0,160.8,94.8);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop10G4();
	this.empat.name = "empat";
	this.empat.setTransform(797.65,270.85,0.4979,0.4979,0,0,0,160.8,94.8);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.empat},{t:this.lima},{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.kotakKartu2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots12, new cjs.Rectangle(65.5,170.1,812.5,312.1), null);


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


(lib.Pieces12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.lima = new lib.drop10G8();
	this.lima.name = "lima";
	this.lima.setTransform(577.2,456.4,0.4947,0.4947,0,0,0,116.3,42.4);
	new cjs.ButtonHelper(this.lima, 0, 1, 1);

	this.empat = new lib.drop10G7();
	this.empat.name = "empat";
	this.empat.setTransform(577.2,410.25,0.4947,0.4947,0,0,0,116.3,42.5);
	new cjs.ButtonHelper(this.empat, 0, 1, 1);

	this.tiga = new lib.drop10G3();
	this.tiga.name = "tiga";
	this.tiga.setTransform(577.2,364.8,0.4947,0.4947,0,0,0,116.3,42.5);
	new cjs.ButtonHelper(this.tiga, 0, 1, 1);

	this.dua = new lib.drop10G2();
	this.dua.name = "dua";
	this.dua.setTransform(577.2,315.35,0.4947,0.4947,0,0,0,116.3,42.5);
	new cjs.ButtonHelper(this.dua, 0, 1, 1);

	this.satu = new lib.drop10G1();
	this.satu.name = "satu";
	this.satu.setTransform(577.15,270.7,0.4947,0.4947,0,0,0,129.6,53.1);
	new cjs.ButtonHelper(this.satu, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.satu},{t:this.dua},{t:this.tiga},{t:this.empat},{t:this.lima}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces12, new cjs.Rectangle(497.4,244.9,159.60000000000002,237.29999999999998), null);


(lib.infoo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween1("synched",0);

	this.instance_1 = new lib.Tween2("synched",0);
	this.instance_1.setTransform(0,14.45);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween3("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},24).to({state:[{t:this.instance_2}]},25).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:14.45},24).wait(26));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},24).to({_off:true,y:0},25).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-99.2,-9.2,198.5,32.9);


(lib.geser = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween4("synched",0);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(32.5,0);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween6("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},18).to({state:[{t:this.instance_2}]},19).wait(3));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,x:32.5},18).wait(22));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},18).to({_off:true,x:0},19).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-10.4,91.4,20.8);


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


(lib.pp5 = function(mode,startPosition,loop) {
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

	// Layer_6
	this.instance = new lib._28();
	this.instance.setTransform(-263,-259,2.2681,2.002);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgGBHQgWAAgOgMQgOgNAAgUIAXAAQAAAMAHAHQAIAHANAAQALAAAJgFQAKgGABgJQACgPgSgGIgXgHQgegJABgYQABgSAQgMQAPgMAVABQAUAAAOAMQANAMgBATIgXAAQAAgLgGgGQgHgHgLAAQgLAAgJAGQgIAGgBAJQgCAMAQAFIALAEQAYAGAKAIQAJAKAAAPQgBANgIAJQgHAKgNAFQgMAEgMAAIgCAAg");
	this.shape.setTransform(148.3277,152.2763);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgXBGQgTgBgKgNQgJgOACgXIAPhYIAXAAIgPBYIAAALQAAAJAFAFQAFAFAJABQAXABAOgVIARhjIAXAAIgYCIIgVAAIADgNQgQAQgXAAIgCAAg");
	this.shape_1.setTransform(135.274,152.4007);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgVBNQgHgKACgRIAOhUIgZAAIADgSIAZAAIAGgiIAVAAIgFAiIAZAAIgEASIgYAAIgOBUIAAAHQABAJAJAAIALgBIgCATQgIADgIAAQgNgBgHgJg");
	this.shape_2.setTransform(124.125,150.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgQBHQgTAAgLgLQgLgLABgRQABgWASgLQASgNAcAAIAYAAIABgLQACgMgGgHQgGgHgMgBQgMAAgIAGQgJAGgDAKIgXAAQABgMAJgJQAIgJANgFQAMgGAOABQAVAAAMANQAMAMgCAVIgLBDIgBAKIACAOIAAACIgYAAIgBgHIABgIQgTARgTAAIgBAAgAgUAJQgLAHgCAMQgBAKAGAGQAFAHALAAQALAAAJgFQAKgGAHgKIAFgcIgRAAQgVAAgMAHg");
	this.shape_3.setTransform(112.1353,152.2736);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAWBGIAPhZIAAgMQgCgRgTgBQgUAAgPAWIgRBhIgXAAIAYiIIAVAAIgDARQASgUAXAAQAUABAJANQAJANgCAXIgPBZg");
	this.shape_4.setTransform(98.026,152.1494);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAWBGIAPhZIAAgMQgCgRgTgBQgUAAgPAWIgRBhIgXAAIAYiIIAVAAIgDARQASgUAXAAQAUABAJANQAJANgCAXIgPBZg");
	this.shape_5.setTransform(83.926,152.1494);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgbBeIAYiJIAWAAIgXCJgAAEhFQgEgEABgGQAAgGADgEQAEgEAGAAQAGAAAEAEQAEADAAAGQAAAGgEAEQgEAEgGAAQgGAAgEgDg");
	this.shape_6.setTransform(74.625,149.7722);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhCBhIAhi+IAUAAIgCAPQAQgSAYABQAUAAALAOQALAOAAAZIAAAQIgBADQgCAVgJAPQgJARgNAJQgNAIgQgBQgWAAgNgQIgMBDgAgRg4IgLBAQAIATAUAAQAQABAMgOQAMgOAEgaIAAgLQAAgSgHgKQgHgKgNAAIgBgBQgTAAgOAUg");
	this.shape_7.setTransform(63.125,154.7993);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGBHQgWAAgOgMQgOgNAAgUIAXAAQAAAMAHAHQAIAHANAAQALAAAJgFQAKgGABgJQACgPgSgGIgXgHQgegJABgYQABgSAQgMQAPgMAVABQAUAAAOAMQANAMgBATIgXAAQAAgLgGgGQgHgHgLAAQgLAAgJAGQgIAGgBAJQgCAMAQAFIALAEQAYAGAKAIQAJAKAAAPQgBANgIAJQgHAKgNAFQgMAEgMAAIgCAAg");
	this.shape_8.setTransform(43.7277,152.2763);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgXBGQgTgBgKgNQgJgOACgXIAPhYIAXAAIgPBYIAAALQAAAJAFAFQAFAFAJABQAXABAOgVIARhjIAXAAIgYCIIgVAAIADgNQgQAQgXAAIgCAAg");
	this.shape_9.setTransform(30.674,152.4007);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAWBGIAPhZIAAgMQgCgRgTgBQgUAAgPAWIgRBhIgXAAIAYiIIAVAAIgDARQASgUAXAAQAUABAJANQAJANgCAXIgPBZg");
	this.shape_10.setTransform(15.676,152.1494);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgbBeIAYiJIAWAAIgXCJgAAEhFQgEgEABgGQAAgGADgEQAEgEAGAAQAGAAAEAEQAEADAAAGQAAAGgEAEQgEAEgGAAQgGAAgEgDg");
	this.shape_11.setTransform(6.325,149.7722);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgrBGIAYiIIAVAAIgDAQQAOgUAUABQAEAAAHACIgDAWIgKgBQgXAAgLAUIgRBgg");
	this.shape_12.setTransform(-0.9,152.1244);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgHBHQgRAAgMgJQgMgIgFgQQgGgQACgTIABgFQACgUAJgQQAJgPAPgJQAPgJARABQAVAAANAOQANAOAAAWIgVAAQgBgOgHgIQgHgJgMAAQgRgBgMAOQgMAOgDAYIAAADQgBAIAAAJQABAPAIAIQAHAJANAAQAMAAAKgHQAJgHADgMIAWgBQgCANgIALQgJALgMAGQgMAFgMAAIgCAAg");
	this.shape_13.setTransform(-12.1911,152.2755);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgIBHQgRAAgNgJQgMgJgGgQQgFgQABgTQACgUAKgRQAJgRAQgJQAPgKARABQARAAANAJQAMAJAGAQQAGAQgCATIAAACQgDAUgJARQgKAQgPAJQgPAIgPAAIgCAAgAgVglQgNAOgCAXIgBACQgBAIABAJQACAPAHAJQAIAJANAAQAKABAKgGQAKgGAGgNQAHgMACgPIAAgSQgBgQgIgJQgIgJgNAAIgBAAQgQAAgMAOg");
	this.shape_14.setTransform(-26.4661,152.2751);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgcBhIAhjBIAYAAIghDBg");
	this.shape_15.setTransform(-36.45,149.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgbBeIAYiJIAWAAIgXCJgAAEhFQgEgEABgGQAAgGADgEQAEgEAGAAQAGAAAEAEQAEADAAAGQAAAGgEAEQgEAEgGAAQgGAAgEgDg");
	this.shape_16.setTransform(-42.775,149.7722);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgVBNQgHgKACgRIAOhUIgZAAIADgSIAZAAIAGgiIAVAAIgFAiIAZAAIgEASIgYAAIgOBUIAAAHQABAJAJAAIALgBIgCATQgIADgIAAQgNgBgHgJg");
	this.shape_17.setTransform(-49.925,150.725);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AhLBcIAgi3IA9AAQAdAAAPAPQAQAPgCAZQgDAagSAPQgTAPgfAAIgrAAIgNBIgAgjAAIAoAAQAUAAAMgJQANgJACgSQACgQgJgJQgIgKgQgBIgrAAg");
	this.shape_18.setTransform(-62.3136,149.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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


(lib.pp4 = function(mode,startPosition,loop) {
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
	this.instance = new lib._36();
	this.instance.setTransform(-252,-258,0.8504,0.7488);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape.setTransform(144.5596,153.9006);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgvBNIAaiVIAXAAIgDARQAQgVAVABIAMACIgDAYIgMgCQgYAAgNAWIgSBqg");
	this.shape_1.setTransform(133.3,153.7494);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAABsQgagBgNgUIgGASIgWAAIAkjUIAaAAIgQBPQATgUAYABQAWAAAMAQQAMAPAAAaIgBASIAAACQgCAXgKATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAGgRQAFgRAAgSQABgTgHgLQgHgLgPAAIgBAAQgWAAgQAXg");
	this.shape_2.setTransform(119.7,150.9013);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_3.setTransform(104.3096,153.9006);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgnBEQgNgJgGgRQgGgRACgVIABgGQACgWAKgRQAKgRAQgKQAQgJATAAQAXABAOAPQAPAQAAAXIgYAAQAAgPgIgJQgIgJgNgBQgTAAgNAPQgNAPgDAaIAAADQgBAJAAAKQABAQAIAJQAJAKAOAAQAMABALgJQALgIADgNIAYAAQgCAOgJAMQgJALgOAHQgOAGgOAAQgTAAgNgKg");
	this.shape_4.setTransform(90.1765,153.8988);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAVAAQAYAAAOANQAOANgBAVIgZAAQABgLgIgHQgHgIgNAAQgMAAgJAHQgIAGgCAKQgCANASAGIAMADQAaAIAKAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgPAAQgXAAgQgOg");
	this.shape_5.setTransform(75.3001,153.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_6.setTransform(53.3096,153.9006);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_7.setTransform(43.075,151.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgvBNIAaiVIAXAAIgDARQAQgVAVABIAMACIgDAYIgMgCQgYAAgNAWIgSBqg");
	this.shape_8.setTransform(35.2,153.7494);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgYBMQgWgBgKgOQgLgPADgaIAQhgIAZAAIgQBhIAAALQAAAKAGAGQAFAGAJAAQAaABAPgXIAThsIAZAAIgaCVIgYAAIADgPQgRATgZAAIgBgBg");
	this.shape_9.setTransform(22.5917,154.0507);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAYBqIAQhiIAAgMQgCgTgVAAQgWgBgQAYIgTBqIgZAAIAljTIAZAAIgPBRQATgVAZAAQAVAAALAOQAKAOgDAZIgQBig");
	this.shape_10.setTransform(6.325,150.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgXBUQgHgLABgSIAPhcIgaAAIAEgUIAZAAIAHglIAYAAIgHAlIAcAAIgDAUIgbAAIgQBcIAAAHQACALAJAAIANgCIgCAVQgKADgHgBQgQABgHgLg");
	this.shape_11.setTransform(-4.75,152.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgJBOQgTAAgNgLQgOgKgGgRQgGgRACgUQACgXAKgTQALgSAQgKQARgKATAAQATAAANAKQAOAKAGASQAHASgDAUIAAADQgCAVgLASQgKARgRAKQgQAKgRAAIgCAAgAgXgoQgOAPgDAZIAAADQgBAIABAKQABAQAJAKQAIAJAOABQAMAAAKgGQALgHAHgNQAHgOACgPIABgVQgCgRgJgKQgIgJgOgBIgCAAQgRAAgNAQg");
	this.shape_12.setTransform(-17.9138,153.9001);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgeBqIAkjTIAZAAIgkDTg");
	this.shape_13.setTransform(-28.8,150.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgJBOQgTAAgNgLQgOgKgGgRQgGgRACgUQACgXAKgTQALgSAQgKQARgKATAAQATAAANAKQAOAKAGASQAHASgDAUIAAADQgCAVgLASQgKARgRAKQgQAKgRAAIgCAAgAgXgoQgOAPgDAZIAAADQgBAIABAKQABAQAJAKQAIAJAOABQAMAAAKgGQALgHAHgNQAHgOACgPIABgVQgCgRgJgKQgIgJgOgBIgCAAQgRAAgNAQg");
	this.shape_14.setTransform(-40.6138,153.9001);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAgBlIAQheIhhAAIgRBeIgaAAIAjjJIAaAAIgPBXIBhAAIAQhXIAaAAIgjDJg");
	this.shape_15.setTransform(-58.05,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_6
	this.instance = new lib.Bitmap122();
	this.instance.setTransform(-248,-257,2.2277,2.2092);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA/BGIAPhZQABgHgBgFQgDgSgUAAQgMAAgKAIQgLAIgDANIgPBaIgWAAIAPhZQABgOgFgIQgGgIgNAAQgVAAgNAUIgRBjIgXAAIAXiIIAWAAIgDAPQARgSAZAAQANAAAIAGQAJAGAEAKQATgWAaAAQAVABAKANQAJANgCAXIgPBZg");
	this.shape.setTransform(133.576,152.1493);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgXBGQgTgBgKgNQgJgOACgXIAPhYIAXAAIgPBYIAAALQAAAJAFAFQAFAFAJABQAXABAOgVIARhjIAXAAIgYCIIgVAAIADgNQgQAQgXAAIgCAAg");
	this.shape_1.setTransform(116.374,152.4007);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGBHQgWAAgOgMQgOgNAAgUIAXAAQAAAMAHAHQAIAHANAAQALAAAJgFQAKgGABgJQACgPgSgGIgXgHQgegJABgYQABgSAQgMQAPgMAVABQAUAAAOAMQANAMgBATIgXAAQAAgLgGgGQgHgHgLAAQgLAAgJAGQgIAGgBAJQgCAMAQAFIALAEQAYAGAKAIQAJAKAAAPQgBANgIAJQgHAKgNAFQgMAEgMAAIgCAAg");
	this.shape_2.setTransform(102.1777,152.2763);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgIBHQgRAAgNgJQgMgJgGgQQgFgQABgTQACgUAKgRQAJgRAQgJQAPgKARABQARAAANAJQAMAJAGAQQAGAQgCATIAAACQgDAUgJARQgKAQgPAJQgPAIgPAAIgCAAgAgVglQgNAOgCAXIgBACQgBAIABAJQACAPAHAJQAIAJANAAQAKABAKgGQAKgGAGgNQAHgMACgPIAAgSQgBgQgIgJQgIgJgNAAIgBAAQgQAAgMAOg");
	this.shape_3.setTransform(88.4339,152.2751);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVBNQgHgKACgRIAOhUIgZAAIADgSIAZAAIAGgiIAVAAIgFAiIAZAAIgEASIgYAAIgOBUIAAAHQABAJAJAAIALgBIgCATQgIADgIAAQgNgBgHgJg");
	this.shape_4.setTransform(77.525,150.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgEBHQgZAAgPgTQgOgSACgdIAAgFQADgUAKgRQAKgRAOgIQAOgJAQABQAVAAAMAOQAMANABAYIAAAQIgBAKIhZAAQgDASAJANQAIAOARAAQATABASgTIANALQgJAMgNAIQgNAGgPAAIgCAAgAgOgpQgLAKgGATIBCABIAAgDQADgQgIgKQgHgLgNAAIgBAAQgNAAgKAKg");
	this.shape_5.setTransform(66.2212,152.2753);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgGBHQgWAAgOgMQgOgNAAgUIAXAAQAAAMAHAHQAIAHANAAQALAAAJgFQAKgGABgJQACgPgSgGIgXgHQgegJABgYQABgSAQgMQAPgMAVABQAUAAAOAMQANAMgBATIgXAAQAAgLgGgGQgHgHgLAAQgLAAgJAGQgIAGgBAJQgCAMAQAFIALAEQAYAGAKAIQAJAKAAAPQgBANgIAJQgHAKgNAFQgMAEgMAAIgCAAg");
	this.shape_6.setTransform(52.5777,152.2763);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgQBHQgTAAgLgLQgLgLABgRQABgWASgLQASgNAcAAIAYAAIABgLQACgMgGgHQgGgHgMgBQgMAAgIAGQgJAGgDAKIgXAAQABgMAJgJQAIgJANgFQAMgGAOABQAVAAAMANQAMAMgCAVIgLBDIgBAKIACAOIAAACIgYAAIgBgHIABgIQgTARgTAAIgBAAgAgUAJQgLAHgCAMQgBAKAGAGQAFAHALAAQALAAAJgFQAKgGAHgKIAFgcIgRAAQgVAAgMAHg");
	this.shape_7.setTransform(32.5353,152.2736);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AA/BGIAPhZQABgHgBgFQgDgSgUAAQgMAAgKAIQgLAIgDANIgPBaIgWAAIAPhZQABgOgFgIQgGgIgNAAQgVAAgNAUIgRBjIgXAAIAXiIIAWAAIgDAPQARgSAZAAQANAAAIAGQAJAGAEAKQATgWAaAAQAVABAKANQAJANgCAXIgPBZg");
	this.shape_8.setTransform(14.326,152.1493);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgEBHQgZAAgPgTQgOgSACgdIAAgFQADgUAKgRQAKgRAOgIQAOgJAQABQAVAAAMAOQAMANABAYIAAAQIgBAKIhZAAQgDASAJANQAIAOARAAQATABASgTIANALQgJAMgNAIQgNAGgPAAIgCAAgAgOgpQgLAKgGATIBCABIAAgDQADgQgIgKQgHgLgNAAIgBAAQgNAAgKAKg");
	this.shape_9.setTransform(-2.8788,152.2753);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgYBjQgTgBgLgOQgLgPgBgYIAAgSQADgVAJgQQAJgRANgIQANgIAQAAQAWABANAQIANhIIAXAAIgiDCIgVAAIACgOQgPARgXAAIgBAAgAgWgPQgLAJgFAOQgFAQgBAQQAAASAHALQAHAKANAAQATABAPgVIALg/QgHgSgUgBIgBAAQgNAAgJAIg");
	this.shape_10.setTransform(-16.2583,149.5257);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgQBHQgTAAgLgLQgLgLABgRQABgWASgLQASgNAcAAIAYAAIABgLQACgMgGgHQgGgHgMgBQgMAAgIAGQgJAGgDAKIgXAAQABgMAJgJQAIgJANgFQAMgGAOABQAVAAAMANQAMAMgCAVIgLBDIgBAKIACAOIAAACIgYAAIgBgHIABgIQgTARgTAAIgBAAgAgUAJQgLAHgCAMQgBAKAGAGQAFAHALAAQALAAAJgFQAKgGAHgKIAFgcIgRAAQgVAAgMAHg");
	this.shape_11.setTransform(-31.3647,152.2736);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgbBeIAYiJIAWAAIgXCJgAAEhFQgEgEABgGQAAgGADgEQAEgEAGAAQAGAAAEAEQAEADAAAGQAAAGgEAEQgEAEgGAAQgGAAgEgDg");
	this.shape_12.setTransform(-40.775,149.7722);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AhJBcIAgi3IAvAAQAXAAAQALQARALAHAUQAHAUgDAYIgBAJQgGApgaAYQgZAXgmAAgAgtBIIAXAAQAaAAATgQQATgRAFgdQAFgXgCgQQgCgTgLgMQgLgLgTgBIgbAAg");
	this.shape_13.setTransform(-52.6671,149.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.instance = new lib._32();
	this.instance.setTransform(-256,-264,0.8275,0.8055);

	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.exit},{t:this.instance}]},12).to({state:[]},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgJAKQgEgDAAgHQAAgEAEgEQAEgFAFAAQAGgBAEAFQAEAEAAAFQAAAGgEAEQgEAEgGAAIgBAAQgFAAgDgEg");
	this.shape.setTransform(109.175,157.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhCBhIAhi+IAUAAIgCAPQAQgSAYABQAUAAALAOQALAOAAAZIAAAQIgBADQgCAVgJAPQgJARgNAJQgNAIgQgBQgWAAgNgQIgMBDgAgRg4IgLBAQAIATAUAAQAQABAMgOQAMgOAEgaIAAgLQAAgSgHgKQgHgKgNAAIgBgBQgTAAgOAUg");
	this.shape_1.setTransform(98.975,154.7993);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgGBHQgWAAgOgMQgOgNAAgUIAXAAQAAAMAHAHQAIAHANAAQALAAAJgFQAKgGABgJQACgPgSgGIgXgHQgegJABgYQABgSAQgMQAPgMAVABQAUAAAOAMQANAMgBATIgXAAQAAgLgGgGQgHgHgLAAQgLAAgJAGQgIAGgBAJQgCAMAQAFIALAEQAYAGAKAIQAJAKAAAPQgBANgIAJQgHAKgNAFQgMAEgMAAIgCAAg");
	this.shape_2.setTransform(85.9777,152.2763);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAVBFIgVg0IgnA0IgcAAIA5hGIghhDIAZAAIAUAyIAmgyIAcAAIg3BEIAhBFg");
	this.shape_3.setTransform(66.65,152.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgbBeIAYiJIAWAAIgXCJgAAEhFQgEgEABgGQAAgGADgEQAEgEAGAAQAGAAAEAEQAEADAAAGQAAAGgEAEQgEAEgGAAQgGAAgEgDg");
	this.shape_4.setTransform(57.675,149.7722);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgrBGIAYiIIAVAAIgCAQQAOgUATABQAFAAAGACIgCAWIgMgBQgVAAgMAUIgRBgg");
	this.shape_5.setTransform(50.45,152.1244);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVBNQgHgKACgRIAOhUIgZAAIADgSIAZAAIAGgiIAVAAIgFAiIAZAAIgEASIgYAAIgOBUIAAAHQABAJAJAAIALgBIgCATQgIADgIAAQgNgBgHgJg");
	this.shape_6.setTransform(41.875,150.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgIBHQgRAAgNgJQgMgJgGgQQgFgQABgTQACgUAKgRQAJgRAQgJQAPgKARABQARAAANAJQAMAJAGAQQAGAQgCATIAAACQgDAUgJARQgKAQgPAJQgPAIgPAAIgCAAgAgVglQgNAOgCAXIgBACQgBAIABAJQACAPAHAJQAIAJANAAQAKABAKgGQAKgGAGgNQAHgMACgPIAAgSQgBgQgIgJQgIgJgNAAIgBAAQgQAAgMAOg");
	this.shape_7.setTransform(29.8339,152.2751);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgbBeIAYiJIAWAAIgXCJgAAEhFQgEgEABgGQAAgGADgEQAEgEAGAAQAGAAAEAEQAEADAAAGQAAAGgEAEQgEAEgGAAQgGAAgEgDg");
	this.shape_8.setTransform(19.825,149.7722);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAWBhIAPhaIAAgLQgCgRgTgBQgUAAgPAWIgRBhIgXAAIAijBIAXAAIgOBKQARgUAXABQAUAAAJANQAJANgCAWIgPBag");
	this.shape_9.setTransform(8.776,149.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AhCBhIAhi+IAUAAIgCAPQAQgSAYABQAUAAALAOQALAOAAAZIAAAQIgBADQgCAVgJAPQgJARgNAJQgNAIgQgBQgWAAgNgQIgMBDgAgRg4IgLBAQAIATAUAAQAQABAMgOQAMgOAEgaIAAgLQAAgSgHgKQgHgKgNAAIgBgBQgTAAgOAUg");
	this.shape_10.setTransform(-5.725,154.7993);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgNBfQgSgBgNgHQgNgJgIgPQgHgQgBgUQgBgQAFgVQAEgWAKgTQAKgSAPgLQAUgPAZABQAbAAAPATQAQASABAfQABAOgEATQgDAVgIARQgJASgMAMQgWAUgdAAIgBAAgAgQhAQgNAKgJATQgJATgCAcIAAAJQgBAZAKAOQAJAOATAAQAXABAQgSQAPgSAGggIADgbQAAgZgJgOQgKgOgTAAIgCgBQgPAAgMAKg");
	this.shape_11.setTransform(-20.456,149.8998);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(13));

	// Layer_5
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_6
	this.instance = new lib._16();
	this.instance.setTransform(-241,-244,1.7129,1.2411);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape.setTransform(136.775,151.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAVAAQAYAAAOANQAOANgBAVIgZAAQABgLgIgHQgHgIgNAAQgMAAgJAHQgIAGgCAKQgCANASAGIAMADQAaAIAKAJQALAKgBAQQgBAPgIAKQgJAKgNAGQgOAFgPAAQgXAAgQgOg");
	this.shape_1.setTransform(125.7001,153.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_2.setTransform(111.5914,153.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAABsQgagBgOgUIgEASIgYAAIAljUIAZAAIgOBPQARgUAZABQAWAAAMAQQAMAPABAaIgCASIAAACQgDAXgJATQgKASgOAJQgNAJgQAAIgCAAgAgYgCIgLBAQAIAXAXABQAOAAALgJQALgJAFgRQAGgRABgSQAAgTgHgLQgIgLgOAAIgBAAQgWAAgQAXg");
	this.shape_3.setTransform(95.8,150.9013);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgvBNIAaiVIAXAAIgCARQAOgVAWABIAMACIgDAYIgLgCQgZAAgMAWIgTBqg");
	this.shape_4.setTransform(84.3,153.7494);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgJBOQgTAAgNgLQgOgKgGgRQgGgRACgUQACgXAKgTQALgSAQgKQARgKATAAQATAAANAKQAOAKAGASQAHASgDAUIAAADQgCAVgLASQgKARgRAKQgQAKgRAAIgCAAgAgXgoQgOAPgDAZIAAADQgBAIABAKQABAQAJAKQAIAJAOABQAMAAAKgGQALgHAHgNQAHgOACgPIABgVQgCgRgJgKQgIgJgOgBIgCAAQgRAAgNAQg");
	this.shape_5.setTransform(70.9862,153.9001);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgxBsIAWiBIgXAAIAEgUIAXAAIACgSQAEgWAOgNQANgNAXAAQAHAAALACIgDAWIgOgCQgNAAgIAIQgIAIgCANIgCAPIAfAAIgDAUIgfAAIgWCBg");
	this.shape_6.setTransform(60.175,150.5991);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AguBAQgPgOAAgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTASgOQARgMAVAAQAXAAAOANQAOANAAAVIgZAAQAAgLgHgHQgHgIgNAAQgMAAgJAHQgJAGgBAKQgCANASAGIAMADQAZAIALAJQALAKgBAQQgBAPgIAKQgIAKgOAGQgOAFgPAAQgYAAgPgOg");
	this.shape_7.setTransform(39.1001,153.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgSBOQgUgBgMgMQgNgMABgTQACgYATgMQAUgNAfAAIAaAAIABgMQACgOgHgHQgGgIgOgBQgMAAgJAHQgKAGgCALIgaAAQACgNAJgKQAJgKAOgGQANgFAPAAQAXAAANAOQANAOgCAWIgMBKIgBAKQAAAIACAHIAAADIgaAAIgBgIIABgIQgUATgWAAIgBAAgAgWAJQgMAIgCAOQgBAKAGAHQAGAHAMAAQAMABAKgGQALgGAHgLIAGgfIgTAAQgXAAgNAHg");
	this.shape_8.setTransform(24.1096,153.9006);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgdBmIAaiUIAYAAIgZCUgAAFhMQgEgEAAgGQAAgHAEgEQAEgEAGAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHABQgGAAgEgFg");
	this.shape_9.setTransform(13.825,151.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgvBNIAaiVIAXAAIgDARQAQgVAVABIAMACIgDAYIgMgCQgYAAgNAWIgSBqg");
	this.shape_10.setTransform(5.95,153.7494);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgwA5QgQgUADggIABgFQACgVALgTQALgSAPgKQAQgJARAAQAXAAANAQQAOAPABAZQAAAJgBAJIgBAKIhhAAQgDAVAKAOQAJAOASABQAVABATgVIAOAMQgJAOgPAHQgPAIgRAAQgcgBgQgUgAgPguQgMALgHAXIBIAAIABgDQACgRgIgMQgIgLgOgBIgCAAQgNAAgLAKg");
	this.shape_11.setTransform(-6.5086,153.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgXBUQgIgLACgSIAPhcIgaAAIAEgUIAaAAIAGglIAYAAIgHAlIAcAAIgEAUIgbAAIgPBcIAAAHQABALALAAIALgCIgBAVQgKADgHgBQgQABgHgLg");
	this.shape_12.setTransform(-18.05,152.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AguBAQgQgOABgVIAZAAQAAANAIAHQAIAIAOAAQANAAAKgGQAKgGABgLQACgPgTgGIgZgIQghgLABgaQABgTARgOQASgMAWAAQAXAAANANQAOANAAAVIgZAAQAAgLgHgHQgHgIgMAAQgNAAgJAHQgJAGgBAKQgCANASAGIALADQAaAIALAJQALAKgBAQQAAAPgJAKQgJAKgNAGQgOAFgOAAQgZAAgPgOg");
	this.shape_13.setTransform(-30.4999,153.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AA8BlIgJg1IhRAAIgcA1IgbAAIBsjJIAXAAIAoDJgAgTAbIBCAAIgRheg");
	this.shape_14.setTransform(-47.975,151.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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
	this.exit = new lib.btnEit();
	this.exit.name = "exit";
	this.exit.setTransform(447.85,-273.6,0.231,0.231,0,0,0,127.9,127.7);
	this.exit._off = true;

	this.timeline.addTween(cjs.Tween.get(this.exit).wait(12).to({_off:false},0).to({_off:true},1).wait(12));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgLALQgEgEAAgHQAAgFAEgFQAEgEAHAAQAHAAAFAEQAEAFAAAFQAAAHgEAEQgFAEgHAAQgHAAgEgEg");
	this.shape.setTransform(-299,105.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgtBYQgSgPAAgZIAaAAQAAAPAKAKQALAKAQAAQASAAALgKQAKgKAAgSQgBgSgKgJQgLgJgUgBIgTAAIAAgUIATAAQASAAAKgJQALgKAAgPQAAgkgkAAQgQAAgJAKQgKAJAAAQIgaAAQAAgYASgQQARgQAaAAQAcAAARAPQAQAPAAAbQAAANgJANQgIAMgPAGQARAEAJANQAJAMAAARQAAAcgRAQQgTAQgcAAQgcAAgRgQg");
	this.shape_1.setTransform(-310.85,96.525);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgLALQgEgEAAgHQAAgFAEgFQAEgEAHAAQAHAAAFAEQAEAFAAAFQAAAHgEAEQgFAEgHAAQgHAAgEgEg");
	this.shape_2.setTransform(-299,39.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Ag/BmIAAgSIBFhOQAPgQAGgLQAGgMAAgLQAAgQgJgKQgKgKgPAAQgTAAgLALQgLAKAAAUIgZAAQAAgcASgRQASgRAeAAQAbAAARAOQAQAPAAAZQAAAdgmApIg2A6IBlAAIAAAVg");
	this.shape_3.setTransform(-310.45,30.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgLALQgEgEAAgHQAAgFAEgFQAEgEAHAAQAHAAAFAEQAEAFAAAFQAAAHgEAEQgFAEgHAAQgHAAgEgEg");
	this.shape_4.setTransform(-299,-79.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AANBlIAAiqIgzATIAAgXIBJgcIAEAAIAADKg");
	this.shape_5.setTransform(-312.325,-88.45);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-60.65,34.8,0.9279,0.9279,0,0,0,-0.1,0);
	this.instance.alpha = 0.75;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AAiBNIAAhjQgBgQgHgIQgIgIgPAAQgLAAgKAHQgJAHgGAKIAABrIgZAAIAAiWIAYAAIABATQARgVAbAAQAvAAABA2IAABig");
	this.shape_6.setTransform(300.75,98.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgEgBgMQgTATgYAAQgWAAgNgNgAgjAeQAAAMAIAGQAIAIAMgBQALAAALgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_7.setTransform(285.1,99.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAiBNIAAhjQgBgQgHgIQgHgIgQAAQgLAAgKAHQgJAHgGAKIAABrIgZAAIAAiWIAYAAIABATQARgVAbAAQAvAAABA2IAABig");
	this.shape_8.setTransform(269.6,98.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgEgBgMQgTATgXAAQgXAAgNgNgAgjAeQAAAMAIAGQAIAIAMgBQALAAAMgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_9.setTransform(253.95,99.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACBIANgRIAugxIAgAAIg6A+IBABYg");
	this.shape_10.setTransform(239.95,95.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgLQgIgMAAgNIAaAAQABANAJAIQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgFgGgJQgFgIAAgLQAAgTAPgMQAQgNAXAAQAaAAAPAOQAQANAAAUIgaAAQAAgKgIgIQgJgHgOAAQgNAAgIAFQgIAGAAAKQAAAJAIAGQAHAEASAFQATADAMAHQAMAEAGAJQAGAJAAAMQAAATgQAMQgQANgaAAQgRAAgOgHg");
	this.shape_11.setTransform(217.425,99.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQANgGAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgEgCgMQgSATgXAAQgWAAgOgNgAgjAeQAAAMAIAGQAIAIAMgBQAMAAALgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_12.setTransform(202.35,99.05);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_13.setTransform(189.65,97.375);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAaAAAPANQAOANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgEgBgMQgSATgZAAQgWAAgOgNgAgjAeQAAAMAIAGQAIAIANgBQAKAAALgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_14.setTransform(177.65,99.05);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACBIAOgRIAtgxIAfAAIg5A+IBABYg");
	this.shape_15.setTransform(156.65,95.9);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQANgGAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgEgCgMQgSATgXAAQgWAAgOgNgAgjAeQAAAMAIAGQAIAIAMgBQAMAAALgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_16.setTransform(140.7,99.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_17.setTransform(128,97.375);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgwA4QgTgUAAgkIAAAAQAAgXAJgRQAIgRAQgKQAPgKATAAQAfAAATAWQASAUAAAjIAAABQAAAXgIARQgIARgQAKQgQAKgUAAQgdAAgTgWgAgegpQgLAQAAAaQAAAaALAPQAMAPASAAQAUAAALgPQAMgQAAgaQAAgZgMgQQgMgPgTABQgSgBgMAPg");
	this.shape_18.setTransform(115.675,99.05);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACBIAOgRIAtgxIAfAAIg5A+IBABYg");
	this.shape_19.setTransform(101.3,95.9);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQANgGAQAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgEgBgMQgTATgXAAQgXAAgNgNgAgjAeQAAAMAIAGQAIAIAMgBQALAAAMgGQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_20.setTransform(78.35,99.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AguBWQgRgVAAgjIAAgBQAAgiARgUQAQgWAbAAQAZAAAPASIAAhOIAaAAIAADUIgXAAIgBgQQgQATgaAAQgaAAgRgWgAgagLQgLAOAAAcQAAAaALAPQALAOARAAQAZAAAKgWIAAhEQgLgVgXAAQgSAAgLAOg");
	this.shape_21.setTransform(62.35,96.05);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAGQAIAIANgBQALAAAKgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_22.setTransform(46.9,99.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("Ag+BpIAAjOIAXAAIABAQQAQgTAbAAQAbAAAQAUQAPAVAAAkIAAACQAAAigPAVQgQAVgbAAQgaAAgQgSIAABIgAglg+IAABHQAMAVAYAAQARAAALgPQALgPAAgcQAAgZgLgPQgLgOgSAAQgXAAgMAUg");
	this.shape_23.setTransform(31.475,101.775);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAhBNIAAhjQAAgQgHgIQgIgIgPAAQgMAAgJAHQgJAHgFAKIAABrIgaAAIAAiWIAYAAIABATQARgVAbAAQAwAAAAA2IAABig");
	this.shape_24.setTransform(8.45,98.9);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAGQAIAIANgBQAKAAALgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_25.setTransform(-7.2,99.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACBIANgRIAugxIAfAAIg5A+IBABYg");
	this.shape_26.setTransform(-21.2,95.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgQARIAAA1IgaAAIAAjVIAaAAIAACBIANgRIAugxIAfAAIg5A+IBABYg");
	this.shape_27.setTransform(-35.6,95.9);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AguA/QgMgOAAgcIAAhhIAZAAIAABhQAAAiAcAAQAcAAALgXIAAhsIAZAAIAACWIgZAAIAAgQQgPATgcgBQgYABgNgOg");
	this.shape_28.setTransform(-51.6,99.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgcCCIAAgUQAFABAHAAQAIAAAGgFQACgFAAgLIAAinIAaAAIAACmQAAAsgmgBQgIABgIgDgAAChrQgDgEAAgGQAAgGADgEQAEgFAHABQAIAAAEADQADAFAAAGQAAAGgDAEQgEAFgIAAQgHAAgEgFg");
	this.shape_29.setTransform(-64.2,99.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AAhBNIAAhjQAAgQgHgIQgIgIgPAAQgMAAgJAHQgJAHgFAKIAABrIgaAAIAAiWIAYAAIABATQARgVAbAAQAwAAAAA2IAABig");
	this.shape_30.setTransform(-73.9,98.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AguA/QgMgOAAgcIAAhhIAaAAIAABhQgBAiAcAAQAdAAAJgXIAAhsIAaAAIAACWIgZAAIAAgQQgPATgcgBQgYABgNgOg");
	this.shape_31.setTransform(-89.55,99.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_32.setTransform(-102.4,97.375);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_33.setTransform(-109.975,96.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AguBWQgRgVAAgjIAAgBQAAgiARgUQARgWAaAAQAZAAAPASIAAhOIAaAAIAADUIgXAAIgCgQQgPATgaAAQgaAAgRgWgAgagLQgLAOAAAcQAAAaALAPQAKAOASAAQAZAAAKgWIAAhEQgLgVgYAAQgSAAgKAOg");
	this.shape_34.setTransform(-121.8,96.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgsA6QgTgVAAghIAAgEQAAgWAJgRQAIgSAQgKQAPgKARAAQAdAAARAUQAPASAAAlIAAAKIhkAAQABAWAMANQANAOARAAQAOAAAKgFQAJgHAHgJIAPANQgSAdgmAAQgdAAgUgUgAgXgsQgLALgCAVIBKAAIAAgDQgBgTgKgLQgJgKgQAAQgOgBgLAMg");
	this.shape_35.setTransform(-143.65,99.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("ABPBNIAAhiQABgQgIgJQgHgHgRgBQgPAAgKAJQgIAIgCAPIAABjIgZAAIAAhiQAAghggAAQgaABgIAVIAABtIgaAAIAAiWIAYAAIABARQAQgUAcABQAfgBALAZQAHgLANgGQALgIARABQAygBAAA1IAABkg");
	this.shape_36.setTransform(-163.7,98.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAGQAIAIANgBQALAAAKgGQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_37.setTransform(-183.95,99.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgLQALgKAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgUAAgkQAAgkAQgUQAQgVAbAAQAaAAAQAUIABgRIAXAAIAACRQAAAegRAQQgRARgdAAQgQAAgPgHgAgahFQgLAPAAAcQAAAaALAOQAKAOASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAOg");
	this.shape_38.setTransform(-199.975,101.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgjBNIAAiWIAZAAIAAASQAMgVAXABQAHAAAEABIAAAZIgMgBQgZAAgJAVIAABqg");
	this.shape_39.setTransform(-218.625,98.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgwA4QgTgUAAgkIAAAAQAAgXAJgRQAIgRAQgKQAPgKATAAQAfAAATAWQASAUAAAjIAAABQAAAXgIARQgIARgQAKQgQAKgUAAQgdAAgTgWgAgegpQgLAQAAAaQAAAaALAPQAMAPASAAQAUAAALgPQAMgQAAgaQAAgZgMgQQgMgPgTABQgSgBgMAPg");
	this.shape_40.setTransform(-232.325,99.05);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AAgBrIgzhGIgRARIAAA1IgZAAIAAjVIAZAAIAACBIAPgRIAtgxIAgAAIg6A+IBABYg");
	this.shape_41.setTransform(-246.7,95.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgjBgQgSgIgKgOQgKgOABgSIAbAAQAAATANAKQANALAWAAQAVAAALgJQALgIAAgPQAAgPgKgIQgKgIgagIQgjgKgQgNQgPgPAAgVQAAgYATgPQATgQAdAAQAWAAAQAIQAQAIAJAOQAJAOAAARIgbAAQAAgSgLgLQgMgKgWAAQgSAAgLAJQgLAIAAAQQAAAMALAJQAKAIAYAHQAZAHAOAIQAPAIAGAMQAIALgBAPQAAAZgTAPQgTAPggAAQgUAAgSgIg");
	this.shape_42.setTransform(-263.2,96.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgsA6QgTgUAAgiIAAgEQAAgWAJgRQAIgSAQgKQAPgKARAAQAdAAARAUQAPASAAAlIAAAJIhkAAQABAXAMANQANAOARAAQAOAAAKgFQAJgHAHgJIAPANQgSAdgmAAQgdAAgUgUgAgXgtQgLAMgCAVIBKAAIAAgDQgBgTgKgLQgJgKgQAAQgOgBgLALg");
	this.shape_43.setTransform(203.75,36.6);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("ABPBMIAAhhQABgQgIgJQgHgHgRgBQgPAAgKAJQgIAJgCAOIAABiIgZAAIAAhhQAAghggAAQgaABgIAVIAABsIgaAAIAAiVIAYAAIABARQAQgUAcAAQAfAAALAZQAHgLANgGQALgIARAAQAyAAAAA1IAABjg");
	this.shape_44.setTransform(183.7,36.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAHQAIAGANAAQALABAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_45.setTransform(163.45,36.6);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgKQALgLAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgUAAgkQAAgkAQgUQAQgVAbAAQAaAAAQAUIABgRIAXAAIAACRQAAAdgRARQgRARgdAAQgQAAgPgHgAgahEQgLAOAAAcQAAAaALAOQAKAOASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAPg");
	this.shape_46.setTransform(147.425,39.4);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_47.setTransform(129.375,33.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgQQAQAVAYAAQASAAAKgKQALgLAAgTIAAgNQgQASgaAAQgaAAgQgWQgQgUAAgkQAAgkAQgUQAQgVAbAAQAaAAAQAUIABgRIAXAAIAACRQAAAdgRARQgRARgdAAQgQAAgPgHgAgahEQgLAOAAAcQAAAaALAOQAKAOASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAPg");
	this.shape_48.setTransform(117.625,39.4);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgIgQAAQgLAAgKAHQgJAHgGAKIAABqIgZAAIAAiVIAYAAIABATQARgVAbgBQAvAAABA3IAABhg");
	this.shape_49.setTransform(102.2,36.45);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AguBBQgPgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgEgBgMQgTATgXAAQgXAAgNgNgAgjAeQAAAMAIAHQAIAGAMAAQALABAMgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_50.setTransform(86.55,36.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgMBqIAAjUIAZAAIAADUg");
	this.shape_51.setTransform(75.4,33.45);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AguA/QgMgOAAgcIAAhhIAaAAIAABgQAAAjAbAAQAcAAAKgXIAAhsIAaAAIAACVIgZAAIAAgPQgPATgcgBQgYAAgNgNg");
	this.shape_52.setTransform(64.15,36.75);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjUIAZAAIAACBIAPgRIAtgxIAgAAIg6A+IBABXg");
	this.shape_53.setTransform(43.1,33.45);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AguA/QgMgOAAgcIAAhhIAaAAIAABgQgBAjAcAAQAdAAAJgXIAAhsIAaAAIAACVIgZAAIAAgPQgPATgcgBQgYAAgNgNg");
	this.shape_54.setTransform(27.1,36.75);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgDBUQgKgKABgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_55.setTransform(14.3,34.925);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgIgQAAQgLAAgKAHQgJAHgGAKIAABqIgZAAIAAiVIAYAAIABATQARgVAbgBQAvAAABA3IAABhg");
	this.shape_56.setTransform(2.3,36.45);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AguA/QgMgOAAgcIAAhhIAZAAIAABgQAAAjAcAAQAcAAALgXIAAhsIAZAAIAACVIgZAAIAAgPQgPATgcgBQgYAAgNgNg");
	this.shape_57.setTransform(-13.35,36.75);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgMBqIAAjUIAZAAIAADUg");
	this.shape_58.setTransform(-101.35,33.45);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgwA4QgTgUAAgkIAAAAQAAgXAJgRQAIgRAQgKQAPgKATAAQAfAAATAWQASAUAAAjIAAABQAAAXgIARQgIASgQAJQgQAKgUAAQgdAAgTgWgAgegoQgLAPAAAaQAAAaALAPQAMAPASAAQAUAAALgPQAMgQAAgaQAAgZgMgPQgMgQgTABQgSgBgMAQg");
	this.shape_59.setTransform(-112.975,36.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgmBYIgBARIgYAAIAAjUIAaAAIAABQQAQgUAaAAQAbAAAQAVQAPAUABAjIAAACQAAAjgQAVQgQAVgbAAQgbAAgQgUgAglgBIAABAQAMAXAZAAQARAAALgOQAKgOAAgdQAAgbgKgNQgKgOgTAAQgZAAgLAYg");
	this.shape_60.setTransform(-128.7,33.6);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("ABPBMIAAhhQABgQgIgJQgHgHgRgBQgPAAgKAJQgIAJgCAOIAABiIgZAAIAAhhQAAghggAAQgaABgIAVIAABsIgaAAIAAiVIAYAAIABARQAQgUAcAAQAfAAALAZQAIgLALgGQAMgIARAAQAyAAAAA1IAABjg");
	this.shape_61.setTransform(-149.4,36.45);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgwA4QgTgUAAgkIAAAAQAAgXAJgRQAIgRAQgKQAPgKATAAQAfAAATAWQASAUAAAjIAAABQAAAXgIARQgIASgQAJQgQAKgUAAQgdAAgTgWgAgegoQgLAPAAAaQAAAaALAPQAMAPASAAQAUAAALgPQAMgQAAgaQAAgZgMgPQgMgQgTABQgSgBgMAQg");
	this.shape_62.setTransform(-169.975,36.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgDBUQgJgKAAgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQAEAFAIAAIANgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_63.setTransform(-183.1,34.925);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgIgIgPAAQgMAAgJAHQgJAHgFAKIAABqIgaAAIAAiVIAYAAIABATQARgVAbgBQAwAAAAA3IAABhg");
	this.shape_64.setTransform(-202.05,36.45);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgvBBQgOgNAAgSQAAgYASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAJIgaAAQAAgKAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgNgAgjAeQAAAMAIAHQAIAGANAAQALABAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_65.setTransform(-217.7,36.6);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjUIAZAAIAACBIAPgRIAtgxIAfAAIg5A+IBABXg");
	this.shape_66.setTransform(-231.7,33.45);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgsA6QgSgUAAgiIAAgEQAAgWAIgRQAJgSAPgKQAPgKARAAQAdAAAQAUQAQASAAAlIAAAJIhkAAQAAAXANANQAMAOATAAQANAAAJgFQAKgHAHgJIAQANQgTAdgmAAQgeAAgTgUgAgXgtQgKAMgDAVIBKAAIAAgDQgBgTgKgLQgJgKgQAAQgOgBgLALg");
	this.shape_67.setTransform(-247.1,36.6);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgNBlIAAizIhAAAIAAgWICbAAIAAAWIhBAAIAACzg");
	this.shape_68.setTransform(-263.15,34);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_69.setTransform(-44.925,-28.575);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AguBCQgPgOAAgTQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgMAIgKQAIgKAOgHQANgGAQAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgEgBgMQgTATgXAAQgXAAgNgMgAgjAeQAAAMAIAHQAIAGAMAAQALABAMgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_70.setTransform(-56.2,-25.85);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgtA/QgNgOAAgcIAAhhIAZAAIAABgQABAjAbgBQAdAAAKgVIAAhtIAZAAIAACVIgYAAIgBgPQgPATgcgBQgYAAgMgNg");
	this.shape_71.setTransform(-71.7,-25.7);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAJQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgTAPgMQAQgNAXAAQAaAAAPANQAQAOAAAUIgaAAQAAgKgIgIQgJgHgOgBQgNAAgIAHQgIAGAAAJQAAAKAIAEQAHAFASAEQATAFAMAFQAMAGAGAIQAGAJAAALQAAAUgQANQgQAMgaAAQgRAAgOgHg");
	this.shape_72.setTransform(-86.875,-25.85);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgsA6QgSgUgBgiIAAgEQAAgWAJgRQAIgSAQgKQAPgKARAAQAdAAARAUQAPASAAAlIAAAJIhkAAQABAXAMANQANAOARAAQAOAAAKgGQAJgFAHgKIAPANQgSAdgmAAQgdAAgUgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOAAgLALg");
	this.shape_73.setTransform(-101.45,-25.85);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAJQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgTAPgMQAQgNAXAAQAaAAAPANQAQAOAAAUIgaAAQAAgKgIgIQgJgHgOgBQgNAAgIAHQgIAGAAAJQAAAKAIAEQAHAFASAEQATAFAMAFQAMAGAGAIQAGAJAAALQAAAUgQANQgQAMgaAAQgRAAgOgHg");
	this.shape_74.setTransform(-116.475,-25.85);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgPQAQAUAYAAQASAAAKgKQALgLAAgTIAAgNQgQASgaAAQgaAAgQgVQgQgVAAglQAAgiAQgVQAQgVAbAAQAaAAAQAUIABgRIAXAAIAACRQAAAdgRARQgRARgdAAQgQAAgPgHgAgahEQgLAOAAAcQAAAaALAOQAKAOASAAQAYAAAMgWIAAhEQgMgVgYAAQgSAAgKAPg");
	this.shape_75.setTransform(-139.025,-23.05);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgIgQABQgMgBgIAHQgKAHgGAKIAABqIgZAAIAAiVIAYAAIABAUQARgXAbAAQAvAAABA2IAABig");
	this.shape_76.setTransform(-154.5,-26);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AguBCQgPgOAAgTQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgMAIgKQAIgKAOgHQANgGAQAAQAZAAAQANQAOANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgEgCgMQgRATgYAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMAAQAMABALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_77.setTransform(-170.15,-25.85);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgtBpIgKgCIAAgVIAHABQANAAAIgFQAHgGAFgOIAFgPIg1iTIAcAAIAlBvIAihvIAcAAIg8CsQgNAlgfAAg");
	this.shape_78.setTransform(-184.6,-22.825);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAJQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgGgSgEQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgTAPgMQAQgNAXAAQAaAAAPANQAQAOAAAUIgaAAQAAgKgIgIQgJgHgOgBQgNAAgIAHQgIAGAAAJQAAAKAIAEQAHAFASAEQATAFAMAFQAMAGAGAIQAGAJAAALQAAAUgQANQgQAMgaAAQgRAAgOgHg");
	this.shape_79.setTransform(-212.675,-25.85);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AguBCQgPgOAAgTQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgMAIgKQAIgKAOgHQANgGAQAAQAZAAAQANQAOANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgEgCgMQgRATgYAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGAMAAQAMABALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_80.setTransform(-227.75,-25.85);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgMBqIAAjUIAZAAIAADUg");
	this.shape_81.setTransform(-238.85,-29);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgrA6QgUgUABgiIAAgEQgBgWAJgRQAJgSAPgKQAPgKARAAQAdAAAQAUQAQASABAlIAAAJIhlAAQABAXAMANQAMAOASAAQAOAAAJgGQAKgFAHgKIAQANQgTAdgmAAQgdAAgTgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgJgLQgKgLgQAAQgPAAgKALg");
	this.shape_82.setTransform(-249.55,-25.85);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjUIAaAAIAACBIANgRIAugxIAgAAIg6A+IBABXg");
	this.shape_83.setTransform(-263.5,-29);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAaAAAPANQAOANAAAXIAABEQAAAVAGAMIAAACIgbAAQgCgEgBgMQgTATgXAAQgXAAgNgMgAgjAeQAAAMAIAHQAIAGAMABQALAAAMgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_84.setTransform(427.2,-88.3);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("ABQBMIAAhiQAAgQgIgHQgHgIgSAAQgOgBgKAJQgIAJgCAOIAABiIgZAAIAAhhQAAghggABQgZAAgKAVIAABsIgZAAIAAiUIAYAAIABAQQAQgUAcAAQAgABAKAYQAIgLAMgHQAMgHAQAAQAyABAAA0IAABjg");
	this.shape_85.setTransform(407.1,-88.45);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AguBCQgPgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQANgGAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgEgCgMQgSATgXAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQALAAALgHQAKgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_86.setTransform(386.85,-88.3);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgHgIgQABQgMgBgIAHQgKAHgFAKIAABqIgaAAIAAiUIAYAAIABATQARgXAbAAQAwAAAAA2IAABig");
	this.shape_87.setTransform(371.35,-88.45);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAgAAIg6A9IBABXg");
	this.shape_88.setTransform(339.85,-91.45);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgEgBgMQgSATgZAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQAKAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_89.setTransform(323.9,-88.3);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_90.setTransform(311.15,-89.975);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgwA5QgTgWAAgjIAAgBQAAgVAJgSQAIgRAQgKQAPgKATAAQAfAAATAVQASAWAAAiIAAACQAAAVgIASQgIASgQAJQgQAKgUAAQgdAAgTgVgAgegoQgLAOAAAcQAAAYALAPQAMAQASAAQAUAAALgQQAMgPAAgbQAAgYgMgPQgMgPgTgBQgSABgMAPg");
	this.shape_91.setTransform(298.825,-88.3);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjTIAZAAIAACAIAPgRIAtgwIAfAAIg5A9IBABXg");
	this.shape_92.setTransform(284.45,-91.45);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AguA+QgMgNAAgcIAAhgIAaAAIAABfQgBAjAcgBQAdAAAJgVIAAhsIAaAAIAACUIgZAAIAAgOQgPASgcAAQgYAAgNgPg");
	this.shape_93.setTransform(251.1,-88.15);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgcCCIAAgUQAFABAHAAQAJAAAEgFQADgEABgMIAAinIAZAAIAACnQAAAqgmAAQgIAAgIgCgAAChqQgDgFAAgGQAAgGADgEQADgEAIgBQAIAAADAEQAFAFAAAGQAAAGgFAFQgDADgIAAQgIAAgDgDg");
	this.shape_94.setTransform(238.5,-88);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AguA+QgMgNAAgcIAAhgIAZAAIAABfQAAAjAcgBQAcAAALgVIAAhsIAZAAIAACUIgZAAIAAgOQgPASgcAAQgYAAgNgPg");
	this.shape_95.setTransform(228.75,-88.15);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAiBMIAAhiQgBgQgHgIQgHgIgQABQgMgBgIAHQgKAHgGAKIAABqIgZAAIAAiUIAYAAIABATQARgXAbAAQAvAAABA2IAABig");
	this.shape_96.setTransform(213.15,-88.45);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgsA6QgSgUgBgiIAAgEQABgWAIgRQAJgSAPgKQAPgKARAAQAdAAAQAUQARASgBAkIAAAKIhkAAQAAAXANANQAMAOATAAQANAAAJgGQAKgFAHgKIAQANQgTAdgmAAQgdAAgUgUgAgXgtQgKAMgDAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_97.setTransform(198.05,-88.3);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("ABPBMIAAhiQAAgQgHgHQgHgIgRAAQgPgBgJAJQgKAJgBAOIAABiIgZAAIAAhhQAAghggABQgZAAgKAVIAABsIgZAAIAAiUIAYAAIAAAQQARgUAcAAQAfABALAYQAHgLAMgHQANgHAQAAQAyABAAA0IAABjg");
	this.shape_98.setTransform(178,-88.45);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAhBMIAAhiQAAgQgHgIQgIgIgPABQgMgBgJAHQgJAHgFAKIAABqIgaAAIAAiUIAYAAIABATQARgXAbAAQAwAAAAA2IAABig");
	this.shape_99.setTransform(140.4,-88.45);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_100.setTransform(124.75,-88.3);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAkBLIgkhxIgjBxIgVAAIgriVIAZAAIAeBwIAjhwIATAAIAkByIAdhyIAZAAIgrCVg");
	this.shape_101.setTransform(106.375,-88.3);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgrA6QgUgUABgiIAAgEQAAgWAIgRQAJgSAPgKQAPgKARAAQAdAAAQAUQAQASABAkIAAAKIhlAAQABAXAMANQAMAOATAAQANAAAJgGQAKgFAHgKIAQANQgTAdgmAAQgeAAgSgUgAgXgtQgLAMgCAVIBKAAIAAgCQgBgUgJgLQgKgLgQAAQgPABgKAKg");
	this.shape_102.setTransform(88.5,-88.3);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAiBqIAAhjQgBgPgHgIQgIgIgPABQgLgBgKAHQgJAHgGAKIAABqIgZAAIAAjTIAZAAIAABRQASgWAaAAQAvAAABA1IAABjg");
	this.shape_103.setTransform(73.05,-91.45);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjTIAZAAIAACAIAPgRIAtgwIAfAAIg5A9IBABXg");
	this.shape_104.setTransform(41.55,-91.45);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_105.setTransform(29.975,-91.025);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgDBUQgKgKABgTIAAhcIgcAAIAAgUIAcAAIAAglIAYAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgHgLg");
	this.shape_106.setTransform(21.5,-89.975);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgdBHQgOgGgIgMQgIgLAAgNIAaAAQABAMAJAJQAKAHAPAAQAOAAAJgGQAJgGAAgKQAAgKgIgGQgIgFgSgFQgUgEgLgFQgLgGgGgHQgFgJAAgLQAAgSAPgNQAQgNAXAAQAaAAAPANQAQAOAAAUIgaAAQAAgKgIgIQgJgHgOgBQgNAAgIAHQgIAFAAALQAAAIAIAFQAHAFASAEQATAEAMAGQAMAGAGAIQAGAIAAAMQAAAVgQAMQgQAMgaAAQgRAAgOgHg");
	this.shape_107.setTransform(9.875,-88.3);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgMBmIAAiVIAZAAIAACVgAgKhMQgEgEAAgHQAAgGAEgEQADgEAHAAQAHAAAEAEQAEAEAAAGQAAAHgEAEQgEAEgHAAQgHAAgDgEg");
	this.shape_108.setTransform(-0.775,-91.025);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgVAXAAQAHAAAEACIAAAYIgMgBQgZAAgJAWIAABpg");
	this.shape_109.setTransform(-8.225,-88.45);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgsA6QgSgUgBgiIAAgEQABgWAIgRQAJgSAPgKQAPgKARAAQAdAAAQAUQARASgBAkIAAAKIhkAAQAAAXANANQAMAOATAAQANAAAJgGQAKgFAHgKIAQANQgTAdgmAAQgdAAgUgUgAgXgtQgKAMgDAVIBKAAIAAgCQgBgUgKgLQgJgLgQAAQgOABgLAKg");
	this.shape_110.setTransform(-21.1,-88.3);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgEBUQgJgKAAgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAKAAIAMgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_111.setTransform(-33.75,-89.975);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAfAAIg5A9IBABXg");
	this.shape_112.setTransform(-44.25,-91.45);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_113.setTransform(-60.2,-88.3);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgVAXAAQAHAAAEACIAAAYIgMgBQgZAAgJAWIAABpg");
	this.shape_114.setTransform(-71.925,-88.45);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQANgGAQAAQAZAAAPANQAPANAAAXIAABEQABAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgWAAgOgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_115.setTransform(-85.3,-88.3);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAgAAIg6A9IBABXg");
	this.shape_116.setTransform(-99.25,-91.45);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgQARIAAA0IgaAAIAAjTIAaAAIAACAIANgRIAugwIAfAAIg5A9IBABXg");
	this.shape_117.setTransform(-131.1,-91.45);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgNAAgKAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAZAAAPANQAPANABAXIAABEQAAAVAFAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQALAAAKgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_118.setTransform(-147.05,-88.3);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgEBUQgIgKgBgTIAAhcIgbAAIAAgUIAbAAIAAglIAZAAIAAAlIAcAAIAAAUIgcAAIAABcQAAAJAEAEQADAFAJAAIANgCIAAAVQgKADgKAAQgRAAgIgLg");
	this.shape_119.setTransform(-159.8,-89.975);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgwA5QgTgWAAgjIAAgBQAAgVAJgSQAIgRAQgKQAPgKATAAQAfAAATAVQASAWAAAiIAAACQAAAVgIASQgIASgQAJQgQAKgUAAQgdAAgTgVgAgegoQgLAOAAAcQAAAYALAPQAMAQASAAQAUAAALgQQAMgPAAgbQAAgYgMgPQgMgPgTgBQgSABgMAPg");
	this.shape_120.setTransform(-172.125,-88.3);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AAgBqIgzhFIgRARIAAA0IgZAAIAAjTIAZAAIAACAIAPgRIAtgwIAfAAIg5A9IBABXg");
	this.shape_121.setTransform(-186.5,-91.45);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AgfBjQgQgHgIgMIAOgPQAQAUAYAAQASAAAKgKQALgLAAgTIAAgNQgQASgaAAQgaAAgQgVQgQgWAAgkQAAgiAQgVQAQgVAbAAQAaAAAQAUIABgRIAXAAIAACRQAAAdgRARQgRARgdAAQgQAAgPgHgAgahEQgLAOAAAdQAAAZALANQAKAPASAAQAYAAAMgWIAAhDQgMgWgYAAQgSAAgKAPg");
	this.shape_122.setTransform(-220.325,-85.5);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgvBCQgOgNAAgUQAAgXASgMQASgNAfAAIAZAAIAAgMQAAgNgIgIQgIgIgPAAQgOAAgJAHQgJAHAAAKIgaAAQAAgLAIgLQAIgKAOgHQAOgGAPAAQAaAAAOANQAPANABAXIAABEQgBAVAGAMIAAACIgbAAQgCgEgCgMQgRATgZAAQgVAAgPgMgAgjAeQAAAMAIAHQAIAGANABQAKAAALgHQALgGAFgKIAAgfIgUAAQguAAAAAcg");
	this.shape_123.setTransform(-235.8,-88.3);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgjBMIAAiUIAZAAIAAARQAMgVAXAAQAHAAAEACIAAAYIgMgBQgZAAgJAWIAABpg");
	this.shape_124.setTransform(-247.525,-88.45);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AhIBlIAAjJIA5AAQAZAAAVAMQAUALALAWQALAVAAAdIAAALQAAAdgLAVQgLAWgUALQgVAMgaAAgAguBPIAcAAQAeAAASgTQARgTAAgkIAAgKQAAgjgQgSQgQgUgdAAIggAAg");
	this.shape_125.setTransform(-262,-90.9);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgJgKgUAAQgaAAgNAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_126.setTransform(209.8,-167.7);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgYhtQgKgJAAgOQgBgPAKgJQAKgJAPAAQAQAAAKAJQAKAJgBAPQABAOgKAJQgKAKgQAAQgPAAgJgKg");
	this.shape_127.setTransform(191.25,-172.175);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AhRBnQgYgUAAgfQAAgmAcgTQAcgUA0AAIAeAAIAAgOQAAgQgJgKQgJgKgQAAQgRAAgIAHQgKAIAAAOIg/AAQgBgVANgSQANgRAXgKQAYgKAcAAQArAAAbAWQAZAWAAAoIAABmQAAAiAKARIAAAEIhAAAQgFgJgCgNQgXAagkAAQgjAAgWgUgAgpAsIAAADQAAAMAIAIQAIAIAPAAQANAAAMgHQAMgGAGgKIAAgpIgYAAQgvAAgDAhg");
	this.shape_128.setTransform(173.2,-167.475);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("ABqB5IAAiWQAAgVgHgJQgIgKgUAAQgdAAgLAcIAACiIg+AAIAAiWQAAgVgIgJQgIgKgUAAQgbABgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAlQAZglAvAAQAmAAATAWQATAXAAAuIAACWg");
	this.shape_129.setTransform(141.725,-167.7);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIABAdQATghAhAAQALAAAJADIgBA9QgNgCgJAAQglAAgKAYIAACbg");
	this.shape_130.setTransform(114.95,-167.7);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_131.setTransform(93.925,-167.475);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_132.setTransform(67.475,-171.575);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgWAXIAABIIhAAAIAAlPIBAAAIAAC5IALgPIA8hHIBMAAIhVBiIBdCKg");
	this.shape_133.setTransform(31.1,-172.45);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACZQAAAlAhAAQAgAAAMgXIAAinIA/AAIAADsIg7AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_134.setTransform(5,-167.25);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("Ag5DSIAAgyQAMACAIAAQAeAAAAgfIAAj6IA+AAIAAD6QAAAngVAWQgVAWgmAAQgRAAgPgEgAgDidQgKgJAAgOQAAgPAKgJQAIgJARAAQARAAAJAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgQAAgJgKg");
	this.shape_135.setTransform(-15.65,-167.375);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgJgKgVAAQgZAAgOAXIAACnIhAAAIAAjtIA9AAIABAcQAZggArAAQAlAAATAWQASAWABAtIAACYg");
	this.shape_136.setTransform(-31.95,-167.7);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACZQAAAlAiAAQAfAAAMgXIAAinIBAAAIAADsIg8AAIgCgYQgYAdgoAAQgmAAgUgWg");
	this.shape_137.setTransform(-57.15,-167.25);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_138.setTransform(-77.575,-170.175);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_139.setTransform(-96.725,-167.475);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("Ah6CgIAAk/IB8AAQAkAAAbANQAcANAPAZQAOAYAAAfQAAAvgfAaQghAbg5AAIg4AAIAABxgAg3gFIA5AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg7AAg");
	this.shape_140.setTransform(-123,-171.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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


// stage content:
(lib.game13 = function(mode,startPosition,loop) {
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
		  window.location.replace("../game14/index.html");
		});
		
		root.btnBack3.on("click", function () {
		  window.location.replace("../materi7/index.html");
		});
		var root = this;
		var pieces = root.pieces;
		var slots = root.slots;
		var restart = root.restart;
		var winMessage = root.winMessage;
		var Score = root.Score;
		var positions1 = [];
		
		root.stop();
		
		// root.pGam1.gotoAndStop(0);
		
		// root.pieces.laut.on("dblclick", function () {
		//   root.pGam1.gotoAndPlay(0);
		// });
		
		// root.pp3.gotoAndStop(0);
		
		// root.pieces.tana.on("dblclick", function () {
		//   root.pp3.gotoAndPlay(0);
		// });
		
		// root.pp4.gotoAndStop(0);
		
		// root.pieces.tana1.on("dblclick", function () {
		//   root.pp4.gotoAndPlay(0);
		// });
		
		// root.pp5.gotoAndStop(0);
		
		// root.pieces.laut1.on("dblclick", function () {
		//   root.pp5.gotoAndPlay(0);
		// });
		
		// root.pp6.gotoAndStop(0);
		
		// root.pieces.laut2.on("dblclick", function () {
		//   root.pp6.gotoAndPlay(0);
		// });
		
		// root.pp7.gotoAndStop(0);
		
		// root.pieces.laut3.on("dblclick", function () {
		//   root.pp7.gotoAndPlay(0);
		// });
		
		// root.pp8.gotoAndStop(0);
		
		// root.pieces.laut4.on("dblclick", function () {
		//   root.pp8.gotoAndPlay(0);
		// });
		
		// root.pp9.gotoAndStop(0);
		
		// root.pieces.laut5.on("dblclick", function () {
		//   root.pp9.gotoAndPlay(0);
		// });
		
		// root.pp10.gotoAndStop(0);
		
		// root.pieces.laut6.on("dblclick", function () {
		//   root.pp10.gotoAndPlay(0);
		// });
		
		// root.pp11.gotoAndStop(0);
		
		// root.pieces.laut7.on("dblclick", function () {
		//   root.pp11.gotoAndPlay(0);
		// });
		
		root.pp5.gotoAndStop(0);
		
		root.lima.on("click", function () {
		  root.pp5.gotoAndPlay(0);
		});
		
		
		root.pp4.gotoAndStop(0);
		
		root.empat.on("click", function () {
		  root.pp4.gotoAndPlay(0);
		});
		
		
		root.pp3.gotoAndStop(0);
		
		root.tiga.on("click", function () {
		  root.pp3.gotoAndPlay(0);
		});
		
		root.pp2.gotoAndStop(0);
		
		root.dua.on("click", function () {
		  root.pp2.gotoAndPlay(0);
		});
		
		root.pp1.gotoAndStop(0);
		
		root.satu.on("click", function () {
		  root.pp1.gotoAndPlay(0);
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
		  winMessage.originalY = winMessage.y;
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
		  winMessage.text = "";
		  root.shuffle();
		};
		
		root.mouseDownHandler = function (e) {
		  winMessage.text = "Ayo, Letakkan pada kotak yang sesuai!";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
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
		
		    root.slot = null;
		  } else root.onMiss();
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
		
		root.salahJawab = function () {
		  winMessage.text = "Hemm, sepertinya Tebakan Anda Salah";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onMatch = function () {
		  winMessage.text = "Selamat! Tebakan Anda Benar!";
		  pieces.skor++;
		  Score.text = pieces.skor * 20;
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onWin = function () {
			
		  winMessage.text = "Yey!, Anda Berhasil Menyelesaikan Tantangan. Selamat!";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.onMiss = function () {
		  createjs.Tween.get(pieces.target).to(
		    { x: pieces.target.originalX, y: pieces.target.originalY },
		    350,
		    createjs.Ease.backInOut
		  );
		  winMessage.text = "Silahkan letakkan pada kotak yang sesuai ya..";
		  winMessage.alpha = 0;
		  winMessage.y = winMessage.originalY + 60;
		  createjs.Tween.get(winMessage).to(
		    { alpha: 1, y: winMessage.originalY },
		    500,
		    createjs.Ease.backInOut
		  );
		};
		
		root.setup();
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
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// pp5
	this.pp5 = new lib.pp5();
	this.pp5.name = "pp5";
	this.pp5.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp5).wait(1));

	// pp4
	this.pp4 = new lib.pp1();
	this.pp4.name = "pp4";
	this.pp4.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp4).wait(1));

	// pp3
	this.pp3 = new lib.pp3();
	this.pp3.name = "pp3";
	this.pp3.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp3).wait(1));

	// pp2
	this.pp2 = new lib.pp2();
	this.pp2.name = "pp2";
	this.pp2.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp2).wait(1));

	// pp1
	this.pp1 = new lib.pp4();
	this.pp1.name = "pp1";
	this.pp1.setTransform(480.35,287.5,1,1,0,0,0,42,-26);

	this.timeline.addTween(cjs.Tween.get(this.pp1).wait(1));

	// code
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(438.35,313.5);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

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
	this.shape.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJABIAHAAIAAgEQAAgEgDgCQgCgDgEAAQgDABgDACQgDACAAACIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAAUQAAAGACADIAAABIgIAAIgBgFQgFAFgGABQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgBACgEIAAgJIgGAAQgNABAAAHg");
	this.shape.setTransform(444.575,59.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgJAWIAAgqIAGAAIABAFQADgGAGAAIAEABIAAAGIgFAAQgGAAgCAHIAAAdg");
	this.shape_1.setTransform(441.2,59.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgNASQgEgDAAgGQAAgGAFgDQAFgEAJABIAHAAIAAgEQAAgEgDgCQgCgDgEAAQgDABgDACQgDACAAACIgHAAQAAgDACgDQADgDADgCQAEgBAEAAQAHAAAFADQAEAEAAAGIAAAUQAAAGACADIAAABIgIAAIgBgFQgFAFgGABQgHAAgEgFgAgKAIQAAAEADACQACACAEAAQACAAADgCQADgBACgEIAAgJIgGAAQgNABAAAHg");
	this.shape_2.setTransform(437.375,59.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgMASQgEgEAAgIIAAgbIAHAAIAAAbQAAAKAIAAQAIgBADgFIAAgfIAHAAIAAAqIgHAAIAAgEQgEAFgIAAQgHAAgDgEg");
	this.shape_3.setTransform(432.925,59.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAbQgFgCgDgEQgDgEAAgFIAIAAQAAAFAEADQAEADAFAAQAGAAADgCQADgDAAgEQAAgEgDgCQgCgDgIgCQgJgDgFgDQgEgEAAgGQAAgHAFgEQAGgFAIAAQAFAAAFACQAFADADAEQACAEAAAFIgIAAQABgGgEgDQgEgDgFAAQgFAAgDADQgDACAAAFQAAADADADQACACAHACQAHACAEACQAEACACADQACAEAAAEQAAAHgFAEQgGAFgJAAQgFAAgFgDg");
	this.shape_4.setTransform(428.25,58.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3498DB").s().p("Aj8D9QhphpAAiUQAAiTBphqQBphoCTAAQCVAABoBoQBpBqAACTQAACUhpBpQhoBpiVAAQiTAAhphpg");
	this.shape_5.setTransform(437.8705,37.4545,0.9301,0.9301);

	this.instance = new lib.hehe();
	this.instance.setTransform(476.4,37.5,0.7145,0.9301,0,0,0,86.2,36);
	this.instance.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);
	this.instance.cache(-2,-2,176,76);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.tandaSuaraOff},{t:this.hening},{t:this.tandaSuaraOn},{t:this.nyala}]}).wait(1));

	// Layer_2
	this.instance_1 = new lib.sustain();
	this.instance_1.setTransform(141.5,44.2,1,1,0,0,0,125.9,18.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// base
	this.winMessage = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "17px 'Roboto'", "#FFFFFF");
	this.winMessage.name = "winMessage";
	this.winMessage.textAlign = "center";
	this.winMessage.lineHeight = 22;
	this.winMessage.lineWidth = 418;
	this.winMessage.parent = this;
	this.winMessage.setTransform(476,192);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E74C3C").s().p("Egg7ACMIAAkXMBB3AAAIAAEXg");
	this.shape_6.setTransform(476.025,201);

	this.instance_2 = new lib.geser();
	this.instance_2.setTransform(676.3,353.15,0.7385,0.7385);

	this.instance_3 = new lib.infoo();
	this.instance_3.setTransform(339,354.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AARAuIAAg5QAAgJgEgEQgDgEgJAAQgLAAgGALIAAA/IgUAAIAAhZIATAAIAAAKQAKgMAQAAQAcAAAAAgIAAA7g");
	this.shape_7.setTransform(654.975,233.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgHAFgHQAEgGAIgEQAJgEAJABQAQAAAJAIQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAHQgFAEgBAHQAAAGAFADQAEAEAGgBQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_8.setTransform(645.65,233.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AATAtIgTg9IgSA9IgQAAIgZhZIAUAAIAOA9IATg9IAOAAIASA9IAPg9IATAAIgYBZg");
	this.shape_9.setTransform(634.725,233.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgaAjQgNgMAAgVIAAgCQABgNAEgKQAGgKAJgHQAKgFAKAAQASAAAKALQAKAMAAAWIAAAHIg5AAQAAAKAHAHQAHAGAIAAQAPABAIgLIALAJQgGAJgJAFQgIADgMABQgSAAgLgMgAgMgYQgFAHgBAKIAmAAIAAgCQgBgKgFgFQgEgGgJAAQgHABgGAFg");
	this.shape_10.setTransform(624,233.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAbA8IAAg1Ig1AAIAAA1IgVAAIAAh3IAVAAIAAAyIA1AAIAAgyIAVAAIAAB3g");
	this.shape_11.setTransform(613.275,232.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAQBAIgZgnIgJAJIAAAeIgVAAIAAh/IAVAAIAABJIAGgIIAXgbIAZAAIgiAkIAlA1g");
	this.shape_12.setTransform(599.15,231.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_13.setTransform(591.975,232.15);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_14.setTransform(586.775,232.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgSArQgIgFgFgHQgFgHAAgHIAUAAQAAAHAFAEQAFADAHAAQAIAAAEgDQAEgDAAgFQAAgFgEgDQgEgCgKgCQgKgDgHgDQgPgHAAgNQAAgMAKgHQAKgIAOAAQAQAAAKAIQAKAHAAANIgVAAQAAgFgEgEQgEgFgHAAQgGAAgEAEQgEADAAAFQAAAEAEADQADADALACQAMADAHAEQAHACADAFQADAGAAAHQAAALgKAIQgKAHgQABQgKgBgJgDg");
	this.shape_15.setTransform(579.725,233.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgJA+IAAhZIATAAIAABZgAgHgrQgDgDAAgEQAAgFADgDQADgDAEAAQAFAAADADQADADAAAFQAAAEgDADQgDADgFAAQgEAAgDgDg");
	this.shape_16.setTransform(573.225,232.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgXAuIAAhZIATAAIABAKQAGgMANAAIAHABIAAATIgIAAQgNAAgFAKIAAA9g");
	this.shape_17.setTransform(568.45,233.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgbAjQgMgMAAgVIAAgCQAAgNAGgKQAFgKAJgHQAJgFALAAQASAAALALQAJAMABAWIAAAHIg7AAQABAKAHAHQAGAGAKAAQANABAJgLIALAJQgFAJgJAFQgKADgKABQgTAAgMgMgAgMgYQgEAHgCAKIAmAAIAAgCQgBgKgFgFQgEgGgJAAQgIABgFAFg");
	this.shape_18.setTransform(560.6,233.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgKAfIAAgyIgPAAIAAgPIAPAAIAAgWIATAAIAAAWIAQAAIAAAPIgQAAIAAAxQAAAFACADQACACAGAAIAHgBIAAAQIgOACQgWAAAAgag");
	this.shape_19.setTransform(552.925,232.85);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAQBAIgagnIgJAJIAAAeIgTAAIAAh/IATAAIAABJIAHgIIAXgbIAZAAIgiAkIAmA1g");
	this.shape_20.setTransform(546.45,231.975);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgVAAQABgHAFgHQAEgGAIgEQAJgEAKABQAPAAAJAIQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAHQgFAEgBAHQABAGAEADQADAEAHgBQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_21.setTransform(536.85,233.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgWAuIAAhZIATAAIAAAKQAGgMANAAIAHABIAAATIgIAAQgOAAgEAKIAAA9g");
	this.shape_22.setTransform(529.65,233.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEAEQgFADABAFIgUAAQAAgHAEgHQAFgGAJgEQAIgEAKABQAPAAAJAIQAKAHAAAOIAAAoQAAAMAEAIIAAABIgVAAIgDgIQgJAKgNAAQgOgBgIgHgAgMAHQgFAEAAAHQAAAGAEADQADAEAHgBQAFAAAFgCQAFgDADgFIAAgRIgLAAQgKAAgGAEg");
	this.shape_23.setTransform(521.65,233.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AAXA8IgjgzIgOAOIAAAlIgVAAIAAh3IAVAAIAAA4IAMgOIAigqIAZAAIgsA1IAvBCg");
	this.shape_24.setTransform(512.375,232.3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgSAqQgIgEgFgGQgFgIAAgIIAUAAQAAAIAFADQAFAFAHAAQAIAAAEgDQAEgEAAgEQAAgGgEgCQgEgDgKgDQgKgCgHgDQgPgGAAgOQAAgMAKgIQAKgHAOgBQAQABAKAHQAKAJAAAMIgVAAQAAgGgEgEQgEgDgHAAQgGAAgEACQgEAEAAAFQAAAEAEADQADADALADQAMACAHADQAHADADAFQADAFAAAIQAAALgKAIQgKAIgQAAQgKgBgJgEg");
	this.shape_25.setTransform(833.525,233.45);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgdAnQgJgIAAgLQAAgPALgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgEAEAAAFIgUAAQAAgIAEgFQAFgHAJgEQAIgDAKgBQAPABAKAHQAJAJAAAOIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgNAAgJgIgAgMAGQgFAEAAAIQAAAFADAEQAEADAHABQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgGADg");
	this.shape_26.setTransform(824.6,233.45);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgJBAIAAh/IATAAIAAB/g");
	this.shape_27.setTransform(817.825,231.575);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgaAiQgNgMAAgTIAAgDQABgMAEgLQAGgLAJgFQAKgHAKAAQASAAAKAMQAKAMAAAVIAAAHIg5AAQAAALAHAHQAGAGAJABQAPgBAIgKIALAKQgGAIgJAEQgIAEgMABQgSAAgLgNgAgMgXQgFAGgBAJIAlAAIAAgBQAAgKgFgFQgEgFgJgBQgHAAgGAHg");
	this.shape_28.setTransform(811.2,233.45);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AAXA9Igjg1IgOAPIAAAmIgVAAIAAh5IAVAAIAAA6IAMgPIAigrIAZAAIgsA2IAvBDg");
	this.shape_29.setTransform(801.875,231.9);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgdAnQgJgIABgLQAAgPAKgGQALgIASAAIANAAIAAgGQAAgGgEgFQgEgEgHAAQgHAAgEADQgEAEgBAFIgTAAQAAgIAEgFQAFgHAJgEQAIgDAJgBQAQABAKAHQAJAJAAAOIAAAnQAAAMADAHIAAACIgUAAIgCgJQgKALgNAAQgNAAgJgIgAgLAGQgHAEABAIQAAAFADAEQAFADAGABQAFAAAFgEQAGgDACgEIAAgRIgLAAQgKAAgFADg");
	this.shape_30.setTransform(787,233.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AArAuIAAg6QAAgIgDgEQgEgEgIAAQgIAAgEAEQgEADgCAGIAAA9IgTAAIAAg6QAAgQgQAAQgNAAgEAKIAABAIgUAAIAAhZIATAAIAAAJQAKgLAQAAQARAAAGAOQAKgOASAAQAPAAAHAIQAIAJAAAQIAAA6g");
	this.shape_31.setTransform(775,233.375);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgdAnQgIgIgBgLQAAgPALgGQALgIATAAIAMAAIAAgGQAAgGgEgFQgEgEgHAAQgGAAgFADQgFAEAAAFIgUAAQAAgIAGgFQAEgHAIgEQAJgDAJgBQAQABAJAHQAKAJAAAOIAAAnQAAAMAEAHIAAACIgVAAIgDgJQgJALgNAAQgNAAgJgIgAgLAGQgHAEAAAIQAAAFAFAEQAEADAGABQAFAAAFgEQAFgDADgEIAAgRIgLAAQgKAAgFADg");
	this.shape_32.setTransform(763,233.45);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAbA9Ig1hVIAABVIgVAAIAAh5IAVAAIA1BVIAAhVIAVAAIAAB5g");
	this.shape_33.setTransform(752.425,231.9);

	this.dua = new lib.drag10G4();
	this.dua.name = "dua";
	this.dua.setTransform(184.35,359.55,0.9989,0.9989);
	new cjs.ButtonHelper(this.dua, 0, 1, 2, false, new lib.drag10G4(), 3);

	this.lima = new lib.drag10G2();
	this.lima.name = "lima";
	this.lima.setTransform(266.35,235.95,0.9989,0.9989,0,0,0,82.1,26.8);
	new cjs.ButtonHelper(this.lima, 0, 1, 2, false, new lib.drag10G2(), 3);

	this.tiga = new lib.drag10G5();
	this.tiga.name = "tiga";
	this.tiga.setTransform(406.15,235.95,0.9989,0.9989,0,0,0,82.1,26.8);
	new cjs.ButtonHelper(this.tiga, 0, 1, 2, false, new lib.drag10G5(), 3);

	this.satu = new lib.drag10G3();
	this.satu.name = "satu";
	this.satu.setTransform(33.5,293.1,0.9989,0.9989);
	new cjs.ButtonHelper(this.satu, 0, 1, 2, false, new lib.drag10G3(), 3);

	this.empat = new lib.drag10G1();
	this.empat.name = "empat";
	this.empat.setTransform(409.35,386.3,0.9989,0.9989,0,0,0,82.2,26.8);
	new cjs.ButtonHelper(this.empat, 0, 1, 2, false, new lib.drag10G1(), 3);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(441.9,169.05,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(522.3,167.85,0.7541,0.7541);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

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

	this.pieces = new lib.Pieces12();
	this.pieces.name = "pieces";

	this.slots = new lib.Slots12();
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

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AABAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGgAgZAPQAIgLAAgMIAAgNIARAAIAAAMQgBAJgEAHQgEAJgHAGg");
	this.shape_34.setTransform(626.775,110.25);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_35.setTransform(621.5,115.125);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_36.setTransform(614.375,116.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgdAnQgHgIAAgSIAAg8IAPAAIAAA8QAAAVASABQASgBAGgOIAAhDIARAAIAABdIgQAAIgBgJQgJALgSAAQgOAAgJgJg");
	this.shape_37.setTransform(604.55,116.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_38.setTransform(594.925,116.85);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAHgDAEgGIAKAIQgMASgXAAQgTAAgMgMgAgPgcQgGAIgBANIAuAAIAAgCQAAgMgHgHQgFgHgLAAQgIAAgIAHg");
	this.shape_39.setTransform(585.6,116.85);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAIAGAFQAGAFAJAAQAJAAAGgEQAFgDAAgHQAAgGgEgEQgGgEgLgCQgMgDgHgDQgIgEgDgEQgEgGAAgHQAAgLAKgJQAKgHAPgBQAQAAAKAJQAKAIAAAOIgRAAQAAgIgFgEQgGgFgIAAQgIAAgFAEQgFADAAAHQAAAGAEADQAFADALACQAMADAIAEQAHADAEAFQAEAGAAAHQAAANgLAHQgKAIgQAAQgKABgJgFg");
	this.shape_40.setTransform(576.075,116.85);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_41.setTransform(561.775,118.625);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_42.setTransform(551.925,116.75);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_43.setTransform(542.025,116.85);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgcBCIgGgBIAAgNIAEAAQAJAAAEgDQAFgDADgJIAEgKIgjhdIASAAIAXBGIAWhGIARAAIgmBtQgHAYgUAAg");
	this.shape_44.setTransform(532.9,118.775);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_45.setTransform(519.275,116.85);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_46.setTransform(511.175,115.8);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_47.setTransform(503.575,116.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_48.setTransform(490.775,116.75);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgWAwIAAhdIAQAAIAAALQAHgOAOAAQAGAAACACIAAAPIgIgBQgPAAgGAOIAABCg");
	this.shape_49.setTransform(480.35,116.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgWIAAgCQgBgNAGgMQAGgLAJgGQAKgHAKAAQATAAAKANQALAMAAAXIAAAFIhAAAQAAAOAIAKQAIAIALAAQAJAAAFgEQAGgDAFgGIAKAIQgMASgYAAQgSAAgMgMgAgPgcQgGAIgCANIAvAAIAAgCQgBgMgFgHQgHgHgKAAQgIAAgIAHg");
	this.shape_50.setTransform(472.1,116.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgcA3QgLgOAAgVIAAgCQAAgUAKgOQALgOAQAAQAQAAAKAMIAAgyIAQAAIAACGIgPAAIgBgKQgJAMgRAAQgQAAgKgNgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAQgBAHgOIAAgqQgHgNgQAAQgKgBgHAKg");
	this.shape_51.setTransform(461.95,114.95);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgeAkQgMgOAAgWIAAAAQAAgOAFgLQAGgLAKgGQAJgGAMgBQATAAAMAOQAMAOAAAVIAAABQAAAOgFALQgFALgKAGQgKAHgNgBQgSAAgMgNgAgTgZQgHAJAAARQAAAQAHAKQAIAJALAAQAMAAAIgJQAHgKAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAKg");
	this.shape_52.setTransform(452.025,116.85);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAVAwIAAg+QAAgKgFgFQgEgEgKAAQgHAAgGADQgGAFgDAHIAABCIgQAAIAAhdIAPAAIAAAMQALgPARAAQAeABAAAhIAAA+g");
	this.shape_53.setTransform(441.925,116.75);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_54.setTransform(434.8,115.125);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAVBDIAAg/QAAgJgFgFQgEgEgKAAQgHAAgGADQgGAFgDAGIAABDIgQAAIAAiGIAQAAIAAA0QALgOAQAAQAeABAAAgIAAA/g");
	this.shape_55.setTransform(427.675,114.85);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgbAlQgMgNAAgXIAAgCQAAgOAFgKQAGgMAJgFQAJgGAMgBQAQAAALAKQALAKAAAPIgPAAQgBgJgGgGQgHgGgJAAQgLAAgHAJQgHAJAAARIAAACQAAAQAHAJQAHAJALAAQAJAAAHgGQAGgFABgHIAPAAQAAAHgFAIQgFAIgJAEQgJAFgKgBQgSAAgLgMg");
	this.shape_56.setTransform(418.1,116.85);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AgnBAIAAh/IBPAAIAAAOIg/AAIAAApIA3AAIAAANIg3AAIAAAtIBAAAIAAAOg");
	this.shape_57.setTransform(408.65,115.2);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_58.setTransform(390.725,116.75);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgdAnQgIgIAAgSIAAg8IARAAIAAA8QAAAVARABQASgBAGgOIAAhDIARAAIAABdIgQAAIAAgJQgKALgRAAQgPAAgJgJg");
	this.shape_59.setTransform(377.9,116.95);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_60.setTransform(370.775,114.85);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDgBgEQABgEACgCQACgDAEAAQAEAAADADQADACgBAEQABAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_61.setTransform(366.45,115.125);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgnBAIAAh/IBOAAIAAAOIg9AAIAAAsIA1AAIAAAMIg1AAIAAA5g");
	this.shape_62.setTransform(359.75,115.2);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AAzAwIAAg+QAAgKgFgFQgFgEgLAAQgJAAgGAFQgGAFgBAJIAAA+IgPAAIAAg9QAAgVgUABQgQAAgGANIAABEIgRAAIAAhdIAQAAIAAAKQALgNASAAQATAAAHAQQAEgHAIgEQAIgFAKAAQAfAAABAiIAAA+g");
	this.shape_63.setTransform(341.925,116.75);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_64.setTransform(329.125,116.85);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgHBDIAAiGIAPAAIAACGg");
	this.shape_65.setTransform(322.075,114.85);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgdApQgJgHAAgNQAAgOALgIQALgIAUAAIAQAAIAAgHQAAgJgFgFQgFgGgKABQgIgBgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgEQAIgFAKAAQAQAAAJAJQAKAIAAAPIAAArQAAANADAHIAAABIgRAAIgCgKQgLAMgPAAQgOAAgJgIgAgWATQAAAHAFAFQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_66.setTransform(314.975,116.85);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AgcA3QgLgOAAgVIAAgCQAAgUAKgOQALgOARAAQAPAAAKAMIAAgyIAQAAIAACGIgPAAIAAgKQgKAMgRAAQgQAAgKgNgAgQgGQgHAIAAASQAAAQAHAKQAGAIALABQAQgBAHgOIAAgqQgIgNgPAAQgLgBgGAKg");
	this.shape_67.setTransform(304.8,114.95);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_68.setTransform(737.825,91.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_69.setTransform(728.275,91.25);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgHBEIAAiGIAPAAIAACGg");
	this.shape_70.setTransform(721.225,89.25);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQABAOAHAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgJAAgHAHg");
	this.shape_71.setTransform(714.35,91.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_72.setTransform(705.575,89.25);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_73.setTransform(692.025,89.25);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_74.setTransform(684.7,89.525);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_75.setTransform(679.275,90.2);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_76.setTransform(671.925,91.25);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_77.setTransform(665.15,89.525);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_78.setTransform(660.4,91.15);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQABgOAFgKQAGgMAJgGQAKgGAKAAQATAAAKAMQAKAMAAAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAGgDQAFgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgOgcQgHAHgCANIAvAAIAAgBQAAgNgGgGQgHgHgKAAQgJAAgGAHg");
	this.shape_79.setTransform(652.15,91.25);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_80.setTransform(644.075,90.2);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_81.setTransform(637.475,89.25);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_82.setTransform(627.375,91.25);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_83.setTransform(619.95,91.15);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_84.setTransform(611.475,91.25);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_85.setTransform(602.675,89.25);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_86.setTransform(590.5,91.15);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_87.setTransform(582.025,91.25);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_88.setTransform(573.925,90.2);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_89.setTransform(568.475,89.15);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_90.setTransform(560.125,91.25);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgcA2QgLgNAAgWIAAgBQAAgVAKgNQAKgNASAAQAPAAAKALIAAgxIAQAAIAACGIgPAAIAAgKQgLALgQABQgQgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAQAAAHgNIAAgrQgHgOgQAAQgLABgGAIg");
	this.shape_91.setTransform(549.95,89.35);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_92.setTransform(535.675,91.15);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_93.setTransform(525.775,91.25);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgTA/QgKgFgFgHIAIgKQAKANAQAAQAKAAAHgHQAHgGAAgNIAAgIQgKAMgQAAQgRAAgKgOQgKgNAAgXQAAgWAKgNQAKgNARAAQARAAAJAMIABgKIAPAAIAABbQAAATgLALQgLAKgSAAQgKAAgJgEgAgQgrQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgOIAAgrQgIgNgPAAQgLAAgGAJg");
	this.shape_94.setTransform(515.675,93.025);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_95.setTransform(505.825,91.15);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgbAkQgMgMAAgVIAAgDQgBgOAGgKQAFgMAKgGQAKgGAKAAQATAAAKAMQALAMAAAXIAAAGIhAAAQAAAOAIAIQAIAJALAAQAJAAAFgDQAHgEAEgGIAKAIQgMATgXAAQgTgBgMgNgAgOgcQgHAHgBANIAuAAIAAgBQAAgNgHgGQgFgHgLAAQgJAAgGAHg");
	this.shape_96.setTransform(496.15,91.25);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQAKgNARAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgKALgQABQgRgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAHAJAKAAQAPAAAIgNIAAgrQgIgOgOAAQgLABgHAIg");
	this.shape_97.setTransform(486,89.35);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_98.setTransform(471.725,91.15);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_99.setTransform(461.825,91.25);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAXAwIgXhHIgWBHIgNAAIgchfIARAAIASBGIAWhGIANAAIAWBIIAShIIAQAAIgbBfg");
	this.shape_100.setTransform(450.15,91.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMgBAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_101.setTransform(438.7,91.25);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAVBEIAAg/QAAgKgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAiGIAQAAIAAAzQALgNAQAAQAegBAAAiIAAA/g");
	this.shape_102.setTransform(428.925,89.25);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_103.setTransform(415.575,89.25);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgHBBIAAheIAPAAIAABegAgGgwQgCgDAAgEQAAgEACgCQACgDAEAAQAEAAADADQADACAAAEQAAAEgDADQgDADgEAAQgEAAgCgDg");
	this.shape_104.setTransform(408.25,89.525);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_105.setTransform(402.825,90.2);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgSAtQgJgEgFgHQgFgHAAgJIAQAAQABAJAGAEQAGAFAJAAQAJAAAGgDQAFgFAAgFQAAgIgEgDQgGgDgLgDQgMgDgHgDQgIgDgDgGQgEgEAAgIQAAgLAKgIQAKgJAPABQAQAAAKAIQAKAIAAANIgRAAQAAgGgFgFQgGgFgIAAQgIAAgFAEQgFAEAAAGQAAAGAEADQAFADALADQAMADAIADQAHADAEAFQAEAGAAAHQAAANgLAIQgKAIgQAAQgKgBgJgEg");
	this.shape_106.setTransform(395.475,91.25);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgIBBIAAheIAQAAIAABegAgGgwQgDgDAAgEQAAgEADgCQACgDAEAAQAEAAADADQACACAAAEQAAAEgCADQgDADgEAAQgEAAgCgDg");
	this.shape_107.setTransform(388.7,89.525);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAQAAIAAALQAHgNAOABQAFgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_108.setTransform(383.95,91.15);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgbAkQgNgMAAgVIAAgDQAAgOAGgKQAGgMAJgGQAKgGAKAAQATAAAKAMQALAMgBAXIAAAGIg/AAQAAAOAIAIQAIAJALAAQAJAAAFgDQAGgEAFgGIAKAIQgMATgYAAQgSgBgMgNgAgPgcQgGAHgCANIAvAAIAAgBQgBgNgFgGQgHgHgKAAQgIAAgIAHg");
	this.shape_109.setTransform(375.7,91.25);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_110.setTransform(367.625,90.2);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_111.setTransform(361.025,89.25);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_112.setTransform(350.925,91.25);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAEgBADACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_113.setTransform(343.5,91.15);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_114.setTransform(335.025,91.25);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_115.setTransform(326.225,89.25);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgWAxIAAhfIAPAAIABALQAHgNAPABQAFgBACACIAAAPIgIAAQgPAAgGANIAABDg");
	this.shape_116.setTransform(314.05,91.15);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_117.setTransform(305.575,91.25);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgCA1QgGgHAAgLIAAg7IgRAAIAAgMIARAAIAAgXIAQAAIAAAXIARAAIAAAMIgRAAIAAA7QAAAFACADQACADAGAAIAIgBIAAANQgHACgGAAQgLAAgEgHg");
	this.shape_118.setTransform(297.475,90.2);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgNBFIAAhSIgPAAIAAgNIAPAAIAAgKQAAgOAIgJQAHgJAPAAIAMACIgBANIgJgBQgIABgEAEQgFAEAAAJIAAAKIAVAAIAAANIgVAAIAABSg");
	this.shape_119.setTransform(292.025,89.15);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_120.setTransform(283.675,91.25);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgdA2QgKgNAAgWIAAgBQAAgVAKgNQAKgNARAAQAQAAAKALIAAgxIAQAAIAACGIgPAAIgBgKQgKALgQABQgRgBgKgOgAgQgHQgHAJAAASQAAAQAHAJQAGAJALAAQAPAAAIgNIAAgrQgHgOgPAAQgMABgGAIg");
	this.shape_121.setTransform(273.5,89.35);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AAVAxIAAg+QAAgLgFgFQgEgEgKgBQgHABgGAEQgGAEgDAGIAABEIgQAAIAAhfIAPAAIAAAMQALgOARABQAegBAAAjIAAA+g");
	this.shape_122.setTransform(259.225,91.15);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgdAqQgJgJAAgMQAAgPALgHQALgIAUAAIAQAAIAAgIQAAgIgFgFQgFgGgKAAQgIAAgGAFQgGAFAAAGIgQAAQAAgIAFgGQAFgGAJgFQAIgDAKAAQAQAAAJAIQAKAIAAAOIAAArQAAANADAIIAAACIgRAAIgCgKQgLALgPABQgOAAgJgIgAgWATQAAAIAFAEQAFAEAIAAQAHAAAHgEQAHgEADgGIAAgTIgNAAQgdAAAAARg");
	this.shape_123.setTransform(249.325,91.25);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AAUBEIgggsIgKAKIAAAiIgQAAIAAiGIAQAAIAABQIAJgKIAcgfIAUAAIgkAnIAoA4g");
	this.shape_124.setTransform(240.525,89.25);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_125.setTransform(230.275,91.25);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgbAkQgMgNAAgWIAAgCQAAgOAFgLQAGgKAJgGQAJgHAMABQARAAAKAJQALAKAAAPIgPAAQgBgJgGgGQgHgGgJAAQgLAAgHAJQgHAJAAAQIAAADQAAAQAHAJQAHAJALAAQAJAAAHgFQAGgGABgIIAPAAQAAAJgFAHQgFAIgJAEQgJAEgKABQgSgBgLgNg");
	this.shape_126.setTransform(220.55,91.25);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgeAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgGQAJgHAMABQATAAAMANQAMANAAAWIAAABQAAAOgFALQgFALgKAGQgKAGgNABQgSAAgMgOgAgTgaQgHAKAAARQAAAQAHAJQAIAKALAAQAMAAAIgKQAHgJAAgRQAAgPgHgKQgIgKgMAAQgLAAgIAJg");
	this.shape_127.setTransform(210.675,91.25);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgjAxQgNgQAAgbIAAgMQAAgRAGgOQAGgNAMgIQAMgHAOAAQAVAAAMALQAMAMACAUIgRAAQgCgPgHgHQgIgHgNAAQgPAAgJAMQgJAMAAAWIAAALQAAAVAIAMQAJANAPAAQAOAAAHgHQAIgGACgQIARAAQgCAUgNAMQgMALgVAAQgWAAgOgRg");
	this.shape_128.setTransform(199.875,89.625);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AACAVIAAgKQAAgJAEgIQAEgJAHgFIAJAGQgIAMAAALIAAAMgAgZAVIAAgKQAAgJAEgIQAEgJAHgFIAKAGQgJAMAAALIAAAMg");
	this.shape_129.setTransform(191.075,84.45);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.bf(img.Bitmap2, null, new cjs.Matrix2D(1,0,0,1,-499,-300)).s().p("EhN9Au4MAAAhdvMCb7AAAMAAABdvg");
	this.shape_130.setTransform(471,261);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.slots},{t:this.pieces},{t:this.judulKI},{t:this.Score},{t:this.restart},{t:this.btnInfo},{t:this.empat},{t:this.satu},{t:this.tiga},{t:this.lima},{t:this.dua},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.instance_3},{t:this.instance_2},{t:this.shape_6},{t:this.winMessage}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E740BB847DF4864B949C99CD86B71105',
	width: 960,
	height: 540,
	fps: 24,
	color: "#009999",
	opacity: 1.00,
	manifest: [
		{src:"images/_16.jpeg", id:"_16"},
		{src:"images/_28.jpeg", id:"_28"},
		{src:"images/_32.jpeg", id:"_32"},
		{src:"images/_36.jpeg", id:"_36"},
		{src:"images/Bitmap122.png", id:"Bitmap122"},
		{src:"images/bookpngcopy.png", id:"bookpngcopy"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
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