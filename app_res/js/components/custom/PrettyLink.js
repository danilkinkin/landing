import UI from "../../core/UI.js";
import { OpenInNew as OpenInNewIcon } from "../../core/Icons.js";

function Link({ label, link, newTab = false, content, isBlueFill = false, icon }){
	this.render = UI("a").className("pretty-link");

	console.log((newTab && OpenInNewIcon || icon) && 1)

	if(isBlueFill) this.render.className().add("invert-color");

	const hoverContent = UI()
		.className("pretty-link-hover-layer-wrapper")
		.append(content && Array.from(UI().append(content).html.cloneNode(true).children) || UI("span").text(label))
		.append(
			(newTab && OpenInNewIcon || icon) && (newTab && OpenInNewIcon || icon)({ size: 20, class: "pretty-link-hover-layer-icon" })
		);

	const hoverLayer = UI()
		.className("pretty-link-hover-layer")
		.append(hoverContent);

	let timer = null;

	this.render
		.append(hoverLayer)
		.append(content || UI("span").text(label))
		.event("mouseenter", () => {
			if(timer) clearTimeout(timer);
			timer = setTimeout(() => {
				hoverLayer.style("width", hoverContent.html.clientWidth+"px");
				timer = null;			
			}, 200);
		})
		.event("mouseleave", () => {
			if(timer) clearTimeout(timer);
			timer = setTimeout(() => {
				hoverLayer.style("width");
				timer = null;		
			}, 200);
		})

	if(link) this.render.attribute("href", link);
	if(newTab) this.render.attribute("target", "_blank");
}

export default props => new Link(props);