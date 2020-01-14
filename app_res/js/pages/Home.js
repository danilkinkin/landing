import UI from "../core/UI.js";
import { useState, observer } from "../utils/Store.js";
import { getSafeValue as LOC} from "../utils/Locale.js";

import Link from "../components/custom/Link.js";

function Age({now}){
	return 20;
}

function Home(){
	this.render = UI("main");

	const body = UI().className("body").insert(this.render);

	UI("h1").text("Danilkinkin").insert(body);
	UI("h3").text("web UX/UI developer").insert(body);
	UI("p")
		.text(LOC("about_me", Age({now: Date.now()})))
		.insert(body);
	UI()
		.className("footer")
		.append(
			Link({
				label: LOC("contacts"),
				link: "#contacts"
			})
		)
		.append(
			Link({
				label: "hello@danilkinkin.com",
				link: "mailto:hello@danilkinkin.com"
			}).render.className("mail-link")
		)
		.insert(body);
}

export default () => new Home();