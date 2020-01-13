import UI from "../core/UI.js";
import { useState, observer } from "../utils/Store.js";

import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from "../core/Icons.js";
import Link from "../components/custom/Link.js";

function Contacts(){
	this.render = UI("contacts");

	const body = UI().className("body").insert(this.render);

	UI("h1").text("Danilkinkin").insert(body);

	Link({
		label: "Hello@danilkinkin.com",
		link: "mailto:hello@danilkinkin.com"
	}).render.insert(body);

	Link({
		label: "Github",
		link: "https://github.com/Danilkinkin",
		newTab: true
	}).render.insert(body);

	Link({
		label: "Вконтакте",
		link: "https://vk.com/danilkinkin",
		newTab: true
	}).render.insert(body);

	Link({
		label: "Telegram",
		link: "https://t.me/Danilkinkin",
		newTab: true
	}).render.insert(body);

	Link({
		label: "Instagram",
		link: "https://www.instagram.com/danilkinkin",
		newTab: true
	}).render.insert(body);

	Link({
		label: "Pikabu",
		link: "https://pikabu.ru/@Danilkinkin",
		newTab: true
	}).render.insert(body);
	
	Link({
		content: [
			ArrowBackIcon({
				size: 24
			}),
			UI("span").text("На главную")
		],
		link: "#"
	}).render.className("home-link").insert(body);
}

export default () => new Contacts();