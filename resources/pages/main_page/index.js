function preRender(){
	logoAnim(render);
}

function render(logo){
	var wrp = new UI("div").text(Loc.test);
	document.getElementById("resize-wrapper").appendChild(wrp.getHTML());
	
}

function logoAnim(callback){
	var logo = new UI("canvas")
		.class("logo-loader")
		.addAttribute("width", "178")
		.addAttribute("height", "245");
	document.getElementById("resize-wrapper").appendChild(logo.getHTML());

	var canvas 	= logo.getHTML();
	var ctx 	= canvas.getContext('2d');
	var time 	= 0;
	var start 	= performance.now();

	function animate(timeNow) {
		time = (timeNow - start)*0.0004;
		canvas.width = canvas.width;
		drawCircle(Transition.cubic.ease(time));
		if(time > 0.5)
			drawLine(Transition.cubic.ease(time*2-1));	
		if(time < 1) requestAnimationFrame(animate);
		else if(callback) callback(logo);
	}
	requestAnimationFrame(animate);

	function drawCircle(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = "rgb(16,115,221)";
		ctx.beginPath();
		ctx.arc(178/2, 245/2, 178/2-10, Math.PI*0.5*(t-1), Math.PI*0.5*(t*5-1));
		ctx.stroke();
	}

	function drawLine(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = "rgb(16,115,221)";
		ctx.beginPath();
		ctx.moveTo(39.5, 243);
		ctx.lineTo(31*t+39.5, 241*(1-t)+2);
		ctx.stroke();	
	}
}