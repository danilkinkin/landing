/*var canvas 			= document.getElementById("canvas");
var ctx 			= canvas.getContext("2d");
var radius 			= 130;
var fcos = (x)=>1-(x*x)/(2);
var fsin = (x)=>x-(x*x*x)/(6);
var lNoise 			= [];
var aNoise 			= [];
var sNoise 			= [];

window.onresize = function(){
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	generateNoise();
	//update();
}

window.onmousemove = function(e){
	canvas.width = canvas.width;
	drawExperemental(e.clientX-70, e.clientY-70, 900, 400);
}

function ini(){
	window.onresize();
	draw(0, 0, 100, 100);
}
ini();

function draw(x0, y0, x1, y1){
	var radius = 130
	for(var x=x0; x<x0+x1; x+=3){
		for(var y=y0; y<y0+y1; y+=3){
			var xR = x-x0%3;
			var yR = y-y0%3;
			if(xR-radius>x0 && xR+radius<x0+x1 && yR-radius>y0 && yR+radius<y0+y1) continue;
			var d1 = (xR*(yR+1))%100;
			var d2 = ((xR+1)%d1)%100;
			var d3 = ((yR)%d2)%100;

			var pX = xR+sNoise[d1]*fcos(aNoise[d2])*radius*lNoise[d3];
			var pY = yR+fsin(aNoise[d2])*radius*lNoise[d3];

			if(pX<x0 || pX>x0+x1 || pY<y0 || pY>y0+y1){
				drawGrain(pX, pY, 2*(aNoise[d3]+2)*(1-dist(pX, pY, pX<x0? x0 : (pX>x0+x1? x0+x1 : pX), pY<y0? y0 : (pY>y0+y1? y0+y1 : pY))/radius), "#3a0557");
			}		
		}
	}
	ctx.strokeStyle = "#000";
	ctx.strokeRect(x0, y0, x1, y1);
}

function drawExperemental(x0, y0, x1, y1){
	
	for(var x=x0; x<x0+x1; x+=3){
		for(var y=y0; y<y0+y1; y+=3){
			var xR = x-x0%3;
			var yR = y-y0%3;
			if(xR-radius>x0 && xR+radius<x0+x1 && yR-radius>y0 && yR+radius<y0+y1) continue;
			var d1 = (xR*(yR+1))%100;
			var d2 = ((xR+1)%d1)%100;
			var d3 = ((yR)%d2)%100;

			var pX = xR+sNoise[d1]*fcos(aNoise[d2])*radius*lNoise[d3];
			var pY = yR+fsin(aNoise[d2])*radius*lNoise[d3];

			if(pX<x0 || pX>x0+x1 || pY<y0 || pY>y0+y1){
				drawGrain(pX, pY, 4*(aNoise[d3]+3)*(1-dist(pX, pY, pX<x0? x0 : (pX>x0+x1? x0+x1 : pX), pY<y0? y0 : (pY>y0+y1? y0+y1 : pY))/radius), "#3a0557");
			}		
		}
	}
	ctx.fillStyle = "#3a0557";
	ctx.fillRect(x0, y0, x1, y1);
}

function drawGrain(x, y, r, color){
	if(r < 1) return;
	ctx.fillStyle = color;
	if(r<3.5)	ctx.fillRect(x-r*0.5, y-r*0.5, r, r);
	else{
		ctx.beginPath();
		ctx.arc(x, y, r*0.5, 0, 2*Math.PI);
		ctx.fill();
	}
}

function dist(x0, y0, x1, y1){
	return Math.abs(x1-x0)+Math.abs(y1-y0);
}

function generateNoise(){
	sNoise 	= [];
	aNoise 	= [];
	lNoise 	= [];
	for(var i = 0; i<100; i++){
		sNoise[i] = Math.round(Math.random())*2-1;

		aNoise[i] = (Math.random()*2-1)*1.5707963267948966;

		lNoise[i] = Math.random();
		lNoise[i] = lNoise[i]*lNoise[i]*lNoise[i];
	}
}*/

function Shadows(canvasID){
	this.radius 		= 130;
	var canvas 			= document.getElementById(canvasID);
	var ctx 			= canvas.getContext("2d");
	var lNoise 			= [];
	var aNoise 			= [];
	var sNoise 			= [];	
	var fcos 			= (x)=>1-(x*x)/(2);
	var fsin 			= (x)=>x-(x*x*x)/(6);


	this.resize 		= function(width, height){
		canvas.width 	= width;//document.documentElement.clientWidth;
		canvas.height 	= height;//document.documentElement.clientHeight;
		generateNoise();
	}

	this.resize(document.documentElement.clientWidth, document.documentElement.clientHeight)
	generateNoise();

	this.clear = function(){
		canvas.width = canvas.width;
	}

	this.draw = function(x0, y0, x1, y1, color){		
		for(var x=x0; x<x0+x1; x+=3){
			for(var y=y0; y<y0+y1; y+=3){
				var xR = x-x0%3;
				var yR = y-y0%3;
				if(xR-this.radius>x0 && xR+this.radius<x0+x1 && yR-this.radius>y0 && yR+this.radius<y0+y1) continue;
				var d1 = (xR*(yR+1))%100;
				var d2 = ((xR+1)%d1)%100;
				var d3 = ((yR)%d2)%100;

				var pX = xR+sNoise[d1]*fcos(aNoise[d2])*this.radius*lNoise[d3];
				var pY = yR+fsin(aNoise[d2])*this.radius*lNoise[d3];

				if(pX<x0 || pX>x0+x1 || pY<y0 || pY>y0+y1){
					drawGrain(pX, pY, 4*(aNoise[d3]+3)*(1-dist(pX, pY, pX<x0? x0 : (pX>x0+x1? x0+x1 : pX), pY<y0? y0 : (pY>y0+y1? y0+y1 : pY))/this.radius), color);
				}		
			}
		}
		/*ctx.fillStyle = "#3a0557";
		ctx.fillRect(x0, y0, x1, y1);*/
	}.bind(this);

	function drawGrain(x, y, r, color){
		if(r < 1) return;
		ctx.fillStyle = color? color : "#000";
		if(r<3.5)	ctx.fillRect(x-r*0.5, y-r*0.5, r, r);
		else{
			ctx.beginPath();
			ctx.arc(x, y, r*0.5, 0, 2*Math.PI);
			ctx.fill();
		}
	}

	function dist(x0, y0, x1, y1){
		return Math.abs(x1-x0)+Math.abs(y1-y0);
	}

	function generateNoise(){
		sNoise 	= [];
		aNoise 	= [];
		lNoise 	= [];
		for(var i = 0; i<100; i++){
			sNoise[i] = Math.round(Math.random())*2-1;

			aNoise[i] = (Math.random()*2-1)*1.5707963267948966;

			lNoise[i] = Math.random();
			lNoise[i] = lNoise[i]*lNoise[i]*lNoise[i]//*lNoise[i]*lNoise[i];
		}
	}
}