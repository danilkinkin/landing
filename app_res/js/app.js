import { setLocale, getValue as LOC} from "./utils/Locale.js";
import UI from "./core/UI.js";

import Collapse from "./components/base/Collapse.js";
import Home from "./pages/Home.js";
import Contacts from "./pages/Contacts.js";
import Preloader from "./pages/Preloader.js";

setLocale("RU");
document.title = "Danilkinkin";
window.onhashchange = route;

function route() {
	switch (window.location.hash.substring(1)) {
		case "contacts":
			contacts.uncollapse();
			home.collapse();
			break;
		default:
			window.location.hash = "#";
			home.uncollapse();
			contacts.collapse();
			break;
	}
}

let home = Collapse({
	children: Home().render
		.style("transition", `transform ${800}ms cubic-bezier(0.81, 0, 0.31, 1) 0ms`)
			.add("transform", "translateY(-150px)"),
	time: 800,
	onUnhide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.style().remove("transform")
		}
	}, 
	onHide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.style().add("transform", "translateY(-150px)")
		}
	},
	height: 0
});

let contacts = Collapse({
	children: Contacts().render
		.style("transition", `transform ${800}ms cubic-bezier(0.81, 0, 0.31, 1) 0ms`)
			.add("transform", "translateY(-150px)"),
	time: 800,
	onUnhide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.style().remove("transform")
		}
	}, 
	onHide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.style().add("transform", "translateY(-150px)")
		}
	},
	height: 0
});

let preloader = Preloader({
	onLoad: () => {
		route();
		preloader.render.style("transform", "translateY(150px)")
	},
	invert: window.location.hash.substring(1) === "contacts"
});

home.render.insert(document.body);
contacts.render.insert(document.body);
preloader.render.insert(document.body).style("transition", `transform ${800}ms cubic-bezier(0.81, 0, 0.31, 1) 0ms`);

/*setTimeout(() => {
	route();
}, 400)*/