import UI from "../../core/UI.js";

function Collapse({onUnhide, onHide, onSetHeight, children, height, time = 300}){
	let timer = null;
	let wrp = UI()
				.className("collpase-wrapper")
				.append(
					UI().className("collpase-wrapper-inner")
						.append(children)
				);

	this.collapse = () => {

		let height = wrp.html.clientHeight;

		console.log(height)

		if(timer) clearTimeout(timer);

		if(onHide) onHide(false, this, children);

		this.render
			.style()
				.add("height", height+"px")
			.className()
				.remove("collpase-root-entered")

		timer = setTimeout(() => {
			this.render
				.style()
					.add("height", 0+"px")

			timer = setTimeout(() => {
				if(onHide) onHide(true, this, children);
			}, time);
		}, 100);		
	}
	this.uncollapse = () => {

		let height = wrp.html.clientHeight;

		if(timer) clearTimeout(timer);

		if(onUnhide) onUnhide(false, this, children);

		this.render
			.style()
				.add("height", height+"px")

		timer = setTimeout(() => {
			this.render
				.className()
					.add("collpase-root-entered")
				.style()
					.add("height", "auto")

				if(onUnhide) onUnhide(true, this, children);
		}, time);
	}
	this.setHeight = (newHeight) => {
		let height = wrp.html.clientHeight;

		if(timer) clearTimeout(timer);

		if(onSetHeight) onSetHeight(false, this, children);

		this.render
			.style()
				.add("height", height+"px")
			.className()
				.remove("collpase-root-entered")

		timer = setTimeout(() => {
			this.render
				.style()
					.add("height", newHeight+"px")

			timer = setTimeout(() => {
				if(onSetHeight) onSetHeight(true, this, children);
			}, time);
		});		
	}

	

	this.render = UI("div")
		.className("collpase")
			.add(height === 0? "" : "collpase-root-entered")
		.style("height", (!height && height !== 0)? "auto" : height+"px")
			.add("transition", `height ${time}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`)
		.append(wrp)
}

export default props => new Collapse(props);