(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
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


(lib.lingkaran = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#2C3E50").ss(1,1,1).p("AFhAAQAACShoBnQhnBoiSAAQiRAAhohoQhnhnAAiSQAAiRBnhoQBohnCRAAQCSAABnBnQBoBoAACRg");
	this.shape.setTransform(35.25,35.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.lingkaran, new cjs.Rectangle(-1,-1,72.5,72.5), null);


(lib.garis = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#2C3E50").s().p("AgLGQIAAAAIgBgBIAAg8IABgBIAAgBIABABIABABIAAA8IgBABIAAAAIgBAAgAgLEYIAAgBIgBgBIAAg7IABgCIAAAAIABAAIABACIAAA7IgBABIAAABIgBAAgAgLCgIAAgBIgBAAIAAg9IABgBIAAAAIABAAIABABIAAA9IgBAAIAAABIgBAAgAgNAZIAAgBIAAgoIAAgCIACgBIACABIAAACIAAAoIAAABIgCABIgCgBgAGbAZIg9AAIgBgBIAAAAIAAgBIABgBIA9AAIAAABIABABIgBAAIAAABIAAAAgAEjAZIg8AAIgBgBIgBAAIABgBIABgBIA8AAIABABIAAABIAAAAIgBABIAAAAgACqAZIg7AAIgCgBIAAAAIAAgBIACgBIA7AAIABABIABABIgBAAIAAABIgBAAgAhuAZIg8AAIgBgBIAAAAIAAgBIABgBIA8AAIABABIABABIgBAAIAAABIgBAAgAjlAZIg9AAIAAgBIgBAAIABgBIAAgBIA9AAIABABIAAABIAAAAIgBABIAAAAgAleAZIg7AAIgBgBIgBAAIABgBIABgBIA7AAIABABIABABIgBAAIAAABIgBAAgAgLhgIAAgBIgBgBIAAg7IABgBIAAgBIABABIABABIAAA7IgBABIAAABIgBAAgAgLjYIAAgBIgBgBIAAg8IABgBIAAAAIABAAIABABIAAA8IgBABIAAABIgBAAgAgLlQIAAAAIgBgBIAAg9IABAAIAAgBIABABIABAAIAAA9IgBABIAAAAIgBAAg");
	this.shape.setTransform(45.7,39.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.garis, new cjs.Rectangle(4.5,-0.1,82.4,80), null);


(lib.sekrup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.garis();
	this.instance.setTransform(43.4,42.3,1,1,0,0,0,43.4,42.3);

	this.instance_1 = new lib.lingkaran();
	this.instance_1.setTransform(44.45,42.15,1,1,0,0,0,35.2,35.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#2C3E50").ss(0.5,1,1).p("AAAgTIAAAnAAogTIgoAAIgnAA");
	this.shape.setTransform(44.525,44.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sekrup, new cjs.Rectangle(4.5,-0.1,82.4,80), null);


// stage content:
(lib._HTML5Canvas = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.sekrup();
	this.instance.setTransform(284.05,221,1,1,0,0,0,43.4,42.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:45.7,regY:39.9,x:286.35,y:218.6},0).wait(74).to({scaleX:1.0016,x:286.3},0).wait(1).to({scaleX:1.0032,x:286.35},0).wait(1).to({scaleX:1.0048,x:286.3},0).wait(1).to({scaleX:1.0064,x:286.35},0).wait(1).to({scaleX:1.0081},0).wait(1).to({scaleX:1.0097},0).wait(1).to({scaleX:1.0113},0).wait(1).to({scaleX:1.0129},0).wait(1).to({scaleX:1.0145},0).wait(1).to({scaleX:1.0161,x:286.4},0).wait(1).to({scaleX:1.0177,x:286.35},0).wait(1).to({scaleX:1.0193,x:286.4},0).wait(1).to({scaleX:1.0209,x:286.35},0).wait(1).to({scaleX:1.0225,x:286.4},0).wait(1).to({scaleX:1.0242},0).wait(1).to({scaleX:1.0258},0).wait(1).to({scaleX:1.0274},0).wait(1).to({scaleX:1.029,x:286.35},0).wait(1).to({scaleX:1.0306,x:286.4},0).wait(1).to({scaleX:1.0322},0).wait(1).to({scaleX:1.0338},0).wait(1).to({scaleX:1.0354},0).wait(1).to({scaleX:1.037},0).wait(1).to({scaleX:1.0387},0).wait(1).to({scaleX:1.0403,x:286.45},0).wait(1).to({scaleX:1.0419,x:286.4},0).wait(1).to({scaleX:1.0435,x:286.45},0).wait(1).to({scaleX:1.0451,x:286.4},0).wait(1).to({scaleX:1.0467,x:286.45},0).wait(1).to({scaleX:1.0483},0).wait(1).to({scaleX:1.0499},0).wait(1).to({scaleX:1.0515},0).wait(1).to({scaleX:1.0532},0).wait(1).to({scaleX:1.0548},0).wait(1).to({scaleX:1.0564,x:286.5},0).wait(1).to({scaleX:1.058,x:286.45},0).wait(1).to({scaleX:1.0596},0).wait(1).to({scaleX:1.0612},0).wait(1).to({scaleX:1.0628},0).wait(1).to({scaleX:1.0644,x:286.5},0).wait(1).to({scaleX:1.066,x:286.45},0).wait(1).to({scaleX:1.0676,x:286.5},0).wait(1).to({scaleX:1.0693,x:286.45},0).wait(1).to({scaleX:1.0709,x:286.5},0).wait(1).to({scaleX:1.0725},0).wait(1).to({scaleX:1.0741},0).wait(1).to({scaleX:1.0757},0).wait(1).to({scaleX:1.0773},0).wait(1).to({scaleX:1.0789},0).wait(1).to({scaleX:1.0805,x:286.55},0).wait(1).to({scaleX:1.0821,x:286.5},0).wait(1).to({scaleX:1.0838,x:286.55},0).wait(1).to({scaleX:1.0854,x:286.5},0).wait(1).to({scaleX:1.087},0).wait(1).to({scaleX:1.0886,x:286.55},0).wait(1).to({scaleX:1.0902,x:286.5},0).wait(1).to({scaleX:1.0918,x:286.55},0).wait(1).to({scaleX:1.0934},0).wait(1).to({scaleX:1.095},0).wait(1).to({scaleX:1.0966},0).wait(1).to({scaleX:1.0983},0).wait(1).to({scaleX:1.0999},0).wait(1).to({scaleX:1.1015,x:286.6},0).wait(1).to({scaleX:1.1031,x:286.55},0).wait(1).to({scaleX:1.1047,x:286.6},0).wait(1).to({scaleX:1.1063,x:286.55},0).wait(1).to({scaleX:1.1079,x:286.6},0).wait(1).to({scaleX:1.1095},0).wait(1).to({scaleX:1.1111},0).wait(1).to({scaleX:1.1127},0).wait(1).to({scaleX:1.1144},0).wait(1).to({scaleX:1.116},0).wait(1).to({scaleX:1.1176},0).wait(1).to({scaleX:1.1192},0).wait(1).to({scaleX:1.1208},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(720.5,498.6,-387.7,-240);
// library properties:
lib.properties = {
	id: 'BBA98D11ACD0E6449764CA440C4221E6',
	width: 960,
	height: 640,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
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
an.compositions['BBA98D11ACD0E6449764CA440C4221E6'] = {
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
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;