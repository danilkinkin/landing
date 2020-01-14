import UI from "../core/UI.js";
import Logo from "../components/custom/Logo.js";

function Preloader({ onLoad, invert = false }){
	this.render = UI("preloader")	
		.append(Logo({ onLoad, isBlueFill: invert }))

	if(invert) this.render.className("preloader-invert");
}

export default props => new Preloader(props);