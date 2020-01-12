import UI from "../../core/UI.js";

function Link({ label, link, newTab = false }){
	this.render = UI("a").text(label);

	if(link) this.render.attribute("href", link);
	if(newTab) this.render.attribute("target", "_blank");
}

export default props => new Link(props);