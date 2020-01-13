import UI from "../../core/UI.js";

function Link({ label, link, newTab = false, content }){
	this.render = UI("a");
	
	if(label && !content) this.render.text(label)
	if(link) this.render.attribute("href", link);
	if(content) this.render.append(content);
	if(newTab) this.render.attribute("target", "_blank");
}

export default props => new Link(props);