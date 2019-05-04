var app = {};


window["render"] = ()=>{
	app = new Core();
	console.log(app)
	window.renderPage();

	setTimeout(()=>{
		let bootScreen = UI.create(document.getElementById("boot-screen")).class().add("hide-boot-screen");

		setTimeout(()=>{
			bootScreen.destroy();
		}, 1400);

		app.body.class().remove("hide-content-to-bottom");
	}, 180);
}

window["loadLocale"] = ()=>{
	new Localization(navigator.language.substring(3))
		.onload(()=>{
			window["successLoadLocale"]();
		})
		.onerror(function(){
			console.error("Error set language");
		});
}

function Core(){
	this.page = UI.create(document.body);
	this.body = UI.create().class("content hide-content-to-bottom").insert(this.page);
}