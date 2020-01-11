import UI from "../core/UI.js";
import { useState, observer } from "../utils/Store.js";

import Link from "../components/custom/Link.js";

function Age({now}){
	return UI("span").className("age").text("20 лет")
}

function Home(){
	this.render = UI("main")
		.append(
			UI("h1").text("Danilkinkin")
		)
		.append(
			UI("h3").text("web UX/UI developer")
		)
		.append(
			UI("p").text(
				`Привет, я Данил Захваткин, мне ${
					Age({now: Date.now()}).toString()
				} я занимаюсь разработкой веб приложений, сайтов и другими интересными вещами.`
			)
		)
		.append(
			UI()
				.className("footer")
				.append(
					Link({
						label: "Контакты",
						link: "/contacts"
					})
				)
				.append(
					Link({
						label: "hello@danilkinkin.com",
						link: "mailto:hello@danilkinkin.com"
					}).render.className("mail-link")
				)
		)
}

export default () => new Home();