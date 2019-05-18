var app = null;
var icon = null;
var scrollbar = null;

window["render"] = ()=>{
	app = new Core(!document.getElementById("boot-screen"));
	icon = new Icon();
	console.log(app)
	window.renderPage();

	let bootScreen;

	if(document.getElementById("boot-screen")){
		bootScreen = UI.create(document.getElementById("boot-screen"));
		bootScreen.append(icon.get("ic-wave", "wave-boot-screen"));
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

function Core(dnotUseAnim){
	this.__proto__ = new EventTarget();
	this.page = UI.create(document.body);
	this.body = UI.create().class("scroll-content "+(dnotUseAnim? "" : " hide-content-to-bottom")).insert(this.page);
	this.content;
	this.scrollHeight = this.body.html.scrollTop;
	this.heightPage = document.body.clientHeight;
	this.widthPage = document.body.clientWidth;
	this.speedScroll = 0; //[0..3]
	this.scrollDirection = true;

	var scrollbar = window.Scrollbar;
	var startAnimationFrame = performance.now();
	var scrollHeightLast = 0;
	var scrollDelta = 0;

	scrollbar.use(window.OverscrollPlugin);
	scrollbar = scrollbar.init(this.body.html, {
		damping: 0.08,
		alwaysShowTracks: true
	});
	this.content = UI.create(scrollbar.contentEl).class("content");

	this.onscrollpage = ()=>{};
	this.onresizepage = ()=>{};
	this.onspeed = ()=>{};

	this.setPosition = ()=>{

	}

	scrollbar.addListener((status) => {
		//scrollDelta = status.offset.y-scollOffset;
		//scollOffset = status.offset.y;
		//console.log(status.offset.y)
		this.scrollHeight = status.offset.y;
		this.onscrollpage();
	});
	/*this.body.html.onscroll = ()=>{
		this.scrollHeight = this.body.html.scrollTop;
		this.onscrollpage();
	};*/
	window.onresize = ()=>{
		this.heightPage = document.body.clientHeight;
		this.widthPage = document.body.clientWidth;
		this.onresizepage();
	}
	var frame = (timestamp)=>{
		var timePassed = timestamp - startAnimationFrame;
		//console.log(this.scrollHeight, scrollHeightLast)
		scrollDelta = this.scrollHeight - scrollHeightLast;
		scrollHeightLast = this.scrollHeight;
		var lastScrollSpeed = this.speedScroll;

		if(Math.abs(scrollDelta) >= 60) this.speedScroll = 3;
		else{
			if(Math.abs(scrollDelta) >= 35) this.speedScroll = 2;
			else{
				if(Math.abs(scrollDelta) >= 6) this.speedScroll = 1;
				else{
					this.speedScroll = 0;
				}
			}
		}
		this.scrollDirection = scrollDelta >= 0;
		if(lastScrollSpeed != this.speedScroll) this.onspeed();

		startAnimationFrame = timestamp;
		requestAnimationFrame(frame);
	}
	frame();
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