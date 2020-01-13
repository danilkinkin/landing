import UI from "./UI.js";

//TODO сделать подгрузку иконок

class Icon{
	constructor({icon, props = {}}){
		props = {
			...props,
			width: props.size || 15,
			height: props.size || 15
		}
		delete props.size;
		let dom = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		Object.keys(props).forEach((key) => {
			dom.setAttribute(key, props[key]);
		});
		dom.innerHTML = icon;

		return dom;
	}

	static create(){
		return new Icon(...arguments);
	}
}

export const Logo = props => new Icon({
	props: { ...props, viewBox: "0 0 178 245" },
	icon: 
	`
	<path fill-rule="evenodd" clip-rule="evenodd" d="M35.0995 198.828L29.5817 241.724L49.4183 244.276L53.854 209.791C64.6358 214.43 76.5178 217 89 217C138.153 217 178 177.153 178 128C178 78.8466 138.153 39 89 39C84.4787 39 80.0361 39.3371 75.696 39.9876L80.4183 3.27577L60.5817 0.724182L54.7815 45.8158C22.6124 59.2253 0 90.9719 0 128C0 156.892 13.7673 182.569 35.0995 198.828ZM56.5408 188.904C66.2155 194.071 77.2657 197 89 197C127.108 197 158 166.108 158 128C158 89.8923 127.108 59 89 59C83.496 59 78.1425 59.6444 73.0109 60.862L56.5408 188.904ZM51.6764 69.956L38.2033 174.698C26.9011 162.411 20 146.011 20 128C20 103.644 32.6194 82.2355 51.6764 69.956Z"/>
	`
});

export const ArrowBack = props => new Icon({
	props: { ...props, viewBox: "0 0 24 24" },
	icon: 
	`
	<path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"/>
	`
});

export const Home = props => new Icon({
	props: { ...props, viewBox: "0 0 24 24" },
	icon: 
	`
	<path fill="none" d="M0 0h24v24H0V0z"/>
	<path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/>
	`
});