var app = null;
var icon = null;


window["render"] = ()=>{
	app = new Core();
	icon = new Icon();
	console.log(app)
	window.renderPage();

	let bootScreen;

	if(document.getElementById("boot-screen")){
		bootScreen = UI.create(document.getElementById("boot-screen"));
		bootScreen.append(icon.get("ic-wave", "wave-boot-screen"));
	}else{
		app.body.class().remove("hide-content-to-bottom");
	}

	setTimeout(()=>{
		if(bootScreen) bootScreen.class().add("hide-boot-screen");	
		app.body.class().remove("hide-content-to-bottom");

		setTimeout(()=>{
			if(bootScreen) bootScreen.destroy();
		}, 1400);
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

function Icon(){
	this.get = (ico)=>{
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
		use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", window["resources"]["svgpack"]+"#"+ico);
		use.setAttributeNS("http://www.w3.org/1999/xlink", "y", "0");
		svg.append(use);

		if(UI) return UI.create(svg);
		else return svg;
	}
}