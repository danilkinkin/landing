import { setLocale, getValue as LOC} from "./utils/Locale.js";

import UI from "./core/UI.js";

import Collapse from "./components/base/Collapse.js";
import Home from "./pages/Home.js";
import Contacts from "./pages/Contacts.js";

setLocale("RU");
document.title = "Danilkinkin";
window.onhashchange = route;

function route() {
	switch (window.location.hash.substring(1)) {
		case "contacts":
			console.log("/contacts")
			contacts.uncollapse();
			home.collapse();
			break;
		default:
			console.log("/home")
			home.uncollapse();
			contacts.collapse();
			break;
	}
}

let home = Collapse({
	children: Home().render
		.style("transition", `transform ${800}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`)
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
		.style("transition", `transform ${800}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`)
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

home.render.insert(document.body);
contacts.render.insert(document.body);

setTimeout(() => {
	route();
}, 100)