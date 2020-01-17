import { setLocale, getValue as LOC} from "./utils/Locale.js";
import UI from "./core/UI.js";
import { route, redirect, check as routeCheck } from "./utils/Route.js";

import Collapse from "./components/base/Collapse.js";
import Home from "./pages/Home.js";
import Contacts from "./pages/Contacts.js";
import Preloader from "./pages/Preloader.js";

setLocale((navigator.language || navigator.userLanguage).substring(0, 2).toUpperCase());
document.title = "Danilkinkin";

let home = Collapse({
	children: () => {
		let h = Home();
		h.render
			.style("transition", `transform ${800}ms cubic-bezier(0.81, 0, 0.31, 1) 0ms`)
				.add("transform", "translateY(-150px)");

		return h;
	},
	time: 800,
	onUnhide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.render.style().remove("transform");
		}
	}, 
	onHide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.render.style().add("transform", "translateY(-150px)")
		}
	},
	height: 0
});

let contacts = Collapse({
	children: () => {
		let c = Contacts();
		c.render
			.style("transition", `transform ${800}ms cubic-bezier(0.81, 0, 0.31, 1) 0ms`)
				.add("transform", "translateY(-150px)");

		return c;
	},
	time: 800,
	onUnhide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.render.style().remove("transform");
			children.open();
		}
	}, 
	onHide: (isEnd, collapse, children) => {
		if(!isEnd){
			children.render.style().add("transform", "translateY(-150px)")
		}
	},
	height: 0
});

let preloader = Preloader({
	onLoad: () => {
		preloader.render.style("transform", "translateY(150px)");
		routeCheck();
	},
	invert: window.location.pathname.substring(1) === "contacts"
});

window.onload = () => {
	home.render.insert(document.body);
	contacts.render.insert(document.body);
	preloader.render.insert(document.body).style("transition", `transform ${800}ms cubic-bezier(0.81, 0, 0.31, 1) 0ms`);
}

route("/", () => {
	if(!preloader.isLoad) return;
	home.uncollapse();
	contacts.collapse();
});		
route("/contacts", () => {
	if(!preloader.isLoad) return;
	contacts.uncollapse();
	home.collapse();
});
route("404", () => {
	redirect("/");
});