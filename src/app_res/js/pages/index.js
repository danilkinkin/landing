var projects = [
	new workCard({
		name: "ClockTab",
		preview: "http://localhost:8080/works/clockTab/preview.png"
	}),
	new workCard({
		name: "Sky Cube",
		preview: "http://localhost:8080/works/sky-cube/preview.png"
	}),
	new workCard({
		name: "ClockTab",
		preview: "http://localhost:8080/works/clockTab/preview.png"
	}),
	new workCard({
		name: "Sky Cube",
		preview: "http://localhost:8080/works/sky-cube/preview.png"
	}),
	new workCard({
		name: "ClockTab",
		preview: "http://localhost:8080/works/clockTab/preview.png"
	}),
	new workCard({
		name: "Sky Cube",
		preview: "http://localhost:8080/works/sky-cube/preview.png"
	}),
	new workCard({
		name: "ClockTab",
		preview: "http://localhost:8080/works/clockTab/preview.png"
	}),
	new workCard({
		name: "Sky Cube",
		preview: "http://localhost:8080/works/sky-cube/preview.png"
	})
]
var bodyWidth = 0;
var mainBlock;

window.renderPage = ()=>{
	console.log("Render page");	

	mainBlock = UI.create("main");
	projects.forEach((p)=>{mainBlock.append(p.dom)});

	app.body
		.append(
			UI.create("header")
				.append(
					UI.create().class("header-content")
						.append(
							UI.create("h1")
								.content("Danilkinkin")
						).append(
							UI.create("p")
								.class("ahead-title")
								.content("Web разработчик и UI дизайнер")
						).append(
							UI.create("p")
								.content("Привет, я Данил Захваткин, \
									мне 20 и я занимаюсь разработкой web приложений, \
									сайтов и так же немного увлекаюсь web дизайном.")
						).append(
							UI.create()
								.class("menu")
								.append(
									UI.create("a").attribute("href", "").content("Контакты")
								).append(
									UI.create("a").attribute("href", "").content("Работы")
								).append(
									UI.create("a").attribute("href", "").content("Резюме")
								).append(
									UI.create("a").attribute("href", "").content("hello@danilkinkin.com")
								)
						)
				)
		).append(
			mainBlock
		).append(
			UI.create("footer")
				.append(
					UI.create().class("footer-title").content("Danilkinkin")
				)
				.append(
					UI.create().class("footer-last-update").content("Danilkinkin 2019")
				)
		);

	frame();
}

function workCard(data){
	this.bgWrp = UI.create().class("work-card-bg-wrp")
		.append(
			UI.create()
				.class("work-card-bg")
				.style().add("backgroundImage", "url('"+data.preview+"')")
		);
	this.dom = UI.create().class("work-card")
		.append(
			this.bgWrp								
		)
		.append(
			UI.create().class("work-card-title").content(data.name)
		);
				
}

function frame(){
	if(app.body.html.clientWidth != bodyWidth){
		bodyWidth = app.body.html.clientWidth;
		mainBlock.style()
			.add("paddingTop", ((3*app.body.html.clientHeight)/4.4-20)/4+"px")
			.add("marginBottom", -((3*app.body.html.clientHeight)/4.4-20)/4+"px")
		projects.forEach((p)=>{
			p.dom.style().add("height", ((3*app.body.html.clientHeight)/4.4-20)+"px");
			let w = bodyWidth>=1300? 1200 : bodyWidth-100;
			p.bgWrp.style()
				.add("width", w+"px")
				.add("height", (app.body.html.clientHeight/2.2)+"px")
		})
	}
	requestAnimationFrame(frame);
}




