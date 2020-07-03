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



(lib._1pngcopy = function() {
	this.initialize(img._1pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._2pngcopy = function() {
	this.initialize(img._2pngcopy);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._4e = function() {
	this.initialize(img._4e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib._5e = function() {
	this.initialize(img._5e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib.bintanglaut = function() {
	this.initialize(img.bintanglaut);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,433,371);


(lib.Bitmap28 = function() {
	this.initialize(img.Bitmap28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,960,545);


(lib._6e = function() {
	this.initialize(img._6e);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib.bulubabi = function() {
	this.initialize(img.bulubabi);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,495,480);


(lib.cacingruubelus = function() {
	this.initialize(img.cacingruubelus);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,376,233);


(lib.fish = function() {
	this.initialize(img.fish);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,529,371);


(lib.kelabang = function() {
	this.initialize(img.kelabang);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,788,365);


(lib.porifera = function() {
	this.initialize(img.porifera);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,390,403);


(lib.teripang = function() {
	this.initialize(img.teripang);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,738,347);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,561);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,998,600);


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


(lib.Tween13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Geser bitang laut ke keranjang ini", "10px 'Roboto'");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 148;
	this.text.parent = this;
	this.text.setTransform(0,-6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-8,152.4,16);


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


(lib.Tween5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Geser bitang laut ke keranjang ini", "10px 'Roboto'");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 148;
	this.text.parent = this;
	this.text.setTransform(0,-6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-8,152.4,16);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.text = new cjs.Text("Geser bitang laut ke keranjang ini", "10px 'Roboto'");
	this.text.textAlign = "center";
	this.text.lineHeight = 14;
	this.text.lineWidth = 148;
	this.text.parent = this;
	this.text.setTransform(0,-6);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-8,152.4,16);


(lib.target = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#667028").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape.setTransform(13.5,66.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#4C531D").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_1.setTransform(11.5,66.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#352609").s().p("AAFAFIgJAAIgKAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_2.setTransform(13,65.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0E0E04").s().p("AAFAFIgTAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_3.setTransform(16,65.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#4C521D").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape_4.setTransform(18.5,65.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#452F0A").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_5.setTransform(18.5,64.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333411").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_6.setTransform(9.5,66.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0D0C03").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_7.setTransform(5.5,66.9);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1B1A09").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_8.setTransform(7.5,66.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#45370F").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgDADQgCACgEAAIAAgKg");
	this.shape_9.setTransform(22,64.4);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#131105").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_10.setTransform(20.5,64.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#241F09").s().p("AgOgEIATAAIAKAAQAAAEgBABQgOAEgOAAIAAgJg");
	this.shape_11.setTransform(24,63.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#211B07").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_12.setTransform(26.5,62.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#737D2E").s().p("AgOgEIAKAAIAJAAIAKAAQAAAEgCAAQgNAFgOAAIAAgJg");
	this.shape_13.setTransform(29,62.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#251C07").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_14.setTransform(28.5,61.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#392507").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgDACQgCADgEAAIAAgKg");
	this.shape_15.setTransform(22,60.4);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#46340C").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgDACQgCADgFAAIgJAAg");
	this.shape_16.setTransform(31.5,59.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#49320B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_17.setTransform(34,57.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#39330F").s().p("AgJAJIAAgJQAFgFAFgDQAEgCAFAAIAAAKQABALgLAAIgJgCg");
	this.shape_18.setTransform(35.5272,56.4918);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#1F1C08").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_19.setTransform(37,54.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#49310A").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_20.setTransform(37,52.4);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#3F4418").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgCADQgDACgEAAIAAgKg");
	this.shape_21.setTransform(38,52.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#181707").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_22.setTransform(38,50.4);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#050401").s().p("AgEAPIAAgKIAAgTIAJAAIAAAKIAAAJIAAAKIgJAAg");
	this.shape_23.setTransform(38,47.9);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#201707").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_24.setTransform(38,45.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#0F0902").s().p("AAFAFQgFAAgDgCQgGgDgFgEIAKAAIAJAAIAKAAIAAAJIgKAAg");
	this.shape_25.setTransform(32,47.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#342207").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape_26.setTransform(31.5,42.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#5B4922").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_27.setTransform(39,43.4);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#161006").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_28.setTransform(39,40.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#665326").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_29.setTransform(40,38.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C1E05").s().p("AgEAFIAAgJIAAgKIAJAAIAAAKIAAAJQAAAFgCACQgDADgEAAIAAgKg");
	this.shape_30.setTransform(25,50.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2A1C05").s().p("AgEAFIAAgJIAAgKIAJAAIAAAKIAAAJQAAAFgCACQgDADgEAAIAAgKg");
	this.shape_31.setTransform(28,49.9);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#120D03").s().p("AgGAIQgDgDAAgFIAAgJIAJAAQAAAFADADQACABAFAAQAAAFgDADQgCACgFAAQgEAAgCgCg");
	this.shape_32.setTransform(21.5,26.4);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#4C320B").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_33.setTransform(27.5,30.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#1B1205").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_34.setTransform(6.5,31.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2A1D08").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_35.setTransform(1.5,32.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#392709").s().p("AAFAFIgJAAIgKAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_36.setTransform(4,32.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#311F06").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_37.setTransform(8,29.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#5B3B0B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_38.setTransform(6,26.4);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#65430E").s().p("AAFAFIgJAAIgKAAIAAgJIAKAAIAJAAIAKAAIAAAJIgKAAg");
	this.shape_39.setTransform(19,31.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#382609").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_40.setTransform(9.5,34.9);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#3A2609").s().p("AAUAFIgUAAIgJAAIgUAAIAAgJIAxAAIAKAAIAAAJIgKAAg");
	this.shape_41.setTransform(11.5,32.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#271A06").s().p("AgFAPIAAgKIAAgTIAJAAIABAJQAFAUgNAAIgCAAg");
	this.shape_42.setTransform(16.1188,28.9048);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#0D0701").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_43.setTransform(16.5,23.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#39290F").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_44.setTransform(18.5,12.9);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#1B1102").s().p("AAPAFIgTAAIgKAAIgKAAIAAgJIAKAAIAKAAQAOAAANAEQACAAAAAFIgKAAg");
	this.shape_45.setTransform(9,23.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#190F02").s().p("AABANQgFgDgFgFIAAgJIAAgKIAJAAIAKAAIAAAKIAAAJIAAAKQgFAAgEgCg");
	this.shape_46.setTransform(7.5,20.9);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#352206").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_47.setTransform(7,18.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#4B3109").s().p("AgEAPIAAgKIAAgJIAAgKIAJAAIAAAKIAAAJIAAAKIgJAAg");
	this.shape_48.setTransform(7,15.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#261A07").s().p("AgBAGQgDgGgFgEQgFAAgCgDQgDgCAAgFIAdAAIAKAAQAAAFgDACQgCADgFAAIAAAJQAAAFgDACQgCADgFAAQAAgFgBgEg");
	this.shape_49.setTransform(4.5,12.9);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#1E1406").s().p("AgOgEIATAAIAKAAQAAAEgCABQgNAEgOAAIAAgJg");
	this.shape_50.setTransform(12,11.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#2E2008").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_51.setTransform(16.5,2.9);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#55390B").s().p("AgFAPIAAgKIAAgJIAAgKIAJAAIABAJQAFAUgNAAIgCAAg");
	this.shape_52.setTransform(34.1188,25.9048);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#3D2807").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_53.setTransform(33.5,20.9);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#5E3D0C").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_54.setTransform(32,13.4);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#2B1B04").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_55.setTransform(33,13.4);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#462F0A").s().p("AAKCCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAgTh3IAAgKIAKAAIAJAAIAKAAQAAAFgCABQgIAEgJAAIgKAAg");
	this.shape_56.setTransform(36.5,31.4);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#472F0A").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape_57.setTransform(29.5,22.9);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#362409").s().p("ABLBpIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhUhUIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_58.setTransform(18,15.9);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#1A1104").s().p("AgOAPIAAgKIAAgJQAKAAAHgEQACgBAAgFIAKAAIAAAKIAAAJIgKAAIgJAAIAAAKIgKAAg");
	this.shape_59.setTransform(29,21.9);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#211605").s().p("AgEAPQgFAAgCgCQgDgDAAgFQAAgFgDgBQgCgDgFAAIAAgKIAKAAQAFAFAGADQADACAFAAIAAgKIAKAAIAKAAIAAAKIgKAAIAAAJIgKAAIAAAKIgJAAg");
	this.shape_60.setTransform(23,24.9);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#372509").s().p("ABQCbIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABGA3IAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgABQgsIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAhZiQIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKg");
	this.shape_61.setTransform(16.5,20.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#3D2809").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_62.setTransform(21.5,12.9);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#1C1204").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_63.setTransform(29.5,16.9);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#593A0B").s().p("AgJAKIAAgKIAAgJIAJAAIAKAAIAAAJIgKAAIAAAKIgJAAg");
	this.shape_64.setTransform(30.5,15.4);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#1F1404").s().p("AheCvIgKAAIgKAAQAAgFgDgDQgCgCgFAAIgKAAIAAgKIAeAAIAKAAQAAAFADADQACACAFAAIAAAKIgKAAgAB9ikIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_65.setTransform(14,27.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#322006").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_66.setTransform(26,7.4);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#312109").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_67.setTransform(22.5,10.9);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#130C01").s().p("AgEAjIgKAAIAAgKIAAgKQAFgFADgGQACgEAAgEIAAgKIAAgKIAAgKQAEAFAGADQAEACAFAAIAAAKIgKAAIAAAKIAAAJIAAAKIAAAKIAAAKIgJAAg");
	this.shape_68.setTransform(27,6.9);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#231604").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgCADQgDACgEAAIAAgKg");
	this.shape_69.setTransform(37,9.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#0B0601").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_70.setTransform(37.5,7.9);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#311F05").s().p("AgEAKIgKAAIAAgKIAAgJIAKAAQAEAFAGADQAEABAFAAQAAAFgCACQgDADgFAAIgJAAg");
	this.shape_71.setTransform(35,12.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#201403").s().p("AgJAPIAAgKIAAgJQAFgFAFgDQAEgCAFAAIAAAKIAAAJIgKAAIAAAKIgJAAg");
	this.shape_72.setTransform(32.5,9.9);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#150E02").s().p("AgkCtQgDgDAAgFIAAgKIAAgKIAAgKIAAgKIAKAAQAAAFADACQACADAFAAIAAAKIgKAAIAAAKIAAAKIAAAKQgFAAgCgCgAAeiQIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAg");
	this.shape_73.setTransform(34.5,20.9);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#1E1709").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_74.setTransform(40,35.9);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#533F1D").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_75.setTransform(40.5,31.9);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#BBA267").s().p("AAAAAIABAAIAAABIgBgBg");
	this.shape_76.setTransform(41.575,33.475);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#38260B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_77.setTransform(40,33.4);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#15110A").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_78.setTransform(41,30.4);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#77694A").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_79.setTransform(42,27.4);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#32240C").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_80.setTransform(41,28.4);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#49330F").s().p("AgJAKIAAgKIAAgJIAJAAIAKAAIAAAJIgKAAIAAAKIgJAAg");
	this.shape_81.setTransform(41.5,26.4);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#7B6D4D").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_82.setTransform(43,22.4);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#452E0B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_83.setTransform(42,22.4);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#0E0903").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_84.setTransform(40,21.4);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#473313").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_85.setTransform(42.5,20.9);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#130E06").s().p("AgJAjIAAgKIAAgKIAJAAIAAAKIAAAKIgJAAgAAAgOIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_86.setTransform(42.5,21.9);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#452F0C").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_87.setTransform(43,17.4);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#291B06").s().p("AgGAIQgDgDAAgFIAAgJIAJAAIAKAAQAAAFgCAEQgDAFgFAFQgEAAgCgCg");
	this.shape_88.setTransform(40.5,18.4);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#473312").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_89.setTransform(43.5,15.9);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#130B02").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_90.setTransform(44,14.4);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#4C2B07").s().p("AgJAKIAAgKIAAgJIAJAAIAKAAIAAAJQAAAFgCACQgDADgFAAIgJAAg");
	this.shape_91.setTransform(44.5,12.4);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#150B01").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_92.setTransform(45,9.9);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#432203").s().p("AAAAPIgKAAIAAgKQAFgFADgFQACgEAAgFIAJAAIABAJQAFAUgOAAIgBAAg");
	this.shape_93.setTransform(45.6188,6.9048);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#1A1002").s().p("AizCCIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAgACthwQgDgCAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgCgDg");
	this.shape_94.setTransform(24.5,18.4);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#3E2907").s().p("AgBADQgDgDgFAAIAAgJIAJAAIAKAAQAAAFgCAEQgDAFgFAFQAAgFgBgCg");
	this.shape_95.setTransform(43.5,3.4);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#763804").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_96.setTransform(47,3.4);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#3C2205").s().p("AgJAPIAAgKIAAgJQAFAAADgCQABgDAAgFIAKAAIAAAKIAAAJIgKAAIAAAKIgJAAg");
	this.shape_97.setTransform(46.5,1.9);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#0B0A02").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_98.setTransform(-26.5,63.9);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#6B762B").s().p("AABADQgFgDgFgEIAJAAQAFAAACACQADACAAAFQgFAAgEgCg");
	this.shape_99.setTransform(-25.5,64.9);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#43370F").s().p("AAAAKQAAgFgCgDQgCgCgFAAIAAgJQAJAAAIAEQACABAAAEIAAAKIgKAAg");
	this.shape_100.setTransform(-24.5,64.4);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#3F350F").s().p("AAGAJQgKgEgKgFIAAgJQAOAAAOAEQABABAAAEIAAAKQgFAAgEgBg");
	this.shape_101.setTransform(-29,63.4);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#737E2D").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_102.setTransform(-33.5,62.9);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#161708").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_103.setTransform(-31.5,62.9);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#211D08").s().p("AAFAFIgJAAQgFAAgDgCQgCgDAAgEQAOAAANAEQACAAAAAFIgKAAg");
	this.shape_104.setTransform(-34,61.9);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#332206").s().p("AgBAHQgDgCAAgFIAAgJQAEAAACADQADACAAAEIAAAKQgFAAgBgDg");
	this.shape_105.setTransform(-32,58.4);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#2D260A").s().p("AAAAFIgFAAIgEAAIAAgEIAAgFQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_106.setTransform(-36.5,60.9);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#747E2D").s().p("AgJAGQgCgFADgKIAJAAQAFAFADAFIACAFIAAAEIgKAAIgBAAQgGAAgDgEg");
	this.shape_107.setTransform(-39.5818,60.4273);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#38320F").s().p("AAAAKIAAgEIgBgFQgDgFgFgFQAJAAAIAEQACABAAAEIAAAGIAAAEIgKAAg");
	this.shape_108.setTransform(-38.5,60.4);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#1D1304").s().p("AlDB8QgLgEgKgFIAAgKQAWgGADAPQAAABAFAAIAAAKQgFAAgEgBgAFPhoQAAgFgCgEQgDgGgFgFIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_109.setTransform(-6,43.9);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#342307").s().p("AgCAHQgCgCAAgFIAAgJIAJAAIAAAJIAAAKQgFAAgCgDg");
	this.shape_110.setTransform(-26,60.4);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#322106").s().p("AgCAHQgCgCAAgFIAAgJQAEAAADADQACACAAAEIAAAKQgFAAgCgDg");
	this.shape_111.setTransform(-29,59.4);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#482F0A").s().p("AABADQgFgDgFgEQAJAAAIAEQACAAAAAFQgFAAgEgCg");
	this.shape_112.setTransform(-24.5,49.9);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#424618").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_113.setTransform(-6.5,66.9);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#545C21").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_114.setTransform(-8.5,66.9);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#0A0902").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_115.setTransform(-0.5,66.9);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#1A1908").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_116.setTransform(-2.5,66.9);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#2E2F10").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_117.setTransform(-4.5,66.9);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#291C06").s().p("AAUAFIgnAAIgKAAIAAgJIAxAAIAKAAIAAAJIgKAAg");
	this.shape_118.setTransform(0.5,62.9);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#677028").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_119.setTransform(-19.5,65.9);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#474013").s().p("AAAAKIgJAAIAAgKQAFAAADgBQABgDAAgFQAFAAADACQACADAAAEIAAAKIgKAAg");
	this.shape_120.setTransform(-17.5,65.4);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#121004").s().p("AAKAFIgdAAIAAgJIAdAAIAKAAIAAAJIgKAAg");
	this.shape_121.setTransform(-14.5,65.9);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#677128").s().p("AgOgFIAKAAIAJAAIAKAAIAAAJIgJABIgJABQgMAAABgLg");
	this.shape_122.setTransform(-11.0022,67.0188);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#2B2108").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_123.setTransform(-11.5,65.9);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#3C2909").s().p("AAFAFIgJAAIgKAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_124.setTransform(-9,65.9);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#3D2808").s().p("AgGAIQgDgDAAgFIAAgJQAJAAAIAEQACABAAAEIgKAAIAAAKQgEAAgCgCg");
	this.shape_125.setTransform(-20.5,61.4);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#1C1203").s().p("AkDA8IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAEEgnIgKAAQgFAAgCgDQgDgCAAgFIAAgKIAKAAIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_126.setTransform(5.5,46.4);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#2E1E07").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_127.setTransform(-19.5,50.9);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#4E340B").s().p("AjqBfIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgADrhAQAAgFgCgEQgDgGgFgFIAAgKIAKAAIAKAAIAAAKIAAAKIAAAKIgKAAg");
	this.shape_128.setTransform(6,41.9);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#191103").s().p("AiLBBIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAQAAAFgDADQgCACgFAAIAAAKIgKAAgABugYQAAgFgCgEQgDgGgFgFIAKAAIAKAAIAKAAIAKAAQAFAAACACQADADAAAFIgKAAIgKAAIgKAAIAAAKIgKAAgADIgsQgFAAgDgDQgCgCAAgFQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAg");
	this.shape_129.setTransform(7.5,47.9);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#342F0E").s().p("AgFADQgCgCAAgEQAUgGgGANQAAACgFAAQgEAAgDgDg");
	this.shape_130.setTransform(-42.6595,57.8122);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#35260B").s().p("AACANQgLgJAAgSQAQADADAQIAAAKQgFAAgDgCg");
	this.shape_131.setTransform(-48.5,51.9);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#7B802F").s().p("AgCAFIgEAAIAAgJIAEAAQAEAAACACQADACAAAFIgJAAg");
	this.shape_132.setTransform(-47.175,54.9);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#231804").s().p("AADAIQgHgIgFgJQAJAAAIAEQACABAAAEIAAAKQgFAAgCgCg");
	this.shape_133.setTransform(-41.5,54.4);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#231705").s().p("AABAMQgKgHAAgTIAJAAQAFAKAEAKQABAEAAAFQgFAAgEgDg");
	this.shape_134.setTransform(-45.5,49.9);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#5F4C23").s().p("AAAAIQgEgIAAgJIAJAAIAAAJIAAAKQgFAAAAgCg");
	this.shape_135.setTransform(-51,47.4);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#2C230F").s().p("AgEAPIAAgKIAAgJIAAgKQAEAAACACQADADAAAFIAAAJIAAAKIgJAAg");
	this.shape_136.setTransform(-51,44.9);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#D0AF62").s().p("AAAAFIgIAAIAAgJIAIAAIAJAAIAAAJIgJAAg");
	this.shape_137.setTransform(-52.4,43.9);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#59421C").s().p("AAAAPQAAgFgCgDQgCgCgFAAIAAgJIAAgKIAJAAIAKAAIAAATIAAAKIgKAAg");
	this.shape_138.setTransform(-50.5,42.9);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#9E8E64").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_139.setTransform(-51,40.4);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#372609").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_140.setTransform(-43,33.4);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#140E04").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_141.setTransform(-47,37.4);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#33250E").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_142.setTransform(-50,37.9);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#C8B380").s().p("AgEAUIAAgKIAAgdIAJAAIAAAKIAAATIAAAKIgJAAg");
	this.shape_143.setTransform(-51,37.4);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#3C2B0F").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_144.setTransform(-50,35.4);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#A29167").s().p("AgEAUIAAgKIAAgdIAJAAIAAATIAAAKIAAAKIgJAAg");
	this.shape_145.setTransform(-51,33.4);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#2A1C06").s().p("AAAAIQgEgIAAgJIAJAAIAAAJIAAAKQgFAAAAgCg");
	this.shape_146.setTransform(-48,31.4);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#432D0A").s().p("AgTAUIAAgKIAAgTIAKAAIAAATIAAAKIgKAAgAAKAAIAAgJIAAgKIAKAAIAAAKIAAAJIgKAAg");
	this.shape_147.setTransform(-48.5,32.4);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#1C1406").s().p("AgEAPIAAgKIAAgTIAJAAIAAAKIAAAJIAAAKIgJAAg");
	this.shape_148.setTransform(-48,28.9);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#6A5E40").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_149.setTransform(-51,30.4);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#573E16").s().p("AAAAKIgJAAIAAgKQAFAAACgBQACgDAAgFQAFAFADAFQACAEAAAFIgKAAg");
	this.shape_150.setTransform(-50.5,28.4);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#282216").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgDADQgCACgEAAIAAgKg");
	this.shape_151.setTransform(-51,27.4);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#422C0A").s().p("AgsBBIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAjg2IAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKg");
	this.shape_152.setTransform(-46,34.9);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#070401").s().p("AAAAPQgEAAAAgCQgFgNAAgOQAFAFAFADQAEACAFAAIAAAJIAAAKIgKAAg");
	this.shape_153.setTransform(-43.5,30.9);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#251906").s().p("AABAIQgFgDgFgFIAAgJIAJAAIAKAAIAAAJIAAAKQgFAAgEgCg");
	this.shape_154.setTransform(-43.5,29.4);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#070603").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_155.setTransform(-51,25.4);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#221604").s().p("AgJAKIAAgKQAFAAACgCQACgCAAgFQAFAAACADQADACAAAEQAAAFgDACQgCADgFAAIgJAAg");
	this.shape_156.setTransform(-41.5,24.4);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#201504").s().p("AgJAPIAAgKIAAgJIAAgKIAJAAQAAAFADACQACADAFAAQAAAEgDACQgCADgFAAIAAAKIgJAAg");
	this.shape_157.setTransform(-42.5,23.9);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#231603").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgCACQgDADgFAAIgJAAg");
	this.shape_158.setTransform(-45.5,22.9);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#251803").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_159.setTransform(-47.5,21.9);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#120B02").s().p("AE7BpQAAgFgCgEQgDgGgFgFQgFAAgBgCQgEgIAAgKIAKAAQgBARAVgCIAAAFIAAAKIAAAKIgKAAgAlEhUIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_160.setTransform(-16,29.9);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#281B06").s().p("AETCCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkchtIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_161.setTransform(-21,28.4);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#1D1407").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_162.setTransform(-49,14.4);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#3F2909").s().p("AgEAUIAAgKIAAgdIAJAAIAAAKIAAAJIAAAKIAAAKIgJAAg");
	this.shape_163.setTransform(-42,19.4);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#362306").s().p("AgEAKIAAgKIAAgJQAEAAACADQADACAAAEIAAAKIgJAAg");
	this.shape_164.setTransform(-42,16.4);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#291D07").s().p("AgEAAIAAgJQAEAAACADQADACAAAEQAAAFgDACQgCADgEAAIAAgKg");
	this.shape_165.setTransform(-42,13.4);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#D4B57F").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_166.setTransform(-52.5,23.9);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#160D03").s().p("AgEAPIAAgKIAAgJIAAgKIAJAAIAAATIAAAKIgJAAg");
	this.shape_167.setTransform(-51,22.9);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#A78268").s().p("AAEAFIgRAAIAAgJIAIAAIAJAAIAKAAIAAAJIgKAAg");
	this.shape_168.setTransform(-52.925,20.9);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#382812").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_169.setTransform(-51,20.4);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#AF9B8A").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_170.setTransform(-52,19.4);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#422C0B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_171.setTransform(-51,18.4);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#887768").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_172.setTransform(-52,17.4);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#594D41").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_173.setTransform(-52,15.4);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#2E261E").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_174.setTransform(-52,13.4);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#0B0906").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_175.setTransform(-52,10.9);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#D8BFAA").s().p("AAAAOQgEgOAAgOIAJAAIAAAKIAAAJIAAAKQgFAAAAgBg");
	this.shape_176.setTransform(-53,7.9);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#241C10").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_177.setTransform(-52,8.4);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#322008").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_178.setTransform(-52,6.4);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#3F2907").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_179.setTransform(-52,4.4);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#854B1B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_180.setTransform(-53,5.4);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#622F04").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_181.setTransform(-53,3.4);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#432103").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_182.setTransform(-53,1.4);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#1A1205").s().p("AjgAjIgKAAIAAgKIAAgKQAFgFAGgDQAEgCAFAAIAAAKIAAAKIAAAKIgKAAgADhgYIgKAAIAAgKIAKAAQAFAAACACQADADAAAFIgKAAg");
	this.shape_183.setTransform(-20,5.9);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#120D05").s().p("AgEAKIAAgKIAAgJQAEAAACACQADADAAAEIAAAKIgJAAg");
	this.shape_184.setTransform(-49,12.4);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#090602").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_185.setTransform(-46,3.4);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#422C08").s().p("AgEAKIAAgKIAAgJQAEAAACADQADACAAAEIAAAKIgJAAg");
	this.shape_186.setTransform(-50,4.4);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#342106").s().p("AAAAKQAAgFgCgCQgCgDgFAAIAAgJIAJAAIAKAAIAAAJIAAAKIgKAAg");
	this.shape_187.setTransform(-49.5,3.4);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#452D08").s().p("AAAAFIgJAAIAAgJIAJAAQAFAAACACQADACAAAFIgKAAg");
	this.shape_188.setTransform(-48.5,1.9);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#63410D").s().p("AESA3IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAlFAZIAAgKIAAg7QAFAAACADQADACAAAFIAAAKIAAAKIAAAKIAAAJIAAAKIAAAKIgKAAgAE6gYIAAgKIAAgKIAAgKIAKAAIABAJQAFAVgOAAIgCAAg");
	this.shape_189.setTransform(-11.8812,8.9);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#322208").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgCADQgDACgFAAIgJAAg");
	this.shape_190.setTransform(-45.5,1.9);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#52350A").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_191.setTransform(0.5,44.9);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#322107").s().p("ACRB9IgKAAIAAgKQAFgFAGgDQAEgCAFAAIAAAKIAAAKIgKAAgAjcBJQgEgNAAgPIAKAAIAAAUIAAAKQgFAAgBgCgABzAZIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgADXhoIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIgKAAg");
	this.shape_192.setTransform(18,34.9);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#251A07").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_193.setTransform(-19,38.4);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#412A08").s().p("AgEAPIAAgKIAAgTIAJAAIAAAKIAAAJIAAAKIgJAAg");
	this.shape_194.setTransform(-19,33.9);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#1C1305").s().p("AAAAKIgJAAIAAgKIAAgJQAFAFAFADQAEABAFAAIAAAKIgKAAg");
	this.shape_195.setTransform(-17.5,33.4);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#231806").s().p("AABANQgFgDgFgFIAAgJQAFAAADgDQABgCAAgFIAKAAIAAAKIAAAJIAAAKQgFAAgEgCg");
	this.shape_196.setTransform(-9.5,32.9);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#3A2608").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_197.setTransform(-23.5,43.9);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#342308").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_198.setTransform(-24.5,45.9);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#1E1506").s().p("AAAAKQAAgFgBgEQgDgFgFgFIAJAAQAFAAADACQACADAAAEIAAAKIgKAAg");
	this.shape_199.setTransform(-29.5,39.4);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#170F02").s().p("AkXC+QAAgFgCgCQgDgDgFAAIAAgKIAKAAQAFAFADAGQACAEAAAFIgKAAgAD6gnIgKAAIAAgKQAFgFADgGQACgEAAgFIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIgKAAgAEOifIAAgKIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAIAAAKIgKAAg");
	this.shape_200.setTransform(8.5,24.4);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#442E0A").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_201.setTransform(-24.5,39.9);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#2D1D06").s().p("AgEAAIAAgJQAEAAACACQADADAAAEQAAAFgDADQgCACgEAAIAAgKg");
	this.shape_202.setTransform(-40,45.4);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#261905").s().p("AABANQgFgDgFgFIAAgJQAFAAADgDQABgCAAgFQAFAAADADQACACAAAFIAAAJIAAAKQgFAAgEgCg");
	this.shape_203.setTransform(-36.5,42.9);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#3C2B0E").s().p("AAAAFIgJAAIAAgJIAJAAQAFAAACADQADABAAAFIgKAAg");
	this.shape_204.setTransform(-39.5,40.9);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#241906").s().p("AgBAHQgIgHgFgJIAKAAIAJAAQAFAAACADQADACAAAEIgKAAIAAAKQgFAAgBgDg");
	this.shape_205.setTransform(-41,40.4);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#38260A").s().p("AgBAIQgDgDAAgFIAAgJIAJAAIAAAJIAAAKQgFAAgBgCg");
	this.shape_206.setTransform(-41,37.4);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#402B0A").s().p("AABADQgFgDgFgEQAJAAAIAEQACAAAAAFQgFAAgEgCg");
	this.shape_207.setTransform(-32.5,39.9);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#442D0A").s().p("AkCCKQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAGagJIAKAAIAKAAQAAAFgCABQgIADgKAAIAAgJgAmth3IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_208.setTransform(-5.5,29.4);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#66430E").s().p("AkSBfIgeAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAQAAgFgDgCQgCgDgFAAQAAgFgDgCQgCgDgFAAIAAgKIAAgKIAKAAIAKAAQAAAFACADQADACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAQAFAFAGADQAEACAFAAIAKAAQAFAFAGADQAEACAFAAQAKAFAIAIQACACAAAFIgKAAgAF3BVIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgUQAFAAADgDQACgCAAgEIAAgKIAAgUIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAJIAAAUIAAAKIgKAAIAAAKIAAAKIAAAUIAAAKIgKAAg");
	this.shape_209.setTransform(0,33.9);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#2A1C07").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape_210.setTransform(-32.5,37.9);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#160F04").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_211.setTransform(-39,32.4);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#050200").s().p("AgEAjIAAgKIAAgKIABgKQAFgUgQABIAAgKIAAgKQAOAAAOAEQABABAAAFIgKAAIAAAxIAAAKIgJAAg");
	this.shape_212.setTransform(-38,29.9);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#1D1303").s().p("AiLBzQAAgFgCgBQgIgEgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAQAFAFAGADQAEACAFAAQAAAFgDACQgCADgFAAIAAAKIgKAAgAC+g2IAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAgACqhAIgKAAIAAgKIAKAAQAFAAACADQADACAAAFIgKAAgAjHhoIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKg");
	this.shape_213.setTransform(-11.5,40.9);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#2B1C05").s().p("AgCANQgCgDAAgFIAAgJIAAgKQAEAAADACQACADAAAFIAAAJIAAAKQgFAAgCgCg");
	this.shape_214.setTransform(-35,26.9);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#0C0700").s().p("AAAAKIgJAAIAAgKIAAgJIAJAAIAKAAIAAAJIAAAKIgKAAg");
	this.shape_215.setTransform(-33.5,27.4);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#2D1D05").s().p("ABzBkIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAgAh5hHQgDgDAAgFIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKQgFAAgCgCg");
	this.shape_216.setTransform(-20,36.4);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#65420D").s().p("ABVBpIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAhegiIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAIAABGIAAAKIgKAAg");
	this.shape_217.setTransform(-38,24.9);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#382507").s().p("AjWAeIAAgKQAFAAADADQACACAAAFQAAAFgCACQgDADgFAAIAAgKgADNgJIAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAg");
	this.shape_218.setTransform(-5,28.4);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#50350A").s().p("ADSC0IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAgniLIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAjbifIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_219.setTransform(-25.5,46.4);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#1A1204").s().p("Ai9BzQAAgFgCgBQgIgEgKAAIAAgKIAKAAIAKAAIAKAAIAAAKIAAAKIgKAAgADKhgQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCg");
	this.shape_220.setTransform(-1.5,20.9);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#3E2909").s().p("AhTBOQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgABVgnIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAAthFIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_221.setTransform(-24,37.4);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#180F02").s().p("AifCbQAAgFgCgCQgDgDgFAAIAAgKIAAgKQAVgGAEAPQAAABAFAAIAAAKIgKAAIAAAKIgKAAgAFygsIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKQgFAAgEACQgGADgFAFIAAgKgAl7iGQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_222.setTransform(-9.5,15.9);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#000000").s().p("ABQA8IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAh/AvQgCgCAAgFIAAgKIAAgKIAAgKIAAgKIAAgJIAAgKIAAgKIAAgUIAKAAIAAAKIAAAKIAABFIAAAKQgFAAgDgDgABkAeIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAB4gxIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_223.setTransform(-33.5,28.4);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#281904").s().p("AjvBQQAAgFgDgDQgCgCgFAAIAAgKQAFAAACgCQADgDAAgFQAFAAACACQADADAAAFIAAAKIAAAKIgKAAgAkVBEQgCgDAAgFIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAIAAAKQgFAAgDgCgAEOg7IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_224.setTransform(0.5,13.4);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#1C1102").s().p("AjqAeIgKAAIAAgKQAFgFADgGQACgEAAgFIAAgJQAFAFAGADQAEABAFAAIAAAKIgKAAIAAAKIAAAKIgKAAgADrgJIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_225.setTransform(-7,24.4);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#100901").s().p("AABANQgFgDgFgFIAAgJIAAgKIAJAAQAAAFACACQADADAFAAIAAAJIAAAKQgFAAgEgCg");
	this.shape_226.setTransform(-29.5,22.9);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#603F0D").s().p("AFKCCIAAgKIAAgKQARADgLAZQgBACgFAAIAAgKgAlTh3IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_227.setTransform(2.5161,34.4);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#0D0700").s().p("AgEAFIAAgTIAJAAIAAAKIAAAJQAAAFgCACQgDADgEAAIAAgKg");
	this.shape_228.setTransform(-38,23.9);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#422B09").s().p("AAFAFIgTAAIAAgJIAKAAIAJAAIAKAAIAAAJIgKAAg");
	this.shape_229.setTransform(-41,21.9);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#1F1505").s().p("AAAAFIgJAAIAAgJIAJAAQAFAAACACQADACAAAFIgKAAg");
	this.shape_230.setTransform(-40.5,20.9);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#271A04").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_231.setTransform(-41,19.4);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#2B1D08").s().p("AgsBpIAAgKIAAgKQAKAAAIAEQACABAAAFIgKAAIAAAKIgKAAgAAjhUIgKAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAg");
	this.shape_232.setTransform(-43,25.9);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#100B03").s().p("AAAAPQAAgFgCgDQgCgCgFAAIAAgJIAAgKIAJAAQAFAKAEAJQABAFAAAFIgKAAg");
	this.shape_233.setTransform(-39.5,19.9);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#241704").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_234.setTransform(-41,17.4);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#1D1406").s().p("AkXBQIAAgKIAKAAIAKAAQAAAFgDADQgCACgFAAIgKAAgAEOhFIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_235.setTransform(-12.5,10.4);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#36250A").s().p("AE2BkIgKAAIAAgKIAKAAQAFAAACADQADACAAAFIgKAAgAk8hSQgDgCAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgCgDg");
	this.shape_236.setTransform(-7.5,22.4);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#060300").s().p("AEYCMIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAiLCCIgKAAQAAgFgCgEQgDgGgFgFIAAgKIAKAAIAKAAQAAAFACACQADADAFAAIAAAKIAAAKIgKAAgABuhFIgKAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAgAkhh3IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_237.setTransform(-3.5,30.4);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#160D01").s().p("AABAIQgFgDgFgFIAAgJIAJAAIAKAAIAAAJIAAAKQgFAAgEgCg");
	this.shape_238.setTransform(-29.5,15.4);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#4A310B").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_239.setTransform(-32.5,7.9);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#352409").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_240.setTransform(-37,12.9);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#241907").s().p("ACbBaIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAikhPIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_241.setTransform(-21,19.4);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#63410E").s().p("AAPAtIgKAAQAAgFgDgCQgCgDgEAAIgKAAIgKAAIAAgKIAKAAIAKAAQAJAAAIgEQACgBAAgFIAAgKQAAgFgCgDQgDgGgFgFIAAgKIAAgKIAAgKIAKAAQAAAFADACQACADAFAAIAAAKIAAAKIAAAKIAAAJIAAAKIAAAKIAAAKIAAAKIgKAAg");
	this.shape_242.setTransform(-42,8.9);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#291C07").s().p("AABANQgFgDgFgFIAAgJQAFAAADgDQABgCAAgFQAFAAADADQACACAAAFIAAAJIAAAKQgFAAgEgCg");
	this.shape_243.setTransform(-35.5,5.9);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#1F1506").s().p("AgEAKIgKAAIAAgKQAFAAACgCQADgCAAgFIAJAAQAAAFADACQACACAFAAQAAAFgDACQgCADgFAAIgJAAg");
	this.shape_244.setTransform(-32,6.4);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#050301").s().p("AGaBLIgKAAIAAgKIAAgKIAKAAQAAAFADADQACACAFAAIAAAKIgKAAgAjRgYIgKAAIAAgKQAFAAACgCQADgDAAgFIAKAAIAAAKIAAAKIgKAAgAmjhAIAAgKIAKAAIAKAAIAAAKQgFAAgEACQgGADgFAFIAAgKg");
	this.shape_245.setTransform(-1.5,12.9);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#302109").s().p("AgOAKIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAAFAAIAAgJIAAgKIAKAAIAAAKIAAAJIgKAAg");
	this.shape_246.setTransform(-29,11.4);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#221705").s().p("AETB+IgKAAIAAgKIAAgKIAKAAQAFAFADAGQACAEAAAFIgKAAgAkIhdQAAgFgCgBQgIgEgKAAIAAgKQAFAAADgDQACgCAAgFQAVgGAEAPQAAABAFAAQAAAFgDACQgCADgFAAIAAAKIgKAAg");
	this.shape_247.setTransform(2,19.8143);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#3A2709").s().p("Ai9AeIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgAC0AAIAAgJIAKAAQAAAFgCAEQgDAFgFAFIAAgKgABagTIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_248.setTransform(13.5,24.4);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#332209").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_249.setTransform(-3,25.4);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#2D1E07").s().p("AgOgEIAKAAIAJAAIAKAAQAAAEgCABQgKAEgFAAQgKAAgCgJg");
	this.shape_250.setTransform(-6,21.9161);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#422B0A").s().p("AABADQgFgDgFgEQAJAAAIAEQACAAAAAFQgFAAgEgCg");
	this.shape_251.setTransform(-13.5,22.9);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#110B01").s().p("ABfDXIhGAAIgKAAIAAgKQAFAAACgCQADgDAAgFIAKAAIAoAAIAKAAQgBAQAVgBIAAAFIgKAAgAlTBzQABgVgQABIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAKAAIAKAAQAAAFACADQADACAFAAIAAAKIgKAAIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKgAj0gOIgKAAIAAgKIAKAAQAFAAADADQACACAAAFIgKAAgAFZjMIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_252.setTransform(4,23.9);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#1D1405").s().p("AAPAPIgKAAQAAgFgCgBQgHgEgKAAIgKAAIAAgJQAFAAACgDQADgCAAgFIAKAAIAJAAQAFAFAGADQAEACAFAAIAAAJIAAAKIgKAAg");
	this.shape_253.setTransform(-13,21.9);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#291A04").s().p("Ag6AoIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAApgJQAAgFgDgCQgCgDgFAAIAAgKQAFAAACgCQADgDAAgFIAKAAQAQARgOAHQgCABAAAFIgKAAg");
	this.shape_254.setTransform(-23.5609,23.4);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#583A0C").s().p("AgJE2IgKAAIAAgKIAKAAIAJAAIAAAKIgJAAgAkrCWIAKAAIAKAAIAKAAIAAAKIgKABIgJABQgMAAABgMgAhZg7IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAk1ipIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAgADcjvIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAEskhIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAUkrIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_255.setTransform(12.5,31.4);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#271A07").s().p("AheCvQAAgFgCgEQgDgGgFgFIAKAAIAKAAIAAAKIAAAKIgKAAgABViaIAAgKIAAgKQAKAAAIAEQACABAAAFIgKAAIAAAKIgKAAg");
	this.shape_256.setTransform(-30,25.9);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#3C2707").s().p("AgEAKIAAgKIAAgJQAEAFADAFQACAEAAAFIgJAAg");
	this.shape_257.setTransform(-17,2.4);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#4C3209").s().p("AABADQgFgDgFgEIAJAAQAFAAADACQACACAAAFQgFAAgEgCg");
	this.shape_258.setTransform(-11.5,1.9);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#3F2A09").s().p("ACgCMIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAiphPIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABGhtIAAgKIAAgUIAKAAIABAKQAFAUgOAAIgCAAg");
	this.shape_259.setTransform(-11.5,21.4);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#2E1F08").s().p("AizCRQgFAAgDgCQgCgDAAgFIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAjlheQAAgFgDgDQgCgCgFAAIAAgKQAFAAACgCQADgDAAgFQAFAAACACQADADAAAFIAAAKIAAAKIgKAAgADmhoIAAgKIAAgeIAKAAIAAAeIAAAKIgKAAg");
	this.shape_260.setTransform(-25.5,21.9);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#322209").s().p("Ag2CCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAuh5QgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCg");
	this.shape_261.setTransform(-12,23.4);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#251907").s().p("AAFAFIgTAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_262.setTransform(0,2.9);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#4F350A").s().p("ABLAtIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhUgYIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_263.setTransform(4,9.9);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#170F03").s().p("ABGC8IAAgKIAAgKIAKAAIAKAAIAAAUIAAAKIAAAFQgKgFgKgKgABkhRIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAhth5IgKAAIAAgKQARABgGgWIgBgJIAAgKIAAgKIAAgKIAAgKQAQgBgBAVIAFAAIAAAKIAAAKIgKAAIAAAeIAAAKIgKAAg");
	this.shape_264.setTransform(7.5,23.6477);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#191003").s().p("Ag7DmIgKAAIgKAAIgKAAIAAgKQAFAAACgCQADgDAAgFIAKAAQAAgFgCgBQgIgEgKAAIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAIAKAAQAAAFgDACQgCADgFAAIAAAKQAFAFADAGQACAEAAAFIgKAAgABQjRIgKAAIgUAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAgKQAKAAAIgEQACgBAAgFIAKAAQgBARATgLQACgBAAgFIAKAAQAFAFAGADQAEACAFAAIAKAAIAAAKIgKAAg");
	this.shape_265.setTransform(-6.5,23.4);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#0F0B03").s().p("Am4ECQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAGzBaIAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAAnjxQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCg");
	this.shape_266.setTransform(-6,24.4);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#281B08").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_267.setTransform(-3,-4.6);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#392609").s().p("AheDmIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABVi9IAAgKIAAgeIAKAAIAAAeIAAAKIgKAAg");
	this.shape_268.setTransform(-10,14.4);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#0F0901").s().p("ADwDXIgKAAIAAgKIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIAAAKIgKAAgADSg2IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjvjCIgKAAIAAgKQAFAAACgCQADgDAAgFIAKAAIAAAKIAAAKIgKAAg");
	this.shape_269.setTransform(11.5,20.9);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#211503").s().p("AjRAjIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAC+gEIgKAAQAAgFgCgDQgDgCgFAAIAAgKIAAgKIAKAAIAKAAQAFAFAGADQAEACAFAAQAAAFgCADQgDACgFAAIAAAKIgKAAg");
	this.shape_270.setTransform(-28.5,2.9);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#120B01").s().p("AAFCCIgJAAIgKAAIgKAAQAAgFgCAAQgNgFgPAAIAAgKIAKAAIAeAAIAKAAQAEAFAGADQAEACAFAAIAAAKIgKAAgAE7g7IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAk6htIgKAAIAAgKIAAgKIAKAAQAFAKAAAKg");
	this.shape_271.setTransform(14,11.4);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#191206").s().p("AAAANQgEgIAAgJIAAgKIAJAAIAAATIAAAKQgFAAAAgCg");
	this.shape_272.setTransform(-15,-8.1);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#593A0C").s().p("AgEAFIAAgTIAJAAIAAAKQAAAEgCAEQgDAGgEAFIAAgKg");
	this.shape_273.setTransform(-14,-8.1);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#472F09").s().p("AjLFDQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgADDEnIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAA3BVIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAialEQAPAAANAEQACABAAAFIgJABIgKABQgMAAABgMg");
	this.shape_274.setTransform(0,20.9);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#3B2808").s().p("ABkFeIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhilVQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCg");
	this.shape_275.setTransform(-6.5,11.4);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#0D0801").s().p("AjMGfIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjMFFIgUAAIAAgKQAFAAACgDQADgCAAgFIAKAAQAAAFADACQACADAFAAIAAAKIgKAAgAjCAPIgKAAIAAgKIAAgJIAUAAIAKAAQAAAEgCADQgDACgFAAIAAAKIgKAAgAiahAIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAKAAQAAAFADADQACACAFAAIAAAKIAAAKIgKAAIgKAAIAAAKIAAAKIgKAAgADXi4IgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAg2mKIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_276.setTransform(-2,19.9);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#181003").s().p("AAoFPIgeAAIAAgKQAFAAACgDQADgCAAgFQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAQAAAPAEANQABACAFAAIAAAKIAAAKIgKAAgAjvFPIgKAAIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAQAFAFAGADQAEACAFAAQAAAFgDADQgCACgFAAIgKAAgAD6DrIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAAAkwQAAgFgBgBQgIgEgKAAIgKAAIAAgKIAAgKIAKAAQAFAFAGADQAEACAEAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_277.setTransform(-8.5,10.9);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#5F3F0C").s().p("ABkCMIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhiiDQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCg");
	this.shape_278.setTransform(6.5,-5.6);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#0E0900").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_279.setTransform(-20,-0.6);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#382407").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_280.setTransform(-21.5,-2.1);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#0C0701").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_281.setTransform(-23,-1.6);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#0B0702").s().p("Ah2DVQgGgDgFgFQAFAAADgCQACgDAAgFIAKAAIAAAKIAAAKQgFAAgEgCgABuCbQAAgFgDgCQgCgDgFAAIAAgKIAUAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAgAgxjCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_282.setTransform(-22.5,17.9);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#312108").s().p("AgEAPIAAgKIAAgJIAAgKIAJAAIAAATIAAAKIgJAAg");
	this.shape_283.setTransform(-27,-5.1);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#3D2909").s().p("AExCCIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAk6hjIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAg2htIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAg");
	this.shape_284.setTransform(2,5.4);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#1C1405").s().p("AgiDXIAAgKIAAgKQAFAFAGADQAEACAFAAQAAAFgCADQgDACgFAAIgKAAgAAZjCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_285.setTransform(-33,16.9);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#62410D").s().p("AGfETIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAliBBIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAgABCANQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAmkjEQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAk6kIIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKg");
	this.shape_286.setTransform(-5,23.9);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#140D03").s().p("AizDhQgFAAgCgCQgDgDAAgFIAAgKIAAgKIAKAAIAKAAIAAAUIAAAKIgKAAgAC0iaIgKAAIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgUIAKAAIAAAeIAAAKIAAAKIAAAKIAAAKIgKAAgAipikIAAgKIAAgUIAAgKIAKAAIAKAAQAAAFACACQADADAFAAQAAAFgCACQgDADgFAAIAAAKIgKAAIAAAKIgKAAg");
	this.shape_287.setTransform(-20.5,13.9);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#201604").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_288.setTransform(-38.5,-6.1);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#1E1405").s().p("AgnBLIgKAAIAAgKIAAgKIAKAAQAAAFADACQACADAFAAIAAAKIgKAAgAAoAFQAAgFgDgBQgCgDgFAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIAAAJIgKAAgAgThAIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKg");
	this.shape_289.setTransform(-36.5,-3.1);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#191104").s().p("AAjCqIAAgKQAAgFgBgFQgEgKgFgKQAFAAACgCQADgDAAgFIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAgsBGIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAAth3QAAgFgCgDQgDgCgFAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAg");
	this.shape_290.setTransform(-42,5.4);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#1B1103").s().p("ADTC8QgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAjbifIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIgKAAg");
	this.shape_291.setTransform(-15.5,4.4);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#372508").s().p("Ah+GEQgDgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgCgCgAGGBkIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAgAmPAUIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAlnlxIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_292.setTransform(-2.5,24.4);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#2B1C06").s().p("AC0E7IAAgKIAAgKQAFAAADACQACADAAAFIAAAKIgKAAgAi9kcIAAgKIAAgKIAAgKQAFAAADACQACADAAAFIAAAKIAAAKIgKAAg");
	this.shape_293.setTransform(-16.5,14.9);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#2C1D06").s().p("AEOEYIAAgFQgVACABgRIAAgKIAAgKIAKAAQAFAKAHAIQADACAFAAIAAAKIAAAKIgKAAgAkXj5IAAgKIAAgKIAAgKQAFAAADACQACADAAAFIAAAKIAAAKIgKAAg");
	this.shape_294.setTransform(-10.5,10.4);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#090500").s().p("ADIEnIgeAAIAAgKIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAgABQEnQAAgFgCgEQgDgGgFgFIAAgKQAFAAACgDQADgCAAgFIAUAAIAKAAIAAAKIgKAAIgKAAIAAAKIAAAKIAAAKIgKAAgAjGgGQgGgDgFgFIAAgKIAAgKIAKAAQAAAFADACQACADAFAAIAKAAIAKAAIAAAKIgKAAIgKAAIAAAKQgFAAgEgCgAgnkSIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAg");
	this.shape_295.setTransform(-19.5,16.9);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#150E03").s().p("AlYD1QAAgFgCgBQgIgEgKAAIAAgKIAAgKIAKAAQAAAFACACQADADAFAAQAFAAADADQACACAAAFIAAAKIgKAAgAAjDrIgKAAIAAgKIAAgKIAUAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAgAFjC5IgKAAIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAEdgEIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAi4jgIAAgKIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAg");
	this.shape_296.setTransform(-11,10.9);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#1E1403").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgDACQgCADgFAAIgJAAg");
	this.shape_297.setTransform(-22.5,-23.1);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#3C2908").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_298.setTransform(-21.5,-24.1);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#4B320A").s().p("AhEGiQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAj5EEIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgADxhRQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAgwmbQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCg");
	this.shape_299.setTransform(-23.5,9.4);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#080501").s().p("AkXHHIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAkrFtIAAgKIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAgAkNE7IgKAAIgKAAIAAgKQAFAAACgCQADgDAAgFIAeAAIAKAAQAAAFgCABQgIAEgKAAIAAAKIgKAAgAEEETIgKAAIAAgKIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAUIAAAKIgKAAgAEiDDIgKAAIAAgKIAAgKIAKAAQAFAFADAGQACAEAAAFIgKAAgAiVCRIgKAAIAAgKQAFgFADgGQACgEAAgFIAKAAIAAAKIAAAKIAAAKIgKAAgAEjADQgGgDgFgEIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIAAAJQgFAAgEgCgAj5g2IAAgKIAKAAIAKAAQAAAFgCADQgDACgFAAIgKAAgAi9m8IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_300.setTransform(-2.5,13.9);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#382608").s().p("AABAIQgFgDgFgFQAFAAACgCQACgCAAgFQAFAAACADQADACAAAEIAAAKQgFAAgEgCg");
	this.shape_301.setTransform(-23.5,-31.6);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#1B1204").s().p("AjqGkQAAgFgCgBQgIgEgKAAIAAgKQAFAAACgDQADgCAAgFQAFAFAGADQAEACAFAAIAAAKIAAAKIgKAAgAFABuQABgVgQABIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKgAhyBkIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAgAjqAyIgKAAIAAgKQAFgFADgGQACgEAAgFQAAgFgCgEQgDgGgFgFIAAgJQAFgFADgGQACgEAAgFIAKAAQAAAFACACQADADAFAAIAAAKIgKAAIAAAJIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAlEAyIAAgKIAAgKIAAgKIAAgKIAAgKIAAgJQAAgFgCgEQgDgGgFgFIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKQAAAKAEAIQABACAFAAIAAAKIAAAJIgKAAIAAAKIAAAKIAAAUIAAAKIgKAAgACRAKQAAgFgCgDQgDgCgFAAIAAgJIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIAAAKIAAAJIAAAKIgKAAgAjCmZIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAg");
	this.shape_302.setTransform(-6,9.4);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#2C1D05").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_303.setTransform(-22.5,-34.1);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#3D2A09").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_304.setTransform(-22.5,-35.1);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#302206").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_305.setTransform(-33.5,-27.1);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#302006").s().p("AFFGzIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAgAFZGpIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhGDfQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAlimoIAAgKQAFAAACADQADACAAAFQAAAFgDADQgCACgFAAIAAgKg");
	this.shape_306.setTransform(-4,13.9);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#0D0902").s().p("AD1F3IgKAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAgAj0ETIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAjqBfIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjVluQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCg");
	this.shape_307.setTransform(-18,0.9);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#0C0902").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_308.setTransform(-36.5,-35.1);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#302106").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_309.setTransform(-36,-37.6);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#613F0D").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_310.setTransform(-37,-36.6);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#54380B").s().p("AExH0IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgABBEEIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAk6B4IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAijhbQgGgDgFgFIAKAAQAFAAACACQADADAAAFQgFAAgEgCgAkmnfIAAgKIAAgKQAFAAADADQACACAAAFIAAAKQAAAFgCACQgDADgFAAIAAgKg");
	this.shape_311.setTransform(-6,9.4);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#3E2B09").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_312.setTransform(-34,-44.6);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#140E03").s().p("AAUGLIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAgTmAIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_313.setTransform(-5.5,6.9);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#51350B").s().p("ACvE7IAAgKIAAgKIAAgUIAKAAIAAAeIAAAKIgKAAgAi4BLIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAAQkyQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCg");
	this.shape_314.setTransform(-21,0.9);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#1B1404").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_315.setTransform(-19.5,-31.1);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#392708").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_316.setTransform(-16.5,-35.1);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#322206").s().p("AAAAFIgJAAIAAgJIAJAAQAFAAACACQADACAAAFIgKAAg");
	this.shape_317.setTransform(-3.5,-43.1);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#0E0B02").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_318.setTransform(-5.5,-46.1);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#2B1D05").s().p("AC5ICIAAgKQAFgFAGgDQAEgCAFAAIAAAKQABAMgLAAIgKgCgAi4n5IgKAAQgFAAgDgCQgCgDAAgFIAKAAIAKAAQAFAAACADQADACAAAFIgKAAg");
	this.shape_319.setTransform(13.0272,3.9918);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#281B05").s().p("AjWCWIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgADNiVIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_320.setTransform(-23,-15.6);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#342309").s().p("AipAoIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACggdIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_321.setTransform(-26.5,-5.6);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#2E1E05").s().p("AF3APIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAmAAPIAAgKIAAgTIAKAAIAAAKIAAAJIAAAKIgKAAg");
	this.shape_322.setTransform(-12,0.9);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#100A02").s().p("AGkD1IgKAAIAAgKQAFAAADgCQACgDAAgFIAKAAIAAAKIAAAKIgKAAgAEsDhQAAgFgDgDQgCgCgFAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIgKAAgADIi4IgKAAQAAgFgCgBQgIgEgKAAIgKAAIAAgKIAAgKIAKAAQAAAFACADQADACAFAAIAUAAIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAgAmtjgIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_323.setTransform(-7.5,21.9);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#2A1D07").s().p("AhSDzQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgADDgEIgKAAIAAgKQAFgFAGgDQAEgCAFAAIAAAKIAAAKIgKAAgAjMjgIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_324.setTransform(-30,13.9);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#352308").s().p("AgBAIQgDgDAAgFIAAgJIAJAAIAAAJIAAAKQgFAAgBgCg");
	this.shape_325.setTransform(-48,-9.6);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#2F2008").s().p("AB4CRIAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAiBhyIAAgKIAAgKIAAgKQAFAAACACQADADAAAFIAAAKIAAAKIgKAAg");
	this.shape_326.setTransform(-28.5,5.9);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#130D04").s().p("ACCBzIgKAAIAAgKIAAgKIAKAAQAAAFACACQADADAFAAIAAAKIgKAAgAiBhoIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_327.setTransform(-29.5,3.9);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#0C0802").s().p("ADwFoIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAGkAUIAAgKIAAgKIAAgJIAKAAIAAATIAAAKIgKAAgAldjRIgKAAIAAgKQAFgFADgGQACgEAAgFIAKAAIAAAUIAAAKIgKAAgAmtjvIAAgKIAAgKIAAhQIAKAAIAAAUIAAAKIAAA8IAAAKIgKAAgAldk/IgKAAIAAgKIAKAAQAFAAADACQACADAAAFIgKAAgAjtlVQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCg");
	this.shape_328.setTransform(-3.5,25.4);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#060401").s().p("AmLDuQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAGJCxQgDgCAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgCgDgAkriVIgKAAIAAgKIAAgKQAFgFADgGQACgEAAgFIAKAAIAAAKIAAAUIAAAKIgKAAgAlxjbIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_329.setTransform(-7.5,16.4);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#0E0902").s().p("ACRDrIgKAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAgAECDVQgDgDAAgFQAAgFgDgCQgCgDgFAAIAAgKIAKAAIAKAAIAAAUIAAAKQgFAAgCgCgAkDBKQgFgsAAgsIAKAAQAFAFADAGQACADAAAFIgKAAIAAA8IAAAKIgFgBgAjqjWIgKAAIgKAAIAAgKIAAgKQAKAFAKAEQAFABAFAAIAAAKIgKAAg");
	this.shape_330.setTransform(-19,13.9);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#251302").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_331.setTransform(-53,-0.6);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#0D0904").s().p("AgEAUIAAgKIAAgKIAAgJIAAgKIAJAAIAAAdIAAAKIgJAAg");
	this.shape_332.setTransform(-53,-3.6);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#DDAE6A").s().p("AAAAFIAAgJIAAAAIAAAJIAAAAg");
	this.shape_333.setTransform(-55.55,-4.1);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#F2D696").s().p("AAAAKIgJAAIAAgKQAFAAADgCQABgCAAgFIAKAAIAAAJIAAAKIgKAAg");
	this.shape_334.setTransform(-54.5,-4.6);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#2D220F").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_335.setTransform(-53,-7.1);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#D6C189").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_336.setTransform(-54,-7.1);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#F7DE9E").s().p("AgBAUIAAgaIgHAAIAAgNIAIAAIAJAAIAAATIAAAKQAAAFgDACQgCADgEAAIgBAAg");
	this.shape_337.setTransform(-55.375,-6.6);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#957E47").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_338.setTransform(-54,-9.6);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#E1C37D").s().p("AAAAFIgIAAIAAgJIAIAAIAJAAIAAAJIgJAAg");
	this.shape_339.setTransform(-55.375,-9.1);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#3C290B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_340.setTransform(-53,-9.6);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#432C08").s().p("AF3CqIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAmAiVIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_341.setTransform(-13,6.4);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#6A5728").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_342.setTransform(-54,-11.6);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#4E3812").s().p("AAAAKIgJAAIAAgKIAAgJIAJAAQAFAFADAFQACAEAAAFIgKAAg");
	this.shape_343.setTransform(-53.5,-13.6);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#20180A").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_344.setTransform(-54,-15.6);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#070602").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_345.setTransform(-54,-17.6);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#1E1607").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_346.setTransform(-54,-19.6);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#899939").s().p("AgDAFIAAgJIAHAAIAAAJIgHAAg");
	this.shape_347.setTransform(-55.875,-21.1);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#2E2409").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_348.setTransform(-54,-21.6);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#66792B").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_349.setTransform(-55,-21.6);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#5F3F0D").s().p("AExFPIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAgACbFPIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAk6ETIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACHAZIAAgKIAAgTIAKAAIAAAJIAAAKIAAAKIgKAAgAj+lEIAAgKQARgBgLATQgBACgFAAIAAgKg");
	this.shape_350.setTransform(-19,18.8975);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#130D03").s().p("AFZDrIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAFTAhQgEgIAAgKQAFAAADACQACADAAAFIAAAKQgFAAgBgCgAiBAPQACgagRgDIAAgKIAKAAIAKAAIAAAKIAAAKIAAAJIAAAKgAgshoIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAlsikIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhUjgIAAgKIAKAAIAAAKQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_351.setTransform(-15,0.9);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#3B2807").s().p("AAAAFQgEAAgDgDQgCgCAAgEIAJAAIAKAAIAAAJIgKAAg");
	this.shape_352.setTransform(-51.5,-22.1);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#191002").s().p("AAIDVQgDgDAAgFIAAgKIAAgKIAKAAQAQARgOAHQgCABAAAFQgFAAgCgCgAC5CHIgKAAIAAgKIAUAAIAKAAQAAAFgDADQgCACgFAAIgKAAgAjCjMIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_353.setTransform(-32,-2.1);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#150F02").s().p("AFPG4IgKAAIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAQAFAFADAGQACAEAAAFIgKAAgAlYkrIAAgKIAAgKQAFAFAGADQAEACAFAAQAAAFgDACQgCADgFAAIgKAAgAAumbQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAikmtIgKAAIgKAAIAAgKQAPAAANAFQACAAAAAFIgKAAg");
	this.shape_354.setTransform(-16,9.4);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#302007").s().p("ABaEEIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAGkDmIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAmjjvIgKAAIAAgKQAFAAADgDQACgCAAgFQAFAAADADQACACAAAFIAAAKIgKAAg");
	this.shape_355.setTransform(-3.5,5.4);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#271B05").s().p("AgBANQgDgDAAgFIAAgJIAAgKQAEAAACADQADACAAAFIAAAJIAAAKQgFAAgBgCg");
	this.shape_356.setTransform(-42,-29.1);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#231905").s().p("AgGACQgDgCAAgEIAJAAIAKAAQAAAEgCACQgDADgFAAQgEAAgCgDg");
	this.shape_357.setTransform(-47.5,-31.1);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#412B08").s().p("AAAGLIgxAAIAAgKIAKAAIAKAAIAUAAIAJAAIAKAAIAAAKIgKAAgAGwAXQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgAm3lYIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAUmAIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_358.setTransform(-7.5,7.9);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#432D09").s().p("AGQDwIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAmji9IAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgABujvIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_359.setTransform(-12.5,-3.6);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#4D5C20").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_360.setTransform(-55,-24.1);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#323913").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_361.setTransform(-55,-26.6);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f("#56380B").s().p("AAdFJQgEgOAAgPIAKAAIAAAKIAAAKIAAAKQgFAAgBgBgAgik1IAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAg");
	this.shape_362.setTransform(-51,5.4);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#171807").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_363.setTransform(-55,-29.1);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#291B05").s().p("ABdGIQgDgCAAgFIAAgKIAAgKQAFAAACACQADADAAAFIAAAKIAAAKQgFAAgCgDgAhjl2IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_364.setTransform(-42.5,10.9);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#67440E").s().p("AlsGVQAAgFgDgDQgHgHgKgFIgKAAQAAgFgCgCQgIgIgKgFIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAQAAAFACADQADACAFAAQAAAFACADQADACAFAAIAAAKIAAAKQAFAKAIAHQACADAFAAQAFAFADAGQACAEAAAFIgKAAIAAAKIgKAAgAi4GLIgKAAIAAgKIAKAAIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAgAGBFtIgKAAIgKAAIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKQAFgFAGgDQAEgCAFAAIAKAAIAKAAIAAAKIAAAKIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKQAAAFgCACQgDADgFAAIgKAAgAllDGQgCgDgFAAQgFAAgCgDQgDgCAAgFIAUAAIAKAAQAAAFgCAEQgDAGgFAFQAAgFgDgCgAAZCbIAAgKIAAgKIAAgKIAKAAIABAKQAFAUgOAAIgCAAgAGzCRIgKAAIgKAAIgKAAIAAgKIAAgKIAAgeQAFAAADgDQACgCAAgFIAAgKIAAgKQAFAAADgCQACgDAAgFQAKAAAIgEQACgBAAgFIAKAAIAKAAIAAAeIAAAKIgKAAIAAAKIAAAeIAAAKIgKAAIAAAKIgKAAgAmyiaIgKAAIAAgKIAAgKIAAgUQAAgFgCgEQgDgGgFgFIAAgKIAAgUIAKAAQgBAQAVgBIAAAFIAAAyIAAAKIAAAKIgKAAgAmnj2QgGgDgFgFQgFAAgEgCQgGgDgFgFIAAgKIAAgKIAAgUIAAgKIAAgKQAAgFgCgEQgDgGgFgFIAAgKIAKAAIAKAAIAKAAQAAAFADACQACADAFAAIAAAeIAAAKQAAAPAEANQABACAFAAQAAAFACACQADADAFAAQAAAFgCACQgDADgFAAIAAAKQgFAAgEgCgAgslYIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgUAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAIgKAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAQAAgFgCAAQgNgFgPAAQAAgFgCgDQgDgCgFAAIgKAAIAAgKIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAeAAIAKAAQgBARAVgGIAKgBQAFAFAGADQAEACAFAAIAoAAIAKAAIAKAAIAKAAIAKAAQAAAFADACQACADAFAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAAAKIgKAAg");
	this.shape_365.setTransform(-5,3.9);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#54370B").s().p("AD/DhIgUAAIgKAAIAAgKIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAgAj6CZQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAjMiuIAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAkIjMIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAg");
	this.shape_366.setTransform(-25,-8.1);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#48300A").s().p("ABqEbQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAghCZQgGgDgFgFIAKAAQAFAAADACQACADAAAFQgFAAgEgCgAj0CHIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAFPA3IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAlOkSIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAg");
	this.shape_367.setTransform(-17,-4.1);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#060501").s().p("AETH5IgeAAIAAgKIAeAAIAKAAIAAAKIgKAAgAhKjCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkcnaIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAg");
	this.shape_368.setTransform(-24,16.9);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#060601").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_369.setTransform(-55,-31.6);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#151305").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_370.setTransform(-55,-33.6);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#6E8931").s().p("AAAAIQgEgIAAgJIAJAAIAAAJIAAAKQgFAAAAgCg");
	this.shape_371.setTransform(-56,-34.6);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#627C2C").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_372.setTransform(-56,-36.6);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#282008").s().p("AgEAPIAAgKIAAgJIAAgKIAJAAIAAATIAAAKIgJAAg");
	this.shape_373.setTransform(-55,-36.1);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#573A0B").s().p("AgEAKIAAgKIAAgJQAEAFADAFQACAEAAAFIgJAAg");
	this.shape_374.setTransform(-55,-42.6);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#556C26").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_375.setTransform(-56,-38.6);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#43531D").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_376.setTransform(-56,-40.6);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#2D3411").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_377.setTransform(-56,-42.6);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#070702").s().p("AgFAjIAAgKIAAg7QAQARgHAqIAAAKIgJAAg");
	this.shape_378.setTransform(-55.8851,-49.1);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#1F1704").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_379.setTransform(-52.5,-44.1);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#171908").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_380.setTransform(-56,-44.6);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#63420D").s().p("AAFAPQAAgFgCgBQgHgEgKAAIAAgJIAAgKIAKAAQAEAFAGADQAEACAFAAIAAAJIAAAKIgKAAg");
	this.shape_381.setTransform(-41,-38.1);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#352507").s().p("AgCAIQgCgDAAgFIAAgJIAJAAIAAAJIAAAKQgFAAgCgCg");
	this.shape_382.setTransform(-43,-37.6);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#130E02").s().p("AABADQgFgDgFgEQAJAAAIAEQACAAAAAFQgFAAgEgCg");
	this.shape_383.setTransform(-44.5,-41.1);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#48310A").s().p("AgJAUIAAgKIAAgdIAJAAIAKAAIAAAKIAAAJIgKAAIAAAKIAAAKIgJAAg");
	this.shape_384.setTransform(-51.5,-41.6);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#281C06").s().p("AABAIQgFgDgFgFIAAgJIAJAAQAAAFADACQACACAFAAIAAAKQgFAAgEgCg");
	this.shape_385.setTransform(-49.5,-41.6);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#68440E").s().p("AAAAKQgEAAgCgDQgDgCAAgFIAAgJIAJAAQAAAFADADQACABAFAAIAAAKIgKAAg");
	this.shape_386.setTransform(-48.5,-42.6);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#281A05").s().p("AAAALQAAgFgCgDQgCgCgFAAIAAgJQAUgGgBAPIAAAKIgKAAg");
	this.shape_387.setTransform(-49.4728,-44.6818);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#2E2007").s().p("AgJAAQAFgEAFgDQAEgCAFAAIAAAJQAAAFgCABQgIAEgJAAIAAgKg");
	this.shape_388.setTransform(-48.5,-56.6);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#232B0E").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape_389.setTransform(-48.5,-60.1);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#1D1404").s().p("AgOAJIAAgJQAKgFAJgDQAFgCAFAAIAAAKQgFAAAAAAQgCALgLAAQgFAAgGgCg");
	this.shape_390.setTransform(-46,-57.504);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#392607").s().p("AAUBuIAAgKIAAgKQAFAAACADQADACAAAFIAAAKIgKAAgAgdhjIAAgKIAKAAIAAAKQAAAFgCACQgDADgFAAIAAgKg");
	this.shape_391.setTransform(-41.5,-48.6);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#2C270B").s().p("AFyJdIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAmFpmIAKAAIAKAAQAAAFgCABQgHAEgFAAQgHAAABgKg");
	this.shape_392.setTransform(-7.5025,-0.1);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#281A04").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_393.setTransform(-53,-50.6);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#272D0E").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_394.setTransform(-55,-54.6);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#36300D").s().p("AgOAAQAKgEAJgDQAFgCAFAAQAAAFgDADQgHAKgTABIAAgKg");
	this.shape_395.setTransform(-52,-57.6);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#161A08").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape_396.setTransform(-43.5,-62.1);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#3E2A09").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_397.setTransform(-6,-49.6);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#57390B").s().p("AgEB4IgKAAIAAgKIAKAAIAJAAIAAAKIgJAAgAAFhjIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAg");
	this.shape_398.setTransform(-7,-42.6);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#080600").s().p("AgEAZIgKAAIAAgKIAAgKIAKAAIAJAAIAAAKIAAAKIgJAAgAAFgEIgJAAIAAgKIAAgKIAJAAQAAAFADACQACADAFAAIAAAKIgKAAg");
	this.shape_399.setTransform(-13,-49.1);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#2C1E06").s().p("AAeCRIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgABQBBIgKAAQAAgFgDgCQgCgDgFAAIAAgKIAKAAIAKAAQAAAFACACQADADAFAAIAAAKIgKAAgAhPhoIgKAAIAAgKIAKAAQAFAAADACQACADAAAFIgKAAgAAyiGIgKAAIAAgKIAKAAIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAg");
	this.shape_400.setTransform(-18.5,-35.1);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("#281C05").s().p("AAeIrIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAgnogIAAgKIAKAAIAAAKQAAAFgDADQgCACgFAAIAAgKg");
	this.shape_401.setTransform(-11.5,-1.1);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#291C05").s().p("AASB2QgDgDAAgFIAAgKIAKAAQAFAAACADQADACAAAFQAAAFgDADQgCACgFAAQgFAAgCgCgAgOhFQAAgFgCgEQgDgGgFgFQAFAAABgCQAGgOgWAGIAAgKQAWAGADgPQAAgBAFAAQAAAKAEAIQAAACAFAAQAAAFgDACQgCADgEAAIAAAKIAAAKIgKAAg");
	this.shape_402.setTransform(-7,-48.6);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#442F09").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_403.setTransform(-15,-57.6);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f("#0A0600").s().p("AiVI1IgKAAIAAgKQAFAAACgCQADgDAAgFIAKAAIAKAAIAKAAIAKAAQAAAFgBABQgOAEgPAAIAAAKIgKAAgADwDDIgKAAIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAAAeIAAAKIgKAAgAizAtIgKAAIAAgKQAFAAADgCQACgDAAgFIAKAAIAAAKIAAAKIgKAAgAj5ogIAAgKIAAgKQARgBgCAVIAFAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_404.setTransform(10.5,-2.1023);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("#402A08").s().p("ACRINIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAiWlGQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgABfoMQgFAAgCgCQgDgDAAgFIAKAAIAKAAIAAAKIgKAAg");
	this.shape_405.setTransform(-21,-11.1);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#0A0701").s().p("AkIISIAAgKIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAgAE7G4IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAF3FUIAAgKIAAgKQAFAAADADQACACAAAFIAAAKIgKAAgAmAgJIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAjkDIAAgKIAKAAQAAAFACADQADACAFAAQAAAFgCABQgIAEgKAAIAAgKgABFlLQgEgIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKQgFAAgBgCgAhGn/QgEgIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKQgFAAgBgCg");
	this.shape_406.setTransform(-12,-9.6);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#0C0C03").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_407.setTransform(-17.5,-66.1);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#669132").s().p("AAFAFIgJAAIgKAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_408.setTransform(-17,-67.1);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#1D220B").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_409.setTransform(-2.5,-66.1);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#141205").s().p("AAeAFIhFAAIAAgJIAKAAIA7AAIAKAAIAAAJIgKAAg");
	this.shape_410.setTransform(-12.5,-66.1);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#648D31").s().p("AAZAFIg7AAIAAgJQAiAAAiAEIABAFIgKAAg");
	this.shape_411.setTransform(-12,-67.1);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#0C0D04").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_412.setTransform(-4.5,-66.1);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#352608").s().p("AAAAKIgJAAIAAgKQAFgEAFgDQAEgCAFAAIAAAJIAAAKIgKAAg");
	this.shape_413.setTransform(-24.5,-49.6);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#0A0601").s().p("AkmH0IgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAgAmoHgIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgAFjDmIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAjMDSIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAGgBEQgGgDgFgFIAAgKIAAgUIAKAAIAKAAIAAAKIAAAUIAAAKQgFAAgEgCgAkmgdIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAgAi4npIAAgKIAKAAIAKAAQAAAFgDACQgHAIgKAFIAAgKg");
	this.shape_414.setTransform(-5,-0.6);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#392809").s().p("AipBLIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACgg2IgKAAIAAgKQAFgFAGgDQAEgCAFAAIAAAKIAAAKIgKAAg");
	this.shape_415.setTransform(-38.5,-45.1);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#4A300A").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_416.setTransform(-34,-50.6);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#362508").s().p("AgnHqIgKAAIAAgKIAAgKQAKAFAHAHQADADAAAFIgKAAgAAonVIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_417.setTransform(-38.5,-4.6);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#412C09").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_418.setTransform(-36,-53.6);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#171002").s().p("AgJAoIAAgKIAAgUIAAgKIAAgJIAAgKIAAgKIAAgKQAFAFAFADQAEACAFAAIAAAKIgKAAIAAAKIAAAJIAAAKIAAAKIAAAKIAAAKIgJAAg");
	this.shape_419.setTransform(-34.5,-51.6);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#150F03").s().p("ABaAoIAAgKIAKAAIAAAKQAAAFgDACQgCADgFAAIAAgKgAhjgxIAUAAIAKAAQAAAFgBABQgOAEgPAAIAAgKg");
	this.shape_420.setTransform(-30.5,-55.6);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#312106").s().p("AgDAIQgGgDgFgFIAAgJIAKAAQAEAFAGADQAEABAFAAQAAAFgDACQgCADgFAAQgFAAgDgCg");
	this.shape_421.setTransform(-34,-57.6);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f("#140F03").s().p("ACRCgIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAA3CWIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAiPiDQgGgDgFgFIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIAAAKQgFAAgEgCg");
	this.shape_422.setTransform(-19,-44.6);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#3C2808").s().p("ADtJuQgCgCgFAAIAAgKIAKAAIAKAAIAAAKQAAAFgDADQgCACgFAAQAAgFgDgDgAgnG4IgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAGkFoIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAkDhtIAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAmjnpQgFAAgDgDQgCgCAAgFQAFgFADgGQACgEAAgFIAKAAIAAAUIAAAKIgKAAgAjlphIAAgKIAAgKQAKAAAIAEQACABAAAFIgKAAIAAAKIgKAAg");
	this.shape_423.setTransform(-10.5,0.4);

	this.shape_424 = new cjs.Shape();
	this.shape_424.graphics.f("#3E541D").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_424.setTransform(-33.5,-65.1);

	this.shape_425 = new cjs.Shape();
	this.shape_425.graphics.f("#111305").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_425.setTransform(-36.5,-64.1);

	this.shape_426 = new cjs.Shape();
	this.shape_426.graphics.f("#3D2B09").s().p("AgOgEIAKAAIAJAAIAKAAQAAAEgCAAQgNAFgOAAIAAgJg");
	this.shape_426.setTransform(-34,-64.1);

	this.shape_427 = new cjs.Shape();
	this.shape_427.graphics.f("#3A350F").s().p("AgJAAQAFgEAFgDQAEgCAFAAIAAAJQAAAFgCABQgIAEgJAAIAAgKg");
	this.shape_427.setTransform(-38.5,-63.6);

	this.shape_428 = new cjs.Shape();
	this.shape_428.graphics.f("#151908").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_428.setTransform(-40.5,-63.1);

	this.shape_429 = new cjs.Shape();
	this.shape_429.graphics.f("#020200").s().p("AhZH+IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABQnzIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_429.setTransform(-28.5,-12.6);

	this.shape_430 = new cjs.Shape();
	this.shape_430.graphics.f("#050501").s().p("ABGAFIgUAAIAAgJIAUAAIAKAAIAAAJIgKAAgAg7AFIgUAAIAAgJIAUAAIAKAAIAAAJIgKAAg");
	this.shape_430.setTransform(-13.5,-66.1);

	this.shape_431 = new cjs.Shape();
	this.shape_431.graphics.f("#5D3E0C").s().p("AB9IIIAAgKIAAgeQAFAAACACQADADAAAFIAAAKIAAAKIAAAKIgKAAgAClEsIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAPBuIAAgUIAKAAIAAAKQAAAFgCAEQgDAGgFAFIAAgKgAiumZIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAg2oHIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_431.setTransform(-19,-13.6);

	this.shape_432 = new cjs.Shape();
	this.shape_432.graphics.f("#171B08").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_432.setTransform(-22.5,-66.1);

	this.shape_433 = new cjs.Shape();
	this.shape_433.graphics.f("#1D1504").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_433.setTransform(-24.5,-63.1);

	this.shape_434 = new cjs.Shape();
	this.shape_434.graphics.f("#352307").s().p("AGkIwIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkrIcIAAgKQAFAAADACQACADAAAFQAAAFgCADQgDACgFAAIAAgKgAmtgdIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAizobIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_434.setTransform(-8.5,-7.6);

	this.shape_435 = new cjs.Shape();
	this.shape_435.graphics.f("#131405").s().p("AAKAFIgdAAIAAgJIATAAIAKAAIAKAAIAAAJIgKAAg");
	this.shape_435.setTransform(-30.5,-65.1);

	this.shape_436 = new cjs.Shape();
	this.shape_436.graphics.f("#597D2B").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_436.setTransform(-28.5,-66.1);

	this.shape_437 = new cjs.Shape();
	this.shape_437.graphics.f("#2B3712").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_437.setTransform(-24.5,-66.1);

	this.shape_438 = new cjs.Shape();
	this.shape_438.graphics.f("#362709").s().p("AAjKPIgKAAIAAgKIAUAAIAKAAQAAAFgCADQgDACgFAAIgKAAgAgsqEIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_438.setTransform(-23,-0.1);

	this.shape_439 = new cjs.Shape();
	this.shape_439.graphics.f("#435C1F").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_439.setTransform(-26.5,-66.1);

	this.shape_440 = new cjs.Shape();
	this.shape_440.graphics.f("#C6AD73").s().p("AAAAFIAAgJIAAAAIAAAJIAAAAg");
	this.shape_440.setTransform(52.55,-10.1);

	this.shape_441 = new cjs.Shape();
	this.shape_441.graphics.f("#110901").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_441.setTransform(47,-0.6);

	this.shape_442 = new cjs.Shape();
	this.shape_442.graphics.f("#4C2A05").s().p("AgJAKIAAgKIAAgJIAJAAIAKAAQAAAFgCAEQgDAFgFAFIgJAAg");
	this.shape_442.setTransform(47.5,-2.6);

	this.shape_443 = new cjs.Shape();
	this.shape_443.graphics.f("#120901").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_443.setTransform(48,-4.6);

	this.shape_444 = new cjs.Shape();
	this.shape_444.graphics.f("#2A1B05").s().p("AEnA3IAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAkwAZIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAEdgsIAAgKIAAgKIAKAAIAAAKIAAAKQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_444.setTransform(13,1.9);

	this.shape_445 = new cjs.Shape();
	this.shape_445.graphics.f("#201503").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_445.setTransform(45,-3.6);

	this.shape_446 = new cjs.Shape();
	this.shape_446.graphics.f("#0B0600").s().p("AAAAKIgJAAIAAgKIAAgJIAJAAIAKAAIAAAJIAAAKIgKAAg");
	this.shape_446.setTransform(43.5,-3.6);

	this.shape_447 = new cjs.Shape();
	this.shape_447.graphics.f("#160E02").s().p("Ak6DrIgKAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAgYCvIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAgAkmhUIgKAAIAAgKIAAgUQAFgFADgGQACgEAAgFQAAgFgCgEQgDgGgFgFIAAgKIAFAAQAAgKgFgKQAFgFADgGQACgEAAgFIAKAAIAAAKQAAAKAEAIQABACAFAAIAAAKIgKAAIAAAKIAAAUIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAE7jWIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAg");
	this.shape_447.setTransform(13,16.9);

	this.shape_448 = new cjs.Shape();
	this.shape_448.graphics.f("#5E3E0D").s().p("Aj6FyIgKAAIgKAAIAAgKQAPAAANAEQACABAAAFIgKAAgAAJgdIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAEDlTIAAgKIAAgKIAAgKIAKAAIABAKQAFAUgOAAIgCAAg");
	this.shape_448.setTransform(14.6188,25.4);

	this.shape_449 = new cjs.Shape();
	this.shape_449.graphics.f("#7A6D4C").s().p("AgdB9IAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAAUh8IAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKg");
	this.shape_449.setTransform(46.5,4.9);

	this.shape_450 = new cjs.Shape();
	this.shape_450.graphics.f("#33260E").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_450.setTransform(48,-6.6);

	this.shape_451 = new cjs.Shape();
	this.shape_451.graphics.f("#191105").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_451.setTransform(46,-8.6);

	this.shape_452 = new cjs.Shape();
	this.shape_452.graphics.f("#362407").s().p("Ag6HAQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAHgiLIAAgKIAKAAIAKAAQAAAFgCADQgDACgFAAIgKAAgAnfk1IgKAAIAAgKIAAgUIAKAAIAKAAIAAAUIAAAKIgKAAgAiVlxIAAgKIAAgKQAFAAADADQACACAAAFIAAAKIgKAAgAgJl7IAAgKIAAgKIAJAAIAAAKIAAAKIgJAAgAk9mbQgCgDAAgFIAAgKQAFAAADACQACADAAAFIAAAKQgFAAgDgCgAnpm3QgFAAgDgCQgCgDAAgFIAKAAIAKAAIAAAKIgKAAg");
	this.shape_452.setTransform(-3.5,7.4);

	this.shape_453 = new cjs.Shape();
	this.shape_453.graphics.f("#4D3712").s().p("AgJAKIAAgKIAAgJIAJAAIAKAAIAAAJIgKAAIAAAKIgJAAg");
	this.shape_453.setTransform(48.5,-8.6);

	this.shape_454 = new cjs.Shape();
	this.shape_454.graphics.f("#1C1506").s().p("AgEAPIAAgKIAAgTIAJAAIAAAKIAAAJIAAAKIgJAAg");
	this.shape_454.setTransform(49,-11.1);

	this.shape_455 = new cjs.Shape();
	this.shape_455.graphics.f("#4A3815").s().p("AAAAKIgJAAIAAgKQAFAAACgCQACgCAAgFIAKAAIAAAJIAAAKIgKAAg");
	this.shape_455.setTransform(49.5,-13.6);

	this.shape_456 = new cjs.Shape();
	this.shape_456.graphics.f("#130E04").s().p("AmPBzIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAGGheIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_456.setTransform(10.5,-5.1);

	this.shape_457 = new cjs.Shape();
	this.shape_457.graphics.f("#362307").s().p("AgnCgIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAgAgJAKIAAgKIAJAAIAKAAQAAAFgCACQgDADgFAAIgJAAgAAKhZIAAgKIAAgKIAKAAIAKAAQAAAFgCAEQgDAGgFAFIgKAAgAAUiLIAAgKIAAgKIAKAAIAKAAQAAAFgCAEQgDAGgFAFIgKAAg");
	this.shape_457.setTransform(44.5,-2.6);

	this.shape_458 = new cjs.Shape();
	this.shape_458.graphics.f("#443312").s().p("AgJAPIAAgKIAAgJQAFAAACgCQACgDAAgFIAKAAIAAAKIAAAJIgKAAIAAAKIgJAAg");
	this.shape_458.setTransform(50.5,-18.1);

	this.shape_459 = new cjs.Shape();
	this.shape_459.graphics.f("#1A1306").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_459.setTransform(51,-20.6);

	this.shape_460 = new cjs.Shape();
	this.shape_460.graphics.f("#3E2A0A").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_460.setTransform(51,-22.6);

	this.shape_461 = new cjs.Shape();
	this.shape_461.graphics.f("#816931").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgCACQgDADgEAAIAAgKg");
	this.shape_461.setTransform(52,-22.6);

	this.shape_462 = new cjs.Shape();
	this.shape_462.graphics.f("#4B3510").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_462.setTransform(51.5,-24.1);

	this.shape_463 = new cjs.Shape();
	this.shape_463.graphics.f("#080701").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_463.setTransform(52,-25.6);

	this.shape_464 = new cjs.Shape();
	this.shape_464.graphics.f("#3A3610").s().p("AgJAPIAAgKIAAgJQAFAAADgDQABgCAAgFIAKAAQAAAFgCAEQgDAFgFAFIAAAKIgJAAg");
	this.shape_464.setTransform(52.5,-28.1);

	this.shape_465 = new cjs.Shape();
	this.shape_465.graphics.f("#0A0A02").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_465.setTransform(53,-30.6);

	this.shape_466 = new cjs.Shape();
	this.shape_466.graphics.f("#576B26").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_466.setTransform(54,-32.6);

	this.shape_467 = new cjs.Shape();
	this.shape_467.graphics.f("#3A2A0A").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_467.setTransform(53,-32.6);

	this.shape_468 = new cjs.Shape();
	this.shape_468.graphics.f("#463D11").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_468.setTransform(53.5,-34.1);

	this.shape_469 = new cjs.Shape();
	this.shape_469.graphics.f("#160F03").s().p("AC+ExIAAgKIAAgKIAKAAIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAAKIgKAAgAEsEdQAAgFgCgEQgDgGgFgFIAAgKQAFAAACgCQADgDAAgFIAKAAIAKAAQAAAFADADQACACAFAAIAAAKIAAAKQgFAAgEACQgGADgFAFIgKAAgAg7ETIgKAAIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKIgKAAgAnfiaIAAgKIAAgKIAAgyIAKAAIAAAeIAAAKIAAAKIAAAKIAAAKIgKAAgAHWkSIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAlJkcIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_469.setTransform(1.5,3.9);

	this.shape_470 = new cjs.Shape();
	this.shape_470.graphics.f("#5C3D0C").s().p("AkbFrQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgACRCbIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAnaAjIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAHblOIAAgKIAAgKIAAgKQAFAAACACQADADAAAFIAAAKIAAAKIgKAAg");
	this.shape_470.setTransform(0,9.9);

	this.shape_471 = new cjs.Shape();
	this.shape_471.graphics.f("#181103").s().p("AlJDSIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIgKAAgAFKCqIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAipjHIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_471.setTransform(11.5,-42.6);

	this.shape_472 = new cjs.Shape();
	this.shape_472.graphics.f("#5B3D0C").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_472.setTransform(41.5,-26.1);

	this.shape_473 = new cjs.Shape();
	this.shape_473.graphics.f("#160F02").s().p("Ag7HRIAKAAIAKAAIAKAAQAAAFgBAAQgOAFgPAAIAAgKgAiLGVIgKAAIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAgACgnQIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_473.setTransform(28.5,12.9);

	this.shape_474 = new cjs.Shape();
	this.shape_474.graphics.f("#100B01").s().p("AkcBLIgKAAIgKAAIgKAAIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAIAKAAIAAAKIgKAAgAExhAIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_474.setTransform(13,-29.1);

	this.shape_475 = new cjs.Shape();
	this.shape_475.graphics.f("#3A2708").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgCADQgDACgEAAIAAgKg");
	this.shape_475.setTransform(46,-34.6);

	this.shape_476 = new cjs.Shape();
	this.shape_476.graphics.f("#382607").s().p("AHCCHIAAgKIAAgKIAAgKQAFAAACACQADADAAAFIAAAKIAAAKIgKAAgAnLh8IAAgKIAKAAIAAAKQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_476.setTransform(4.5,-47.1);

	this.shape_477 = new cjs.Shape();
	this.shape_477.graphics.f("#211604").s().p("Ah3F3QAAgFgDgDQgCgCgFAAIABgJQAGgWgRABIAAgKQAKAAAIgEQACgBAAgFIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgABuliIAAgKQAKgFAKgEQAFgBAFAAIAAAKQgFAAAAABQgCALgMAAQgFAAgGgCg");
	this.shape_477.setTransform(35.5,0.9);

	this.shape_478 = new cjs.Shape();
	this.shape_478.graphics.f("#2A1D06").s().p("Am3DcIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAGkgxIgKAAIAAgKQARgDAHgPQABgCAFAAIAAAKQAAAFgDACQgCADgFAAIAAAKIgKAAgAj5jHIAAgKIAAgKIAKAAQAFAAADACQACADAAAFQAAAFgCADQgIAHgKAFIAAgKg");
	this.shape_478.setTransform(5.5,-32.6);

	this.shape_479 = new cjs.Shape();
	this.shape_479.graphics.f("#151406").s().p("AlxIDIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAgAF8nkIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAg");
	this.shape_479.setTransform(15.5,13.9);

	this.shape_480 = new cjs.Shape();
	this.shape_480.graphics.f("#3F2B09").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_480.setTransform(54,-38.6);

	this.shape_481 = new cjs.Shape();
	this.shape_481.graphics.f("#4F6222").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_481.setTransform(55,-38.6);

	this.shape_482 = new cjs.Shape();
	this.shape_482.graphics.f("#251A05").s().p("AGkBuIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKQgDARgRADIAAgKgAm3A8IAAgKIAAgoIAKAAIAAAUIAAAKIAAAKIAAAKIgKAAgAizhtIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_482.setTransform(7.5,-51.6);

	this.shape_483 = new cjs.Shape();
	this.shape_483.graphics.f("#1A1807").s().p("AgEAPIAAgKIAAgTIAJAAIAAATIAAAKIgJAAg");
	this.shape_483.setTransform(55,-41.1);

	this.shape_484 = new cjs.Shape();
	this.shape_484.graphics.f("#4A320A").s().p("AgxBaIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAAyhFIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_484.setTransform(49.5,-35.6);

	this.shape_485 = new cjs.Shape();
	this.shape_485.graphics.f("#452D09").s().p("AhFFjIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAgAlJjqIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAFKlOIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAg");
	this.shape_485.setTransform(17.5,-10.1);

	this.shape_486 = new cjs.Shape();
	this.shape_486.graphics.f("#261904").s().p("AEqBiQgDgDAAgFIAAgKIAKAAIAKAAQAAAFgCAEQgDAGgFAFQgFAAgCgCgAlOAoIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFFg7QAAgFgCgEQgDgGgFgFIAAgKIAAgKIAKAAQAJALABATIAAAKIgKAAg");
	this.shape_486.setTransform(19,-37.6);

	this.shape_487 = new cjs.Shape();
	this.shape_487.graphics.f("#2C1F06").s().p("AnkAoIgKAAIAAgKIAKAAQAFAAADACQACADAAAFIgKAAgAHlgTQgFAAgCgDQgDgCAAgFIAAgKQAKAFAHAIQADACAAAFIgKAAg");
	this.shape_487.setTransform(2,-45.6);

	this.shape_488 = new cjs.Shape();
	this.shape_488.graphics.f("#573A0C").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_488.setTransform(55,-45.6);

	this.shape_489 = new cjs.Shape();
	this.shape_489.graphics.f("#32320E").s().p("AAFAUIgJAAQAAgFgCgDQgIgMAAgTQARAMAKASQACAEAAAFIgKAAg");
	this.shape_489.setTransform(55,-48.6);

	this.shape_490 = new cjs.Shape();
	this.shape_490.graphics.f("#41501C").s().p("AgEAAIAAgJIAJAAIAAAJQAAAFgCADQgDACgEAAIAAgKg");
	this.shape_490.setTransform(56,-43.6);

	this.shape_491 = new cjs.Shape();
	this.shape_491.graphics.f("#2D3512").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_491.setTransform(56,-45.6);

	this.shape_492 = new cjs.Shape();
	this.shape_492.graphics.f("#100A01").s().p("ABpCMIgKAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAgAG9gJIAAgKIAAgeIAKAAIAAAeIAAAKIgKAAgAnQgxIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAHHhFIAAgKIAAgKIAAgKQAFAAADADQACACAAAFIAAAKIAAAKIgKAAgAGjh5QgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCg");
	this.shape_492.setTransform(-3,13.4);

	this.shape_493 = new cjs.Shape();
	this.shape_493.graphics.f("#150D02").s().p("AmFBpIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAF8g2IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAE2hUIgKAAIAAgKIAAgKIAKAAQAAAFACACQADADAFAAIAAAKIgKAAg");
	this.shape_493.setTransform(5.5,7.9);

	this.shape_494 = new cjs.Shape();
	this.shape_494.graphics.f("#1F1403").s().p("AkDDDIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAgAlxCHQAAgFgBgBQgOgEgPAAIAAgKIAKAAQAFAAADgDQACgCAAgFIAKAAQAAAFACACQADADAFAAIAAAKIAAAKIgKAAgABGA3IAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIgKAAgAF8iQIgKAAIAAgKIAAgKIAAgKIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKQAFAFADAGQACAEAAAFQAAAFgDADQgCACgFAAIgKAAg");
	this.shape_494.setTransform(0.5,13.9);

	this.shape_495 = new cjs.Shape();
	this.shape_495.graphics.f("#51350A").s().p("ADcCRIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAiLgYIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjbiGQgFAAgDgDQgCgCAAgFIAKAAIAKAAIAAAKIgKAAg");
	this.shape_495.setTransform(12.5,-16.1);

	this.shape_496 = new cjs.Shape();
	this.shape_496.graphics.f("#1D1203").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_496.setTransform(35,-0.6);

	this.shape_497 = new cjs.Shape();
	this.shape_497.graphics.f("#070400").s().p("AipIXQgFAAgCgDQgDgCAAgFIAKAAIAKAAIAAAKIgKAAgAiVHlIgUAAIAAgKIAKAAIAKAAQAFAAADACQACADAAAFIgKAAgAAoHRIgKAAIgUAAIAAgKIAeAAIAKAAIAAAKIgKAAgAm3EnIAAgKIAAgoIAKAAIAKAAIAAAKIgKAAIAAAUIAAAKIAAAKIgKAAgADmEJIgKAAIAAgKIAAgKIAAgKIAKAAQAAAFACACQADADAFAAIAAAKIAAAKIgKAAgAkDDrIAAgKIAAgKQAAgFACgBQAOgHgQgRIAAgKQAFAFAGADQAEACAFAAQAAAFACADQADACAFAAIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAgACDCtQgGgDgFgFIAAgKIAKAAQAFAAADADQACACAAAFIAAAKQgFAAgEgCgAGkBpIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAB4A3IgKAAIgKAAQAAgFgCgEQgDgGgFgFIAKAAIAUAAIAKAAIAAAKIAAAKIgKAAgAF8AZIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAhjAZIAAgKIAKAAIAKAAQAAAFgDADQgCACgFAAIgKAAgAl7iQIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAAiuIgJAAIgKAAIAAgKIAAgKIATAAIAKAAIAAAKIAAAKIgKAAgAgnoMIAAgKIAKAAQAFAAACACQADADAAAFQgFAAgEACQgGADgFAFIAAgKg");
	this.shape_497.setTransform(-4.5,-2.1);

	this.shape_498 = new cjs.Shape();
	this.shape_498.graphics.f("#1E1303").s().p("AExAyIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIgKAAgADVgcQgDgGgFgFQAKAAAIgEQACgBAAgFIAKAAIAAAKIAAAKQgFAAgEACQgGADgFAFQAAgFgCgEgAkwgdQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_498.setTransform(9,3.4);

	this.shape_499 = new cjs.Shape();
	this.shape_499.graphics.f("#030100").s().p("AhoDwIgUAAIgKAAIAAgKIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAgAEAB2QgGgDgFgFQAAgFgCgDQgDgCgFAAIAAgKIAAgKIAKAAQAAAFACADQADACAFAAQAAAFACADQADACAFAAIAAAKIAAAKQgFAAgEgCgAEdAUIgKAAQAAgFgCgEQgDgGgFgFIAAgJIAKAAIAKAAQAAAJAEAIQABACAFAAIAAAKIgKAAgAkmAAIAAgJIAAgKIAKAAIAAAKIAAAJIgKAAgADXhjIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkmjbIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_499.setTransform(10,0.4);

	this.shape_500 = new cjs.Shape();
	this.shape_500.graphics.f("#64420E").s().p("Ai9E2IAoAAIAKAAQAAAFgBAAQgPAFgKAAQgQAAgIgKgAC4ktQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCg");
	this.shape_500.setTransform(20.5,23.407);

	this.shape_501 = new cjs.Shape();
	this.shape_501.graphics.f("#322207").s().p("AC+HbIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAgAm3CRIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAGuiGIgKAAIAAgKQAFAAADgCQACgDAAgFQAFAAACACQADADAAAFIAAAKIgKAAgAjtnTQgCgCAAgFIAKAAIAKAAQAAAFgCACQgDADgFAAQgFAAgDgDg");
	this.shape_501.setTransform(-4.5,4.9);

	this.shape_502 = new cjs.Shape();
	this.shape_502.graphics.f("#3C2708").s().p("AlEDhIAKAAIAKAAQAAAFgCABQgHAEgFAAQgHAAABgKgAE7jgIAAgKIAKAAIAAAKQAAAFgCACQgDADgFAAIAAgKg");
	this.shape_502.setTransform(5.9975,11.9042);

	this.shape_503 = new cjs.Shape();
	this.shape_503.graphics.f("#372406").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_503.setTransform(29,-1.6);

	this.shape_504 = new cjs.Shape();
	this.shape_504.graphics.f("#3E2908").s().p("AjWI6IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAkmDcIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACHAUIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAmKhtIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAGLk/IAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAjgolIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIgKAAg");
	this.shape_504.setTransform(11,-2.6);

	this.shape_505 = new cjs.Shape();
	this.shape_505.graphics.f("#332106").s().p("AA3AeIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAhAgdIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKg");
	this.shape_505.setTransform(33,1.4);

	this.shape_506 = new cjs.Shape();
	this.shape_506.graphics.f("#140C01").s().p("AiQCbQAAgFgDgCQgCgDgFAAIgKAAIgKAAIAAgKIAAgKIAKAAIAKAAQAFAFAGADQAEACAFAAIAAAKIAAAKIgKAAgAhyBBIgKAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAgAClhKIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAAjhKQAAgFgCgEQgDgGgFgFIAKAAIAKAAQAKAAAIgEQACgBAAgFQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAg");
	this.shape_506.setTransform(20,9.9);

	this.shape_507 = new cjs.Shape();
	this.shape_507.graphics.f("#5A3B0C").s().p("AETIIIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAA3FyIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAlYC+IAAgKIAAgUIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIgKAAgADrAyIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjMgdQgFAAgCgDQgDgCAAgFQAFgFAGgDQAEgCAFAAIAAAKIAAAKIgKAAgAB9hPIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAFPhZIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjCizIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAgAjnn2QgDgCAAgFIAAgKQAFAFADAGQACAEAAAFQgFAAgCgDg");
	this.shape_507.setTransform(-10,9.4);

	this.shape_508 = new cjs.Shape();
	this.shape_508.graphics.f("#261B07").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_508.setTransform(21.5,-8.1);

	this.shape_509 = new cjs.Shape();
	this.shape_509.graphics.f("#583A0B").s().p("AFjCvIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAlsiaIAAgKIAAgKQAFAAACACQADADAAAFIAAAKIgKAAg");
	this.shape_509.setTransform(-14,-27.1);

	this.shape_510 = new cjs.Shape();
	this.shape_510.graphics.f("#3B2708").s().p("AiiERQgCgDAAgFIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIAAAKQgFAAgDgCgACRkSIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_510.setTransform(8,16.9);

	this.shape_511 = new cjs.Shape();
	this.shape_511.graphics.f("#69450E").s().p("AFZGBIgKAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAD/ClIgKAAIgKAAIgKAAIAAgKIAAgKIAAgKIAAgKIAAgUIAAgKQAFgFAGgDQAEgCAFAAIAKAAQAWAGADgPQAAgBAFAAIAKAAIAKAAIAAAKIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAgAjqiuIgKAAIgKAAIgeAAIgKAAIgKAAIgKAAIgUAAQAAgFgCgBQgIgEgKAAIAAgKIAAgKIAAgKIAAgKQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFIAAgKIAAgKQAFAAADgCQACgDAAgFQAFgFADgGQACgEAAgFQAFAAACgDQADgCAAgFQAKgFAHgIQADgCAAgFQAFAAACgDQADgCAAgFIAKAAQAKgFAIgHQACgDAAgFQAFgFAGgDQAEgCAFAAQAFAAACgCQADgDAAgFQAKAAAIgEQACgBAAgFIAKAAIAKAAQAAAFgCAEQgIALgKAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAA8IAAAKIAAAKIAAAKIgKAAg");
	this.shape_511.setTransform(7,-18.1);

	this.shape_512 = new cjs.Shape();
	this.shape_512.graphics.f("#4F350B").s().p("AEsEJIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkqhMQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAC0kIIAUAAIAKAAQAAAFgBABQgOAEgPAAIAAgKg");
	this.shape_512.setTransform(4.5,17.9);

	this.shape_513 = new cjs.Shape();
	this.shape_513.graphics.f("#010000").s().p("AjqBpIAAgKIAAgKQAFAAADgCQACgDAAgFIAKAAQAAAFgCAEQgDAGgFAFIAAAKIgKAAgADhheIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_513.setTransform(5,0.9);

	this.shape_514 = new cjs.Shape();
	this.shape_514.graphics.f("#110B02").s().p("AC0GQIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAjvD6IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAl7DcIgKAAQAAgFgCgBQgIgEgKAAIAAgKQAKAAAIgEQACgBAAgFQAFAAACACQADADAAAFQAFAFADAGQACAEAAAFIgKAAgAFKgJIAAgKIAAgeIAKAAIAAAKIAAAKIAAAKIAAAKIgKAAgAgngnIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAlnjHIgKAAIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIAAAKIgKAAgAC0kNIgKAAIgUAAIgKAAIgKAAIAAgKIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAQAAAFACADQADACAFAAIAAAKIgKAAgAlnkXIAAgKIAAgKQAFAAADADQACACAAAFIAAAKIgKAAgAGGk/IgKAAIgKAAIAAgKIAAgKQAKAAAIgEQACgBAAgFIAKAAIAAAUIAAAKIgKAAgAGQlxIAAgKIAAgeIAKAAIAAAeIAAAKIgKAAg");
	this.shape_514.setTransform(7.5,18.4);

	this.shape_515 = new cjs.Shape();
	this.shape_515.graphics.f("#181004").s().p("AlTDmIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgABkAAIgKAAIgKAAIAAgJIAAgKIAKAAIAKAAQAAAFADACQACADAFAAIAAAJIgKAAgAAUAAIgKAAQAAgEgCAAQgMgFgPAAIAAgKIAAgKIAKAAQAFAFAFADQAEACAFAAIAKAAIAKAAIAAAKIAAAJIgKAAgAh3gTQAAgFgCgDQgDgCgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAldhPIgKAAQAAgFgCgCQgDgDgFAAIAAgKQAFAAADgDQACgCAAgFIAKAAQAAAKAEAIQABACAFAAIAAAKIgKAAgAlsiWQgFgTAAgUIAKAAIAAAKIAAAKIAAAKIAAAKQgFAAAAgBgAFqjTQgCgDAAgFIAAgKQAFAAADACQACADAAAFIAAAKQgFAAgDgCg");
	this.shape_515.setTransform(-7.5,13.4);

	this.shape_516 = new cjs.Shape();
	this.shape_516.graphics.f("#1A1103").s().p("AjgEdIgKAAIgKAAIAAgKQAKAAAIgEQACgBAAgFQAAgFgCgCQgIgIgKgFIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAQAAAKAEAIQABACAFAAIAAAKIAAAKIgKAAIAAAKIgKAAgAGLEJIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAGVCRQAAgFgCgEQgDgGgFgFQAKAAAIgEQACgBAAgFIAKAAIAAAKIAAAKIgKAAIAAAKIgKAAgAFNkGQgDgCgFAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAKAAIAAAKIAAAKQgFAAgEACQgGADgFAFQAAgFgCgDgAmoj+IAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIgKAAg");
	this.shape_516.setTransform(-4,16.9);

	this.shape_517 = new cjs.Shape();
	this.shape_517.graphics.f("#56390C").s().p("AmKA3IAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAF3gsIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAg");
	this.shape_517.setTransform(-10,-6.1);

	this.shape_518 = new cjs.Shape();
	this.shape_518.graphics.f("#57390C").s().p("ABVEJIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhKCbIgKAAQgFAAgDgDQgCgCAAgFIAUAAIAKAAIAAAKIgKAAgAhKkIIAUAAIAKAAQAAAFgCAAQgNAFgPAAIAAgKg");
	this.shape_518.setTransform(28,6.9);

	this.shape_519 = new cjs.Shape();
	this.shape_519.graphics.f("#462E09").s().p("AhjGpIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjQDLQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgADIh8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgADImoIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_519.setTransform(7.5,21.9);

	this.shape_520 = new cjs.Shape();
	this.shape_520.graphics.f("#050300").s().p("AgJIwIgKAAIgKAAIAAgKIAUAAIAJAAIAAAKIgJAAgAjbG4IAAgKIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAgAhjF8IgKAAIAAgKIAKAAIAKAAIAKAAQAAAFgDADQgCACgFAAIgKAAgAifFeIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIgKAAgAAeEOIAAgKIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAgAj5DcIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAh3C+IAAgeQAFAFADAGQACAEAAAFQAAAFgCAEQgDAGgFAFIAAgKgACNC8QgGgDgFgFIAAgKIAKAAIAKAAIAAAKIAAAKQgFAAgEgCgABxC8QgDgDAAgFIAAgKQAFAAACADQADACAAAFIAAAKQgFAAgCgCgAFKCgQAAgFgCgCQgDgDgFAAIgKAAIgKAAIAAgKQARACgGgWIgBgKQAQgBgBAVIAFAAQAAAFACACQADADAFAAIAAAKIAAAKIgKAAgADcCgQgFAAgEgCQgGgDgFgFIAKAAIAKAAIAKAAIAAAKIgKAAgAAoA8IAAgKIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAgAmFAyQAAgFgCgBQgIgEgKAAIAAgKQARgNgGgkIgBgKQAFgFADgGQACgEAAgFQAFAAADgCQACgDAAgFQAFAAADACQACADAAAFQAAAFgCACQgDADgFAAIAAAKIAAA7IAAAKIAAAKIgKAAgAjZgCQgCgCAAgFQAAgFgCgEQgDgGgFgFIAAgKIAAgoQARADgCAbIAFAAIAAAKIAAAeIAAAJQgFAAgDgCgAFVgfQgGgDgFgFIAAgKIAAgKIAKAAIAKAAIAAAUIAAAKQgFAAgEgCgAljgfQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAGwhcQgCgCAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgDgAm3hjIAAgKIAAgeIAKAAIAAAeIAAAKIgKAAgAE2kNIgKAAQAAgFgCgEQgDgGgFgFIAUAAIAKAAIAAAKIAAAKIgKAAgAhFkXIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAmFlxIAAgKIAAgKQAFAAADADQACACAAAFIAAAKIgKAAgAgxmZIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAAolIgJAAIAAgKIAJAAIAKAAIAAAKIgKAAg");
	this.shape_520.setTransform(-6.5,7.4);

	this.shape_521 = new cjs.Shape();
	this.shape_521.graphics.f("#1B1203").s().p("AD6HQIAAgKIAAgKQAKAAAIgEQACgBAAgFIAKAAIAAAKIAAAKQgFAAAAABQgCALgMAAQgFAAgGgCgAluGIQgIgIgFgKIAKAAIAKAAIAAAKIAAAKQgFAAgCgCgAB4BKQAAgFgDgCQgCgDgFAAIAAgKQAFAAACgCQADgDAAgFIAKAAQAAAFACADQADACAFAAIAAAKIgKAAIAAAKIgKAAgAF8ilIAAgKIAAgKQAKAAAIgEQACgBAAgFIAKAAIAAAKIAAAKQgFAAAAABQgCALgMAAQgFAAgGgCgAmFm9QgRgDgDgRIAKAAIAKAAQAAAFACADQADACAFAAIAAAKIgKAAg");
	this.shape_521.setTransform(-5.5,6.996);

	this.shape_522 = new cjs.Shape();
	this.shape_522.graphics.f("#140D02").s().p("AE7H0IAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgABYFwQgDgDAAgFQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKQAAAFgDADQgCACgFAAQgFAAgCgCgAkwBkIgKAAIgKAAIAAgKIAAgKQAPAAANAEQACABAAAFIAAAKIgKAAgACHBGQAAgFgCgCQgDgDgFAAIAAgKIAKAAIAKAAQAPAAANgEQACgBAAgFIAKAAIAKAAIAAAKIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgAGzipQAAgFgDgDQgCgCgFAAIAAgKIAAgKIAAgKIAKAAQAFAFADAGQACAEAAAFIAAAKIAAAKIgKAAgAmynzQgFAAgCgCQgDgDAAgFQAKAAAIAEQACABAAAFIgKAAg");
	this.shape_522.setTransform(-4,7.4);

	this.shape_523 = new cjs.Shape();
	this.shape_523.graphics.f("#0E0901").s().p("AFyH0IAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgAmFG4IAAgKIAAgKIAAgKQARgBgGAVIgBAKIgKAAgAFyAUIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAkXnpIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_523.setTransform(-0.5,-12.6);

	this.shape_524 = new cjs.Shape();
	this.shape_524.graphics.f("#4F340B").s().p("AjqCbIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAgAlMCZQgCgDAAgFIAAgKIAAgKIAAgKIAKAAIAAAeIAAAKQgFAAgDgCgAFFiQIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_524.setTransform(5,1.9);

	this.shape_525 = new cjs.Shape();
	this.shape_525.graphics.f("#51360B").s().p("AikFtIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAmoBLIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAlih8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAD1iGIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAmKlYIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAGVlsIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_525.setTransform(-8,23.9);

	this.shape_526 = new cjs.Shape();
	this.shape_526.graphics.f("#4E340A").s().p("ABVHCIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhUC+IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAFhFIgJAAIAAgKIAJAAIAKAAIAAAKIgKAAgADriVIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAgijvIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAEdnBIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAklm5QgGgDgFgFIAKAAQAFAAADADQACACAAAFQgFAAgEgCg");
	this.shape_526.setTransform(2,21.4);

	this.shape_527 = new cjs.Shape();
	this.shape_527.graphics.f("#482F09").s().p("Ai4G4IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAnGiBIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAHWi+QgFgOAAgPIAKAAIAAAUIAAAKQgFAAAAgBgAnamjIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_527.setTransform(-8,2.4);

	this.shape_528 = new cjs.Shape();
	this.shape_528.graphics.f("#1C1303").s().p("Aj0IDIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjgFtIgKAAQAAgFgCgBQgIgEgKAAIAAgKIAKAAIAKAAIAKAAIAUAAIAKAAIAAAKIgKAAIgKAAIAAAKIgKAAgAkcDNIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAFjlEIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKQgFAAgEACQgGADgFAFIAAgKgAl2lsIAAgKIAAgKQAFAFAGADQAEACAFAAQAAAFgCADQgDACgFAAIgKAAgAlOnuIgKAAQAAgFgCgCQgDgDgFAAIAAgKIAKAAIAKAAQAAAFADACQACADAFAAIAAAKIgKAAg");
	this.shape_528.setTransform(0,9.9);

	this.shape_529 = new cjs.Shape();
	this.shape_529.graphics.f("#130C02").s().p("AiGEsIgKAAIgKAAIgKAAIAAgKIAUAAIAKAAIAKAAIAAAKIgKAAgAhxEWQgGgDgFgFIAAgKQAQACgFgWIgBgKIAAgKIAAgUIAKAAIAKAAIAAAKIgKAAIAAAeIAAAKIAAAKIAAAKIAAAKQgFAAgEgCgACCjlQACgbgRgDIAAgKIAAgKIAKAAQAAAFADACQACADAFAAIAAAeIAAAKgACHkhIAAgKIAKAAIAKAAIAKAAQAAAFgBABQgTAEgKAKIAAgKg");
	this.shape_529.setTransform(28,4.4);

	this.shape_530 = new cjs.Shape();
	this.shape_530.graphics.f("#231704").s().p("AjbFoIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAgADmlTIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_530.setTransform(16.5,10.4);

	this.shape_531 = new cjs.Shape();
	this.shape_531.graphics.f("#3B2809").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_531.setTransform(20,-0.6);

	this.shape_532 = new cjs.Shape();
	this.shape_532.graphics.f("#362509").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_532.setTransform(18,-1.6);

	this.shape_533 = new cjs.Shape();
	this.shape_533.graphics.f("#201505").s().p("ADDB4IAAgKIAAgKIAKAAIAAAKIAAAKQAAAFgCACQgDADgFAAIAAgKgADXgdIgKAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAgAjggnQAAgFgCgDQgDgCgFAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIAAAKIgKAAgAhAh3IAAgKIAKAAIAKAAIAFABQABALgMAAQgGAAgIgCg");
	this.shape_533.setTransform(-3,3.4);

	this.shape_534 = new cjs.Shape();
	this.shape_534.graphics.f("#181005").s().p("AgFAPIAAgKIAAgJIAAgKQAPgBgFAVIgBAJIgJAAg");
	this.shape_534.setTransform(19.1188,-5.1022);

	this.shape_535 = new cjs.Shape();
	this.shape_535.graphics.f("#120C03").s().p("AgYDXIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAAAKIgKAAgABLjMIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_535.setTransform(6,12.9);

	this.shape_536 = new cjs.Shape();
	this.shape_536.graphics.f("#4F340A").s().p("AhAJJIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhwHEQgCgCAAgFIAAgKIAAgKIAKAAIAAAUIAAAKQgFAAgDgDgAE7E7IAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAnGDXIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAClAPIAAgKIAAgJIAKAAIAAAJIAAAKIgKAAgAC5gYIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAG9iaIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAgAi4o+IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_536.setTransform(-6,-4.1);

	this.shape_537 = new cjs.Shape();
	this.shape_537.graphics.f("#382508").s().p("ADrD/IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjqi4IgKAAIAAgKIAKAAQAFAAADACQACADAAAFIgKAAgACHjgIAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIgKAAg");
	this.shape_537.setTransform(-3,17.9);

	this.shape_538 = new cjs.Shape();
	this.shape_538.graphics.f("#0B0802").s().p("Ak/DmIgKAAIAAgKIAAgKIAKAAQAAAFADADQACACAFAAIAAAKIgKAAgAE2gTIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAC+jbIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_538.setTransform(-7.5,14.4);

	this.shape_539 = new cjs.Shape();
	this.shape_539.graphics.f("#412B09").s().p("ACMEJIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFUAPIAAgKIAAgJIAKAAIAAAJIAAAKIgKAAgAAAgiIgTAAIAAgKQAPAAAMAFQACAAAAAFIgKAAgAldhAIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgADIj+IgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_539.setTransform(-7.5,16.9);

	this.shape_540 = new cjs.Shape();
	this.shape_540.graphics.f("#593B0C").s().p("Ag2F8IBFAAIAKAAIAAAFQgnAFgoAAIAAgKgABfFUIAAgKIAKAAIAAAKQAAAFgDACQgCADgFAAIAAgKgACTCJQgCgCAAgFIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKQgFAAgDgDgAlrCKQgGgDgFgFIAKAAQAFAAACACQADADAAAFQgFAAgEgCgAkPASQgDgDAAgFIAAgKIAAgJIAKAAIAAATIAAAKQgFAAgCgCgAA3h3IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAlokZQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAFtlxIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_540.setTransform(12,7.4);

	this.shape_541 = new cjs.Shape();
	this.shape_541.graphics.f("#312209").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgDADQgCACgFAAIgJAAg");
	this.shape_541.setTransform(14.5,-9.1);

	this.shape_542 = new cjs.Shape();
	this.shape_542.graphics.f("#4B310A").s().p("AFAIIIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAiUFSQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAA8DcIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAi9C+IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAEEBuIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAB4A8IgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAlJA8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhtn9IgUAAIgKAAIAAgKIAeAAIAKAAIAAAKIgKAAg");
	this.shape_542.setTransform(3.5,-12.6);

	this.shape_543 = new cjs.Shape();
	this.shape_543.graphics.f("#171004").s().p("AGVC0IgKAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAgAmoiVIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAD/ifIgKAAIgKAAIgKAAIAAgKQAFAAACgCQADgDAAgFIAKAAIAKAAQAFAFADAGQACAEAAAFIgKAAg");
	this.shape_543.setTransform(-8,8.4);

	this.shape_544 = new cjs.Shape();
	this.shape_544.graphics.f("#0F0A03").s().p("Ak1C5QAAgFgCgCQgDgDgFAAIAAgKIAAhGIAKAAIAAAUIAAAKIAAAKQAAAPAFANQAAACAFAAIAAAKIAAAKIgKAAgACCgYIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAgAE2hKIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgADmikQAAgFgCgDQgDgCgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_544.setTransform(-13.5,15.9);

	this.shape_545 = new cjs.Shape();
	this.shape_545.graphics.f("#160E03").s().p("Aj+BzQAAgFgDgCQgCgDgFAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIAAAKIgKAAgAD/hKIgKAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIgKAAg");
	this.shape_545.setTransform(-16,4.9);

	this.shape_546 = new cjs.Shape();
	this.shape_546.graphics.f("#302009").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_546.setTransform(9,-4.6);

	this.shape_547 = new cjs.Shape();
	this.shape_547.graphics.f("#452E09").s().p("AA8CHIAAgKIAAgKQAFAAADACQACADAAAFIAAAKIgKAAgAjuBdQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgADmgYIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAgAgnh8IgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_547.setTransform(2.5,-19.1);

	this.shape_548 = new cjs.Shape();
	this.shape_548.graphics.f("#402B09").s().p("AGBD1IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAmKgYIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkwgiIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAAjj0IAUAAIAKAAIAAAKIgKAAIAAAKIgKAAIgBABQgPAAAGgVg");
	this.shape_548.setTransform(0,14.9);

	this.shape_549 = new cjs.Shape();
	this.shape_549.graphics.f("#422B08").s().p("AiaGkIgoAAIAAgKIAoAAIAKAAIAAAKIgKAAgAC5kDIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAiumZIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_549.setTransform(18,22.4);

	this.shape_550 = new cjs.Shape();
	this.shape_550.graphics.f("#402A09").s().p("AAFAFIgTAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_550.setTransform(0,-21.1);

	this.shape_551 = new cjs.Shape();
	this.shape_551.graphics.f("#53370B").s().p("ADDFUIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgADDDcIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAFjC0IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACvCgIAKAAQAAAFADADQACACAFAAQAAAFgCABQgHADgEAAQgMAAAFgTgAFrB5QgDgGgFgFIAAgKIAKAAIAKAAIAAAKIAAAKQAAAFgDACQgCADgFAAQAAgFgCgEgAlrBOQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAFjgdIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAgAiFktQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAAPk1IgTAAIAAgKIATAAIAKAAIAAAKIgKAAgAjBk3QgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAFFlTIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAg");
	this.shape_551.setTransform(2,10.4);

	this.shape_552 = new cjs.Shape();
	this.shape_552.graphics.f("#1C1304").s().p("AhPEJQAAgFgCgBQgIgEgKAAIAAgKIAAgKIAKAAQgBAQAWgFIAJgBIAAAKIgKAAIAAAKIgKAAgAhtC5QAAgFgCgEQgDgGgFgFIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIgKAAgAGuCRQAAgFgCgEQgDgGgFgFQAKAAAIgEQACgBAAgFIAKAAIAAAKIAAAKIgKAAIAAAKIgKAAgAjbhyIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAQAAAFACADQADACAFAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAgAj+jDQgEgPgVAGIAAgKIAAgKQAbgHAHAPQABACAFAAQAAAFgDACQgCADgFAAIAAAKQgFAAAAgBgAnBjCIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgACCj+IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_552.setTransform(-6.5,6.9);

	this.shape_553 = new cjs.Shape();
	this.shape_553.graphics.f("#5E3E0C").s().p("ABqGsQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAEnjHIgUAAIAAgKIAAgKIAAgKIAAgKIAKAAQgHAbARADIAKAAIAAAKIgKAAgAkwjRIAAgKIAAgKIAAhGIAKAAIAABQIAAAKIgKAAgADrmjIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_553.setTransform(-17,21.4);

	this.shape_554 = new cjs.Shape();
	this.shape_554.graphics.f("#61400D").s().p("AALJWQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAgJH0IgKAAIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAJAAIAAAKIgJAAgAj5FKIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgADIBGIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAkNAAIgKAAIAAgJIAKAAIAKAAIAAAJIgKAAgAkrAAIAAgJIAAgUIAAgKIAKAAIAAAKIAAAKIAAAKIAAAJIgKAAgACMgdIgKAAIgKAAIAAgKQAPAAAOAEQABABAAAFIgKAAgAEiiVIg8AAIAAgKIA8AAIAKAAIAAAKIgKAAgACMpDIgKAAIgKAAIAAgKIAAgKIAKAAIAKAAQAAAFACACQADADAFAAIAAAKIgKAAg");
	this.shape_554.setTransform(-15.5,-5.6);

	this.shape_555 = new cjs.Shape();
	this.shape_555.graphics.f("#2C1E07").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgDACQgCADgFAAIgJAAg");
	this.shape_555.setTransform(20.5,-21.1);

	this.shape_556 = new cjs.Shape();
	this.shape_556.graphics.f("#3F2908").s().p("Ag7DIIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAyi9IgUAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_556.setTransform(14.5,0.4);

	this.shape_557 = new cjs.Shape();
	this.shape_557.graphics.f("#271B06").s().p("AAFAFIgTAAIAAgJIATAAIAKAAIAAAJIgKAAg");
	this.shape_557.setTransform(16,-19.1);

	this.shape_558 = new cjs.Shape();
	this.shape_558.graphics.f("#442D09").s().p("AiaGkIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgACRDmIAAgKIAAgUIAAgKIAAgKIAKAAIAAAeIAAAKIAAAKIgKAAgAAZDSIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAiuBkQAPAAAOAFQABAAAAAFIgJABIgKABQgMAAABgMgAClmZIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_558.setTransform(1.9978,20.4);

	this.shape_559 = new cjs.Shape();
	this.shape_559.graphics.f("#3A2607").s().p("AlTD1IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFKjgIgUAAIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAIAAAKIgKAAg");
	this.shape_559.setTransform(-15.5,-5.1);

	this.shape_560 = new cjs.Shape();
	this.shape_560.graphics.f("#2E1F06").s().p("ADxAwQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAjlgdQAAgFgCgBQgIgEgKAAIAAgKIAKAAIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_560.setTransform(-6.5,-33.6);

	this.shape_561 = new cjs.Shape();
	this.shape_561.graphics.f("#261A05").s().p("AA8DXIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgACgB9IgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAidi7QgHgHgFgKIAAgKIAKAAQAFAAADACQACADAAAFIAAAKIAAAKQgFAAgDgDg");
	this.shape_561.setTransform(-1.5,-40.1);

	this.shape_562 = new cjs.Shape();
	this.shape_562.graphics.f("#442D08").s().p("ABpCgIAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIgKAAgAhoiVIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_562.setTransform(25,-13.6);

	this.shape_563 = new cjs.Shape();
	this.shape_563.graphics.f("#432C09").s().p("AizFjIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACqEJIAAgKIAAgeIAKAAIAAAeIAAAKIgKAAgAhij2QgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgACClYIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_563.setTransform(0.5,2.9);

	this.shape_564 = new cjs.Shape();
	this.shape_564.graphics.f("#362408").s().p("Ai4FAIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgACyk4QgDgCAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgCgDg");
	this.shape_564.setTransform(-6,0.4);

	this.shape_565 = new cjs.Shape();
	this.shape_565.graphics.f("#241804").s().p("AFUB9IgyAAIAAgKIAKAAIAKAAIAeAAIAKAAIAAAKIgKAAgAldhyIAAgKIAKAAIAKAAQAAAFgDADQgHAHgKAFIAAgKg");
	this.shape_565.setTransform(-16.5,-43.1);

	this.shape_566 = new cjs.Shape();
	this.shape_566.graphics.f("#49300A").s().p("AjCCbIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFZhKIgeAAIAAgKQAUAAATAFQABAAAAAFIgKAAgAliiGIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_566.setTransform(-17,-24.1);

	this.shape_567 = new cjs.Shape();
	this.shape_567.graphics.f("#1E1504").s().p("ACMAPIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAiLgEIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAg");
	this.shape_567.setTransform(-14.5,-32.1);

	this.shape_568 = new cjs.Shape();
	this.shape_568.graphics.f("#51360A").s().p("AAeAFIgKAAIgnAAIgKAAIgKAAIAAgJIBFAAIAKAAIAAAJIgKAAg");
	this.shape_568.setTransform(9.5,-29.1);

	this.shape_569 = new cjs.Shape();
	this.shape_569.graphics.f("#191203").s().p("AE7BaIgoAAIAAgKIAoAAIAKAAIAAAKIgKAAgAlEBQIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhIhHQgCgDAAgFIAAgKIAKAAIAKAAQAAAFgCADQgDACgFAAIAAAKQgFAAgDgCg");
	this.shape_569.setTransform(-20,-36.6);

	this.shape_570 = new cjs.Shape();
	this.shape_570.graphics.f("#1B1304").s().p("AjbH9IgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAgAjRmQIgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgADmngQAAgFgDgCQgCgDgFAAIAAgKQAWgVgCAfIAAAKIgKAAg");
	this.shape_570.setTransform(27.5298,12.4639);

	this.shape_571 = new cjs.Shape();
	this.shape_571.graphics.f("#2F2006").s().p("ADmBaIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjlBQIgKAAIAAgKIAKAAQAFAAADADQACACAAAFIgKAAgACqhPIgKAAQgFAAgCgCQgDgDAAgFIAKAAIAKAAQAFAAACACQADADAAAFIgKAAg");
	this.shape_571.setTransform(-21.5,-36.6);

	this.shape_572 = new cjs.Shape();
	this.shape_572.graphics.f("#372407").s().p("AClHCIAAgKIAKAAIAAAKQAAAFgCADQgDACgFAAIAAgKgAiuh3IAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgAgYm3IAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAg");
	this.shape_572.setTransform(2,16.4);

	this.shape_573 = new cjs.Shape();
	this.shape_573.graphics.f("#442C08").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_573.setTransform(2.5,-29.1);

	this.shape_574 = new cjs.Shape();
	this.shape_574.graphics.f("#4C320A").s().p("AioGYQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAAoFoIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhtFKIgUAAIAAgKQAFAAACgDQADgCAAgFIAKAAQAFAAADADQACACAAAFIAAAKIgKAAgAmLBiQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAF8A8IAKAAIAKAAQAAAFgCABQgHAEgFAAQgHAAABgKgACMmPIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_574.setTransform(-9.5,11.4);

	this.shape_575 = new cjs.Shape();
	this.shape_575.graphics.f("#52360B").s().p("AC0HvIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAFyGVIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAkXGBIAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIgKAAgAhYFhQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAlnC5IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABGCRIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjQADQgGgDgFgEIAKAAQAFAAACADQADABAAAFQgFAAgEgCgAk1gEIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAjvgiIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAl7heIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgACCkcIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjGkoQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAA8naIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_575.setTransform(-12.5,-3.1);

	this.shape_576 = new cjs.Shape();
	this.shape_576.graphics.f("#161003").s().p("AEOClIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAkXBLIAAgKIAAgeIAKAAIAAAeIAAAKIgKAAgAC0gOQAAgFgCgCQgPgLAHggQAFgFAGgDQAEgCAFAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgABQiaIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_576.setTransform(-25.5,-47.1);

	this.shape_577 = new cjs.Shape();
	this.shape_577.graphics.f("#5A3C0C").s().p("ABBIXIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAiaCbIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAD/AjIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAgigsIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAg1hCQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAkIhUIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAtmeIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAgAh8oCIAAgKIAAgKIAAgKIAKAAIABAKQAGAbgRADIAAgKg");
	this.shape_577.setTransform(-1,9.9);

	this.shape_578 = new cjs.Shape();
	this.shape_578.graphics.f("#201704").s().p("ABVCgIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhKiVIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAg");
	this.shape_578.setTransform(0,-47.6);

	this.shape_579 = new cjs.Shape();
	this.shape_579.graphics.f("#5B3C0C").s().p("ACBIIIgKAAIgKAAIAAgKQAPAAANAFQACAAAAAFIgKAAgACVDSIgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAiCDIIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAjwC0IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFTCqIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFdAeIAAgKIAAgKIAAgKIAKAAIABAKQAFAUgOAAIgCAAgAEFgfQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgAjuhwQgCgCAAgFQAFgFAGgDQAEgCAFAAQAAAFgCAEQgDAGgFAFQgFAAgDgDgAloiBIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAlUkrIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgABZlnIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgADvnLIgKAAIgKAAIgKAAIAAgKIAUAAIAKAAIAKAAIAAAKIgKAAgAAdnzIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAg");
	this.shape_579.setTransform(-16.3812,14.4);

	this.shape_580 = new cjs.Shape();
	this.shape_580.graphics.f("#080500").s().p("Am1GYQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgAE2FyIgKAAIAAgKIAAgKIAAgKIAKAAQAAAFADADQACACAFAAIAAAKIAAAKIgKAAgACsFIQgHgIgFgKIAKAAIAKAAIAAAKIAAAKQgFAAgDgCgAEsgTIgKAAIAAgKIAAgKIAKAAQAFAFADAGQACAEAAAFIgKAAgAGagxQAAgFgCgEQgDgGgFgFIAKAAIAKAAIAAAKIAAAKIgKAAgAhjiBIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgUAAIAAgKIAAgKIAUAAIAKAAQgBARAWgGIAJgBIAUAAIAKAAIAAAKIgKAAgAGuifIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABQlnIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAg7mPIAAgKIAKAAQAAAFADADQACACAFAAQAAAFgCABQgIAEgKAAIAAgKgAk1mFIAAgKIAAgKQAKAAAIAEQACABAAAFIgKAAIAAAKIgKAAg");
	this.shape_580.setTransform(-0.5,3.4);

	this.shape_581 = new cjs.Shape();
	this.shape_581.graphics.f("#49320A").s().p("AgEAPIAAgKIAAgJIAAgKIAJAAIAAATIAAAKIgJAAg");
	this.shape_581.setTransform(10,-34.1);

	this.shape_582 = new cjs.Shape();
	this.shape_582.graphics.f("#53380B").s().p("AjQA6QgGgDgFgFIAKAAQAFAAACACQADADAAAFQgFAAgEgCgADSgnIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_582.setTransform(-13.5,-30.6);

	this.shape_583 = new cjs.Shape();
	this.shape_583.graphics.f("#0E0A01").s().p("ABuAjIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIgKAAgAiBAZIAAgKIAAgKIAAgJQAFgFAGgDQAEgCAFAAIAAAKIAAAJIAAAKIgKAAIAAAKIgKAAgAgMgLQgCgDgFAAIAAgKQAFAAACgDQADgCAAgFIAJAAIAAAKQAAAFgBAEQgDAGgFAFQAAgFgDgCg");
	this.shape_583.setTransform(-2.5,-37.1);

	this.shape_584 = new cjs.Shape();
	this.shape_584.graphics.f("#171103").s().p("ADIBkQgFAAgDgDQgCgCAAgFIAKAAIAKAAIAAAKIgKAAgAjRhZIAAgKIAKAAIAKAAQAAAFgDADQgHAHgKAFIAAgKg");
	this.shape_584.setTransform(-11.5,-51.6);

	this.shape_585 = new cjs.Shape();
	this.shape_585.graphics.f("#0F0B02").s().p("AAeBBIgeAAIAAgKIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAgAg7giQAAgFgDgCQgCgDgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAA8g2IgKAAIAAgKIAKAAQAFAAADACQACADAAAFIgKAAg");
	this.shape_585.setTransform(2.5,-37.1);

	this.shape_586 = new cjs.Shape();
	this.shape_586.graphics.f("#291D06").s().p("AAFAFIgJAAQgFAAgCgCQgDgDAAgEIAKAAIAJAAQAFAAADACQACACAAAFIgKAAg");
	this.shape_586.setTransform(7,-46.1);

	this.shape_587 = new cjs.Shape();
	this.shape_587.graphics.f("#070500").s().p("Ai9H5IgKAAIgKAAIgKAAIAAgKQAKAAAIgEQACgBAAgFIAUAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAgAFrkBQgDgCAAgFIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKQgFAAgCgDgAlxkSIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAk/nGIgKAAIAAgKIAAgKIAKAAQAAAFACADQADACAFAAIAAAKIgKAAgAAUnuIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_587.setTransform(4.5,2.9);

	this.shape_588 = new cjs.Shape();
	this.shape_588.graphics.f("#020100").s().p("Al7HbQgFAAgDgCQgCgDAAgFIAKAAIAKAAIAAAKIgKAAgAiBGfIAAgKIAAgUIAKAAIAAAKIAAAKIAAAKIgKAAgAF8FFIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAj3FCQgCgCAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgDgAAADhIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAlFCtQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAlJCRIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgAhjBzIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAlTBVIAAgoIAKAAIAAAUIAAAKQAAAFgCAEQgDAGgFAFIAAgKgAhtBLIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACCkmIAAgKIAAgKIAKAAQAFAAADADQACACAAAFIgKAAIAAAKIgKAAgAAAkwIAAgKQAFAAACADQADACAAAFQAAAFgDACQgCADgFAAIAAgKgAhFnQIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_588.setTransform(-4.5,-10.1);

	this.shape_589 = new cjs.Shape();
	this.shape_589.graphics.f("#50350B").s().p("ADSHRIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAE2G9IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkMG7QgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAEOC5IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAiphUQgFAAgDgDQgCgCAAgFQAKAAAIAEQACABAAAFIgKAAgACClYIAAgUQARADgLAZQgBACgFAAIAAgKgAk/moIAAgKIAAgKIAAgKIAAgKIAKAAIAAAeIAAAKIgKAAg");
	this.shape_589.setTransform(-2.5,-3.1);

	this.shape_590 = new cjs.Shape();
	this.shape_590.graphics.f("#130D02").s().p("Ak0CUQgLgDgKgFIAAgKIAAgKQAKAFALAEQAEABAFAAIAAAKIAAAKQgFAAgEgCgAFUBuIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAi9gxIgeAAIAAgKIAKAAIAKAAQAKAAAIAEQACABAAAFIgKAAgAC0g7IgKAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAAAKIAAAUIAAAKIgKAAgAlThZIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgACgiBQgFAAgBgCQgEgIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_590.setTransform(-8.5,-30.6);

	this.shape_591 = new cjs.Shape();
	this.shape_591.graphics.f("#362507").s().p("AiuFoIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgACbkNIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAgAAFldIAAgKIAKAAIAAAKQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_591.setTransform(32,4.4);

	this.shape_592 = new cjs.Shape();
	this.shape_592.graphics.f("#0B0801").s().p("ABgHFQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAk6jMIgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIgKAAgAnGj+IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAjWkmIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkmk6IgKAAIAAgKQAFAAADgCQACgDAAgFIAKAAIAAAKIAAAKIgKAAgAm8lsQAAgFgCgCQgDgDgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAkSmKIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAE7mUIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAGznGIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_592.setTransform(1,7.9);

	this.shape_593 = new cjs.Shape();
	this.shape_593.graphics.f("#563A0C").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_593.setTransform(33,-34.6);

	this.shape_594 = new cjs.Shape();
	this.shape_594.graphics.f("#3E2A08").s().p("AgCADQgCgDgFAAIAAgJIAJAAIAKAAIAAAJQAAAFgDACQgCADgFAAQAAgFgCgCg");
	this.shape_594.setTransform(40.5,-32.6);

	this.shape_595 = new cjs.Shape();
	this.shape_595.graphics.f("#120D02").s().p("AGQCCIgKAAIAAgKIAKAAQAFAAACADQADACAAAFIgKAAgAhjBuIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAmOA6QgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAhwhNQgCgCgFAAIAAgKQAKgKAIgLQACgEAAgFIAAgKIAKAAQAFAFADAGQACAEAAAFQgFAAAAABQgGAcgTALQAAgFgDgDg");
	this.shape_595.setTransform(-0.5,-44.6);

	this.shape_596 = new cjs.Shape();
	this.shape_596.graphics.f("#0E0A02").s().p("AlEDcIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAgAmcg+QgCgCAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgDgAGViLIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAgAlEjRIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_596.setTransform(-5,-16.6);

	this.shape_597 = new cjs.Shape();
	this.shape_597.graphics.f("#171003").s().p("AFtGuIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgADhAoIAAgKIgKAAIgKAAQgFAAgDgDQgCgCAAgFIAAgKIAKAAIAKAAQAAAFACADQADACAFAAIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAgAGpkNIAAgUIAAgKIAAgKQARADgCAbIAFAAQAAAFgDADQgHAHgKAFIAAgKgAClkXIg8AAIAAgKIA8AAIAKAAIAAAKIgKAAgAm4lLQgEgNAAgPQAFgFAGgDQAEgCAFAAIAAAKIAAAKIAAAKIgKAAIAAAKQgFAAgBgCgAGVmtIgUAAIgKAAIAAgKIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAg");
	this.shape_597.setTransform(-3,9.4);

	this.shape_598 = new cjs.Shape();
	this.shape_598.graphics.f("#52370B").s().p("AkDDwIAKAAIAKAAIAKAAQAAAFgCABQgKAEgGAAQgKAAgCgKgAD6jvIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_598.setTransform(12.5,-10.5839);

	this.shape_599 = new cjs.Shape();
	this.shape_599.graphics.f("#120C02").s().p("AjCIwIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAFFImIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAi4H+IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAkIHWQgFAAgBgCQgEgIAAgKIAKAAIAKAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAgADOEgQgGgDgFgFIAAgKIAKAAIAKAAIAAAKIAAAKQgFAAgEgCgAhAEiIgKAAQAAgFgCgBQgIgEgKAAIgKAAIAAgKIAAgKIAKAAQADARAZgLQACgBAAgFIAAgKIAAgKQAFAAACACQADADAAAFQAAAKAEAIQABACAFAAIAAAKIgKAAIAAAKIgKAAgADNiVIgUAAIAAgKQAFAAACgDQADgCAAgFIAKAAQAFAFADAGQACAEAAAFIgKAAgAkck1IAUAAIAKAAIAAAKIgKABIgJABQgMAAABgMgAGBkrIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAgAlsovIgeAAIAAgKIAeAAIAKAAIAAAKIgKAAg");
	this.shape_599.setTransform(2,-4.6);

	this.shape_600 = new cjs.Shape();
	this.shape_600.graphics.f("#372507").s().p("Al5HJQgCgCAAgFIAAgKQAFAAADACQACADAAAFIAAAKQgFAAgDgDgAEEmPIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFomtIAAgKIAKAAIAKAAIAAAKQAAAFgCABQgIAEgKAAIAAgKgAFKnBIAAgKIAKAAIAAAKQAAAFgCACQgDADgFAAIAAgKg");
	this.shape_600.setTransform(0.5,11.4);

	this.shape_601 = new cjs.Shape();
	this.shape_601.graphics.f("#4A310A").s().p("AC+HmIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgABQHmIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAgJHIIgUAAIAAgKIAUAAIAJAAIAAAKIgJAAgAGGD2IgKAAIAAgKIAKAAQAFAAADACQACADAAAFIgKAAgAEED2IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgACCC6IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgADmBqIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACWAuIgeAAIAAgKIAeAAIAKAAIAAAKIgKAAgAhFAuIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAmPhxIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAFKijIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAgCnXQgCgCgFAAIAAgKQAZgHgKAZQgBACgFAAQAAgFgCgDg");
	this.shape_601.setTransform(-5.5,-13.1681);

	this.shape_602 = new cjs.Shape();
	this.shape_602.graphics.f("#231805").s().p("AkoAgQgDgCAAgFIAAgKIAAgKQAFAFAGADQAEACAFAAQAAAFgCADQgDACgFAAIAAAKQgFAAgCgDgAEigYIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_602.setTransform(-0.5,-27.1);

	this.shape_603 = new cjs.Shape();
	this.shape_603.graphics.f("#4E330A").s().p("AmFGBIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkDBfIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAgJAFIgUAAIAAgJQAPAAAOAEQAAAAAAAFIgJAAgAF8h8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAE2l2IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_603.setTransform(-11.5,9.9);

	this.shape_604 = new cjs.Shape();
	this.shape_604.graphics.f("#5D3D0C").s().p("ACqIcIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAGkGGIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAmFCgIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkhB4IAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAmtAeIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgABGh3IAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAEimZIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAA8oRIAAgKQAQgBgKATQgBACgFAAIAAgKg");
	this.shape_604.setTransform(-8.5,12.3975);

	this.shape_605 = new cjs.Shape();
	this.shape_605.graphics.f("#100C02").s().p("AkRG2QgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAETmtIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_605.setTransform(-6,14.4);

	this.shape_606 = new cjs.Shape();
	this.shape_606.graphics.f("#140E02").s().p("AiaHRIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgACbnGIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_606.setTransform(10,16.9);

	this.shape_607 = new cjs.Shape();
	this.shape_607.graphics.f("#040200").s().p("AD/FeIAAgKQAFAAACACQADADAAAFQAAAFgDACQgCADgFAAIAAgKgAkSFeQAAgFgDgDQgCgCgFAAIAAgKIAAgeQAQgBgBAVIAFAAIAAAKIAAAKIAAAKIgKAAgAETEiQAAgFgDgCQgCgDgFAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIAAAKIgKAAgAgECqQAAgFgDgDQgCgCgFAAIAAgKIAAgKIAAgUQAPgBgBAVIAFAAIAAAKIAAAKIAAAKIgJAAgABWB2QgGgDgFgFQAFAAACgDQADgCAAgFQAFAAACADQADACAAAFIAAAKQgFAAgEgCgAheBkIAAgKIAAgKQAFAAACgCQADgDAAgFIAKAAIAKAAIAAAKQgFAAgEACQgGADgFAFIAAAKIgKAAgAB9AKIAAgKIAAgJQAKAAAIAEQACABAAAEIgKAAIAAAKIgKAAgAEJk/IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhAldIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_607.setTransform(-3,3.4);

	this.shape_608 = new cjs.Shape();
	this.shape_608.graphics.f("#68450E").s().p("AAAH5IgJAAIgKAAIgKAAIgKAAIgUAAIgKAAIgUAAIAAgKIAAgKIAKAAIAKAAQAAAFACADQADACAFAAIAeAAIAKAAIATAAIAKAAIAAAKIgKAAgAk1GpIgKAAIgKAAQgFAAgEgCQgGgDgFgFIgKAAIAAgKIAAgUIAAgKIAAgyIAKAAIAKAAQAAAFACADQADACAFAAIAKAAIAKAAQAAAFADADQACACAFAAIAAAKIAAAKIAAAKIAAAKIAAAeIAAAKIgKAAgAEOFtIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKQAAAFgDADQgCACgFAAIAAAKIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgAizFZIgUAAIgKAAIgKAAQgFAAAAgBQgEgPgVAGIgKAAQgFAAgDgCQgCgDAAgFIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAQAAAFACADQADACAFAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAAAKIgKAAIAAAKQgBAQATgKQACgBAAgFIAAgKIAKAAIAKAAIAAAKIAAAeIAAAKIAAAKIAAAKIgKAAgAFKD/IgKAAIgKAAIgKAAIgKAAIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKQAFgFAGgDQAEgCAFAAIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAIgKAAIAAAKIAAAKIgKAAIgKAAIAAAKIAAAKIgKAAIAAAKQgBARATgLQACgBAAgFQAKgFAHgIQADgCAAgFIAKAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAgAnOCTQgCgCgFAAIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAQAAAKAEAIQABACAFAAIABAKQAGAlgRANQAAgFgDgDgAFACRIgKAAIgKAAIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgUIAKAAIAKAAQAFgFAGgDQAEgCAFAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAQgFAAgEACQgGADgFAFIgKAAgAGkBzIgKAAIgKAAIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAAgKQAFAAACgCQADgDAAgFIAKAAQAFAAACgDQADgCAAgFIAKAAIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIgKAAgAmPBLIgKAAIgKAAQAAgFgCgDQgDgCgFAAIAAgKQAKAAAIgEQACgBAAgFIAAgKIAAgKIAAgKIAAgKIAAgJIAKAAIAKAAIAKAAIAKAAIAAAnIAAAKIAAAKIAAAKQgFAAgEACQgGADgFAFIgKAAgAGkAPIgKAAIAAgKIAAgJQARACgGgXIgBgJQARACgGgWIgBgKIAAgKIAKAAIAKAAQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKQAAAFgCACQgDADgFAAIAAAJIgKAAIgKAAIAAAKIgKAAgAkhAFIgKAAQgFAAgEgCQgGgDgFgEIgKAAQgFAAgDgDQgCgCAAgFIAAgKIAAgKIAAgKIAAgKIAAgKIAAgUIAKAAQAVgGAEAPQAAABAFAAIAKAAIAKAAIAAAKIAAAUIAAAKIAAAKIAAAKIAAAKIAAAJIgKAAgAl7gYIgKAAQAAgFgDgDQgCgCgFAAQgFAAgFgBQgKgEgKgFIAAgKIAAgUQAFAAABgCQALgTgRABIAAgKIAAgUIAKAAQAAAFACADQADACAFAAIAKAAQAKAFALADQAEACAFAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAEEj0IgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIhGAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgTAAIgKAAIgKAAIgKAAIgUAAIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAJAAIAKAAIAKAAIAKAAIAKAAIAeAAIAKAAQAPAAAOgFQABAAAAgFIAKAAIAKAAQAAAFADACQACADAFAAIAyAAIAKAAIAoAAIAKAAIAKAAIAKAAIAAAKIgKAAgAhZkwIgKAAIgKAAQAAgFgCgEQgDgGgFgFIAAgKIAAgKIAAgKQARgDgGgbIgBgKIAAgKIAAgKIAAgKIAAgKQAFAAACgDQADgCAAgFIAAgKIAAgKQATgLAGgcQAAgBAFAAIAAAKIAAAKQgHAgAPALQACACAAAFIAAAKQAAAFACACQADADAFAAIAAAKQAAAFADADQACACAFAAQAAAKAEAIQABACAFAAIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAg");
	this.shape_608.setTransform(-1.5,-5.1);

	this.shape_609 = new cjs.Shape();
	this.shape_609.graphics.f("#211704").s().p("AgEJEIgKAAIAAgKIAKAAIAJAAIAAAKIgJAAgAheJEIgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAHvk1IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAETlnIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAn4mtIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhboyQgDgCAAgFIAAgKQAFAAACACQADADAAAFIAAAKQgFAAgCgDg");
	this.shape_609.setTransform(-3,5.4);

	this.shape_610 = new cjs.Shape();
	this.shape_610.graphics.f("#60400D").s().p("ADhCbIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAjqiaIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_610.setTransform(0,-47.1);

	this.shape_611 = new cjs.Shape();
	this.shape_611.graphics.f("#221804").s().p("AGaBQIgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAgngdQAAgFgDgDQgCgCgFAAIAAgKQAFAAACgCQADgDAAgFIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIgKAAgAmYgzQgKgJgBgTIAKAAQAFAKADALQACAEAAAFQgFAAgEgCg");
	this.shape_611.setTransform(-10.5,-40.6);

	this.shape_612 = new cjs.Shape();
	this.shape_612.graphics.f("#64420D").s().p("AipFPIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAnBEnIAAgKIAAgKIAAg8IAKAAIAKAAIAAAKIgKAAIAAA8IAAAKIgKAAgAkXBfIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAE2jqIgUAAIgKAAIgKAAIgKAAIAAgKQAKAAAIgEQACgBAAgFIAUAAIAKAAIAKAAIAKAAQAFAAADgDQACgCAAgFIAKAAQAAAFACACQADADAFAAIAAAKIgKAAIgUAAIgKAAIAAAKIgKAAgAGkkIIgKAAIgKAAIgKAAIgKAAIAAgKIAUAAIAKAAIAKAAIAKAAIAAAKIgKAAgAHCkcIgKAAIAAgKQAKAAAIgEQACgBAAgFIAKAAIAKAAIAKAAIAAAKQgFAAgFABQgKAEgKAFIgKAAgAnBlEIgKAAIgKAAQAAgFgCgBQgIgEgKAAIAAgKIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAAAKIgKAAg");
	this.shape_612.setTransform(0.5,-7.1);

	this.shape_613 = new cjs.Shape();
	this.shape_613.graphics.f("#4D330A").s().p("ABGKUIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAC0KAIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAEOIIIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhZDmIAKAAIAKAAQAAAFgCABQgHAEgFAAQgHAAABgKgAmFAeIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAzgBQgGgDgFgFQAKAAAIAEQACABAAAEQgFAAgEgBgAALkjQgGgDgFgFIAKAAQAFAAACADQADACAAAFQgFAAgEgCgAF8k/IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAh3qJIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_613.setTransform(-13.5,0.4);

	this.shape_614 = new cjs.Shape();
	this.shape_614.graphics.f("#1A1304").s().p("AgOAFIAAgJIATAAIAKAAQAAAEgCABQgIAEgJAAIgKAAg");
	this.shape_614.setTransform(27,-32.1);

	this.shape_615 = new cjs.Shape();
	this.shape_615.graphics.f("#53390C").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_615.setTransform(29.5,-34.1);

	this.shape_616 = new cjs.Shape();
	this.shape_616.graphics.f("#2D1F06").s().p("AjbAKIAAgKIAAgJIAKAAIAAAJIAAAKQAAAFgCADQgDACgFAAIAAgKgADLgLQgDgDAAgFIAKAAIAKAAQAAAFgCADQgDACgFAAQgFAAgCgCg");
	this.shape_616.setTransform(12.5,-35.6);

	this.shape_617 = new cjs.Shape();
	this.shape_617.graphics.f("#060400").s().p("ABkIhIgeAAIAAgFQgVABABgQQAKAAAIgEQACgBAAgFQAKAKAKAFIAAgFIAKAAQAFAFADAGQACAEAAAFIgKAAgAjHGpIgKAAIAAgKIAKAAQAFAAACADQADACAAAFIgKAAgAldGLIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAipFFIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAlJEdIAAgKIAKAAIAKAAQAAAFgDADQgCACgFAAIgKAAgADmDNIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAheCRQABgVgQABIAAgKIAKAAIAKAAIAAAKIAAAKIAAAKgAiLBfIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAjvA3IAAgKIAAgKIAAgeIAKAAQAAAKAEAIQABACAFAAIAAAKIAAAKIgKAAIAAAKIgKAAgADTArQgGgDgFgFIAAgKIAAgUIAKAAQAAAFACADQADACAFAAIAAAUIAAAKQgFAAgEgCgAF8ikIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgACWjWIgoAAIAAgKIAUAAIAKAAIAKAAIAKAAIAAAKIgKAAgAGkjgIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAmjkSIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAjlkmIAAg8QAFAAACACQADADAAAFQAAAKAEAIQABACAFAAIAAAKIAAAKIAAAKQgFAAgEACQgGADgFAFIAAgKgAEOkwIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhZoWIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_617.setTransform(7.5,-9.1);

	this.shape_618 = new cjs.Shape();
	this.shape_618.graphics.f("#251905").s().p("AmIHZQgHgIgFgKQAVgGgBAQIAAAKQgFAAgDgCgAAZlYIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAgAGBnQIgKAAIAAgKIAKAAIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAg");
	this.shape_618.setTransform(-4,5.9);

	this.shape_619 = new cjs.Shape();
	this.shape_619.graphics.f("#241905").s().p("AikBVIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgACchCQgGgDgFgFIAAgKIAKAAIAKAAIAKAAQAAAFgCADQgDACgFAAIAAAKQgFAAgEgCg");
	this.shape_619.setTransform(20,-36.1);

	this.shape_620 = new cjs.Shape();
	this.shape_620.graphics.f("#0F0A01").s().p("ABQJnIgeAAIAAgKIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAgAkMFDQgGgDgFgFIAAgKIAKAAIAKAAIAAAKIAAAKQgFAAgEgCgAkNDXIgKAAQAAgFACgBQAPgHgRgRIAKAAIAKAAIAAAKIAAAKIAAAKIgKAAgABkjMIgUAAIgKAAIgUAAIgKAAIg7AAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAgKIAKAAIAKAAIAUAAIAKAAIAUAAIAKAAIAUAAIAKAAIA7AAIAKAAIAUAAIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAgAEOnGIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAilpUQgEgIAAgKIAKAAQAFAAACACQADADAAAFIgKAAIAAAKQgFAAgBgCg");
	this.shape_620.setTransform(9.5,0.9);

	this.shape_621 = new cjs.Shape();
	this.shape_621.graphics.f("#56390B").s().p("AAPH+IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAGzGQIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABzF8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgADDDwIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAD1hPIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAm4hRQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAmUiLIAAgKIAAgyIAKAAIAAAyIAAAKIgKAAgAGfnLIAAgKIAAgoIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAg");
	this.shape_621.setTransform(-7,1.4);

	this.shape_622 = new cjs.Shape();
	this.shape_622.graphics.f("#0C0801").s().p("AmJHyQgGgDgFgFQAFAAADgCQACgDAAgFIAKAAIAAAKIAAAKQgFAAgEgCgABBA8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAGBhjQAAgFgCgEQgDgGgFgFQAVAGAEgPQAAgBAFAAIAAAKIAAAKIgKAAIAAAKIgKAAgAEnkXIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAgAE7lnIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAlilxIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAFPnfIgKAAIAAgKQAFAAADgDQACgCAAgFQAFAFADAGQACAEAAAFIgKAAg");
	this.shape_622.setTransform(2,-1.6);

	this.shape_623 = new cjs.Shape();
	this.shape_623.graphics.f("#1B1303").s().p("AlTCRQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAE2A3IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAFSh7QgDgGgFgFQAFAAADgCQACgDAAgFQAFAFADAGQACAEAAAFQAAAFgCACQgDADgFAAQAAgFgCgEg");
	this.shape_623.setTransform(0.5,-39.1);

	this.shape_624 = new cjs.Shape();
	this.shape_624.graphics.f("#2B1E06").s().p("AjCBuIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAg2AoIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAC8hlQgDgDAAgFIAKAAIAKAAQAAAFgCADQgDACgFAAQgFAAgCgCg");
	this.shape_624.setTransform(14,-42.6);

	this.shape_625 = new cjs.Shape();
	this.shape_625.graphics.f("#191204").s().p("AAAAFQgEAAgCgCQgDgDAAgEIAJAAQAFAAACACQADACAAAFIgKAAg");
	this.shape_625.setTransform(32.5,-55.1);

	this.shape_626 = new cjs.Shape();
	this.shape_626.graphics.f("#0A0700").s().p("AAKAtIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAgJgiIgKAAIAAgKIAKAAQAFAAADACQABADAAAFIgJAAg");
	this.shape_626.setTransform(34.5,-50.1);

	this.shape_627 = new cjs.Shape();
	this.shape_627.graphics.f("#030200").s().p("AB9IrIgoAAQAAgFgBAAQgdgFgeAAIAAAKIgKAAIgnAAIAAgKQAPAAANgFQABAAAAgFIBaAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAAAKIgKAAgADDIhQAAgFgCgEQgDgGgFgFIAKAAIAKAAIAAAKIAAAKIgKAAgAFjH5IAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIgKAAgABMF/QgGgDgFgFIAAgKIAAgKIAKAAQAAAFADADQACACAFAAIAAAKIAAAKQgFAAgEgCgAghF1QgGgDgFgFQAAgFgDgDQgCgCgFAAIAAgKQAFAAACgDQADgCAAgFIAAgKIAKAAQAAAKAEAIQABACAFAAIAAAKIAAAKIAAAKQgFAAgEgCgADDFjIgKAAQAAgFgCgBQgIgEgKAAIgKAAIAAgKQAFAAACgDQADgCAAgFQAFAFAGADQAEACAFAAIAKAAIAKAAIAAAKIAAAKIgKAAgAmKETIgKAAIAAgKQAFAAACgDQADgCAAgFQAFgFADgGQACgEAAgFIAAgKIAKAAIAAAKIAAAUIAAAKIgKAAIAAAKIgKAAgAm8DrIgKAAIAAgKIAAgKIAAhGIAAgKIAKAAQAAAtAFAsIAFABIAAAKIgKAAgAC5DhIgKAAIAAgKIAAgKIAAgKIAKAAIAKAAIAAAUIAAAKIgKAAgAiYCYQgCgCAAgFIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKQgFAAgDgDgABVBzIAAgKQAFAAADACQACADAAAFQAAAFgCADQgDACgFAAIAAgKgAnkBpIAAgKIAKAAIAAAKQAAAFgDADQgCACgFAAIAAgKgAkIBpIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAm8AZIAAgKIAAg7IAKAAQAAAUAFATQAAABAFAAIAKAAIAAAJIgKAAIgKAAIAAAKIAAAKIgKAAgABfAPIAAgKIAAgJQAFAAADACQACACAAAFIAAAKIgKAAgADNgYIABgKQAFgVgQABIAAgKQAAgFgCgEQgDgGgFgFIAUAAIAKAAIAAAKIAAAKIAAAeIAAAKIgKAAgABpg2QAAgFgCgDQgDgCgFAAIgKAAIgUAAIAAgKIAKAAIAeAAIAKAAIAAAKIAAAKIgKAAgAFtheIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAm8iGIAAgKIAAgeIAKAAIAAAKIAAAUIAAAKIgKAAgAn4ikIAAgKIAAgeIAKAAIAAAKIAAAUIAAAKIgKAAgAHvj0QAAgFgDgDQgCgCgFAAIAAgKIAAgKIAKAAQAAAFADADQACACAFAAIAAAKIAAAKIgKAAgAF3m8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFFogQgFAAgCgDQgDgCAAgFIAKAAIAKAAIAAAKIgKAAg");
	this.shape_627.setTransform(-1,-1.1);

	this.shape_628 = new cjs.Shape();
	this.shape_628.graphics.f("#070501").s().p("AETHMIAAgKQAAgFgCgEQgDgGgFgFIAKAAQAFAFADAGQACAEAAAFIAAAKIgKAAgAEnGaIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAFFFUIgKAAIAAgKIAAgKIAKAAQAFAFADAGQACAEAAAFIgKAAgAmyBGIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAGpAeIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAEThPIgKAAQAAgFgCgEQgDgGgFgFIAKAAIAKAAQAFAFADAGQACAEAAAFIgKAAgAETnLIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_628.setTransform(3,-12.6);

	this.shape_629 = new cjs.Shape();
	this.shape_629.graphics.f("#141606").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgDADQgCACgFAAIgJAAg");
	this.shape_629.setTransform(31.5,-61.1);

	this.shape_630 = new cjs.Shape();
	this.shape_630.graphics.f("#4E4111").s().p("AABAIQgFgDgFgFQAFAAACgBQACgDAAgFQAFAAACACQADADAAAEIAAAKQgFAAgEgCg");
	this.shape_630.setTransform(32.5,-60.6);

	this.shape_631 = new cjs.Shape();
	this.shape_631.graphics.f("#161405").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgIAEgJAAIAAgJg");
	this.shape_631.setTransform(34.5,-60.1);

	this.shape_632 = new cjs.Shape();
	this.shape_632.graphics.f("#090701").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_632.setTransform(37.5,-56.1);

	this.shape_633 = new cjs.Shape();
	this.shape_633.graphics.f("#0F0A02").s().p("AkcI/IgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAlYHRIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAlYGLIgKAAIAAgKIAAgKIAKAAQAAAFADADQACACAFAAIAAAKIgKAAgAE7FZIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAhyE7IAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAlLA0QgDgCAAgFIAKAAIAKAAQAAAFgCACQgDADgFAAQgFAAgCgDgABzAjIgKAAQAAgFgCgDQgDgCgFAAIAAgKIAKAAIAKAAQAFAFADAGQACAEAAAFIgKAAgAmUhUIAAgKIAAgKIgKAAIAAAKIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAKAAIAAAKIAAAKIgKAAgAmAh8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAmUi4IAAgFQgVABABgQQAFAAADgDQACgCAAgFQAFAFAGADQAEACAFAAIAKAAQAAAFgCACQgDADgFAAIAAAKIgKAAgAjqlEIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAhqoeQgDgCgFAAIAAgKQAWAHADgQQAAgBAFAAIAAAKIAAAKQgFAAgEACQgGADgFAFQAAgFgCgDgAGfo0IgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_633.setTransform(-7.0023,-0.1);

	this.shape_634 = new cjs.Shape();
	this.shape_634.graphics.f("#332307").s().p("AgYBzIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABBAjIAAgKIAKAAIAKAAQAAAFgCADQgDACgFAAIgKAAgAhShhQgCgCAAgFIAAgKQAFAAADADQACACAAAFIAAAKQgFAAgDgDg");
	this.shape_634.setTransform(44,-46.1);

	this.shape_635 = new cjs.Shape();
	this.shape_635.graphics.f("#191606").s().p("AgJgEIAJAAIAKAAQAAAEgCABQgHAEgEAAQgHAAABgJg");
	this.shape_635.setTransform(37.4975,-59.0958);

	this.shape_636 = new cjs.Shape();
	this.shape_636.graphics.f("#3C2807").s().p("AgJAKIAAgKIAAgJIAJAAIAKAAIAAAJIgKAAIAAAKIgJAAg");
	this.shape_636.setTransform(21.5,-60.6);

	this.shape_637 = new cjs.Shape();
	this.shape_637.graphics.f("#2B1D06").s().p("AFZIXIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAQAAAFgCABQgRAEgLAKIAAgKgABfHRIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAl+h+QgCgDAAgFIAAgKIAAgKQAFAAACACQADADAAAFIAAAKIAAAKQgFAAgDgCgAF3oMIgKAAIgKAAQgFAAgCgDQgDgCAAgFIAKAAQAKAAAIgEQACgBAAgFQAFAAACADQADACAAAFIAAAKIgKAAg");
	this.shape_637.setTransform(-5,-4.1);

	this.shape_638 = new cjs.Shape();
	this.shape_638.graphics.f("#1E1404").s().p("AjqI1IgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgACRBBQAAgFgCgDQgDgCgFAAIgKAAIgKAAIAAgKIAKAAIAUAAIAKAAQAFAAACACQADADAAAFIgKAAIAAAKIgKAAgADroiQgKgDgKgFIAAgKQATABAJALQACADAAAFQgFAAgFgCg");
	this.shape_638.setTransform(5,-3.1);

	this.shape_639 = new cjs.Shape();
	this.shape_639.graphics.f("#110C02").s().p("AgdJnIgoAAIAAgKIAKAAIAeAAIAKAAIAAAKIgKAAgAlTlEIgKAAIgKAAQAAgFgCgBQgIgEgKAAIAAgKIAAgKQAUAPAdAKQABAAAAAFIgKAAgAmBlkQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAifmKIgKAAIAAgKIAAgKQAQABgBgVIAFAAQAAAFACACQADADAFAAQAAAFgCACQgDADgFAAIAAAKIAAAKIgKAAgAlSmWQgGgDgFgFQAKAAAIAEQACABAAAFQgFAAgEgCgAjbm8IAAgKIAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKQAAAFgCADQgDACgFAAIAAgKgAF8pcIgeAAIAAgKIAKAAIAUAAIAKAAIAAAKIgKAAg");
	this.shape_639.setTransform(-13.5,0.9);

	this.shape_640 = new cjs.Shape();
	this.shape_640.graphics.f("#332207").s().p("ACvISIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAGVg7IAAgKIAAgKIAKAAIAAAKIAAAKQAAAFgCACQgDADgFAAIAAgKgAgEhtIgKAAIAAgKIAKAAIAJAAIAAAKIgJAAgAh8h3IgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAmckPQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgAhmkZQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgADjoAQgCgCAAgFIAAgKQAFAAADACQACADAAAFIAAAKQgFAAgDgDg");
	this.shape_640.setTransform(3,-7.6);

	this.shape_641 = new cjs.Shape();
	this.shape_641.graphics.f("#402D0A").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_641.setTransform(29.5,-61.1);

	this.shape_642 = new cjs.Shape();
	this.shape_642.graphics.f("#465E21").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_642.setTransform(29.5,-62.1);

	this.shape_643 = new cjs.Shape();
	this.shape_643.graphics.f("#0B0B03").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_643.setTransform(27.5,-62.1);

	this.shape_644 = new cjs.Shape();
	this.shape_644.graphics.f("#392A09").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_644.setTransform(25.5,-62.1);

	this.shape_645 = new cjs.Shape();
	this.shape_645.graphics.f("#4C6825").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_645.setTransform(25.5,-63.1);

	this.shape_646 = new cjs.Shape();
	this.shape_646.graphics.f("#0C0B03").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_646.setTransform(22.5,-63.1);

	this.shape_647 = new cjs.Shape();
	this.shape_647.graphics.f("#090600").s().p("AFKH0IgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAGaCgIgKAAIAAgKIAAgKIAKAAQAAAFADACQACADAFAAIAAAKIgKAAgAmZjHIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAlcnXQgGgDgFgFIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIAAAKQgFAAgEgCgAB4nfIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_647.setTransform(0.5,-7.6);

	this.shape_648 = new cjs.Shape();
	this.shape_648.graphics.f("#2E2006").s().p("AjVBxQgGgDgFgFIAAgKIAKAAIAKAAIAAAKIAAAKQgFAAgEgCgACfgGQgEgIAAgKQAFAFADAGQACAEAAAFQgFAAgBgCgAj+giIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgADXhUIAAgKIAAgKIAKAAIAAAKIAAAKQAAAFgCADQgDACgFAAIAAgKgAD1heIAAgKIAAgKIAKAAIAAAKIAAAKQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_648.setTransform(-11,-47.1);

	this.shape_649 = new cjs.Shape();
	this.shape_649.graphics.f("#0D0901").s().p("AEdImIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAl1H8QgGgDgFgFQAFAAACgCQADgDAAgFIAKAAIAAAKIAAAKQgFAAgEgCgAiGkDIgUAAIAAgKIAUAAIAKAAIAAAKIgKAAgAhokrQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAF3l7IgKAAIAAgKIAAgKQAFAFAGADQAEACAFAAIAAAKIgKAAgAjsmrQgDgCgFAAIAAgKIAKAAIAKAAQAAAFgCAEQgDAGgFAFQAAgFgCgDgAClobIAAgKIAKAAIAKAAIAAAKQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_649.setTransform(-2,-3.6);

	this.shape_650 = new cjs.Shape();
	this.shape_650.graphics.f("#1A1203").s().p("AifCHIgoAAIAAgKIAeAAIAKAAIAKAAIAAAKIgKAAgAhyheQACgVgRABIgKAAIgKAAIAAgKIAAgKIAoAJIAKABQAAAFgDACQgCADgFAAIAAAKIAAAKgAC0hyIAAgKIAKAAIAKAAIAAAKQAAAFgCABQgIAEgKAAIAAgKg");
	this.shape_650.setTransform(-1.5,-47.1);

	this.shape_651 = new cjs.Shape();
	this.shape_651.graphics.f("#0C0901").s().p("AgiA8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAliA8IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFZgdIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAg2gxIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_651.setTransform(-17,-57.6);

	this.shape_652 = new cjs.Shape();
	this.shape_652.graphics.f("#040300").s().p("AiqHRIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAC9ETIgKAAIAAgKIAAgKIAKAAQAAAFACACQADADAFAAIAAAKIgKAAgADRDhQAAgFgCgEQgDgGgFgFIAAgKIAAgUIAAgKIAKAAQAAAKAEAIQABACAFAAIAAAKIAAAKIAAAKIAAAKIgKAAgAD5ClIgKAAQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAQAFAFADAGQACAEAAAFIgKAAgAgKCRIAAgKIAAgKIAKAAQAAAKADAIQABACAFAAQAAAFgCABQgHAEgEAAQgHAAABgKgAB5CZQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgAGjBVIAAgKIAAgKIAAgKIAAgKIAKAAIAAAKIABAJQAFAVgOAAIgCAAgAmuAtIAAgKIAAgKIAAgKIAKAAIAAAUIAAAKIgKAAgAj6AjQAAgFgDgCQgCgDgFAAIAAgKQAFAAACgDQADgCAAgFIAKAAQAFAFADAGQACAEAAAFIgKAAIAAAKIgKAAgADRnGIAAgKIAKAAIAKAAIAAAKQgFAAgEACQgGADgFAFIAAgKg");
	this.shape_652.setTransform(-2.3812,-14.1);

	this.shape_653 = new cjs.Shape();
	this.shape_653.graphics.f("#493009").s().p("AgJI6IgKAAIAAgKIAKAAIAJAAIAAAKIgJAAgAhFIIIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAlJCWIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAFAj5IAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAEEovIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_653.setTransform(-6.5,-4.6);

	this.shape_654 = new cjs.Shape();
	this.shape_654.graphics.f("#422C09").s().p("AAZIIIAKAAIAKAAIAKAAQAAAFgBAAQgOAFgPAAIAAgKgACHGaIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAgAgEFUIgKAAIAAgKIAKAAIAJAAIAAAKIgJAAgAiaEOIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAgyn1QgEgNAAgPIAKAAIAAAUIAAAKQgFAAgBgCg");
	this.shape_654.setTransform(12,1.4);

	this.shape_655 = new cjs.Shape();
	this.shape_655.graphics.f("#0B0701").s().p("Ag2JOIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAEdHgIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAFPHMIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAiGGkQAAgFgCgDQgDgCgFAAIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAFZGGIgKAAIAAgKIAAgKIAKAAQAAAFADACQACADAFAAIAAAKIgKAAgAAJEgQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAiuEEIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAmUDSIAAgKIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAIAAAKIgKAAgABBDIIgKAAIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIgKAAgADhCMIgKAAIAAgKIAAgKQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIAAAKIgKAAgAGNAwQgCgDAAgFIAAgKIAKAAIAAAKIAAAKQgFAAgDgCgAm8gdIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAhkgzQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAG0hbQgGgDgFgFIAAgKIAAgUIAKAAQAAAKAEAIQABACAFAAIAAAKIAAAKQgFAAgEgCgAGzkNIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAkwkrQgFAAgDgCQgCgDAAgFQAFAAADgCQACgDAAgFIAKAAIAAAKIAAAKIgKAAgAhRl0QgDgCAAgFIAAgKQAFAAACACQADADAAAFIAAAKQgFAAgCgDgABzovQAAgFgDgDQgCgCgFAAIAAgKQAFgFAGgDQAEgCAFAAIAAAKIAAAKIAAAKIgKAAg");
	this.shape_655.setTransform(-5,4.4);

	this.shape_656 = new cjs.Shape();
	this.shape_656.graphics.f("#322508").s().p("AgEAAIAAgJQAEAAADACQACADAAAEQAAAFgCADQgDACgEAAIAAgKg");
	this.shape_656.setTransform(8,-53.6);

	this.shape_657 = new cjs.Shape();
	this.shape_657.graphics.f("#080601").s().p("ABpIrIgKAAIgoAAIAAgKQAeAAAdAFQABAAAAAFIgKAAgAGLFFIgKAAIAAgKIAAgKIAKAAQAFAFADAGQACAEAAAFIgKAAgAmKCbQAAgFgCgEQgDgGgFgFIAKAAIAKAAIAAAKIAAAKIgKAAgAkSBfIAAgKQAFAAACgDQADgCAAgFIAKAAQAAAFgCAEQgDAGgFAFIgKAAgABpkwIAKAAIAKAAIAKAAQAAAFgBAAQgOAFgPAAIAAgKgAjWnQIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIgKAAgACHoWIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAg");
	this.shape_657.setTransform(-4,-1.1);

	this.shape_658 = new cjs.Shape();
	this.shape_658.graphics.f("#1F1504").s().p("AA8IrIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAkXhUQAAgFgCgBQgIgEgKAAIAAgKQAFAAACgDQADgCAAgFIAKAAQAAAFACACQADADAFAAIAAAKIAAAKIgKAAgAEinQIgKAAIAAgKIAAgKIAKAAQAFAFADAGQACAEAAAFIgKAAgAAIoUQgDgCgFAAIAAgKQAFgFAGgDQAEgCAFAAIAAAKIAAAKQAAAFgCADQgDACgFAAQAAgFgCgDg");
	this.shape_658.setTransform(7.5,-1.1);

	this.shape_659 = new cjs.Shape();
	this.shape_659.graphics.f("#221805").s().p("Ag7DSIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAA8jHIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_659.setTransform(3.5,-41.6);

	this.shape_660 = new cjs.Shape();
	this.shape_660.graphics.f("#352407").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_660.setTransform(8,-62.6);

	this.shape_661 = new cjs.Shape();
	this.shape_661.graphics.f("#221704").s().p("ABLJ7IgKAAIAAgKIAKAAQAFAAACACQADADAAAFIgKAAgAE7GLIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAkuhrQgCgCAAgFQAAgFgCgEQgDgGgFgFQAVgGAEAPQAAABAFAAQAAAFgDACQgCADgFAAIAAAKQgFAAgDgDgADXjCIAAgKIAAgKQAFAAADgDQACgCAAgFIAKAAQAFAFADAGQACAEAAAFIgKAAIgKAAIAAAKIgKAAgAEJjMQAAgFgCgEQgDgGgFgFQAKAAAIgEQACgBAAgFIAKAAQAFAFADAGQACAEAAAFQgFAAAAABQgCALgMAAQgFAAgGgCgAk6jgQAAgFgCgCQgDgDgFAAIAAgKIAAgKQAKAAAIAEQACABAAAFIAAAKIAAAKIgKAAgAAPpwIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_661.setTransform(5,-0.1);

	this.shape_662 = new cjs.Shape();
	this.shape_662.graphics.f("#181606").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_662.setTransform(7.5,-65.1);

	this.shape_663 = new cjs.Shape();
	this.shape_663.graphics.f("#638A30").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_663.setTransform(7.5,-66.1);

	this.shape_664 = new cjs.Shape();
	this.shape_664.graphics.f("#55380B").s().p("AmAHCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAAPGuIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAF3EOIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAF3CCIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgABfAAIgUAAIAAgJIAUAAIAKAAIAAAJIgKAAgAh8hPIAKAAIAKAAIAKAAIAAAKIgJABIgKABQgMAAABgMgAj+iLIgeAAIAAgKIAeAAIAKAAIAAAKIgKAAgAjgkDIAAgKIAKAAIAAAKQAAAFgDADQgCACgFAAIAAgKgAhymtIgKAAIgKAAIAAgKIAUAAIAKAAIAAAKIgKAAgAhKm3QgFAAgDgDQgCgCAAgFIAKAAIAKAAIAAAKIgKAAg");
	this.shape_664.setTransform(7,-20.6);

	this.shape_665 = new cjs.Shape();
	this.shape_665.graphics.f("#2C2308").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_665.setTransform(5.5,-65.1);

	this.shape_666 = new cjs.Shape();
	this.shape_666.graphics.f("#583B0C").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_666.setTransform(4.5,-62.1);

	this.shape_667 = new cjs.Shape();
	this.shape_667.graphics.f("#130E03").s().p("ADhCqIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAjgifIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_667.setTransform(27,-46.6);

	this.shape_668 = new cjs.Shape();
	this.shape_668.graphics.f("#090601").s().p("ABQJ7IgeAAIgKAAIAAgKIAeAAIAKAAIAKAAIAAAKIgKAAgAkrJdIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAkgGTQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAiBFjIAAgKIAAgKQAFAFAGADQAEACAFAAQAAAFgCADQgIAHgKAFIAAgKgAgxDhQgFAAgBgCQgEgIAAgKIAKAAIAAAKIAAAKIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgABGB9IgKAAQgFAAgDgDQgCgCAAgFQAFAAADgCQACgDAAgFIAKAAQAAAFACADQADACAFAAIAAAKIgKAAgAlxBLIAAgKIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAgAGaAFIAAgJIAAgKIAKAAIAAAKIAAAJIgKAAgAD6heIgKAAQgFAAgDgCQgCgDAAgFIAKAAIAKAAIAKAAIAAAKIgKAAgAmFiQIgKAAIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIgKAAgAFAjWQAAgFgCgEQgDgGgFgFIAKAAIAKAAIAAAKIAAAKIgKAAgAkNjgIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAmYkKQgGgDgFgFQAFAAACgCQADgDAAgFIAKAAIAAAKIAAAKQgFAAgEgCgAhZkcIgeAAIAAgKIAKAAIAUAAIAKAAIAAAKIgKAAgAEilYIgKAAIAAgKQARACgCgWIAFAAQAAAFADADQACACAFAAIAAAKIgKAAIAAAKIgKAAgAlxmeIgKAAIAAgKQAFAAADgCQACgDAAgFIAKAAIAAAKIAAAKIgKAAgAAApwIgJAAIAAgKIAJAAIAKAAIAAAKIgKAAg");
	this.shape_668.setTransform(2.5,-0.1);

	this.shape_669 = new cjs.Shape();
	this.shape_669.graphics.f("#010100").s().p("AEJGLIAAgKIAKAAIAKAAQAAAFgDACQgHAIgKAFIAAgKgADNFjIAAgKIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAgAkcDhIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAgimKIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_669.setTransform(4,-23.1);

	this.shape_670 = new cjs.Shape();
	this.shape_670.graphics.f("#2D3A13").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_670.setTransform(-0.5,-66.1);

	this.shape_671 = new cjs.Shape();
	this.shape_671.graphics.f("#483009").s().p("AC+HqIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAjHGkIAAgKIAKAAQAAAFgCAEQgDAGgFAFIAAgKgAC0nBIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgACCnfIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_671.setTransform(-11.5,-16.6);

	this.shape_672 = new cjs.Shape();
	this.shape_672.graphics.f("#3D521C").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_672.setTransform(1.5,-66.1);

	this.shape_673 = new cjs.Shape();
	this.shape_673.graphics.f("#56792A").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_673.setTransform(5.5,-66.1);

	this.shape_674 = new cjs.Shape();
	this.shape_674.graphics.f("#3A2909").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_674.setTransform(3.5,-65.1);

	this.shape_675 = new cjs.Shape();
	this.shape_675.graphics.f("#4A6824").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_675.setTransform(3.5,-66.1);

	this.shape_676 = new cjs.Shape();
	this.shape_676.graphics.f("#3A2908").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_676.setTransform(20.5,-63.1);

	this.shape_677 = new cjs.Shape();
	this.shape_677.graphics.f("#6B470F").s().p("AGLG4IAAgKIAAgKIAAgKIAAgKIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAm8GaIAAgKIAAg8IAKAAIAAAKIAAAKIAAAeIAAAKIAAAKIgKAAgAA3EsIgKAAIgeAAIgKAAIgJAAIgKAAIgKAAIAAgKIAAgeIAAgKIAAgKIAAgKIAAgKIAUAAIAJAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgACbC+IgKAAIgKAAIgKAAIgKAAQgRgDAHgbIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAUAAIAKAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAF3iLIgKAAIgKAAQgFAAgDgDQgCgCAAgFIAUAAIAKAAIAKAAIAAAKIgKAAgAGzifIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAgAmKizIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgADNmtIgKAAIgKAAIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAQAAAFgDADQgCACgFAAIgKAAg");
	this.shape_677.setTransform(1,-18.6);

	this.shape_678 = new cjs.Shape();
	this.shape_678.graphics.f("#4B6824").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_678.setTransform(20.5,-64.1);

	this.shape_679 = new cjs.Shape();
	this.shape_679.graphics.f("#4C3C0E").s().p("AAAAKIgJAAIAAgKQAFAAADgBQABgDAAgFIAKAAIAAAJIAAAKIgKAAg");
	this.shape_679.setTransform(18.5,-63.6);

	this.shape_680 = new cjs.Shape();
	this.shape_680.graphics.f("#392608").s().p("Ak1IrQgFAAgDgDQgCgCAAgFIAKAAQAFAAADACQACADAAAFIgKAAgABuBpIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgABGgYIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAE3oYQgGgDgFgFQAFAAACgCQADgDAAgFQAFAAADACQACADAAAFIAAAKQgFAAgEgCg");
	this.shape_680.setTransform(-15.5,-7.1);

	this.shape_681 = new cjs.Shape();
	this.shape_681.graphics.f("#0F1004").s().p("AgEAFIgKAAIAAgJIATAAIAKAAQAAAEgCADQgDACgFAAIgJAAg");
	this.shape_681.setTransform(17,-64.1);

	this.shape_682 = new cjs.Shape();
	this.shape_682.graphics.f("#080802").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_682.setTransform(9.5,-65.1);

	this.shape_683 = new cjs.Shape();
	this.shape_683.graphics.f("#517228").s().p("AAAAFIgJAAIAAgJQAJAAAIAEQACAAAAAFIgKAAg");
	this.shape_683.setTransform(14.5,-65.1);

	this.shape_684 = new cjs.Shape();
	this.shape_684.graphics.f("#312508").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_684.setTransform(14.5,-64.1);

	this.shape_685 = new cjs.Shape();
	this.shape_685.graphics.f("#4A3009").s().p("AAAAFIgJAAIAAgJIAJAAIAKAAIAAAJIgKAAg");
	this.shape_685.setTransform(9.5,-63.1);

	this.shape_686 = new cjs.Shape();
	this.shape_686.graphics.f("#050400").s().p("Aj0IXIAAgKIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAgAg2E7IAAgKIAAgKIAKAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAgADroMIgUAAIAAgKIAKAAIAKAAIAKAAIAAAKIgKAAg");
	this.shape_686.setTransform(-11,-9.1);

	this.shape_687 = new cjs.Shape();
	this.shape_687.graphics.f("#6A460E").s().p("ABpJ7IgeAAIgKAAIgUAAIgKAAIgxAAIgKAAIgKAAIgKAAIgKAAIgKAAIgUAAQAAgFgBgBQgOgEgPAAIgKAAIgKAAIgKAAIgKAAIgeAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAQAAgFgCgDQgDgCgFAAQgFAAAAgBQgDgPgWAGQAAgFgCgBQgIgEgKAAIAAgKQABgQgVAGQAAgFgBgEQgEgLgFgKQAAgFgCgDQgDgCgFAAIAAgKIAAgUIAAgKIAKAAIAKAAQAAAFACADQADACAFAAQAFAKAIAIQACACAFAAIAKAAQAFAFAGADQAEACAFAAQAFAFAGADQAEACAFAAQAAAFACACQADADAFAAIAKAAIAKAAQAAAFADACQACADAFAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAUAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAnAAIAKAAQANARAkgLQABgBAAgFIAKAAIAoAAIAKAAIAKAAIAKAAQAPAAAOgFQABAAAAgFIAKAAIAKAAQAVAGAEgPQAAgBAFAAIAKAAIAKAAQAFAAADgDQACgCAAgFIAKAAIAKAAQAFAAADgDQACgCAAgFIAKAAQALgKARgEQACgBAAgFIAKAAIAKAAIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKQgFAAgEACQgGADgFAFIgKAAIAAAKIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgABfIXIhaAAIgJAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgUAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAQgFAAgEgCQgGgDgFgFIgKAAIgKAAQAAgFgDgDQgCgCgFAAIgKAAQgFAAgEgCQgGgDgFgFIgKAAQAAgFgCgDQgDgCgFAAIgKAAQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAUAAIAKAAIAKAAQgBAQAVgFIAKgBIAKAAIAKAAIAyAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAdAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAQAoAAAogFIAAgFIAeAAIAKAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAIAAAKIAAAKQAAAFgCADQgDACgFAAQgFAAgEACQgGADgFAFIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgUAAIAAAKIgKAAgAB9G9IgoAAIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAQAAAKAEAIQABACAFAAIAAAKIAAAKIAAAKIAAAKQAAAFgCABQgIAEgKAAIgKAAgAAtG9IgeAAIgKAAIgdAAIAAgKIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAUAAIAJAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAD/GzIAAgKIAAgKIAAgUQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAKAAIAKAAIAKAAQAFAFADAGQACAEAAAFIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAgAhAGzIgKAAIgKAAIgUAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAQAAAKAEAIQABACAFAAQAKgFAIgHQACgDAAgFIAKAAIAKAAIAAAeIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAjCGfIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAAAKIAAAKIAAAKIAAAKQgBAQATgKQACgBAAgFIAAgKQAFgFADgGQACgEAAgFIAKAAQAFAFAGADQAEACAFAAIAKAAIAAAUIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAmUFjIgKAAIAAgKIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAAAUIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgACRFPIgyAAIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAUAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAUIAAAKIAAAKQAAAFgDACQgCADgFAAIgKAAgAA3FPIgUAAIgKAAIgKAAIgKAAIgJAAIgKAAIAAgKIAAgeIAAgKIAAgKIAAgKIAAgKIATAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAAAFADADQACACAFAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgADrFFIgKAAIgKAAIgKAAIgKAAIAAgKIAAgKIAAgKIAAgeIAAgKIAKAAIAKAAQAFAAACADQADACAAAFIgKAAIAAAKIgKAAQgHAaAZgKQACgBAAgFQAFAAACgCQADgDAAgFIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAg2FFIgUAAIgKAAIgKAAIgUAAQAAgFgCAAQgNgFgPAAIgKAAIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAAAUIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAFjExQgFAAgCgCQgDgDAAgFIAAgKQAQACgFgWIgBgKIAAgKIAAgKIAAgKIAKAAIAKAAIAKAAQAFAFADAGQACAEAAAFIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIgKAAIAAAKIgKAAgAk6ETIgKAAIgKAAQAAgFgCgDQgDgCgFAAQgFAAgDgDQgCgCAAgFIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAAAFADADQACACAFAAIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAnQETIAAgKIAAgUIAKAAIAAAUIAAAKIgKAAgACbDrIgKAAIgKAAIgeAAIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAgABBDrIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgJAAIgKAAIAAgKIAAgKIAAgKQAPABgEgVIgBgKIAAgKIAAgKIATAAIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAD1DhIgKAAIgKAAIgKAAIgUAAIAAgKIAAgUIAAgKQAQABgFgVIgBgKIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIABAKQAFAUgOAAIgCAAgAg2DhIgKAAIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAAgKQAKAAAIAEQACABAAAFQADARAZgLQACgBAAgFIAKAAIAUAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAUIAAAKIgKAAIAAAUIAAAKIgKAAgAi4DNIgKAAIgUAAQAAgFgDgDQgCgCgFAAIgKAAIgKAAQgFAAgEgCQgGgDgFgFIAAgKIAAgeIAAgKIAAgKIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAAAUIAAAKIAAAUIAAAKIAAAKIAAAKIgKAAgAClB9IgKAAIgKAAIgKAAIgUAAIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAUIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAD/BzIgKAAIgKAAIgKAAIgKAAIgKAAIAAgKIAAgKIAAgKIAAgKQAQABgFgWIgBgJIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAgsBzIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAQAAgFgBgBQgOgEgPAAIAAgKIAAgUIAAgKIAAgKIAAgKIAAgUIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKIgKAAgAi4BpQAAgFgCgBQgIgEgKAAIgKAAQgFAAAAgBQgEgPgVAGIgKAAIgKAAIAAgKIAAgeQAFgFADgGQACgEAAgFIAAgKIAAgKIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKQAAAFgCADQgDACgFAAIgKAAgABVAZIgUAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAIgKAAIAAgKIAAgTIAAgKIAAgKIAAgKIAAgeQAAgFgBgBQgNgEgPAAIAAAKIAAAUIAAAKIAAAKIAAAKIAAAKIAAAKIAAAJIAAAKIgKAAIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAgJIAAgKIAAgKIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAKAAIAKAAIAKAAIAKAAQAbAHgCgQIgFgBQAAgFgCgBQgIgEgKAAIgKAAIgUAAQAAgFgCgBQgNgEgPAAIgKAAIgUAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAQgFAAAAgBQgEgPgVAGIgKAAQAAgFgCgBQgIgEgKAAIgKAAQgFAAgBgCQgHgPgbAHQAAgFgCgDQgDgCgFAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAQgFAAgEgBQgLgEgKgFIgKAAQAAgFgDgDQgCgCgFAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAIAAgKQAFAAADgDQACgCAAgFIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgUIAKAAIAKAAQAAAFADADQACACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAQAAAFACADQADACAFAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAQAAAFADACQACADAFAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAAAKAEAIQABACAFAAQAFAAACgDQADgCAAgFIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAJAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIA8AAIAKAAIAUAAIAKAAIAUAAIAKAAQAPAAANgFQACAAAAgFIAKAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAQAWAHADgQQAAgBAFAAIAKAAQAFgFAGgDQAEgCAFAAIAKAAIAAAUIAAAKQAAAPAFAOQAAABAFAAQAKgFAHgHQADgDAAgFIAAgKIAAgeIAAgKQAKgKATgEQABgBAAgFIAKAAIAKAAIAKAAIAAAKIAAAKIAAAKIAAAeIAAAKIgKAAIAAAKIAAAKQAAAFgCABQgIAEgKAAIgKAAIAAAKIgKAAQgFAAAAABQgEAPgVgGIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgUAAIgKAAIgKAAIgKAAIgKAAIgKAAIgUAAIgKAAIgeAAIgKAAIgUAAQgGAWAQgCIAKAAIAUAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAJIAAAKIAAAKIgKAAgADhAPIgKAAIAAgKIAAgJIAAgKIAAgKIAAgKIAAgeIAKAAIAKAAQAPAAAOgEQABgBAAgFIAKAAIAKAAIAAAUIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAJIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgAnaAFQAAgFgCgDQgDgGgFgFIAAgKIAAgeIAAgKIAAgKIAAgKIAKAAQAAAFADADQACACAFAAIAABGIAAAJIgKAAgADXkwIgUAAQAAgFgBAAQgTgFgUAAIgKAAIgKAAIgKAAIgKAAIAAgKIAAgUIAAgKQAFAAABgCQALgZgRgDIAAgKQAAgFgCgCQgDgDgFAAIAAgKQAAgFgCgDQgDgCgFAAIAAgKIAAgKQAAgFgCgDQgDgCgFAAIAAgKIAAgKIAAgKIAAgUIAAgKQAFAAADgCQACgDAAgFQAFAAADgCQACgDAAgFIAKAAQAFAAADgCQACgDAAgFIAKAAIAKAAQAFAAACgDQADgCAAgFQAKAAAIgEQACgBAAgFQAKAAAIgEQACgBAAgFQAFgFAGgDQAEgCAFAAIAKAAIAeAAIAKAAQAAAFACACQADADAFAAQAKAFAKADQAFACAFAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAQAAAFADADQACACAFAAIAAAKQAAAFADADQACACAFAAQAFAFADAGQACAEAAAFIAAAKIAAAoIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgFAAQACAWgRgCIAAAKIgKAAIgKAAIAAAKIAAAKIgKAAIgUAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgAmol2QgFAAgDgDQgCgCAAgFIAKAAIAKAAIAAAKIgKAAgAheo0IAAgKQAWgGgGAOQgBACgFAAIgKAAgABppwIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIgKAAg");
	this.shape_687.setTransform(-1,-1.1);

	this.shape_688 = new cjs.Shape();
	this.shape_688.graphics.f("#62400D").s().p("AgEAKIAAgKIAAgJIAJAAIAAAJIAAAKIgJAAg");
	this.shape_688.setTransform(11,-63.6);

	this.shape_689 = new cjs.Shape();
	this.shape_689.graphics.f("#4A3F10").s().p("AAAAKIgJAAIAAgKQAFAAACgCQACgCAAgFIAKAAIAAAJIAAAKIgKAAg");
	this.shape_689.setTransform(12.5,-64.6);

	this.shape_690 = new cjs.Shape();
	this.shape_690.graphics.f("#20260C").s().p("AgJAFIAAgJIAJAAIAKAAQAAAEgDACQgCADgFAAIgJAAg");
	this.shape_690.setTransform(11.5,-65.1);

	this.shape_691 = new cjs.Shape();
	this.shape_691.graphics.f("#1F1705").s().p("AABADQgFgDgFgEQAJAAAIAEQACAAAAAFQgFAAgEgCg");
	this.shape_691.setTransform(51.5,-52.1);

	this.shape_692 = new cjs.Shape();
	this.shape_692.graphics.f("#32320F").s().p("AAKAOQgTgEgKgOIAAgKQATAKARAMQADACAAAFIgKgBg");
	this.shape_692.setTransform(47.5,-55.1);

	this.shape_693 = new cjs.Shape();
	this.shape_693.graphics.f("#342407").s().p("AFDBNQgNgMgKgPQAUABAHAKQADAEAAAFIAAAKQgFAAgCgDgAkhg7IgoAAIAAgKIAAgKIAeAAIAKAAQAAAFADADQACACAFAAIAAAKIgKAAg");
	this.shape_693.setTransform(16.5,-56.6);

	this.shape_694 = new cjs.Shape();
	this.shape_694.graphics.f("#100B02").s().p("AnGIcIAAgKIAAgUQAFAAADgDQACgCAAgFQAKAFAIAIQACACAAAFIAAAKIgKAAIgKAAIAAAKIgKAAgAgJEOQABgVgQABIAAgKIAAgKQAFgFADgGQACgEAAgFIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKgAhohtIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAjqiBIAAgKIAAgKIAKAAIAAAKIAAAKIgKAAgAnGizIAAgeQAFAAADgDQACgCAAgFIAKAAIAAAKIAAAKIAAAKIAAAKQgFAAgEACQgGADgFAFIAAgKgAB9jbIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAGzjvIAKAAIAKAAQAAAFgCABQgIAEgKAAIAAgKgAmKkNIgKAAIAAgKQAKAAAIAEQACABAAAFIgKAAgAh4lBQgEgIAAgKIAKAAIAAAKIAAAKQgFAAgBgCgAGgnDQgGgDgFgFIAKAAIAKAAIAAAKQgFAAgEgCgAmUnpIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgAgOoRIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAg");
	this.shape_694.setTransform(-2,-9.6);

	this.shape_695 = new cjs.Shape();
	this.shape_695.graphics.f("#69460E").s().p("ADSISIgKAAIgKAAIgKAAIAAgKIAAgeIAAgKIAAgKIAAgKIAAgKIAKAAIAKAAIAKAAIAKAAQARgBgGAWIgBAJIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAgAk1EOIgKAAIgKAAQAAgFgCgBQgNgEgPAAIAAgKIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAAgKQAFAFAGADQAEACAFAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgAk/CgIgKAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAIAAgKIAAgUIAAgKIAAgUQAFgFADgGQACgEAAgFIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAAAKIAAAKIAAAoIAAAKQgFAAgEACQgGADgFAFIgKAAgAizBaIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAQgFAAgEgCQgGgDgFgFIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAAgJIAKAAQAAAFACACQADACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAUAAIAKAAIAAAKIgKAAIAAAeIAAAKIgKAAIAAAUIAAAKIgKAAgAD6htIgUAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgUAAIgKAAIg8AAIgKAAIgUAAIgKAAIgUAAIgKAAIgTAAIgKAAIgKAAIgKAAIgUAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAQgFAAgEgCQgGgDgFgFIgKAAIgKAAQAAgFgCgBQgIgEgKAAIgKAAQgFAAgEgCQgGgDgFgFIgKAAQAAgFgDgCQgCgDgFAAIgKAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAQAAgFgBAAQgdgKgUgPIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAKAAQAFAFAGADQAEACAFAAQAFAFAGADQAEACAFAAQADARARADIAKAAQAAAFACADQADACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAQAAAFACADQADACAFAAIAKAAIAKAAQAAAFACADQADACAFAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAUAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAeAAIAKAAQgBAQAWgFIAJgBIAKAAIAJAAIAKAAIAKAAIAKAAIAKAAIAKAAIAUAAIAKAAIAoAAIAKAAIAUAAIAKAAIAUAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAUAAIAKAAQAFAAACgDQADgCAAgFIAUAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAQAFAAACgDQADgCAAgFQAKAAAIgEQACgBAAgFIAKAAIAKAAQAFAAADgCQACgDAAgFQAVAGAEgPQAAgBAFAAIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgABGjbIgUAAIgKAAIgUAAIgKAAIgKAAIgJAAIgUAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAQAFAAADgCQACgDAAgFQAKAAAIgEQACgBAAgFQAKAAAIgEQACgBAAgFQAFAAACgCQADgDAAgFQAFgFADgGQACgEAAgFQAFAAABgCQAKgTgQABIAAgKQAAgFgDgDQgCgCgFAAIAAgKQAAgFgDgDQgCgCgFAAIAAgKQAAgFgDgCQgCgDgFAAIAAgKIAAgKIAAgKIAAgKIAAgKQAAgFgCgEQgDgGgFgFQAAgFgDgDQgCgCgFAAIAAgKIAAgKQAFAAACgDQADgCAAgFIAAgKIAKAAQAFAAABgCQAKgZgaAHIAAAKIgKAAQgFAAAAABQgDAPgWgGIgKAAIgKgBIgogJQAAgFgCgDQgDgCgFAAIAAgKIAKAAIAoAAIAKAAIAKAAIAKAAIAUAAIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAJAAIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAIAKAAIAUAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAQgFAAgEACQgGADgFAFIAAAKQgFAAgEACQgGADgFAFIAAAKQAAAFgDADQgCACgFAAIAAAKIAAAKQAAAKAEAIQABACAFAAIAAAKQAAAFADADQACACAFAAQAAAKAEAIQABACAFAAIAAAKQAAAFACACQADADAFAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIgKAAgAFojvIgKAAIgKAAIAAgKIAAgKQAFAAADgCQACgDAAgFIAAgKQAFAAADgDQACgCAAgFIAAgKQAFAAADgDQACgCAAgFIAAgKIAAgKQAFAAADgCQACgDAAgFIAAgKIAAgKIAAgKQAAgFgCgEQgDgGgFgFQAAgFgCgEQgDgGgFgFQAAgFgCgEQgDgGgFgFQAAgFgCgDQgDgCgFAAQAAgFgDgDQgCgCgFAAIAAgKIAKAAIAKAAIAKAAQAAAFACACQADADAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAQAFAFAGADQAEACAFAAQAAAFADADQACACAFAAQAKAFAKADQAFACAFAAQAKAPANAMQACADAFAAQAAAFADACQACADAFAAIAAAKIAAAKIAAAKIAAAKIAAAKQAAAFgDACQgCADgFAAIAAAKQgFAAgBACQgHAPgRADIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgUAAIgKAAIgKAAIAAAKIgKAAgAk/kNIAAgKIAAgKIAAgKQAAgFgCgEQgDgGgFgFIAAgKIAAgKIAAgKIAAgKIAAgeIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKQAFAAACgDQADgCAAgFIAAgKIAAgKQAKgFAHgHQADgDAAgFIAUAAIAKAAIAKAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAKAAQAAAKAEAIQABACAFAAQAFAKAHAHQADADAFAAIAKAAIAAAKIAAAKQgFAAAAABQgDAQgWgHIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAQgFAAgEACQgGADgFAFIAAAKQgFAAgEACQgGADgFAFIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgFAAQABAVgQgBIAAAKIAAAKIgKAAIAAAKIgKAAgAlnkXIgKAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAIgKAAQAAgFgCgBQgIgEgKAAQAAgFgCgBQgIgEgKAAQAAgFgCgDQgDgCgFAAQAAgFgCgBQgIgEgKAAIABgKQAAgQgVAGQAAgFgCgEQgDgLgFgKIAAgKIAAgUIAAgKIAAgKQAKgFAHgHQADgDAAgFQAKAAAIgEQACgBAAgFQAWAHADgQQAAgBAFAAQAFAAADgDQACgCAAgFIAKAAIAKAAQAFAAACgDQADgCAAgFQAPAAAOgEQABgBAAgFIAeAAIAKAAQAAAFgDACQgCADgFAAIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAoIAAAKQAAAKAEAIQABACAFAAIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAgACqn9QAAgFgCgDQgDgCgFAAIgKAAIgKAAIgKAAIgKAAIAAgKIAKAAIAKAAIAKAAIAKAAIAKAAIAKAAIAAAKIAAAKIgKAAg");
	this.shape_695.setTransform(-0.5,-10.6);

	this.shape_696 = new cjs.Shape();
	this.shape_696.graphics.f("#251805").s().p("AmIIKQgCgCAAgFIAAgKIAAgKQAFAFAGADQAEACAFAAQAAAFgCACQgDADgFAAIAAAKQgFAAgDgDgADhHRIAAgKIAKAAQAAAFACACQADADAFAAQAAAFgCABQgIAEgKAAIAAgKgAj0HHIAAgKIAAgKIAKAAIAKAAIAAAKIgKAAIAAAKIgKAAgAikClQAAgFgCgBQgIgEgKAAIAAgKIAKAAIAKAAIAKAAIAAAKIAAAKIgKAAgAGCn6QgGgDgFgFIAAgKQAFAFAGADQAEACAFAAIAAAKQgFAAgEgCg");
	this.shape_696.setTransform(3,-3.1);

	this.shape_697 = new cjs.Shape();
	this.shape_697.graphics.f("#1F1604").s().p("Ag7CqIgKAAIAAgKIAKAAIAKAAIAAAKIgKAAgABQBGIgKAAIAAgKIAKAAIAKAAIAKAAQAAAFgCACQgDADgFAAIgKAAgAi9gTIgKAAQAAgFgCgEQgDgGgFgFIAAgKIAAgKQAFAAACgCQADgDAAgFQAFAAACACQADADAAAFQAAAPAEANQABACAFAAIAAAKIgKAAgADIg9QgKgDgKgFIAAgKQATAAAJALQACAEAAAFQgFAAgFgCgAh3ifIAAgKIAKAAIAKAAQAAAFgDADQgCACgFAAIgKAAg");
	this.shape_697.setTransform(25.5,-45.6);

	this.shape_698 = new cjs.Shape();
	this.shape_698.graphics.f("#372607").s().p("AgCAIQgCgDAAgFIAAgJQAEAAADACQACADAAAEIAAAKQgFAAgCgCg");
	this.shape_698.setTransform(43,-53.6);

	this.shape_699 = new cjs.Shape();
	this.shape_699.graphics.f("#211905").s().p("AABADQgFgDgFgEIAJAAIAKAAIAAAJQgFAAgEgCg");
	this.shape_699.setTransform(44.5,-56.1);

	this.shape_700 = new cjs.Shape();
	this.shape_700.graphics.f("#1E1F0A").s().p("AABADQgFgDgFgEQAJAAAIAEQACAAAAAFQgFAAgEgCg");
	this.shape_700.setTransform(40.5,-58.1);

	this.shape_701 = new cjs.Shape();
	this.shape_701.graphics.f("#66440E").s().p("ABLKUIgKAAIgKAAIgKAAIgeAAIgKAAIgJAAIgKAAQAAgFgBAAQgOgFgPAAIgKAAIgKAAIgKAAIgUAAIgKAAIgKAAIgKAAIgeAAQAAgFgCgDQgDgCgFAAIgKAAIgUAAIgKAAIgUAAQAAgFgCgBQgIgEgKAAIgKAAIgKAAQAAgFgBgBQgOgEgPAAIgKAAIgKAAQAAgFgCgBQgNgEgPAAQAAgFgCgBQgIgEgKAAQAAgFgCgBQgIgEgKAAIgKAAQgFAAgEgCQgGgDgFgFQAFAAABgCQAFgOgVAGQgFAAgEgDQgLgHgKgKQAAgFgCgDQgDgCgFAAIAAgKIAAgKQgDgRgRgDIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgUIAAgKIAAgKIAAgKIAAgUIAAgKIAAgKIAAgKIAAgUIAAgKIAAgKQAAgFgCgEQgDgGgFgFIAAgKIAAgKIAAgKIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKQAAgFgCgEQgDgGgFgFIAAgKIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKQAAgFgCgEQgDgFgFgFIAAgKIAAgKIAAgeIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKQAAgFgCgEQgDgGgFgFIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgKIAAgUQAAgFgCgEQgDgGgFgFIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKIAAgKIAAgUIAAgKIAAgKIAAgKIAAgKQAAgFgCgEQgDgGgFgFIAAgKIAAgKIABgKQAGgrgRgRIAAgKIAKAAQAFgFADgGQACgEAAgFIAAgKIAKAAQAUgBAHgLQADgDAAgFIAAgKIAKAAQAKAAAIgEQACgBAAgFIAAgKIAKAAQgBARATgLQACgBAAgFQAKAAAIgEQACgBAAgFIAAgKIAKAAQAFAFAGADQAEACAFAAQAKAAAIgEQACgBAAgFIAKAAIAKAAQAPAAANgFQACAAAAgFIAeAAIAKAAIAKAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAKAAIAUAAIAKAAIAKAAIAKAAIBGAAIAKAAIAUAAIAKAAIAKAAIAKAAIAAAKIgKAAIgUAAIgKAAIgeAAIgKAAIgKAAIgKAAIgeAAIAAAKIgKAAIgUAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgUAAIAAAKIgKAAQAAgFgCgBQgIgEgKAAIAAAKIgKAAIgeAAIAAAKIgKAAIgUAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKQgFAAgFACQgKADgKAFQgFAAgEACQgGADgFAFIAAAKIgKAAIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKQAAAFACACQADADAFAAQABATAKAJQAEACAFAAIAAAKIAAAKIgKAAQAAgFgCgBQgIgEgKAAIAAAKIAAAeIAAAKIAAAKIAAAKQAAAFACADQADACAFAAQAAAKAEAIQABACAFAAIAAAKIgKAAIAAAUIAAAKIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKIAAAKQAAAFACACQADADAFAAIAAAeIAAAKIAAAKIAAAKIAAAUIAAAKIAAAKIAAAKIAAAKIAAAKQAAAKAEAIQABACAFAAIAAAeIAAAKIAAAKIAAAKIAAATIAAAKIAAAKIAAAKIAAAKQAAAKAEAIQABACAFAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKQAAAKAEAIQABACAFAAIAAAKIAAAoIAAAKIAAAUIAAAKQAAAKAEAIQABACAFAAIAAAKIgKAAIAAAKIAAAKQAAAPAEANQABACAFAAQAAAKAEAIQABACAFAAQAAAFgCACQgDADgFAAIAAAUIAAAKIAAAUIAAAKQAAAFACACQADADAFAAQAAAUALAHQAEADAFAAQAFAKAHAIQADACAFAAQAFAKAIAIQACACAFAAQAKAFALAEQAEABAFAAQAAAFACACQADADAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAQAAAFADACQACADAFAAIAKAAIAKAAQAAAFACACQADADAFAAIAKAAIAKAAQAAAFACACQADADAFAAIAKAAIAKAAIAKAAIAKAAQAAAFADADQACACAFAAIAoAAIAKAAQAAAFADADQACACAFAAIAUAAIAKAAIAKAAIAKAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAIAKAAIAKAAIAKAAIAnAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIAeAAIAKAAIAKAAIAKAAQAFAAACgCQADgDAAgFIAeAAIAKAAQAFAAADgCQACgDAAgFIAKAAIAKAAQAFAAACgDQADgCAAgFQAPAAAOgFQABAAAAgFQAKAAAIgEQACgBAAgFQAKAAAIgEQACgBAAgFQAFAAACgDQADgCAAgFIAKAAIAAgKQAWAHgBgRIgBgKQAFgFADgGQACgEAAgFQAFgFADgGQACgEAAgFIAAgKQAFAAABgCQALgZgRgDIAAgKQAFgFADgGQACgEAAgFIAAgKIAKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKQgFAAgEACQgGADgFAFIgKAAIAAAKIAAAKQAAAFgDACQgCADgFAAIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgUAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAIgUAAIgKAAIgUAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgAGzCWIgKAAIAAgKIAAgKQAFAAACgDQADgCAAgFIAAgKIAAgeQAFgFADgGQACgEAAgFIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgJIAAgKQAFAAADgDQACgCAAgFIAAgKIAAgKIAAgKIAAgKQAFAAADgCQACgDAAgFIAAgKIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgUQAFgFADgGQACgEAAgFIAAgKIAAgeQAFAAACgDQADgCAAgFIAAgKIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAAgKQAFgFADgGQACgEAAgFIABgKQABgfgWAVIgKAAIAAgKQAFAAACgDQADgCAAgFQARgDADgRIAAgKQAFAAADgCQACgDAAgFIAAgKQgBgTgJgLQAAgFgDgCQgHgIgKgFQAAgFgDgEQgHgKgUgBQAAgFgCgEQgJgLgTAAQAAgFgCgDQgDgCgFAAQgFAAgEgCQgGgDgFgFIgKAAIgKAAQAAgFgCgBQgIgEgKAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAIgKAAIAAAKIgKAAQAAgFgCgDQgJgLgTgBQAAgFgCgDQgDgCgFAAIgKAAIgUAAIAAgKQAFAAACgCQADgDAAgFIAAgKIAKAAIAAAKQAFAFAGADQAEACAFAAIAKAAIAKAAQAFAFAGADQAEACAFAAIAKAAQAFAFAGADQAEACAFAAQAKAAAIgEQACgBAAgFQAFAAADACQACADAAAFQgBAQATgKQACgBAAgFQAFAAACADQADACAAAFQAFAFAGADQAEACAFAAQAFAFAGADQAEACAFAAQAFAFAGADQAEACAFAAQAKAPAUAEIAKABQAFAAACACQADADAAAFQAFAFAGADQAEACAFAAQAFAAADACQACADAAAFQAAATAIANQACADAAAFIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKQAAAFgCACQgDADgFAAIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKQAAAFgDADQgCACgFAAIAAAKIAAAKIAAAKIAAAKQAAAFgDACQgCADgFAAIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAJQAAAFgCADQgDACgFAAIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAUIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIgKAAg");
	this.shape_701.setTransform(-1,0.4);

	this.shape_702 = new cjs.Shape();
	this.shape_702.graphics.f("#201B07").s().p("AABADQgFgDgFgEQAJAAAIAEQACAAAAAFQgFAAgEgCg");
	this.shape_702.setTransform(42.5,-57.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_702},{t:this.shape_701},{t:this.shape_700},{t:this.shape_699},{t:this.shape_698},{t:this.shape_697},{t:this.shape_696},{t:this.shape_695},{t:this.shape_694},{t:this.shape_693},{t:this.shape_692},{t:this.shape_691},{t:this.shape_690},{t:this.shape_689},{t:this.shape_688},{t:this.shape_687},{t:this.shape_686},{t:this.shape_685},{t:this.shape_684},{t:this.shape_683},{t:this.shape_682},{t:this.shape_681},{t:this.shape_680},{t:this.shape_679},{t:this.shape_678},{t:this.shape_677},{t:this.shape_676},{t:this.shape_675},{t:this.shape_674},{t:this.shape_673},{t:this.shape_672},{t:this.shape_671},{t:this.shape_670},{t:this.shape_669},{t:this.shape_668},{t:this.shape_667},{t:this.shape_666},{t:this.shape_665},{t:this.shape_664},{t:this.shape_663},{t:this.shape_662},{t:this.shape_661},{t:this.shape_660},{t:this.shape_659},{t:this.shape_658},{t:this.shape_657},{t:this.shape_656},{t:this.shape_655},{t:this.shape_654},{t:this.shape_653},{t:this.shape_652},{t:this.shape_651},{t:this.shape_650},{t:this.shape_649},{t:this.shape_648},{t:this.shape_647},{t:this.shape_646},{t:this.shape_645},{t:this.shape_644},{t:this.shape_643},{t:this.shape_642},{t:this.shape_641},{t:this.shape_640},{t:this.shape_639},{t:this.shape_638},{t:this.shape_637},{t:this.shape_636},{t:this.shape_635},{t:this.shape_634},{t:this.shape_633},{t:this.shape_632},{t:this.shape_631},{t:this.shape_630},{t:this.shape_629},{t:this.shape_628},{t:this.shape_627},{t:this.shape_626},{t:this.shape_625},{t:this.shape_624},{t:this.shape_623},{t:this.shape_622},{t:this.shape_621},{t:this.shape_620},{t:this.shape_619},{t:this.shape_618},{t:this.shape_617},{t:this.shape_616},{t:this.shape_615},{t:this.shape_614},{t:this.shape_613},{t:this.shape_612},{t:this.shape_611},{t:this.shape_610},{t:this.shape_609},{t:this.shape_608},{t:this.shape_607},{t:this.shape_606},{t:this.shape_605},{t:this.shape_604},{t:this.shape_603},{t:this.shape_602},{t:this.shape_601},{t:this.shape_600},{t:this.shape_599},{t:this.shape_598},{t:this.shape_597},{t:this.shape_596},{t:this.shape_595},{t:this.shape_594},{t:this.shape_593},{t:this.shape_592},{t:this.shape_591},{t:this.shape_590},{t:this.shape_589},{t:this.shape_588},{t:this.shape_587},{t:this.shape_586},{t:this.shape_585},{t:this.shape_584},{t:this.shape_583},{t:this.shape_582},{t:this.shape_581},{t:this.shape_580},{t:this.shape_579},{t:this.shape_578},{t:this.shape_577},{t:this.shape_576},{t:this.shape_575},{t:this.shape_574},{t:this.shape_573},{t:this.shape_572},{t:this.shape_571},{t:this.shape_570},{t:this.shape_569},{t:this.shape_568},{t:this.shape_567},{t:this.shape_566},{t:this.shape_565},{t:this.shape_564},{t:this.shape_563},{t:this.shape_562},{t:this.shape_561},{t:this.shape_560},{t:this.shape_559},{t:this.shape_558},{t:this.shape_557},{t:this.shape_556},{t:this.shape_555},{t:this.shape_554},{t:this.shape_553},{t:this.shape_552},{t:this.shape_551},{t:this.shape_550},{t:this.shape_549},{t:this.shape_548},{t:this.shape_547},{t:this.shape_546},{t:this.shape_545},{t:this.shape_544},{t:this.shape_543},{t:this.shape_542},{t:this.shape_541},{t:this.shape_540},{t:this.shape_539},{t:this.shape_538},{t:this.shape_537},{t:this.shape_536},{t:this.shape_535},{t:this.shape_534},{t:this.shape_533},{t:this.shape_532},{t:this.shape_531},{t:this.shape_530},{t:this.shape_529},{t:this.shape_528},{t:this.shape_527},{t:this.shape_526},{t:this.shape_525},{t:this.shape_524},{t:this.shape_523},{t:this.shape_522},{t:this.shape_521},{t:this.shape_520},{t:this.shape_519},{t:this.shape_518},{t:this.shape_517},{t:this.shape_516},{t:this.shape_515},{t:this.shape_514},{t:this.shape_513},{t:this.shape_512},{t:this.shape_511},{t:this.shape_510},{t:this.shape_509},{t:this.shape_508},{t:this.shape_507},{t:this.shape_506},{t:this.shape_505},{t:this.shape_504},{t:this.shape_503},{t:this.shape_502},{t:this.shape_501},{t:this.shape_500},{t:this.shape_499},{t:this.shape_498},{t:this.shape_497},{t:this.shape_496},{t:this.shape_495},{t:this.shape_494},{t:this.shape_493},{t:this.shape_492},{t:this.shape_491},{t:this.shape_490},{t:this.shape_489},{t:this.shape_488},{t:this.shape_487},{t:this.shape_486},{t:this.shape_485},{t:this.shape_484},{t:this.shape_483},{t:this.shape_482},{t:this.shape_481},{t:this.shape_480},{t:this.shape_479},{t:this.shape_478},{t:this.shape_477},{t:this.shape_476},{t:this.shape_475},{t:this.shape_474},{t:this.shape_473},{t:this.shape_472},{t:this.shape_471},{t:this.shape_470},{t:this.shape_469},{t:this.shape_468},{t:this.shape_467},{t:this.shape_466},{t:this.shape_465},{t:this.shape_464},{t:this.shape_463},{t:this.shape_462},{t:this.shape_461},{t:this.shape_460},{t:this.shape_459},{t:this.shape_458},{t:this.shape_457},{t:this.shape_456},{t:this.shape_455},{t:this.shape_454},{t:this.shape_453},{t:this.shape_452},{t:this.shape_451},{t:this.shape_450},{t:this.shape_449},{t:this.shape_448},{t:this.shape_447},{t:this.shape_446},{t:this.shape_445},{t:this.shape_444},{t:this.shape_443},{t:this.shape_442},{t:this.shape_441},{t:this.shape_440},{t:this.shape_439},{t:this.shape_438},{t:this.shape_437},{t:this.shape_436},{t:this.shape_435},{t:this.shape_434},{t:this.shape_433},{t:this.shape_432},{t:this.shape_431},{t:this.shape_430},{t:this.shape_429},{t:this.shape_428},{t:this.shape_427},{t:this.shape_426},{t:this.shape_425},{t:this.shape_424},{t:this.shape_423},{t:this.shape_422},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_406},{t:this.shape_405},{t:this.shape_404},{t:this.shape_403},{t:this.shape_402},{t:this.shape_401},{t:this.shape_400},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_390},{t:this.shape_389},{t:this.shape_388},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_381},{t:this.shape_380},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_373},{t:this.shape_372},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_365},{t:this.shape_364},{t:this.shape_363},{t:this.shape_362},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.target, new cjs.Rectangle(-56.5,-67.6,113,135.3), null);


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


(lib.hasil = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAKAbIAAgiQAAgGgCgCQgDgDgEAAQgDAAgDACQgCADgBAEIAAAkIgJAAIAAg0IAIAAIAAAHQAGgIAGAAQAOAAAAATIAAAig");
	this.shape.setTransform(78.35,60.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgNAXQgEgEAAgHQAAgIAFgEQAFgFAJABIAHAAIAAgFQAAgFgCgCQgDgDgEAAQgDAAgDACQgDADAAADIgHAAQAAgDACgFQACgDAEgCQAEgDAEAAQAIABAEAFQAFAEAAAIIAAAXQAAAIABADIAAABIgIAAIgBgFQgFAHgGgBQgHABgEgFgAgKALQAAAEADACQACADAEAAQACgBAEgCQADgCABgDIAAgLIgGAAQgNAAAAAKg");
	this.shape_1.setTransform(73.725,60.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgSAlIAAhIIAHAAIABAGQAEgHAIAAQAIAAAEAHQAFAHAAANIAAABQAAALgFAHQgEAIgIAAQgHAAgFgGIAAAZgAgKgVIAAAYQADAHAHAAQAFAAADgFQADgFAAgJQAAgJgDgFQgDgFgFAAQgGAAgEAHg");
	this.shape_2.setTransform(69.175,61.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgNAXQgEgEAAgHQAAgIAFgEQAFgFAJABIAHAAIAAgFQAAgFgCgCQgDgDgEAAQgDAAgDACQgDADAAADIgHAAQAAgDACgFQACgDAEgCQAEgDAEAAQAIABAEAFQAFAEAAAIIAAAXQAAAIABADIAAABIgIAAIgBgFQgFAHgGgBQgHABgEgFgAgKALQAAAEADACQACADAEAAQACgBAEgCQADgCABgDIAAgLIgGAAQgNAAAAAKg");
	this.shape_3.setTransform(64.475,60.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAJAlIgOgYIgFAGIAAASIgHAAIAAhKIAHAAIAAAtIAEgGIANgRIAJAAIgQAWIASAeg");
	this.shape_4.setTransform(60.375,59.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgJAjQgEgDgDgEIAEgFQAFAHAHAAQAFAAADgEQADgEAAgGIAAgFQgFAHgGgBQgIABgFgIQgFgHAAgNQAAgMAFgHQAFgIAIAAQAHABAEAGIABgGIAHAAIAAAzQAAAKgFAGQgGAGgIABQgEAAgFgDgAgHgXQgDAFAAAJQAAAJADAEQADAGAFAAQAHAAADgIIAAgXQgDgIgHAAQgFAAgDAGg");
	this.shape_5.setTransform(55.525,61.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AAKAbIAAgiQAAgGgCgCQgDgDgEAAQgDAAgDACQgCADgBAEIAAAkIgJAAIAAg0IAIAAIAAAHQAGgIAGAAQAOAAAAATIAAAig");
	this.shape_6.setTransform(50.9,60.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgNAXQgEgEAAgHQAAgIAFgEQAFgFAJABIAHAAIAAgFQAAgFgCgCQgDgDgEAAQgDAAgDACQgDADAAADIgHAAQAAgDACgFQACgDAEgCQAEgDAEAAQAIABAEAFQAFAEAAAIIAAAXQAAAIABADIAAABIgIAAIgBgFQgFAHgGgBQgHABgEgFgAgKALQAAAEADACQACADAEAAQACgBAEgCQADgCABgDIAAgLIgGAAQgNAAAAAKg");
	this.shape_7.setTransform(46.325,60.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgDAjIAAg+IgTAAIAAgIIAtAAIAAAIIgTAAIAAA+g");
	this.shape_8.setTransform(41.55,59.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AgDAlIAAhKIAHAAIAABKg");
	this.shape_9.setTransform(35.875,59.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgDAkIAAg0IAHAAIAAA0gAgDgaIgBgEIABgEQABAAAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_10.setTransform(33.85,59.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AgIAZQgEgCgDgEQgCgEAAgFIAIAAQAAAFADACQADADADAAQAFAAADgCQACgCAAgDQAAgEgCgCQgDgCgFgBIgJgEIgFgEQgBgDAAgEQAAgGAFgFQAEgFAGAAQAIABAEAFQAGAEgBAHIgIAAQABgEgDgCQgDgDgEAAQgDAAgCACQgCADgBADQAAADACACIAHADIAJADQAFABABAEQABADAAAEQAAAHgEAEQgFAFgIgBQgEAAgEgCg");
	this.shape_11.setTransform(30.65,60.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgNAXQgEgEAAgHQAAgIAFgEQAFgFAJABIAHAAIAAgFQAAgFgCgCQgDgDgEAAQgDAAgDACQgDADAAADIgHAAQAAgDACgFQACgDAEgCQAEgDAEAAQAIABAEAFQAFAEAAAIIAAAXQAAAIABADIAAABIgIAAIgBgFQgFAHgGgBQgHABgEgFgAgKALQAAAEADACQACADAEAAQACgBAEgCQADgCABgDIAAgLIgGAAQgNAAAAAKg");
	this.shape_12.setTransform(26.175,60.65);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AAPAjIAAggIgdAAIAAAgIgIAAIAAhGIAIAAIAAAfIAdAAIAAgfIAIAAIAABGg");
	this.shape_13.setTransform(20.9,59.75);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#FFFFFF").ss(3,1,1).p("AntpVIPbAAIAASrIvbAAg");
	this.shape_14.setTransform(49.35,59.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(102,153,51,0.318)").s().p("AntJWIAAyrIPbAAIAASrg");
	this.shape_15.setTransform(49.35,59.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hasil, new cjs.Rectangle(-1.5,-1.5,101.7,122.7), null);


(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#606163").s().p("Ap/z/QEEAADvBlQDkBhCxCyQCxCwBiDmQBkDtAAEEQAAEEhkDuQhiDmixCxQixCxjkBhQjvBkkEAAg");
	this.shape.setTransform(64,127.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,128,255.9), null);


(lib.bg1copy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0097E6").s().p("A82E7Qg1AAAAgYIAApFQAAgXA1AAMA5tAAAQA1AAABAXIAAJFQgBAYg1AAg");
	this.shape.setTransform(-20.05,1.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bg1copy3, new cjs.Rectangle(-210.1,-30,380.1,62.9), null);


(lib.bunder = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(8,1,1).p("EAguAAAQAANjpmJlQplJmtjAAQtiAApmpmQplplAAtjQAAtiJlpmQJmplNiAAQNjAAJlJlQJmJmAANig");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(8,1,1).p("EggNAAAQAAtVJcpcQJcpcNVAAQNWAAJcJcQJcJcAANVQAANWpcJcQpcJctWAAQtVAApcpcQpcpcAAtWg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(8,1,1).p("A/uAAQAAtIJTpTQJTpTNIAAQNJAAJTJTQJTJTAANIQAANJpTJTQpTJTtJAAQtIAApTpTQpTpTAAtJg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(8,1,1).p("A/OAAQAAs7JJpKQJKpJM7AAQM8AAJJJJQJKJKAAM7QAAM8pKJJQpJJKs8AAQs7AApKpKQpJpJAAs8g");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(8,1,1).p("A+vAAQAAsuJApBQJBpAMuAAQMvAAJAJAQJBJBAAMuQAAMvpBJAQpAJBsvAAQsuAApBpBQpApAAAsvg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(8,1,1).p("A+PAAQAAshI3o3QI3o3MhAAQMiAAI3I3QI3I3AAMhQAAMio3I3Qo3I3siAAQshAAo3o3Qo3o3AAsig");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(8,1,1).p("A9vAAQAAsUItouQIuotMUAAQMVAAItItQIuIuAAMUQAAMVouItQotIusVAAQsUAAououQototAAsVg");

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(8,1,1).p("A9QAAQAAsHIkolQIlokMHAAQMIAAIkIkQIlIlAAMHQAAMIolIkQokIlsIAAQsHAAololQokokAAsIg");

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(8,1,1).p("A8wAAQAAr6IbobQIbobL6AAQL7AAIbIbQIbIbAAL6QAAL7obIbQobIbr7AAQr6AAobobQobobAAr7g");

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(8,1,1).p("A8RAAQAArtISoSQISoSLtAAQLuAAISISQISISAALtQAALuoSISQoSISruAAQrtAAoSoSQoSoSAArug");

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(8,1,1).p("A7xAAQAArgIIoJQIJoILgAAQLhAAIIIIQIJIJAALgQAALhoJIIQoIIJrhAAQrgAAoJoJQoIoIAArhg");

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(8,1,1).p("A7SAAQAArTIAn/QH/oALTAAQLUAAH/IAQIAH/AALTQAALUoAH/Qn/IArUAAQrTAAn/oAQoAn/AArUg");

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(8,1,1).p("A6yAAQAArFH2n3QH3n2LFAAQLGAAH3H2QH2H3AALFQAALGn2H3Qn3H2rGAAQrFAAn3n2Qn2n3AArGg");

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#000000").ss(8,1,1).p("A6TAAQAAq4HtnuQHuntK4AAQK5AAHtHtQHuHuAAK4QAAK5nuHtQntHuq5AAQq4AAnunuQntntAAq5g");

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(8,1,1).p("A5zAAQAAqrHknkQHknkKrAAQKsAAHkHkQHkHkAAKrQAAKsnkHkQnkHkqsAAQqrAAnknkQnknkAAqsg");

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#000000").ss(8,1,1).p("A5UAAQAAqeHbnbQHbnbKeAAQKfAAHbHbQHbHbAAKeQAAKfnbHbQnbHbqfAAQqeAAnbnbQnbnbAAqfg");

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(8,1,1).p("A40AAQAAqRHRnSQHSnRKRAAQKSAAHRHRQHSHSAAKRQAAKSnSHRQnRHSqSAAQqRAAnSnSQnRnRAAqSg");

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(8,1,1).p("A4VAAQAAqEHInJQHJnIKEAAQKFAAHIHIQHJHJAAKEQAAKFnJHIQnIHJqFAAQqEAAnJnJQnInIAAqFg");

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(8,1,1).p("A31AAQAAp3G/m/QG/m/J3AAQJ4AAG/G/QG/G/AAJ3QAAJ4m/G/Qm/G/p4AAQp3AAm/m/Qm/m/AAp4g");

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(8,1,1).p("A3VAAQAApqG1m2QG2m1JqAAQJrAAG1G1QG2G2AAJqQAAJrm2G1Qm1G2prAAQpqAAm2m2Qm1m1AAprg");

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(8,1,1).p("A22AAQAApdGsmtQGtmsJdAAQJeAAGsGsQGtGtAAJdQAAJemtGsQmsGtpeAAQpdAAmtmtQmsmsAApeg");

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(8,1,1).p("A2WAAQAApQGjmjQGjmjJQAAQJRAAGjGjQGjGjAAJQQAAJRmjGjQmjGjpRAAQpQAAmjmjQmjmjAApRg");

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(8,1,1).p("A13AAQAApDGamaQGamaJDAAQJEAAGaGaQGaGaAAJDQAAJEmaGaQmaGapEAAQpDAAmamaQmamaAApEg");

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(8,1,1).p("AVYAAQAAI3mRGQQmQGRo3AAQo2AAmRmRQmQmQAAo3QAAo2GQmRQGRmQI2AAQI3AAGQGQQGRGRAAI2g");

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(8,1,1).p("A11AAQAApCGZmaQGamZJCAAQJDAAGaGZQGZGaAAJCQAAJDmZGaQmaGZpDAAQpCAAmamZQmZmaAApDg");

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(8,1,1).p("A2UAAQAApPGjmiQGimjJPAAQJQAAGiGjQGjGiAAJPQAAJQmjGiQmiGjpQAAQpPAAmimjQmjmiAApQg");

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(8,1,1).p("A2yAAQAApbGrmsQGsmrJbAAQJcAAGrGrQGsGsAAJbQAAJcmsGrQmrGspcAAQpbAAmsmsQmrmrAApcg");

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(8,1,1).p("A3QAAQAApoG0m0QG0m0JoAAQJpAAG0G0QG0G0AAJoQAAJpm0G0Qm0G0ppAAQpoAAm0m0Qm0m0AAppg");

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#000000").ss(8,1,1).p("A3uAAQAAp0G8m+QG+m8J0AAQJ1AAG9G8QG9G+AAJ0QAAJ1m9G9Qm9G9p1AAQp0AAm+m9Qm8m9AAp1g");

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#000000").ss(8,1,1).p("A4NAAQAAqBHGnGQHGnGKBAAQKCAAHGHGQHGHGAAKBQAAKCnGHGQnGHGqCAAQqBAAnGnGQnGnGAAqCg");

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#000000").ss(8,1,1).p("A4rAAQAAqNHPnPQHPnPKNAAQKOAAHPHPQHPHPAAKNQAAKOnPHPQnPHPqOAAQqNAAnPnPQnPnPAAqOg");

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#000000").ss(8,1,1).p("A5JAAQAAqaHXnYQHYnXKaAAQKbAAHXHXQHYHYAAKaQAAKbnYHXQnXHYqbAAQqaAAnYnYQnXnXAAqbg");

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#000000").ss(8,1,1).p("A5nAAQAAqmHgnhQHhngKmAAQKnAAHhHgQHgHhAAKmQAAKnngHhQnhHgqnAAQqmAAnhngQngnhAAqng");

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#000000").ss(8,1,1).p("A6GAAQAAqzHpnqQHqnpKzAAQK0AAHpHpQHqHqAAKzQAAK0nqHpQnpHqq0AAQqzAAnqnqQnpnpAAq0g");

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#000000").ss(8,1,1).p("A6kAAQAAq/HynzQHznyK/AAQLAAAHyHyQHzHzAAK/QAALAnzHyQnyHzrAAAQq/AAnznzQnynyAArAg");

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#000000").ss(8,1,1).p("A7CAAQAArMH7n7QH7n7LMAAQLNAAH6H7QH8H7AALMQAALNn8H6Qn6H8rNAAQrMAAn7n8Qn7n6AArNg");
	this.shape_35.setTransform(0.025,0.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#000000").ss(8,1,1).p("A7gAAQAArZIDoEQIEoDLZAAQLaAAIDIDQIEIEAALZQAALaoEIDQoDIEraAAQrZAAoEoEQoDoDAArag");

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#000000").ss(8,1,1).p("A7+AAQAArlIMoNQINoMLlAAQLmAAIMIMQININAALlQAALmoNIMQoMINrmAAQrlAAoNoNQoMoMAArmg");

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#000000").ss(8,1,1).p("A8dAAQAAryIWoVQIVoWLyAAQLzAAIVIWQIWIVAALyQAALzoWIVQoVIWrzAAQryAAoVoWQoWoVAArzg");

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#000000").ss(8,1,1).p("A87AAQAAr+IeofQIfoeL+AAQL/AAIeIeQIfIfAAL+QAAL/ofIeQoeIfr/AAQr+AAofofQoeoeAAr/g");

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#000000").ss(8,1,1).p("A9ZAAQAAsLInonQInonMLAAQMMAAInInQInInAAMLQAAMMonInQonInsMAAQsLAAononQononAAsMg");

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#000000").ss(8,1,1).p("A93AAQAAsXIwowQIwowMXAAQMYAAIwIwQIwIwAAMXQAAMYowIwQowIwsYAAQsXAAowowQowowAAsYg");

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#000000").ss(8,1,1).p("A+WAAQAAskI5o5QI5o5MkAAQMlAAI4I5QI6I5AAMkQAAMlo6I4Qo4I6slAAQskAAo5o6Qo5o4AAslg");

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").ss(8,1,1).p("A+0AAQAAswJCpCQJCpCMwAAQMxAAJCJCQJCJCAAMwQAAMxpCJCQpCJCsxAAQswAApCpCQpCpCAAsxg");

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").ss(8,1,1).p("A/SAAQAAs9JKpLQJLpKM9AAQM+AAJKJKQJLJLAAM9QAAM+pLJKQpKJLs+AAQs9AApLpLQpKpKAAs+g");

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").ss(8,1,1).p("A/wAAQAAtJJTpUQJUpTNJAAQNKAAJUJTQJTJUAANJQAANKpTJUQpUJTtKAAQtJAApUpTQpTpUAAtKg");

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#000000").ss(8,1,1).p("EggPAAAQAAtWJdpcQJcpdNWAAQNXAAJcJdQJdJcAANWQAANXpdJcQpcJdtXAAQtWAApcpdQpdpcAAtXg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-213.3,-213.3,426.70000000000005,426.70000000000005);


(lib.btnMenuKI = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18B8C4").s().p("AhXBMIBNhMIhNhMIAygxIB9B9Ih9B+g");
	this.shape.setTransform(-43.2824,1.4241,0.5329,0.5329,-90);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#18B8C4").s().p("Ah6CSICRiSIiRiRIAygyIDCDDIjCDDg");
	this.shape_1.setTransform(-43.2824,-6.902,0.5329,0.5329,-90);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7,p:{y:-3.875}},{t:this.shape_6,p:{y:-3.875}},{t:this.shape_5},{t:this.shape_4,p:{y:0.925}},{t:this.shape_3},{t:this.shape_2,p:{y:1.075}},{t:this.shape_1,p:{y:-6.902}},{t:this.shape,p:{y:1.4241}}]}).to({state:[{t:this.shape_7,p:{y:-2.275}},{t:this.shape_11},{t:this.shape_6,p:{y:-2.275}},{t:this.shape_10},{t:this.shape_4,p:{y:2.525}},{t:this.shape_9},{t:this.shape_2,p:{y:2.675}},{t:this.shape_1,p:{y:-5.302}},{t:this.shape,p:{y:3.0241}}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_4,p:{y:6.525}},{t:this.shape_12},{t:this.shape_2,p:{y:6.675}},{t:this.shape_1,p:{y:-1.302}},{t:this.shape,p:{y:7.0241}}]},1).wait(2));

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
	this.shape.setTransform(-38.9393,-3.0039,0.7124,0.7883,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#ED4F44").s().p("Ah3C3QgGgDAAgHIAAgiQAAgOAMgJICPhrQAEgEAAgFQAAgFgEgDIiPhsQgMgIAAgOIAAgiQAAgHAGgDQAHgDAFAEIDkCrQAFAEAAAGQAAAHgFAEIjkCrQgDACgEAAIgFgBg");
	this.shape_1.setTransform(-45.2261,-3.0236,0.7124,0.7883,180);

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10,p:{y:-3.875}},{t:this.shape_9,p:{y:-3.875}},{t:this.shape_8},{t:this.shape_7,p:{y:0.925}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{scaleX:0.7124,scaleY:0.7883,x:-45.2261,y:-3.0236}},{t:this.shape,p:{scaleX:0.7124,scaleY:0.7883,x:-38.9393,y:-3.0039}}]}).to({state:[{t:this.shape_10,p:{y:-1.875}},{t:this.shape_18},{t:this.shape_9,p:{y:-1.875}},{t:this.shape_17},{t:this.shape_7,p:{y:2.925}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7877,x:-45.2193,y:-2.3629}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7877,x:-38.9372,y:-2.3432}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_7,p:{y:6.425}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_1,p:{scaleX:0.7119,scaleY:0.7877,x:-45.2193,y:-0.5129}},{t:this.shape,p:{scaleX:0.7119,scaleY:0.7877,x:-38.9372,y:-0.4932}}]},1).wait(2));

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


(lib.teripang_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// base
	this.instance = new lib.teripang();
	this.instance.setTransform(-273,-105,14.0265,14.0265);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bunder
	this.instance_1 = new lib.bunder();
	this.instance_1.setTransform(26.95,35.75,0.8323,0.8323);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,255,0.008)").s().p("Eg2jAnrQhjgBAAhjMAAAhMMQAAhlBjABMBtHAAAQBjgBABBlMAAABMMQgBBjhjABg");
	this.shape.setTransform(26.95,35.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.teripang_1, new cjs.Rectangle(-332.2,-218.1,718.3,507.70000000000005), null);


(lib.Slots5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// slots
	this.target = new lib.target();
	this.target.name = "target";
	this.target.setTransform(807,502,0.5621,0.5621,0,0,0,0.1,0.1);

	this.kotakKartu2 = new lib.hasil();
	this.kotakKartu2.name = "kotakKartu2";
	this.kotakKartu2.setTransform(116.75,490.8,1.2229,0.9068,0,0,0,49.4,59.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.kotakKartu2},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Slots5, new cjs.Rectangle(54.5,435.2,784.2,111.19999999999999), null);


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


(lib.porifera_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// base
	this.instance = new lib.porifera();
	this.instance.setTransform(-142,-139,13.9679,13.9679);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bunder
	this.instance_1 = new lib.bunder();
	this.instance_1.setTransform(26.95,35.75,0.8323,0.8323);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,255,0.008)").s().p("Eg2jAnrQhjgBAAhjMAAAhMMQAAhlBjABMBtHAAAQBjgBABBlMAAABMMQgBBjhjABg");
	this.shape.setTransform(26.95,35.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.porifera_1, new cjs.Rectangle(-332.2,-218.1,718.3,507.70000000000005), null);


(lib.kelabang_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// base
	this.instance = new lib.kelabang();
	this.instance.setTransform(-402,-147,14.0845,14.0845);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bunder
	this.instance_1 = new lib.bunder();
	this.instance_1.setTransform(-7.95,35.75,0.8323,0.8323);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,255,0.008)").s().p("Eg2jAnrQhjgBgBhjMAAAhMMQABhlBjABMBtGAAAQBlgBgBBlMAAABMMQABBjhlABg");
	this.shape.setTransform(-7.95,35.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.kelabang_1, new cjs.Rectangle(-402,-218.1,788,507.70000000000005), null);


(lib.info = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Tween4("synched",0);

	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1.setTransform(0,18.45);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween13("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},26).to({state:[{t:this.instance_2}]},28).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,y:18.45},26).wait(29));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},26).to({_off:true,y:0},28).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.2,-8,152.4,34.5);


(lib.fish_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// base
	this.instance = new lib.fish();
	this.instance.setTransform(-148,-87,14.053,14.053);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bunder
	this.instance_1 = new lib.bunder();
	this.instance_1.setTransform(26.95,35.75,0.8323,0.8323);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,255,0.008)").s().p("Eg2jAnrQhjgBAAhjMAAAhMMQAAhlBjABMBtHAAAQBjgBABBlMAAABMMQgBBjhjABg");
	this.shape.setTransform(26.95,35.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fish_1, new cjs.Rectangle(-332.2,-218.1,718.3,507.70000000000005), null);


(lib.cacingrubellus = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// base
	this.instance = new lib.cacingruubelus();
	this.instance.setTransform(-161,-81,14.0845,14.0845);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bunder
	this.instance_1 = new lib.bunder();
	this.instance_1.setTransform(26.95,35.75,0.8323,0.8323);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,255,0.008)").s().p("Eg2jAnrQhjgBAAhjMAAAhMMQAAhlBjABMBtHAAAQBjgBABBlMAAABMMQgBBjhjABg");
	this.shape.setTransform(26.95,35.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.cacingrubellus, new cjs.Rectangle(-332.2,-218.1,718.3,507.70000000000005), null);


(lib.bulubabi_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// base
	this.instance = new lib.bulubabi();
	this.instance.setTransform(-179,-164,14.1208,14.1208);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bunder
	this.instance_1 = new lib.bunder();
	this.instance_1.setTransform(26.95,35.75,0.8323,0.8323);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,255,0.008)").s().p("Eg2jAnrQhjgBAAhjMAAAhMMQAAhlBjABMBtHAAAQBjgBABBlMAAABMMQgBBjhjABg");
	this.shape.setTransform(26.95,35.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bulubabi_1, new cjs.Rectangle(-332.2,-218.1,718.3,507.70000000000005), null);


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


(lib.bintangLuat = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// base
	this.instance = new lib.bintanglaut();
	this.instance.setTransform(-260,-218,1.292,1.292);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// bunder
	this.instance_1 = new lib.bunder();
	this.instance_1.setTransform(26.95,35.75,0.8323,0.8323);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,255,0.008)").s().p("Eg2jAnrQhjgBAAhjMAAAhMMQAAhlBjABMBtHAAAQBjgBABBlMAAABMMQgBBjhjABg");
	this.shape.setTransform(26.95,35.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bintangLuat, new cjs.Rectangle(-332.2,-218.1,718.3,507.70000000000005), null);


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
	this.shape.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape.setTransform(-295.825,32.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAQBUIAAgnIhMAAIAAgMIBLh0IAWAAIAABuIAYAAIAAASIgYAAIAAAngAANgyIgwBNIAzAAIAAhRg");
	this.shape_1.setTransform(-305.375,25.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_2.setTransform(-295.825,-7.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AglBJQgPgMAAgWIAVAAQAAAOAJAIQAIAIAOAAQAPAAAJgIQAIgIAAgQQAAgOgJgIQgJgIgQAAIgQAAIAAgQIAQAAQAOgBAJgHQAIgIAAgNQAAgegdAAQgNAAgIAIQgJAIAAANIgVAAQAAgUAPgNQAOgOAWAAQAYAAANANQAOAMAAAXQAAALgHAKQgHAKgNAGQAOADAIAKQAHAKAAAPQAAAWgPAOQgOAOgYAAQgXAAgOgOg");
	this.shape_3.setTransform(-305.625,-14.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_4.setTransform(-295.825,-47.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("Ag0BVIAAgPIA5hBQANgNAFgKQAFgJAAgKQAAgNgIgIQgIgJgNAAQgPAAgJAJQgJAJAAARIgWAAQAAgYAQgOQAOgOAZAAQAXAAAOAMQANAMAAAVQAAAZgfAhIgtAxIBUAAIAAARg");
	this.shape_5.setTransform(-305.325,-54.825);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgJAJQgDgEAAgFQAAgFADgDQADgEAGAAQAHAAADAEQADADAAAFQAAAFgDAEQgDAEgHAAQgGAAgDgEg");
	this.shape_6.setTransform(-295.825,-127.875);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AALBVIAAiOIgqAQIAAgUIA8gWIADAAIAACog");
	this.shape_7.setTransform(-306.875,-135.2);

	this.text = new cjs.Text("", "10px 'Roboto-Regular'", "#FFFFFF");
	this.text.lineHeight = 17;
	this.text.parent = this;
	this.text.setTransform(-294.6,-141.75);

	this.instance = new lib.RestoreIcon("single",0);
	this.instance.setTransform(-103.15,-54.75,0.8958,0.8958,0,0,0,-0.1,-0.1);
	this.instance.alpha = 0.75;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_8.setTransform(-226.925,68.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_9.setTransform(-239.775,65.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgMAaAAIAVAAIAAgJQAAgMgHgGQgHgHgMABQgLgBgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgIAMgGQALgFANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAACIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgLgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_10.setTransform(-252.775,66.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_11.setTransform(-262.125,63.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_12.setTransform(-271.525,66.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_13.setTransform(394.05,23.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_14.setTransform(380.775,25.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgeIAAgDQAAgSAHgOQAHgOAMgIQANgIAQAAQAVAAAOANQAOAMABAVIgUAAQgBgMgJgJQgIgHgMgBQgPAAgJANQgJALAAAXIAAADQAAAVAJAMQAJAMAPAAQAMAAAIgIQAJgGABgLIAUAAQgBALgHAKQgGAJgMAGQgLAGgNAAQgYAAgPgRg");
	this.shape_15.setTransform(368.325,25.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_16.setTransform(355.525,25.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_17.setTransform(336.3,23.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_18.setTransform(322.925,25.975);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADADAIABIAKgBIAAARQgJACgIAAQgOAAgGgJg");
	this.shape_19.setTransform(312.3,24.45);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_20.setTransform(302.275,25.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_21.setTransform(289.225,25.975);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIANQAJALAPABQAUgBAJgRIAAg5QgJgRgUAAQgPAAgJAMg");
	this.shape_22.setTransform(268.075,23.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_23.setTransform(255.225,25.85);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPANgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgJAMgBAXQABAUAJANQAKANAPAAQARAAAJgNQAKgNAAgWQAAgUgKgNQgKgOgQAAQgPAAgKAOg");
	this.shape_24.setTransform(242.05,25.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_25.setTransform(232.375,23.225);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_26.setTransform(223.425,25.85);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_27.setTransform(213.675,25.725);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_28.setTransform(198.425,23.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPANgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQAAAKgNQAJgNAAgWQABgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_29.setTransform(188.8,25.85);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgfBJIgBAPIgUAAIAAixIAVAAIAABCQAOgQAVAAQAXAAANARQANARAAAeIAAACQAAAcgNASQgNARgXAAQgWAAgNgRgAgfgBIAAA1QALAUAUAAQAOAAAJgMQAIgMAAgYQAAgWgIgLQgIgMgPABQgVAAgKATg");
	this.shape_30.setTransform(175.7,23.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_31.setTransform(158.475,25.725);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARAAAJgNQAJgNAAgWQABgUgKgNQgKgOgQAAQgPAAgKAOg");
	this.shape_32.setTransform(141.35,25.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_33.setTransform(130.4,24.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_34.setTransform(112.725,25.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_35.setTransform(99.725,25.85);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_36.setTransform(88.15,23.225);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgPQAHgOANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgQgIgKQgIgIgNgBQgMAAgJAKg");
	this.shape_37.setTransform(75.325,25.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_38.setTransform(64.75,24.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgPAVQALgPAAgPIAAgUIAUAAIAAARQAAAMgGALQgFALgIAIg");
	this.shape_39.setTransform(50.9,32.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_40.setTransform(42.425,23.225);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEABAFQgBAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_41.setTransform(33,23.575);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIANQAJALAPABQAUgBAJgRIAAg5QgJgRgUAAQgPAAgJAMg");
	this.shape_42.setTransform(23.125,23.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_43.setTransform(10.275,25.725);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEAAgFQAAgFADgEQADgDAFAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgFAAgDgDg");
	this.shape_44.setTransform(0.85,23.575);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_45.setTransform(-6.25,24.45);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_46.setTransform(-24.325,28.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_47.setTransform(-37.175,25.725);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_48.setTransform(-46.6,23.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_49.setTransform(-52.425,23.225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_50.setTransform(-61.775,25.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgEAAgJQAAgJgGgEQgHgFgPgDQgQgEgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGAEAPAEQAQADAKAFQAKAEAFAHQAFAHAAAKQAAARgOAKQgNAKgWAAQgOAAgLgGg");
	this.shape_51.setTransform(-74.325,25.85);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_52.setTransform(-94.975,28.175);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_53.setTransform(-107.825,25.725);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_54.setTransform(-117.25,23.575);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_55.setTransform(-126.675,25.725);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_56.setTransform(-139.725,25.975);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_57.setTransform(-151.35,23.225);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_58.setTransform(-171,23.225);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_59.setTransform(-184.275,25.85);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgQIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_60.setTransform(-194.9,24.45);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AgoAvQgQgSAAgcIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAIQgNAJgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQAAAKgNQAKgNAAgWQAAgUgLgNQgJgOgQAAQgPAAgKAOg");
	this.shape_61.setTransform(-205.1,25.85);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AAmBUIg7hOIgUAVIAAA5IgXAAIAAinIAXAAIAABTIBJhTIAbAAIhBBKIBHBdg");
	this.shape_62.setTransform(-218.25,23.7);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAASIAAA5QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_63.setTransform(-240.825,25.85);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_64.setTransform(-252.4,23.225);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_65.setTransform(-262.1,23.575);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgmBIQgOgNAAgXIAWAAQAAAPAIAIQAIAIAOAAQAOAAAIgJQAJgIAAgQIAAh2IAWAAIAAB2QAAAYgOANQgPAOgYAAQgYAAgOgNg");
	this.shape_66.setTransform(-272.075,23.825);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_67.setTransform(199.125,-14.425);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_68.setTransform(186.125,-14.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_69.setTransform(173.175,-14.425);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_70.setTransform(160.175,-14.3);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_71.setTransform(148.6,-16.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgJQgHgKAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgFgFgHQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgHgLAAQgLAAgHAGQgGAFAAAIQAAAIAGAEQAGADAPAFQAQADAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_72.setTransform(129.775,-14.3);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_73.setTransform(117.225,-14.3);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEADAHABIAKgBIAAARQgJACgHAAQgOAAgHgJg");
	this.shape_74.setTransform(106.6,-15.7);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_75.setTransform(96.625,-14.3);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_76.setTransform(79.15,-16.925);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_77.setTransform(65.875,-14.3);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACADAIABIAKgBIAAARQgIACgJAAQgOAAgGgJg");
	this.shape_78.setTransform(55.25,-15.7);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAaAAAPASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARgBAJgNQAJgMAAgWQABgVgKgMQgKgOgQAAQgPAAgKAOg");
	this.shape_79.setTransform(45.05,-14.3);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_80.setTransform(33.15,-16.925);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_81.setTransform(13.925,-14.3);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAVAIALQAJAMAPABQAUgBAJgRIAAg5QgJgRgUgBQgPAAgJANg");
	this.shape_82.setTransform(0.525,-16.8);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_83.setTransform(-12.325,-14.3);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("Ag0BYIAAisIAUAAIAAAOQAOgRAWAAQAWAAANARQAOARAAAfIAAACQAAAbgOASQgMARgXAAQgWAAgNgOIAAA8gAgfgzIAAA7QAKARAUAAQAOAAAJgNQAKgMgBgXQABgVgKgMQgIgMgQAAQgSAAgLARg");
	this.shape_84.setTransform(-25.1,-12.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_85.setTransform(-44.425,-14.425);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_86.setTransform(-57.425,-14.3);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_87.setTransform(-69,-16.925);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_88.setTransform(-80.95,-16.925);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_89.setTransform(-94.275,-14.175);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgXBsIAAgQIAKABQAHAAAEgFQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHAAgGgDgAAChZQgDgDAAgFQAAgFADgEQADgDAGgBQAGABADADQAEAEAAAFQAAAFgEADQgDAEgGAAQgGAAgDgEg");
	this.shape_90.setTransform(-104.825,-14.05);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_91.setTransform(-112.925,-14.425);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_92.setTransform(-125.975,-14.175);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADADAHABIAKgBIAAARQgIACgJAAQgNAAgHgJg");
	this.shape_93.setTransform(-136.65,-15.7);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_94.setTransform(-143.05,-16.575);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACxIgUAAIgBgOQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAVAIALQAJAMAPABQAUgBAJgRIAAg5QgJgRgUgBQgPAAgJANg");
	this.shape_95.setTransform(-152.975,-16.8);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgcIAAgDQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANARAAAdIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgIIANAKQgPAZggAAQgYAAgQgRgAgTglQgJAKgCAQIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_96.setTransform(-171.275,-14.3);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_97.setTransform(-188.025,-14.425);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgKAagBIAVAAIAAgJQAAgMgHgGQgHgHgMAAQgLAAgIAGQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgFQALgFANAAQAVAAAMALQANALAAATIAAA4QAAASAFAJIAAADIgXAAQgCgEgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_98.setTransform(-204.825,-14.3);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_99.setTransform(-218.175,-11.975);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_100.setTransform(-233.875,-14.425);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQARAAAdIAAACQAAARgHAPQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMABAXQgBAUAKANQAKANAPAAQAQgBAKgNQAKgMgBgWQAAgVgKgMQgJgOgQAAQgPAAgKAOg");
	this.shape_101.setTransform(-245.25,-14.3);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_102.setTransform(-257.15,-16.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AgdBQQgPgHgIgLQgIgMAAgPIAWAAQAAAQAMAIQALAJASAAQARAAAKgHQAJgHAAgNQAAgMgJgHQgIgGgWgHQgdgIgNgLQgNgMAAgSQAAgTAQgNQAQgNAZgBQARABANAGQAOAHAIAMQAHAMAAAOIgWAAQAAgQgKgJQgKgJgRAAQgQABgJAHQgJAHAAANQAAAKAJAHQAIAIAUAGQAVAFAMAGQAMAIAGAJQAFAKAAAMQAAAVgQAMQgQAMgaAAQgRAAgPgGg");
	this.shape_103.setTransform(-270.975,-16.45);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_104.setTransform(119.325,-54.55);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_105.setTransform(102.625,-54.675);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_106.setTransform(85.775,-54.55);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_107.setTransform(72.475,-52.225);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgDgDg");
	this.shape_108.setTransform(57.25,-56.825);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_109.setTransform(47.475,-52.225);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_110.setTransform(34.625,-54.675);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_111.setTransform(21.625,-54.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_112.setTransform(12.275,-57.175);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_113.setTransform(2.875,-54.425);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_114.setTransform(-14.7,-57.175);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_115.setTransform(-28.025,-54.425);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgIAAQgOAAgGgJg");
	this.shape_116.setTransform(-38.7,-55.95);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_117.setTransform(-48.675,-54.675);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_118.setTransform(-61.725,-54.425);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_119.setTransform(-136.225,-57.175);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAHgOQAIgPANgIQAMgIAQAAQAaAAAPASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgYAAgQgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQARAAAJgOQAKgMAAgWQAAgVgKgMQgKgNgQgBQgPABgKANg");
	this.shape_120.setTransform(-145.85,-54.55);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgfBJIgBAOIgUAAIAAiwIAWAAIAABCQAMgQAXAAQAWAAANARQANARAAAdIAAADQAAAcgNASQgNARgWAAQgXAAgNgRgAgegBIAAA1QAJATAVABQAPAAAIgMQAJgMAAgYQAAgWgJgLQgIgMgPAAQgVAAgJAUg");
	this.shape_121.setTransform(-158.95,-57.05);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_122.setTransform(-176.175,-54.675);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgeIAAAAQAAgTAHgOQAHgPANgIQANgIAQAAQAaAAAPASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQAAAKgOQAKgMAAgWQgBgVgJgMQgKgNgQgBQgPABgKANg");
	this.shape_123.setTransform(-193.3,-54.55);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIAAIAKgCIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_124.setTransform(-204.2,-55.95);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_125.setTransform(-220.125,-54.675);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgTAPgLQAPgLAaABIAVAAIAAgKQAAgMgHgGQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_126.setTransform(-233.125,-54.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_127.setTransform(-244.7,-57.175);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMgBAIgFQAIgEAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgQgIgKQgIgJgNAAQgMAAgJAKg");
	this.shape_128.setTransform(-257.575,-54.55);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AgKBUIAAiVIg2AAIAAgSICBAAIAAASIg2AAIAACVg");
	this.shape_129.setTransform(-270.925,-56.7);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgIg/QgEgEAAgFQAAgFAEgEQADgDAFAAQAGAAAEADQACAEAAAFQAAAFgCAEQgEADgGAAQgFAAgDgDg");
	this.shape_130.setTransform(136.1,-97.075);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_131.setTransform(126.725,-94.8);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_132.setTransform(113.725,-94.675);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_133.setTransform(101.175,-94.8);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_134.setTransform(89.025,-94.8);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_135.setTransform(76.525,-94.8);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_136.setTransform(57.675,-92.475);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_137.setTransform(44.825,-94.925);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_138.setTransform(31.825,-94.8);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AglBXIgIgBIAAgRIAGAAQALAAAGgEQAGgFAEgLIAEgNIgsh7IAXAAIAeBdIAdhdIAXAAIgyCQQgLAfgZAAg");
	this.shape_139.setTransform(19.725,-92.275);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_140.setTransform(1.725,-94.925);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_141.setTransform(-11.275,-94.8);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AAeA+IgehdIgdBdIgRAAIglh8IAVAAIAZBdIAdhdIAQAAIAeBfIAYhfIAWAAIglB8g");
	this.shape_142.setTransform(-26.575,-94.8);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_143.setTransform(-41.475,-94.8);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AAcBZIAAhTQAAgNgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAIIAABZIgVAAIAAixIAVAAIAABEQAPgSAVAAQAoAAAAAsIAABTg");
	this.shape_144.setTransform(-54.375,-97.425);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_145.setTransform(-71.95,-97.425);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_146.setTransform(-81.65,-97.075);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHAEAEQACAEAIgBIAKgBIAAARQgIADgJAAQgOAAgGgJg");
	this.shape_147.setTransform(-88.75,-96.2);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgYA8QgMgGgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAHAMgBQANAAAHgEQAHgFAAgJQAAgIgGgFQgHgFgPgEQgQgDgKgEQgJgFgFgGQgEgHAAgJQAAgQANgKQANgLATAAQAVAAANALQANALAAARIgVAAQAAgIgHgHQgIgGgLAAQgLAAgHAFQgGAFAAAIQAAAIAGAEQAGAEAPADQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgFg");
	this.shape_148.setTransform(-98.325,-94.8);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_149.setTransform(-107.3,-97.075);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_150.setTransform(-113.625,-94.925);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_151.setTransform(-124.325,-94.8);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AgDBGQgHgJAAgPIAAhNIgXAAIAAgRIAXAAIAAgeIAUAAIAAAeIAXAAIAAARIgXAAIAABNQAAAHADAEQADAEAIgBIAKgBIAAARQgJADgHAAQgPAAgGgJg");
	this.shape_152.setTransform(-134.9,-96.2);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_153.setTransform(-143.55,-97.425);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_154.setTransform(-156.825,-94.8);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_155.setTransform(-166.675,-94.925);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_156.setTransform(-177.775,-94.8);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_157.setTransform(-189.35,-97.425);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AgkAwQgQgQAAgcIAAgEQAAgSAHgPQAHgPANgHQANgJAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABATAKALQALAMAOgBQAMAAAIgEQAIgFAFgHIANAKQgPAYggAAQgYAAgQgRgAgTglQgJAKgCARIA+AAIAAgCQgBgQgIgJQgIgKgNABQgMAAgJAJg");
	this.shape_158.setTransform(-208.075,-94.8);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_159.setTransform(-221.325,-92.475);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_160.setTransform(-234.225,-94.925);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AgnA2QgMgKAAgQQAAgUAPgJQAPgLAaAAIAVAAIAAgKQAAgLgHgHQgHgGgMAAQgLAAgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAASIAAA6QAAAQAFALIAAABIgXAAQgCgDgBgJQgPAPgTAAQgTAAgMgLgAgdAZQAAAKAGAGQAHAFALAAQAJAAAJgFQAJgFAEgJIAAgZIgRAAQgmAAAAAXg");
	this.shape_161.setTransform(-247.225,-94.8);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_162.setTransform(-257.075,-94.925);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgiBNQgPgKgJgSQgIgTgBgXIAAgLQAAgYAJgTQAIgTAQgJQAPgKATAAQAUAAAQAKQAPAJAIATQAJASAAAZIAAAKQAAAYgJATQgIASgPAKQgPAKgVAAQgTAAgPgKgAgggyQgMAQgBAcIAAAMQAAAcANARQAMARAUAAQAWAAALgQQAMgQABgdIAAgLQAAgfgMgPQgMgRgWABQgUgBgMARg");
	this.shape_163.setTransform(-269.875,-96.95);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_164.setTransform(394.25,-137.625);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_165.setTransform(380.975,-135);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIADAEQADAEAIAAIAKgBIAAAQQgJADgIAAQgOAAgGgJg");
	this.shape_166.setTransform(370.35,-136.4);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAIgPQAGgPAOgIQAMgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgKAMAAAXQAAAUAKANQAKANAPAAQAQgBAKgNQAJgMAAgWQABgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_167.setTransform(360.15,-135);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgNAOIAAAsIgWAAIAAixIAWAAIAABrIALgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_168.setTransform(348.25,-137.625);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_169.setTransform(323.675,-134.875);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AgXBsIAAgRIAKACQAHgBAEgEQADgDAAgKIAAiLIAVAAIAACLQAAAjggABQgHgBgGgCgAAChZQgDgDAAgFQAAgGADgDQADgDAGgBQAGABADADQAEADAAAGQAAAFgEADQgDAEgGAAQgGAAgDgEg");
	this.shape_170.setTransform(313.125,-134.75);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_171.setTransform(304.975,-134.875);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_172.setTransform(291.975,-135.125);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_173.setTransform(279.425,-135);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_174.setTransform(262.725,-135.125);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_175.setTransform(234.625,-135);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AgmBIQgOgSAAgcIAAgCQAAgcAOgSQANgRAXAAQAVAAAMAPIAAhBIAWAAIAACwIgUAAIgBgNQgNAQgWAAQgVAAgOgSgAgWgIQgIALAAAYQAAAUAIAMQAJANAPAAQAUAAAJgSIAAg5QgJgSgUAAQgPAAgJANg");
	this.shape_176.setTransform(221.175,-137.5);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAAEADQADAEAAAFQAAAFgDAEQgEADgGAAQgFAAgEgDg");
	this.shape_177.setTransform(211.95,-137.275);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_178.setTransform(206.125,-137.625);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_179.setTransform(197.175,-135);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_180.setTransform(184.325,-135.125);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_181.setTransform(171.275,-135.125);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAzBUIgQgsIhFAAIgQAsIgXAAIBAinIATAAIBACngAgcAWIA5AAIgdhOg");
	this.shape_182.setTransform(157.125,-137.15);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("ABCBAIAAhSQAAgNgGgHQgGgGgOAAQgMAAgIAHQgIAHgBAMIAABSIgVAAIAAhRQAAgbgbAAQgVAAgHARIAABbIgWAAIAAh8IAVAAIAAAOQAOgRAXAAQAaAAAJAVQAGgJAKgGQAKgGAOAAQApAAABAsIAABTg");
	this.shape_183.setTransform(127.825,-135.125);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_184.setTransform(110.875,-134.875);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AgKBZIAAixIAVAAIAACxg");
	this.shape_185.setTransform(101.525,-137.625);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAVAAIAAB8gAgJg/QgDgEAAgFQAAgFADgEQAEgDAFAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgFAAgEgDg");
	this.shape_186.setTransform(95.75,-137.275);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AgzBUIAAinIBnAAIAAASIhRAAIAAA6IBGAAIAAARIhGAAIAABKg");
	this.shape_187.setTransform(86.875,-137.15);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AAbBZIgrg6IgOAOIAAAsIgVAAIAAixIAVAAIAABrIAMgOIAmgoIAaAAIgvAzIA1BJg");
	this.shape_188.setTransform(63.3,-137.625);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgDgDg");
	this.shape_189.setTransform(53.6,-137.275);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIAEAEQADAEAHAAIAKgBIAAAQQgIADgJAAQgNAAgHgJg");
	this.shape_190.setTransform(46.5,-136.4);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AgYA7QgMgFgGgKQgHgJAAgLIAWAAQAAALAIAGQAIAGAMABQANAAAHgGQAHgFAAgHQAAgKgGgEQgHgFgPgEQgQgDgKgEQgJgEgFgIQgEgGAAgJQAAgPANgLQANgLATAAQAVAAANALQANALAAARIgVAAQAAgJgHgGQgIgGgLgBQgLABgHAFQgGAFAAAIQAAAIAGAEQAGADAPAEQAQAEAKAFQAKAEAFAHQAFAHAAAKQAAAQgOALQgNAKgWAAQgOAAgLgGg");
	this.shape_191.setTransform(36.875,-135);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgIg/QgDgEAAgFQAAgFADgEQACgDAGAAQAGAAADADQADAEAAAFQAAAFgDAEQgDADgGAAQgGAAgCgDg");
	this.shape_192.setTransform(27.95,-137.275);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_193.setTransform(21.625,-135.125);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AgkAwQgQgRAAgbIAAgEQAAgSAHgOQAHgPANgJQANgIAOAAQAYAAAOAQQANAQAAAeIAAAIIhUAAQABASAKAMQALAMAOAAQAMAAAIgGQAIgEAFgHIANAJQgPAZggAAQgYAAgQgRgAgTglQgJAJgCARIA+AAIAAgBQgBgRgIgJQgIgIgNgBQgMAAgJAKg");
	this.shape_194.setTransform(10.925,-135);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAXAAIAAAQIgXAAIAABMQAAAIAEAEQACAEAIAAIAKgBIAAAQQgIADgJAAQgOAAgGgJg");
	this.shape_195.setTransform(0.35,-136.4);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgNAOIAAAsIgVAAIAAixIAVAAIAABrIALgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_196.setTransform(-8.3,-137.625);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_197.setTransform(-21.575,-135);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_198.setTransform(-31.425,-135.125);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_199.setTransform(-42.525,-135);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AAmBUIg6hOIgWAVIAAA5IgVAAIAAinIAVAAIAABTIBLhTIAbAAIhCBKIBGBdg");
	this.shape_200.setTransform(-55.3,-137.15);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_201.setTransform(-81.825,-132.675);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_202.setTransform(-94.725,-135.125);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AgKBVIAAh8IAUAAIAAB8gAgJg/QgCgEAAgFQAAgFACgEQADgDAGAAQAGAAADADQAEAEAAAFQAAAFgEAEQgDADgGAAQgGAAgDgDg");
	this.shape_203.setTransform(-104.15,-137.275);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AAcBAIAAhSQAAgOgGgGQgGgGgNAAQgKAAgHAFQgIAGgFAJIAABYIgVAAIAAh8IAUAAIABAPQAOgSAWAAQAoAAAAAtIAABSg");
	this.shape_204.setTransform(-113.525,-135.125);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AglA0QgLgMAAgWIAAhRIAVAAIAABQQAAAcAXAAQAYAAAIgSIAAhaIAVAAIAAB8IgUAAIAAgMQgNAPgXAAQgUAAgKgMg");
	this.shape_205.setTransform(-126.575,-134.875);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AAmBUIg6hOIgWAVIAAA5IgVAAIAAinIAVAAIAABTIBLhTIAbAAIhCBKIBGBdg");
	this.shape_206.setTransform(-139.45,-137.15);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_207.setTransform(-164.25,-137.625);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_208.setTransform(-177.525,-135);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AgDBGQgHgIAAgRIAAhMIgXAAIAAgQIAXAAIAAgfIAUAAIAAAfIAYAAIAAAQIgYAAIAABMQAAAIADAEQAEAEAHAAIAKgBIAAAQQgJADgHAAQgOAAgHgJg");
	this.shape_209.setTransform(-188.15,-136.4);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AgoAvQgQgRAAgdIAAgBQAAgSAHgPQAIgPAMgIQANgIAQAAQAZAAAQASQAQASAAAcIAAACQAAASgHAOQgHAOgNAJQgNAIgRAAQgZAAgPgSgAgZghQgJAMAAAXQAAAUAJANQAKANAPAAQAQgBAKgNQAKgMAAgWQAAgVgLgMQgJgNgQgBQgPABgKANg");
	this.shape_210.setTransform(-198.35,-135);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AAaBZIgqg6IgOAOIAAAsIgUAAIAAixIAUAAIAABrIAMgOIAmgoIAaAAIgwAzIA1BJg");
	this.shape_211.setTransform(-210.25,-137.625);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AgaBTQgMgGgHgKIALgNQAOARATAAQAPAAAJgJQAIgJAAgPIAAgLQgMAPgWAAQgWAAgNgSQgOgSAAgdQAAgeAOgRQANgRAXAAQAWAAAMAQIABgOIAUAAIAAB5QAAAZgOANQgPAOgYAAQgNAAgNgFgAgVg5QgJAMAAAYQAAAVAJALQAIAMAPAAQAUAAAJgSIAAg4QgJgSgUAAQgPAAgIAMg");
	this.shape_212.setTransform(-235.175,-132.675);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgnA3QgMgLAAgQQAAgTAPgLQAPgLAaAAIAVAAIAAgJQAAgLgHgHQgHgGgMgBQgLABgIAFQgIAGAAAIIgVAAQAAgJAHgJQAGgJAMgEQALgGANAAQAVAAAMALQANALAAATIAAA4QAAARAFAKIAAACIgXAAQgCgDgBgKQgPAQgTAAQgTAAgMgKgAgdAZQAAAKAGAFQAHAGALAAQAJAAAJgFQAJgFAEgIIAAgaIgRAAQgmAAAAAXg");
	this.shape_213.setTransform(-248.025,-135);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AgdBAIAAh8IAVAAIAAAOQAKgRATAAQAGAAADACIAAAUIgKgBQgUAAgIASIAABYg");
	this.shape_214.setTransform(-257.875,-135.125);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("Ag8BUIAAinIAwAAQAVAAARAJQAQAKAKASQAJASAAAXIAAAKQAAAYgJASQgJASgRAJQgSAKgVAAgAgmBCIAYAAQAYAAAPgQQAOgQAAgeIAAgJQAAgcgNgQQgOgQgYAAIgaAAg");
	this.shape_215.setTransform(-269.975,-137.15);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgIgJQgKgJgUAAQgaAAgNAWIAACnIg/AAIAAjtIA7AAIACAcQAaggApAAQAnAAARAWQATAXABAsIAACYg");
	this.shape_216.setTransform(209.85,-222.4);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AgfCmIAAjtIA/AAIAADtgAgZhtQgKgJAAgOQAAgPAKgJQAJgJAQAAQAQAAAKAJQAJAJAAAPQAAAOgJAJQgKAKgQAAQgPAAgKgKg");
	this.shape_217.setTransform(191.3,-226.875);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AhSBnQgWgUAAgfQAAgmAcgTQAbgUA1AAIAcAAIAAgOQAAgQgIgKQgIgKgSAAQgPAAgKAHQgJAIAAAOIhAAAQAAgVAOgSQAMgRAYgKQAWgKAdAAQArAAAaAWQAaAWAAAoIAABmQABAiAIARIAAAEIhAAAQgEgJgCgNQgXAagkAAQgiAAgYgUgAgpAsIAAADQAAAMAIAIQAJAIAOAAQANAAAMgHQAMgGAFgKIAAgpIgXAAQgvAAgDAhg");
	this.shape_218.setTransform(173.25,-222.175);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("ABqB5IAAiXQAAgTgHgKQgIgJgUAAQgdAAgLAbIAACiIg+AAIAAiXQAAgUgIgJQgIgJgUAAQgbAAgMAWIAACnIg/AAIAAjtIA7AAIACAbQAZgfArAAQAtAAARAkQAZgkAvAAQAmAAATAWQATAXAAAtIAACXg");
	this.shape_219.setTransform(141.775,-222.4);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AhCB5IAAjtIA8AAIACAdQARghAjAAQAKAAAJADIAAA9QgNgCgLAAQgkAAgJAZIAACag");
	this.shape_220.setTransform(115,-222.4);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_221.setTransform(93.975,-222.175);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("Ah2CgIAAk/IBwAAQA5AAAfAWQAeAXAAArQAAAXgMASQgNASgVAIQAZAFAOATQAOATAAAbQAAAugeAYQgdAXg2ABgAg0BrIA4AAQAXAAANgLQANgLAAgUQAAgsgtAAIg8AAgAg0gZIAxAAQAxgBAAgnQAAgVgNgKQgNgKgaAAIguAAg");
	this.shape_222.setTransform(67.525,-226.275);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AAlCoIg8hfIgXAXIAABIIg/AAIAAlPIA/AAIAAC5IANgPIA8hHIBLAAIhVBiIBdCKg");
	this.shape_223.setTransform(31.15,-227.15);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AhRBjQgUgWgBgrIAAiaIBAAAIAACYQAAAmAhgBQAgAAAMgVIAAioIBAAAIAADsIg8AAIgCgXQgXAcgpAAQgmAAgUgWg");
	this.shape_224.setTransform(5.05,-221.95);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("Ag4DSIAAgyQALACAIAAQAdAAAAgfIAAj6IA/AAIAAD6QAAAngVAWQgUAWgnAAQgQAAgPgEgAgDidQgJgJAAgOQAAgPAJgJQAJgJAQAAQAQAAAKAJQAKAJAAAPQAAAOgKAJQgKAKgQAAQgQAAgJgKg");
	this.shape_225.setTransform(-15.6,-222.075);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AAnB5IAAiXQAAgUgJgJQgIgJgVAAQgZAAgOAWIAACnIg/AAIAAjtIA7AAIACAcQAaggApAAQAnAAARAWQATAXAAAsIAACYg");
	this.shape_226.setTransform(-31.9,-222.4);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AhRBjQgUgWAAgrIAAiaIA/AAIAACYQAAAmAhgBQAgAAAMgVIAAioIA/AAIAADsIg7AAIgCgXQgYAcgoAAQgmAAgUgWg");
	this.shape_227.setTransform(-57.1,-221.95);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgjBTIAAh/IgjAAIAAgvIAjAAIAAg6IA/AAIAAA6IAoAAIAAAvIgoAAIAAB1QAAANAFAGQAFAGAOAAQAKAAAJgCIAAAwQgTAGgUAAQhCAAgBhDg");
	this.shape_228.setTransform(-77.525,-224.875);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AhKBbQghggAAg1IAAgGQAAgjAOgcQAOgdAZgPQAZgPAgAAQAxAAAcAfQAcAeAAA5IAAAZIiXAAQADAXAQAOQAPAOAXAAQAlAAAUgbIAgAjQgPAVgYALQgYALgeAAQgzAAghgggAgbg6QgMANgDAXIBXAAIAAgFQAAgVgLgLQgLgMgUAAQgSAAgMANg");
	this.shape_229.setTransform(-96.675,-222.175);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("Ah5CgIAAk/IB7AAQAlAAAbANQAbANAOAZQAPAYAAAfQABAvghAaQggAbg5AAIg5AAIAABxgAg4gFIA6AAQAbAAANgNQAOgMAAgXQAAgXgOgPQgOgOgYgBIg8AAg");
	this.shape_230.setTransform(-122.95,-226.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance},{t:this.text},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},12).to({state:[]},1).wait(12));

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


(lib.Pieces5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// pieces
	this.target = new lib.fish_1();
	this.target.name = "target";
	this.target.setTransform(623.45,475.95,0.0711,0.0711);
	new cjs.ButtonHelper(this.target, 0, 1, 1);

	this.target_1 = new lib.bulubabi_1();
	this.target_1.name = "target_1";
	this.target_1.setTransform(526.4,493.35,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_1, 0, 1, 1);

	this.target_2 = new lib.bulubabi_1();
	this.target_2.name = "target_2";
	this.target_2.setTransform(507.2,348.55,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_2, 0, 1, 1);

	this.target_3 = new lib.fish_1();
	this.target_3.name = "target_3";
	this.target_3.setTransform(466.15,447.95,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_3, 0, 1, 1);

	this.target_4 = new lib.porifera_1();
	this.target_4.name = "target_4";
	this.target_4.setTransform(633.55,521.95,0.0711,0.0711,0,0,0,26.8,35.9);
	new cjs.ButtonHelper(this.target_4, 0, 1, 1);

	this.target_5 = new lib.kelabang_1();
	this.target_5.name = "target_5";
	this.target_5.setTransform(346.2,520.15,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_5, 0, 1, 1);

	this.target_6 = new lib.bintangLuat();
	this.target_6.name = "target_6";
	this.target_6.setTransform(283.35,484.05,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_6, 0, 1, 1);

	this.target_7 = new lib.teripang_1();
	this.target_7.name = "target_7";
	this.target_7.setTransform(572.4,361.8,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_7, 0, 1, 1);

	this.target_8 = new lib.cacingrubellus();
	this.target_8.name = "target_8";
	this.target_8.setTransform(401.2,361.8,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_8, 0, 1, 1);

	this.target_9 = new lib.bintangLuat();
	this.target_9.name = "target_9";
	this.target_9.setTransform(631.65,407.15,0.0711,0.0711);
	new cjs.ButtonHelper(this.target_9, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.target_9},{t:this.target_8},{t:this.target_7},{t:this.target_6},{t:this.target_5},{t:this.target_4},{t:this.target_3},{t:this.target_2},{t:this.target_1},{t:this.target}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Pieces5, new cjs.Rectangle(259.8,333.1,399.3,207.69999999999993), null);


(lib.game1 = function(mode,startPosition,loop) {
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
		  Score.text = pieces.skor * 10;
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
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Layer_4
	this.popUpInfo = new lib.popUpInfo();
	this.popUpInfo.name = "popUpInfo";
	this.popUpInfo.setTransform(-48.6,-4.45);

	this.timeline.addTween(cjs.Tween.get(this.popUpInfo).wait(1));

	// logic
	this.Score = new cjs.Text("score", "18px 'Roboto'", "#FFFFFF");
	this.Score.name = "Score";
	this.Score.textAlign = "center";
	this.Score.lineHeight = 26;
	this.Score.lineWidth = 46;
	this.Score.parent = this;
	this.Score.setTransform(339.593,-143.35,1.9238,1.9238);

	this.btnInfo = new lib.btnInfo();
	this.btnInfo.name = "btnInfo";
	this.btnInfo.setTransform(308.75,-165.55,0.6435,0.6435,0,0,0,0.1,0);
	new cjs.ButtonHelper(this.btnInfo, 0, 1, 2, false, new lib.btnInfo(), 3);

	this.restart = new lib.Restart();
	this.restart.name = "restart";
	this.restart.setTransform(389.15,-166.75,0.7541,0.7541);
	new cjs.ButtonHelper(this.restart, 0, 1, 2, false, new lib.Restart(), 3);

	this.pieces = new lib.Pieces5();
	this.pieces.name = "pieces";
	this.pieces.setTransform(-456,-399.95);

	this.slots = new lib.Slots5();
	this.slots.name = "slots";
	this.slots.setTransform(-456,-399.95);

	this.winMessage = new cjs.Text("Sepertinya Tebakan Anda Salah, Silahkan Coba Lagi", "15px 'Roboto'", "#FFFFFF");
	this.winMessage.name = "winMessage";
	this.winMessage.textAlign = "center";
	this.winMessage.lineHeight = 20;
	this.winMessage.lineWidth = 382;
	this.winMessage.parent = this;
	this.winMessage.setTransform(-0.25,-181.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.winMessage},{t:this.slots},{t:this.pieces},{t:this.restart},{t:this.btnInfo},{t:this.Score}]}).wait(1));

	// bg
	this.instance = new lib.info();
	this.instance.setTransform(346.7,28.55);

	this.instance_1 = new lib._6e();
	this.instance_1.setTransform(-261,-162,0.5427,0.5473);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	// dasar
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(9,132,227,0.996)").s().p("EhB/Aa3QhyAAAAhoMAAAgydQAAhoByAAMCD/AAAQBxAAAABoMAAAAydQAABohxAAg");
	this.shape.setTransform(-7.5,-13);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.game1, new cjs.Rectangle(-485.2,-318.6,960.2,543.1), null);


(lib.g4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_216 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(216).call(this.frame_216).wait(1));

	// Layer_1
	this.instance = new lib._1pngcopy();
	this.instance.setTransform(-285,-167,0.59,0.59);

	this.instance_1 = new lib._2pngcopy();
	this.instance_1.setTransform(-285,-167,0.59,0.59);

	this.instance_2 = new lib._3();
	this.instance_2.setTransform(-285,-167,0.59,0.59);

	this.instance_3 = new lib._4e();
	this.instance_3.setTransform(-285,-167,0.59,0.59);

	this.instance_4 = new lib._5e();
	this.instance_4.setTransform(-285,-167,0.59,0.59);

	this.instance_5 = new lib._6e();
	this.instance_5.setTransform(-285,-167,0.59,0.59);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgyBFQgOgNAAgVQgBgYAUgNQASgOAhAAIAbAAIAAgMQAAgPgJgIQgIgIgQAAQgPAAgJAHQgKAHAAALIgbAAQAAgMAIgLQAJgLAOgHQAPgGAPAAQAcAAAQAOQAPANABAYIAABIQAAAWAFANIAAACIgcAAQgDgEgBgMQgTATgZAAQgYAAgPgNgAglAfQgBANAJAHQAJAIANAAQALAAAMgHQALgHAGgKIAAghIgWAAQgxAAABAdg");
	this.shape.setTransform(268.6,-0.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgvBvIgKgCIAAgWIAHABQAOAAAHgGQAIgGAFgOIAGgRIg5ibIAeAAIAnB2IAlh2IAdAAIhAC2QgOAnggAAg");
	this.shape_1.setTransform(253.325,3.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_2.setTransform(237.975,-0.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAiBxIg3hKIgQASIAAA4IgcAAIAAjgIAcAAIAACHIAOgSIAwgzIAhAAIg8BBIBEBdg");
	this.shape_3.setTransform(223.125,-3.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgMBsIAAidIAaAAIAACdgAgLhRQgEgEAAgGQAAgHAEgEQAEgFAHAAQAIAAAEAFQAEAEAAAHQAAAGgEAEQgEAFgIAAQgHAAgEgFg");
	this.shape_4.setTransform(210.85,-3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgEBZQgKgLAAgUIAAhhIgcAAIAAgVIAcAAIAAgnIAbAAIAAAnIAeAAIAAAVIgeAAIAABhQAAAKAEAEQADAFAKAAQAFAAAIgCIAAAWQgLADgKAAQgSAAgIgLg");
	this.shape_5.setTransform(201.9,-1.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgfBLQgOgGgJgMQgIgMAAgPIAbAAQAAAOALAIQAKAIAQAAQAPAAAJgGQAKgGAAgLQAAgLgJgGQgIgGgUgEQgUgFgMgFQgMgGgGgJQgFgIAAgMQAAgTAQgOQAQgNAZAAQAbAAAQAOQARAOAAAVIgbAAQAAgLgJgIQgJgIgPAAQgOAAgIAHQgIAGAAAKQAAAKAHAFQAIAFAUAFQATAEANAHQANAFAGAJQAGAJAAAMQAAAWgRAMQgRANgbAAQgSAAgPgHg");
	this.shape_6.setTransform(189.7,-0.125);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgMBsIAAidIAaAAIAACdgAgKhRQgFgEAAgGQAAgHAFgEQADgFAHAAQAIAAAEAFQAEAEAAAHQAAAGgEAEQgEAFgIAAQgHAAgDgFg");
	this.shape_7.setTransform(178.35,-3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AglBRIAAieIAaAAIABATQAMgWAYAAQAIAAAEACIAAAaIgNgBQgaAAgJAWIAABwg");
	this.shape_8.setTransform(170.425,-0.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_9.setTransform(156.775,-0.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AgEBZQgKgLAAgUIAAhhIgcAAIAAgVIAcAAIAAgnIAbAAIAAAnIAeAAIAAAVIgeAAIAABhQAAAKAEAEQADAFAKAAQAFAAAIgCIAAAWQgLADgKAAQgSAAgIgLg");
	this.shape_10.setTransform(143.4,-1.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AAiBxIg3hKIgQASIAAA4IgcAAIAAjgIAcAAIAACHIAOgSIAwgzIAhAAIg8BBIBEBdg");
	this.shape_11.setTransform(132.375,-3.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AgyBFQgOgNAAgVQgBgYAUgNQASgOAhAAIAbAAIAAgMQAAgPgJgIQgIgIgQAAQgPAAgJAHQgKAHAAALIgcAAQABgMAIgLQAJgLAOgHQAPgGAQAAQAbAAAQAOQAPANABAYIAABIQAAAWAFANIAAACIgcAAQgDgEgBgMQgTATgZAAQgYAAgPgNgAglAfQgBANAJAHQAJAIANAAQALAAAMgHQALgHAGgKIAAghIgWAAQgwAAAAAdg");
	this.shape_12.setTransform(115.6,-0.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AglBRIAAieIAaAAIABATQAMgWAYAAQAIAAAEACIAAAaIgNgBQgaAAgJAWIAABwg");
	this.shape_13.setTransform(103.175,-0.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AgyBFQgPgNABgVQgBgYAUgNQASgOAhAAIAbAAIAAgMQAAgPgJgIQgIgIgQAAQgPAAgJAHQgKAHAAALIgcAAQAAgMAJgLQAIgLAPgHQAPgGAPAAQAcAAAQAOQAPANABAYIAABIQAAAWAFANIAAACIgcAAQgDgEgBgMQgTATgZAAQgXAAgQgNgAglAfQAAANAIAHQAJAIANAAQALAAAMgHQALgHAGgKIAAghIgWAAQgwAAAAAdg");
	this.shape_14.setTransform(89.15,-0.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AAiBxIg3hKIgQASIAAA4IgcAAIAAjgIAcAAIAACHIAOgSIAwgzIAhAAIg8BBIBEBdg");
	this.shape_15.setTransform(74.425,-3.45);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AgMBsIAAidIAaAAIAACdgAgLhRQgEgEAAgGQAAgHAEgEQAEgFAHAAQAIAAAEAFQAEAEAAAHQAAAGgEAEQgEAFgIAAQgHAAgEgFg");
	this.shape_16.setTransform(54.7,-3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AgMBxIAAjgIAaAAIAADgg");
	this.shape_17.setTransform(47.4,-3.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AgyBFQgPgNABgVQgBgYAUgNQASgOAhAAIAbAAIAAgMQAAgPgJgIQgIgIgQAAQgPAAgJAHQgKAHAAALIgcAAQAAgMAJgLQAIgLAPgHQAPgGAPAAQAcAAAQAOQAPANABAYIAABIQAAAWAFANIAAACIgcAAQgDgEgBgMQgTATgZAAQgXAAgQgNgAglAfQAAANAIAHQAJAIANAAQALAAAMgHQALgHAGgKIAAghIgWAAQgwAAAAAdg");
	this.shape_18.setTransform(35.6,-0.125);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_19.setTransform(19.175,-0.275);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_20.setTransform(3.125,-0.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AAiBxIg3hKIgQASIAAA4IgcAAIAAjgIAcAAIAACHIAOgSIAwgzIAhAAIg8BBIBEBdg");
	this.shape_21.setTransform(-11.525,-3.45);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_22.setTransform(-35.875,-0.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgxBFQgPgNgBgVQABgYASgNQATgOAhAAIAaAAIAAgMQAAgPgIgIQgJgIgPAAQgOAAgKAHQgKAHAAALIgcAAQAAgMAJgLQAJgLAOgHQAPgGAPAAQAcAAAPAOQAQANAAAYIAABIQAAAWAHANIAAACIgdAAQgCgEgCgMQgTATgZAAQgXAAgPgNgAgmAfQAAANAJAHQAIAIAOAAQAMAAALgHQAMgHAEgKIAAghIgUAAQgyAAAAAdg");
	this.shape_23.setTransform(-52.3,-0.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AgMBsIAAidIAaAAIAACdgAgLhRQgEgEAAgGQAAgHAEgEQAEgFAHAAQAIAAAEAFQAEAEAAAHQAAAGgEAEQgEAFgIAAQgHAAgEgFg");
	this.shape_24.setTransform(-64.1,-3);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AgwBbQgSgWAAglIAAgCQAAgjARgWQASgWAcgBQAbABAQASIAAhSIAbAAIAADgIgZAAIgBgRQgRAUgcAAQgbAAgRgXgAgcgLQgLAOAAAfQAAAbALAOQAMAQASAAQAaAAAMgXIAAhIQgMgXgaABQgSAAgMAPg");
	this.shape_25.setTransform(-76.575,-3.3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgwBCQgNgPAAgdIAAhmIAbAAIAABmQAAAkAdAAQAeAAAKgXIAAhzIAbAAIAACeIgZAAIgBgQQgQATgdAAQgaAAgNgPg");
	this.shape_26.setTransform(-92.975,0.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("ABUBRIAAhoQAAgRgIgIQgIgJgSAAQgPAAgKAJQgKAJgCAQIAABoIgaAAIAAhnQAAgjghAAQgbAAgKAXIAABzIgbAAIAAieIAZAAIABASQASgVAeAAQAgAAAMAaQAHgMANgHQANgHARAAQA0AAABA4IAABpg");
	this.shape_27.setTransform(-114.35,-0.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_28.setTransform(-135.275,-0.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AAiBxIg3hKIgQASIAAA4IgcAAIAAjgIAcAAIAACHIAOgSIAwgzIAhAAIg8BBIBEBdg");
	this.shape_29.setTransform(-149.925,-3.45);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AgUAbQAOgUABgTIAAgYIAZAAIAAAVQABAPgIAOQgHAOgKAJg");
	this.shape_30.setTransform(-169.45,8.325);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AghBpQgQgIgJgMIAOgQQASAVAZAAQATAAAKgLQAMgLAAgVIAAgNQgRASgaAAQgcABgRgXQgSgXAAglQAAglARgWQASgWAcAAQAbAAARAUIABgRIAZAAIAACZQAAAggSARQgSASgfAAQgRAAgQgHgAgchJQgLAQABAeQgBAbALAOQAMAPASAAQAaAAAMgXIAAhHQgNgXgYAAQgUAAgLAPg");
	this.shape_31.setTransform(-180.65,2.85);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_32.setTransform(-197.025,-0.275);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AgyBFQgOgNAAgVQgBgYAUgNQASgOAhAAIAaAAIAAgMQABgPgJgIQgJgIgPAAQgPAAgJAHQgKAHAAALIgbAAQAAgMAIgLQAJgLAOgHQAPgGAQAAQAbAAAQAOQAPANAAAYIAABIQABAWAFANIAAACIgcAAQgDgEgBgMQgTATgZAAQgYAAgPgNgAglAfQgBANAJAHQAJAIANAAQALAAAMgHQAMgHAEgKIAAghIgVAAQgxAAABAdg");
	this.shape_33.setTransform(-213.45,-0.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AgdCJIAAgVIANABQAIAAAFgFQAEgFAAgMIAAiwIAbAAIAACvQAAAugpAAQgJAAgHgDgAAChxQgDgEAAgGQAAgHADgEQAEgFAIAAQAIAAAEAFQAEAEAAAHQAAAGgEAEQgEAFgIAAQgIAAgEgFg");
	this.shape_34.setTransform(-226.7,0.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_35.setTransform(-237.025,-0.275);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AgxBFQgPgNgBgVQABgYASgNQATgOAhAAIAaAAIAAgMQAAgPgIgIQgJgIgPAAQgOAAgKAHQgKAHAAALIgcAAQAAgMAJgLQAJgLAOgHQAPgGAPAAQAcAAAPAOQAQANAAAYIAABIQAAAWAHANIAAACIgdAAQgCgEgCgMQgTATgZAAQgXAAgPgNgAgmAfQAAANAJAHQAIAIAOAAQAMAAALgHQAMgHAEgKIAAghIgUAAQgyAAAAAdg");
	this.shape_36.setTransform(-253.45,-0.125);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AglBRIAAieIAaAAIABATQAMgWAYAAQAIAAAEACIAAAaIgNgBQgaAAgJAWIAABwg");
	this.shape_37.setTransform(-265.875,-0.275);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_38.setTransform(-279.525,-0.125);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AAiBxIg3hKIgQASIAAA4IgcAAIAAjgIAcAAIAACHIAOgSIAwgzIAhAAIg8BBIBEBdg");
	this.shape_39.setTransform(-294.175,-3.45);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("ABUBRIAAhoQAAgRgIgIQgHgJgTAAQgPAAgKAJQgKAJgBAQIAABoIgaAAIAAhnQgBgjghAAQgbAAgKAXIAABzIgbAAIAAieIAaAAIAAASQASgVAeAAQAgAAALAaQAJgMAMgHQANgHARAAQA0AAABA4IAABpg");
	this.shape_40.setTransform(257.55,-40.275);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgxBFQgPgNgBgVQABgYASgNQATgOAhAAIAaAAIAAgMQAAgPgIgIQgJgIgPAAQgOAAgKAHQgKAHAAALIgbAAQgBgMAJgLQAIgLAPgHQAOgGARAAQAbAAAPAOQAQANAAAYIAABIQAAAWAHANIAAACIgdAAQgCgEgCgMQgTATgZAAQgYAAgOgNgAgmAfQAAANAJAHQAIAIAOAAQALAAAMgHQAMgHAEgKIAAghIgUAAQgyAAAAAdg");
	this.shape_41.setTransform(236.25,-40.125);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgMBwIAAjgIAaAAIAADgg");
	this.shape_42.setTransform(224.45,-43.45);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AgxBFQgPgNgBgVQABgYASgNQATgOAhAAIAbAAIAAgMQAAgPgJgIQgIgIgQAAQgOAAgKAHQgKAHAAALIgcAAQAAgMAJgLQAIgLAPgHQAOgGAQAAQAcAAAPAOQAQANABAYIAABIQgBAWAHANIAAACIgdAAQgCgEgCgMQgTATgZAAQgXAAgPgNgAglAfQAAANAIAHQAJAIANAAQAMAAALgHQALgHAGgKIAAghIgVAAQgyAAABAdg");
	this.shape_43.setTransform(212.65,-40.125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgwBcQgSgXAAglIAAgBQAAgkARgWQASgXAcABQAbgBAQAUIAAhTIAbAAIAADgIgZAAIgBgRQgRAUgcAAQgbAAgRgWgAgcgLQgLAPAAAdQAAAcALAPQAMAPASAAQAaAAAMgXIAAhIQgMgWgagBQgSAAgMAQg");
	this.shape_44.setTransform(195.675,-43.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_45.setTransform(179.825,-40.125);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAiBwIg3hJIgQASIAAA3IgcAAIAAjgIAcAAIAACHIAOgRIAwgzIAhAAIg8BBIBEBcg");
	this.shape_46.setTransform(165.175,-43.45);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AgEBZQgJgLAAgVIAAhhIgdAAIAAgVIAdAAIAAgmIAaAAIAAAmIAeAAIAAAVIgeAAIAABiQAAAKADAEQAEAFAKAAQAFAAAIgCIAAAWQgKADgKAAQgTAAgIgLg");
	this.shape_47.setTransform(143.8,-41.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AgwBCQgNgPAAgdIAAhmIAbAAIAABmQAAAkAdAAQAeAAAKgXIAAhzIAbAAIAACeIgZAAIgBgQQgQATgdAAQgaAAgNgPg");
	this.shape_48.setTransform(131.025,-39.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AgoBdIgBASIgZAAIAAjgIAbAAIAABUQAQgVAdABQAcAAARAVQAQAWAAAlIAAACQAAAlgQAWQgRAWgcAAQgeAAgQgVgAgngCIAABEQAMAZAbAAQATAAAKgPQALgPAAgeQAAgcgLgPQgLgPgSAAQgbAAgMAZg");
	this.shape_49.setTransform(114.7,-43.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_50.setTransform(98.175,-40.125);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgfBLQgPgGgIgMQgIgMAAgPIAbAAQAAAOALAIQAKAIAQAAQAPAAAJgGQAKgGAAgLQAAgLgIgGQgJgGgUgEQgUgFgMgFQgMgGgGgJQgFgIgBgMQAAgTARgOQARgNAYAAQAbAAAQAOQASAOgBAVIgbAAQAAgLgJgIQgKgIgOAAQgOAAgIAHQgJAGAAAKQABAKAHAFQAIAFATAFQAVAEAMAHQANAFAGAJQAGAJAAAMQAAAWgRAMQgRANgbAAQgSAAgPgHg");
	this.shape_51.setTransform(82.35,-40.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AglBRIAAieIAaAAIABATQAMgWAYAAQAIAAAEACIAAAaIgNgBQgaAAgJAWIAABwg");
	this.shape_52.setTransform(70.375,-40.275);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_53.setTransform(56.725,-40.125);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#000000").s().p("AgEBZQgKgLABgVIAAhhIgdAAIAAgVIAdAAIAAgmIAaAAIAAAmIAeAAIAAAVIgeAAIAABiQAAAKAEAEQADAFAKAAQAFAAAIgCIAAAWQgLADgJAAQgTAAgIgLg");
	this.shape_54.setTransform(43.35,-41.9);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_55.setTransform(23.175,-40.275);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#000000").s().p("AgxBFQgPgNgBgVQABgYASgNQATgOAhAAIAaAAIAAgMQAAgPgIgIQgJgIgPAAQgOAAgKAHQgKAHAAALIgbAAQgBgMAJgLQAIgLAPgHQAOgGARAAQAbAAAPAOQAQANAAAYIAABIQAAAWAHANIAAACIgdAAQgCgEgCgMQgTATgZAAQgYAAgOgNgAgmAfQAAANAJAHQAIAIAOAAQALAAAMgHQAMgHAEgKIAAghIgUAAQgyAAAAAdg");
	this.shape_56.setTransform(6.75,-40.125);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#000000").s().p("AAmBPIgmh3IglB3IgWAAIguidIAbAAIAfB1IAlh1IAVAAIAmB4IAeh4IAbAAIguCdg");
	this.shape_57.setTransform(-12.7,-40.125);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_58.setTransform(-31.725,-40.125);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#000000").s().p("AAjBwIAAhoQAAgRgHgHQgIgJgQAAQgNAAgKAHQgKAHgFALIAABwIgbAAIAAjgIAbAAIAABWQASgWAcAAQAyAAAAA4IAABog");
	this.shape_59.setTransform(-48.025,-43.45);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_60.setTransform(-72.025,-40.275);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#000000").s().p("AgyBFQgPgNAAgVQAAgYAUgNQASgOAhAAIAaAAIAAgMQABgPgJgIQgJgIgPAAQgPAAgJAHQgKAHAAALIgbAAQAAgMAIgLQAJgLAOgHQAPgGAQAAQAbAAAQAOQAPANAAAYIAABIQABAWAFANIAAACIgcAAQgDgEgBgMQgTATgZAAQgYAAgPgNgAgmAfQAAANAJAHQAJAIANAAQALAAAMgHQAMgHAEgKIAAghIgVAAQgxAAAAAdg");
	this.shape_61.setTransform(-88.45,-40.125);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#000000").s().p("AAmBPIgmh3IglB3IgWAAIguidIAbAAIAfB1IAlh1IAVAAIAlB4IAfh4IAbAAIguCdg");
	this.shape_62.setTransform(-107.9,-40.125);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#000000").s().p("AguA9QgUgVAAgkIAAgEQAAgXAJgTQAJgSAQgLQAQgKASAAQAfAAARAUQARAVAAAlIAAALIhqAAQABAXANAPQANAOATAAQAOAAAKgGQAKgGAIgJIAQANQgUAegnAAQggAAgUgVgAgYgvQgMAMgCAWIBOAAIAAgDQgBgUgKgLQgKgMgRAAQgPAAgLAMg");
	this.shape_63.setTransform(-126.925,-40.125);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#000000").s().p("AAjBwIAAhoQAAgRgHgHQgIgJgQAAQgNAAgKAHQgKAHgFALIAABwIgbAAIAAjgIAbAAIAABWQASgWAcAAQAyAAAAA4IAABog");
	this.shape_64.setTransform(-143.225,-43.45);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#000000").s().p("AAjBRIAAhoQAAgRgHgIQgIgJgQAAQgNAAgKAHQgKAHgFAMIAABwIgbAAIAAieIAZAAIABAUQASgXAdAAQAyAAAAA5IAABog");
	this.shape_65.setTransform(-167.225,-40.275);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#000000").s().p("AgyBFQgOgNAAgVQgBgYAUgNQASgOAhAAIAbAAIAAgMQAAgPgJgIQgIgIgQAAQgPAAgJAHQgKAHAAALIgcAAQABgMAIgLQAJgLAOgHQAPgGAPAAQAcAAAQAOQAPANABAYIAABIQAAAWAFANIAAACIgcAAQgDgEgBgMQgTATgZAAQgYAAgPgNgAglAfQgBANAJAHQAJAIANAAQALAAAMgHQALgHAGgKIAAghIgWAAQgwAAAAAdg");
	this.shape_66.setTransform(-183.65,-40.125);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#000000").s().p("AAiBwIg3hJIgQASIAAA3IgcAAIAAjgIAcAAIAACHIAOgRIAwgzIAhAAIg8BBIBEBcg");
	this.shape_67.setTransform(-198.375,-43.45);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#000000").s().p("AAiBwIg3hJIgQASIAAA3IgcAAIAAjgIAcAAIAACHIAOgRIAwgzIAhAAIg8BBIBEBcg");
	this.shape_68.setTransform(-213.575,-43.45);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#000000").s().p("AgwBCQgNgPAAgdIAAhmIAbAAIAABmQAAAkAdAAQAeAAAKgXIAAhzIAbAAIAACeIgZAAIgBgQQgQATgdAAQgaAAgNgPg");
	this.shape_69.setTransform(-230.525,-39.975);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#000000").s().p("AgfBLQgPgGgHgMQgJgMAAgPIAbAAQABAOAKAIQAKAIAQAAQAPAAAKgGQAJgGAAgLQAAgLgIgGQgJgGgUgEQgUgFgMgFQgMgGgGgJQgFgIgBgMQAAgTARgOQAQgNAZAAQAbAAARAOQAQAOAAAVIgbAAQAAgLgJgIQgKgIgOAAQgOAAgIAHQgJAGAAAKQAAAKAIAFQAIAFATAFQAVAEAMAHQANAFAGAJQAGAJAAAMQAAAWgRAMQgRANgbAAQgSAAgPgHg");
	this.shape_70.setTransform(-246.5,-40.125);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#000000").s().p("AgxBFQgPgNgBgVQABgYASgNQATgOAhAAIAaAAIAAgMQAAgPgIgIQgJgIgPAAQgOAAgKAHQgKAHAAALIgbAAQgBgMAJgLQAJgLAOgHQAOgGARAAQAbAAAPAOQAQANAAAYIAABIQAAAWAHANIAAACIgdAAQgCgEgCgMQgTATgZAAQgYAAgOgNgAgmAfQAAANAJAHQAIAIAOAAQALAAAMgHQAMgHAEgKIAAghIgUAAQgyAAAAAdg");
	this.shape_71.setTransform(-262.35,-40.125);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#000000").s().p("ABOBrIAAhTIAChZIhFCsIgVAAIhGisIADBZIAABTIgcAAIAAjVIAkAAIBFCtIBFitIAlAAIAADVg");
	this.shape_72.setTransform(-283.6,-42.875);

	this.instance_6 = new lib.game1();
	this.instance_6.setTransform(-1.2,14.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},8).to({state:[{t:this.instance_2}]},20).to({state:[{t:this.instance_3}]},30).to({state:[{t:this.instance_4}]},50).to({state:[{t:this.instance_5}]},39).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},38).to({state:[{t:this.instance_6}]},31).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-486.4,-304.4,960.2,543.0999999999999);


// stage content:
(lib.materi16 = function(mode,startPosition,loop) {
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
		
		_this.btnMenuDasar1.on('click', function(){
		
		window.location.replace('../menu/index.html');
		});
		
		_this.btnNextDasar1.on('click', function(){
		
		window.location.replace('../materi17/index.html');
		});
		
		_this.btnBack3.on('click', function(){
		
		window.location.replace('../materi15/index.html');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// base
	this.instance = new lib.g4();
	this.instance.setTransform(488.2,306.25);

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

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AABAQQAIgMAAgLIAAgPIAUAAIAAANQAAAIgEAJQgFAJgHAGgAgcAQQAHgMAAgLIAAgPIAVAAIAAANQAAAIgFAJQgEAJgHAGg");
	this.shape.setTransform(587.675,102.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgaAxIAAhfIAYAAIABALQAGgNAOABQAEgBAEACIgBAYIgJAAQgOAAgEAKIAAA9g");
	this.shape_1.setTransform(581.225,108.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_2.setTransform(572.725,108.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AArAxIAAg8QgBgIgDgEQgCgDgIgBQgMAAgFALIAABBIgYAAIAAg8QAAgIgDgEQgEgDgHgBQgLABgFAIIAABDIgZAAIAAhfIAYAAIABALQAKgMARAAQARAAAHAOQAKgOASAAQAQgBAIAKQAHAJAAASIAAA8g");
	this.shape_3.setTransform(560.1,108.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAGgMQAFgLAKgGQAKgGAMAAQAUAAALAMQALANAAAWIAAAJIg7AAQABAJAGAGQAGAGAIAAQAQAAAHgLIANAOQgGAIgJAFQgKAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgHAAgEAFg");
	this.shape_4.setTransform(547.5,108.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgdAkQgMgNABgXIAAAAQgBgWAMgOQALgNAUABQASAAALAKQAKAKABARIgYAAQgBgHgEgFQgEgFgIAAQgHAAgEAHQgFAGgBAOIAAADQAAAOAFAHQAFAGAIAAQAHAAAEgEQAEgEABgGIAYAAQAAAJgGAIQgFAJgJAEQgJAEgLABQgTgBgMgNg");
	this.shape_5.setTransform(537.9,108.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgaAxIAAhfIAYAAIABALQAGgNAOABQAEgBAEACIgBAYIgJAAQgOAAgEAKIAAA9g");
	this.shape_6.setTransform(530.275,108.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgdAkQgNgMAAgWIAAgCQAAgNAFgMQAGgLAKgGQAKgGAMAAQATAAAMAMQALANAAAWIAAAJIg8AAQACAJAGAGQAGAGAJAAQAPAAAHgLIANAOQgFAIgLAFQgJAEgMABQgUgBgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgHAAgEAFg");
	this.shape_7.setTransform(521.8,108.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_8.setTransform(513.675,107.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_9.setTransform(503.075,107.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_10.setTransform(495.125,108.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AAPBEIgYgnIgJAJIAAAeIgZAAIAAiGIAZAAIAABJIAFgGIAYgcIAeAAIgjAnIAmA4g");
	this.shape_11.setTransform(485.9,106.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_12.setTransform(478.125,106.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AAQAxIAAg8QAAgJgEgDQgDgDgJgBQgJABgGAIIAABDIgZAAIAAhfIAYAAIABALQAKgNAQABQAPgBAIAKQAHAJAAARIAAA9g");
	this.shape_13.setTransform(466.175,108.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_14.setTransform(456.125,108.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_15.setTransform(446.225,110.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_16.setTransform(437.775,107.725);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AggAoQgIgKAAgRIAAg9IAZAAIAAA9QAAAPAOAAQAMAAAFgJIAAhDIAZAAIAABfIgYAAIgBgKQgJAMgQAAQgPAAgIgJg");
	this.shape_17.setTransform(429.825,108.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_18.setTransform(419.975,108.8);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgMBEIAAiGIAZAAIAACGg");
	this.shape_19.setTransform(412.775,106.8);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgaAxIAAhfIAYAAIABALQAGgNAOABQAEgBAEACIgBAYIgJAAQgOAAgEAKIAAA9g");
	this.shape_20.setTransform(403.025,108.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AgMBDIAAhfIAZAAIAABfgAgJgrQgEgEAAgFQAAgGAEgEQADgDAGAAQAHAAADADQAEAEAAAGQAAAFgEAEQgEAEgGAAQgFAAgEgEg");
	this.shape_21.setTransform(396.975,106.9);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgPALgIQALgHAUgBIAMAAIAAgFQAAgGgDgFQgEgDgGAAQgGAAgEACQgEAEAAAFIgZAAQAAgJAFgGQAFgHAJgFQAKgDAKAAQASgBAKAKQAKAIAAARIAAAnQABAOADAHIAAACIgZAAQgCgEgBgFQgJALgOAAQgOAAgJgJgAgQARIAAACQAAAFADADQAEADAGAAQAEAAAFgDQAFgCACgEIAAgQIgJAAQgTgBgBANg");
	this.shape_22.setTransform(389.775,108.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_23.setTransform(754.375,83.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("AgWA/QgJgEgGgHIAMgPQAJAKANAAQAKAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgSAAgKgOQgKgNAAgVIAAgCQAAgVAKgOQAKgNASAAQAPAAAJALIABgJIAWAAIAABbQABAMgGAJQgGAKgKAEQgKAFgNAAQgKAAgLgEgAgMgmQgFAHAAAPQAAANAFAHQAFAHAJAAQALAAAFgJIAAgnQgFgIgLAAQgJAAgFAHg");
	this.shape_24.setTransform(744.3,84.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgVA/QgLgEgFgHIALgPQAKAKAOAAQAJAAAGgFQAFgFAAgKIAAgFQgJAKgNAAQgRAAgLgOQgLgNAAgVIAAgCQAAgVALgOQALgNARAAQAPAAAIALIABgJIAYAAIAABbQgBAMgFAJQgGAKgKAEQgLAFgMAAQgLAAgJgEgAgMgmQgFAHAAAPQAAANAFAHQAGAHAHAAQAMAAAFgJIAAgnQgFgIgMAAQgHAAgGAHg");
	this.shape_25.setTransform(734.1,84.975);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_26.setTransform(724.075,83.1);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_27.setTransform(716.675,81.3);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgDgJAAQgKAAgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgNAPAAQAfABAAAiIAAA9g");
	this.shape_28.setTransform(709.275,81.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAGgLQAFgLAKgGQAKgHAMAAQATAAAMANQALANAAAWIAAAJIg8AAQACAKAGAFQAGAGAJAAQAPAAAHgLIANAOQgFAIgLAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgGAAgFAFg");
	this.shape_29.setTransform(699.45,83.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFFFFF").s().p("AgTAtQgKgFgFgGQgFgIgBgIIAYAAQABAGAFADQAEAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgFgDgIgCQgjgHABgUQAAgNAKgJQALgJAPAAQASAAALAJQALAJAAAOIgZAAQAAgGgEgDQgDgEgIAAQgFAAgDADQgEADAAAEQAAAEAEADQAEADAIACQAKABAGACQAVAHgBASQAAANgLAJQgLAHgSAAQgLABgIgFg");
	this.shape_30.setTransform(689.8,83.2);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgDgJAAQgKAAgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgNAPAAQAfABAAAiIAAA9g");
	this.shape_31.setTransform(675.725,81.2);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_32.setTransform(665.875,83.2);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_33.setTransform(655.975,83.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_34.setTransform(646.125,83.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_35.setTransform(638.125,82.125);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_36.setTransform(628.325,81.3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_37.setTransform(623.075,83.1);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAGgLQAEgLALgHQAKgFANgBQATAAAMANQANALABAUIAAAGQAAAWgMANQgNANgUAAQgUAAgMgNgAgOgUQgFAGAAAPQAAAOAFAGQAGAIAIAAQAJAAAGgIQAEgHAAgOQAAgOgEgGQgGgIgJAAQgJAAgFAIg");
	this.shape_38.setTransform(614.3,83.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_39.setTransform(604.325,84.925);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("AgYAKIAAgTIAxAAIAAATg");
	this.shape_40.setTransform(595.475,82.475);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_41.setTransform(589.675,81.3);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#FFFFFF").s().p("AgaAwIAAhdIAYAAIABALQAGgOAOAAQAEAAAEACIgBAYIgJgBQgOABgEAJIAAA9g");
	this.shape_42.setTransform(584.425,83.1);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AggAkQgMgNAAgXIAAAAQAAgOAFgLQAGgLAKgHQAKgFANgBQATAAAMANQAMALACAUIAAAGQAAAWgNANQgLANgVAAQgTAAgNgNgAgNgUQgGAGAAAPQAAAOAGAGQAEAIAJAAQAJAAAFgIQAGgHAAgOQAAgOgGgGQgFgIgJAAQgJAAgEAIg");
	this.shape_43.setTransform(575.65,83.2);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_44.setTransform(565.675,84.925);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_45.setTransform(553.525,81.3);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_46.setTransform(546.125,83.3);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_47.setTransform(538.725,81.2);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_48.setTransform(531.525,83.2);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_49.setTransform(524.325,81.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg7AAQABAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgFgFQgEgFgIAAQgGAAgFAFg");
	this.shape_50.setTransform(517.15,83.2);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgEgEQgCgEgJABQgLAAgFAKIAABAIgYAAIAAg7QAAgJgDgDQgEgEgHABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_51.setTransform(504.4,83.1);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FFFFFF").s().p("AgNAhIAAgyIgOAAIAAgTIAOAAIAAgXIAYAAIAAAXIAQAAIAAATIgQAAIAAAuQAAAGACACQACACAGAAIAHgBIAAAUQgHACgIAAQgaAAAAgbg");
	this.shape_52.setTransform(488.925,82.125);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_53.setTransform(480.975,83.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_54.setTransform(471.125,83.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("AgMBDIAAiGIAZAAIAACGg");
	this.shape_55.setTransform(463.925,81.2);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("AgdAkQgNgNAAgVIAAgCQAAgOAFgLQAGgLAKgGQAKgHAMAAQAUAAALANQALANAAAWIAAAJIg7AAQABAKAGAFQAGAGAIAAQAPAAAJgLIAMAOQgGAIgKAFQgJAFgMgBQgUAAgNgNgAgKgXQgFAGgBAJIAiAAIAAgCQAAgIgEgFQgFgFgIAAQgGAAgFAFg");
	this.shape_56.setTransform(456.75,83.2);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("AAOBDIgWglIgKAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_57.setTransform(447.6,81.2);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_58.setTransform(435.325,81.3);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_59.setTransform(428.125,83.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgqBDIAAiDIAYAAIAAAJQAKgLAOAAQARAAAKANQAKANAAAXIAAACQAAAVgKANQgKANgRAAQgOAAgJgKIAAAtgAgRgkIAAAmQAFAKAMAAQARAAAAgdQAAgOgEgHQgFgHgIAAQgMAAgFAJg");
	this.shape_60.setTransform(418.425,84.925);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgCgEQgDgEgIABQgMAAgEAKIAABAIgZAAIAAg7QAAgJgDgDQgEgEgHABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIACAKQAJgNASAAQARAAAHAPQAKgPATAAQAPABAHAIQAIAKAAASIAAA7g");
	this.shape_61.setTransform(405.35,83.1);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_62.setTransform(392.725,83.2);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AgUAtQgJgFgGgGQgEgIAAgIIAXAAQABAGAEADQAFAEAHAAQAHAAAEgDQAEgDAAgEQAAgFgFgCQgEgDgJgCQgjgHAAgUQAAgNALgJQALgJAPAAQATAAALAJQAKAJAAAOIgZAAQAAgGgDgDQgEgEgIAAQgFAAgEADQgDADAAAEQAAAEAEADQAEADAJACQAJABAHACQATAHABASQgBANgKAJQgMAHgSAAQgLABgJgFg");
	this.shape_63.setTransform(383.2,83.2);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#FFFFFF").s().p("AAPBDIgYglIgJAIIAAAdIgZAAIAAiGIAZAAIAABLIAFgHIAXgbIAfAAIgiAmIAlA3g");
	this.shape_64.setTransform(369.95,81.2);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_65.setTransform(359.725,83.2);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#FFFFFF").s().p("AgiBBIAAgTIAEAAQAHAAAEgCQADgDACgFIADgHIghhfIAbAAIARA7IASg7IAbAAIgmBtIgDAFQgHATgUAAQgFAAgGgCg");
	this.shape_66.setTransform(350.425,85.125);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_67.setTransform(340.825,83.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("AgMBCIAAhdIAZAAIAABdgAgJgrQgEgDAAgGQAAgGAEgDQADgEAGgBQAHABADAEQAEADAAAGQAAAGgEADQgEAEgGAAQgFAAgEgEg");
	this.shape_68.setTransform(333.425,81.3);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#FFFFFF").s().p("AArAwIAAg7QAAgIgDgEQgEgEgIABQgLAAgEAKIAABAIgZAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAXAAIABAKQALgNAQAAQASAAAHAPQAKgPASAAQAQABAIAIQAHAKAAASIAAA7g");
	this.shape_69.setTransform(323.25,83.1);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("AAQAwIAAg8QAAgHgEgEQgDgEgJABQgJgBgGAKIAABBIgZAAIAAhdIAYAAIABALQAKgOAQAAQAPABAIAIQAHAKAAARIAAA8g");
	this.shape_70.setTransform(305.875,83.1);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_71.setTransform(296.025,83.2);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#FFFFFF").s().p("AAQBDIAAg7QAAgIgEgEQgDgDgJAAQgKAAgFAHIAABDIgZAAIAAiGIAZAAIAAAzQAKgNAPAAQAfABAAAiIAAA9g");
	this.shape_72.setTransform(286.175,81.2);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#FFFFFF").s().p("AggApQgJgIAAgMQAAgQALgGQALgJAUABIAMAAIAAgGQAAgHgDgEQgEgDgGAAQgGAAgEADQgEADAAAFIgZAAQAAgIAFgIQAFgGAJgEQAKgEAKgBQASABAKAIQAKAKAAAPIAAApQABANADAHIAAABIgZAAQgCgDgBgFQgJALgOgBQgOABgJgJgAgQASIAAABQAAAEADAEQAEADAGAAQAEAAAFgDQAFgCACgFIAAgQIgJAAQgTAAgBAOg");
	this.shape_73.setTransform(276.325,83.2);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#FFFFFF").s().p("AgSA4IgBAKIgXAAIAAiGIAZAAIAAAxQAJgLAOAAQARAAAKAOQAKAMAAAXIAAABQAAAWgKANQgKANgRAAQgPAAgJgMgAgRAAIAAAmQAFAKAMAAQAMAAADgMQACgGAAgMQAAgPgEgFQgFgGgIAAQgMAAgFAIg");
	this.shape_74.setTransform(266.625,81.3);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#FFFFFF").s().p("AAqAwIAAg7QAAgIgDgEQgDgEgHABQgMAAgFAKIAABAIgYAAIAAg7QAAgJgDgDQgDgEgIABQgLgBgFAKIAABBIgZAAIAAhdIAYAAIABAKQAKgNARAAQARAAAHAPQAKgPATAAQAPABAHAIQAIAKAAASIAAA7g");
	this.shape_75.setTransform(253.55,83.1);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#FFFFFF").s().p("AggAnQgIgIAAgRIAAg9IAZAAIAAA8QAAAPAOAAQAMAAAFgJIAAhCIAZAAIAABdIgYAAIgBgJQgJAMgQgBQgPAAgIgJg");
	this.shape_76.setTransform(240.725,83.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#FFFFFF").s().p("AgNBAIAAhpIgmAAIAAgWIBnAAIAAAWIgnAAIAABpg");
	this.shape_77.setTransform(230.125,81.55);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#FFFFFF").s().p("AABAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgHAMgBALIAAAPgAgcAXIAAgNQAAgJAEgIQAFgKAHgFIAMAHQgIAMAAALIAAAPg");
	this.shape_78.setTransform(221.15,76.45);

	this.judulKI = new lib.bg1copy3();
	this.judulKI.name = "judulKI";
	this.judulKI.setTransform(523.7,95.05,1.7364,1.0347,0,0,0,0.4,0.3);
	this.judulKI.shadow = new cjs.Shadow("rgba(0,0,0,1)",1,1,8);

	this.instance_1 = new lib.Bitmap28();
	this.instance_1.setTransform(7,4);

	this.instance_2 = new lib.Bitmap5();
	this.instance_2.setTransform(-28,-39);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.judulKI},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.btnNextDasar1},{t:this.btnMenuDasar1},{t:this.btnBack3},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(452,231,518,330);
// library properties:
lib.properties = {
	id: 'E5CDFDBA3FE4B942B1F1FFB9273F4382',
	width: 960,
	height: 540,
	fps: 24,
	color: "#2980B9",
	opacity: 1.00,
	manifest: [
		{src:"images/_1pngcopy.png", id:"_1pngcopy"},
		{src:"images/_2pngcopy.png", id:"_2pngcopy"},
		{src:"images/_4e.png", id:"_4e"},
		{src:"images/_5e.png", id:"_5e"},
		{src:"images/bintanglaut.png", id:"bintanglaut"},
		{src:"images/Bitmap28.png", id:"Bitmap28"},
		{src:"images/_6e.png", id:"_6e"},
		{src:"images/bulubabi.png", id:"bulubabi"},
		{src:"images/cacingruubelus.png", id:"cacingruubelus"},
		{src:"images/fish.png", id:"fish"},
		{src:"images/kelabang.png", id:"kelabang"},
		{src:"images/porifera.png", id:"porifera"},
		{src:"images/teripang.png", id:"teripang"},
		{src:"images/_3.png", id:"_3"},
		{src:"images/Bitmap5.png", id:"Bitmap5"},
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
an.compositions['E5CDFDBA3FE4B942B1F1FFB9273F4382'] = {
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