import UI from "../core/UI.js";
import { useState, observer } from "../utils/Store.js";
import { getSafeValue as LOC} from "../utils/Locale.js";

import Link from "../components/custom/Link.js";

function Age(now){
	const born = new Date('1999-02-13T22:30:00+0500');

	const correctiveMonth = now.getMonth() - born.getMonth() < 0;
	const correctiveDate = now.getDate() - born.getDate() < 0;
	const correctiveHours = now.getHours() - born.getHours() < 0;
	const correctiveMinutes = now.getMinutes() - born.getMinutes() < 0;
	const corrective = (correctiveMonth || correctiveDate || correctiveHours || correctiveMinutes)? -1 : 0;

	return now.getFullYear() - born.getFullYear() + corrective;
}

function Home(){
	this.render = UI("main");

	const body = UI().className("body").insert(this.render);

	UI("h1").text("Danilkinkin").insert(body);
	UI("h3").text("web UX/UI developer").insert(body);
	UI("p")
		.text(LOC("about_me", Age(new Date())))
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