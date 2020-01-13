import UI from "../core/UI.js";

import {Logo as LogoIcon} from "../core/Icons.js";

function Icon({onLoad, invert}){
	this.render = UI("canvas")
		.className("icon-canvas")
		.attribute("width", "178")
		.attribute("height", "245");

	var ctx 	= this.render.html.getContext('2d');
	var time 	= 0;
	var start 	= performance.now();
	var percentload = 0;

	const drawFrame = () => {
		this.render.html.width = this.render.html.width;
		drawCircle(cubic(time));
		if(time > 0.5)
			drawLine(cubic(time*2-1));	
		if(time < 0.92){
			time += (percentload*0.01 - time)*0.06;
			percentload+=time*2+0.8;
			requestAnimationFrame(drawFrame);
		}else{
			if(time != 1){
				time = 1;
				setTimeout(() => onLoad(), 200);
				requestAnimationFrame(drawFrame);
			}
			
		}
	}

	function drawCircle(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = invert? "#0000FF" : "#fff";
		ctx.beginPath();
		ctx.arc(178/2, 245/2, 178/2-10, Math.PI*0.5*(t-1), Math.PI*0.5*(t*5-1));
		ctx.stroke();
	}

	function drawLine(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = invert? "#0000FF" : "#fff";
		ctx.beginPath();
		ctx.moveTo(39.5, 243);
		ctx.lineTo(31*t+39.5, 241*(1-t)+2);
		ctx.stroke();	
	}

	function cubic(t, power){
		if (t < 0.5) return 4*t*t*t;
		return 4*(t-1)*(t-1)*(t-1)+1;
	}

	requestAnimationFrame(drawFrame);
}

function Preloader({ onLoad, invert = false }){
	this.render = UI("preloader")	
		.append(new Icon({ onLoad, invert }))

	if(invert) this.render.className("preloader-invert");
}

export default props => new Preloader(props);