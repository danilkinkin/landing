import UI from "../../core/UI.js";

function Link({ label, link }){
	this.render = UI("a").text(label);

	if(link) this.render.attribute("href", link);
}

export default props => new Link(props);