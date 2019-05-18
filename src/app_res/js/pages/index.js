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
var mainBlock;
var selectWork = 0;
var workCardHeight;
var scrl = 0;

window.renderPage = ()=>{
	console.log("Render page");	

	mainBlock = UI.create("main");
	projects.forEach((p)=>{mainBlock.append(p.dom)});

	var headerMenu = UI.create()
		.class("menu-scroll-wrp")
		.append(
			UI.create()
				.class("menu menu-scroll")
				.append(
					UI.create("a").attribute("href", "").content("Контакты")
				).append(
					UI.create("a").attribute("href", "").content("hello@danilkinkin.com")
				)
		)

	var clipHeader = new function(){
		this.height = app.heightPage;
		this.force = 1;
		this.update = ()=>{
			//console.log(clipHeader)
			clipHeaderBlue.update(this.force, this.height);
			clipHeaderWhite.update(-this.force, this.height);
			if(this.force > 0) headerMenu.style().add("zIndex", "-1");
			else headerMenu.style().remove("zIndex");//boot-screen-clip-path-white z-index: -1;
		}
	}

	var clipHeaderBlue = new function(){
		this.rect = UI.create(document.getElementById("boot-screen-clip-path-blue").getElementsByTagName("rect")[0]);
		this.ellipse = UI.create(document.getElementById("boot-screen-clip-path-blue").getElementsByTagName("ellipse")[0]);
		this.update = (force, height)=>{
			//console.log(height)
			height -= force*0.5;
			this.rect.attribute("height", height);
			this.ellipse.attribute("cy", height);
			this.ellipse.attribute("ry", force > 0? force : 0);
		}
	}
	var clipHeaderWhite = new function(){
		this.rect = UI.create(document.getElementById("boot-screen-clip-path-white").getElementsByTagName("rect")[0]);
		this.ellipse = UI.create(document.getElementById("boot-screen-clip-path-white").getElementsByTagName("ellipse")[0]);
		this.update = (force, height)=>{
			height += force*0.5;
			let h = app.heightPage - height;
			this.rect.attribute("y", height > 0? height : 0);
			this.rect.attribute("height", h > 0? h+app.heightPage*0.5 : 0);
			this.ellipse.attribute("cy", height > 0? height : 0);
			this.ellipse.attribute("ry", force > 0? force : 0);
		}
	}

	app.content
		.append(
			UI.create("header")
				.append(
					UI.create()
						.class("header-content-wrp")
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
										.content("Привет, я Данил Захваткин, "
											+"мне 20 и я занимаюсь разработкой web приложений, "
											+"сайтов и так же немного увлекаюсь web дизайном.")
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
					headerMenu
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

	var selectTimeOut = null;
	var localScrollSpeed = 1;
	var startAnimationFrame = performance.now();

	app.onspeed = ()=>{
		//console.log("Speed scroll: "+app.speedScroll)
		if(app.speedScroll <= 1){			
			if(selectTimeOut) clearTimeout(selectTimeOut);
			selectTimeOut = setTimeout(()=>{
				selectTimeOut = null;
				if(projects[selectWork]) projects[selectWork].dom.class().add("selected-card");
			}, 400);
		}else{
			if(projects[selectWork]) projects[selectWork].dom.class().remove("selected-card");
		}
	}

	app.onscrollpage = ()=>{
		for(var i=selectWork<2? 0 : selectWork-2; i<(selectWork+2>=projects.length? projects.length : selectWork+2); i++){
			var offsetTop = projects[0].dom.html.offsetTop+workCardHeight*i+workCardHeight*0.5;

			var t = 0 ;

			t = Transition.bound(((offsetTop-app.scrollHeight-app.heightPage*0.5)/app.heightPage), -1, 1);
			t = t < 0? 1+t : 1-t;
			t = Transition.quartic.easeOut(1-t);
			t = t*t
			t = 1-t;

			//var s = (1-Transition.bound(t/(app.heightPage*0.5*0.6), 0, 1))*0.2*Transition.quartic.ease(0.5);
			//s = Math.round(s*1000)/1000;
			//console.log(s)
			if(Math.abs(app.scrollHeight+app.heightPage*0.5 - projects[0].dom.html.offsetTop-selectWork*workCardHeight - workCardHeight*0.5) > 
			   Math.abs(app.scrollHeight+app.heightPage*0.5 - offsetTop)){
			   	if(projects[selectWork]) projects[selectWork].dom.class().remove("selected-card");
				selectWork = i;
				//if(app.speedScroll <= 1) projects[selectWork].dom.class().add("selected-card")
			}

			if(selectWork == projects.length-1 && offsetTop <= app.scrollHeight){
				projects[selectWork].dom.class().remove("selected-card");
				selectWork = projects.length;
			}

			t = t * (app.scrollHeight+app.heightPage*0.5 - offsetTop);

			if(app.heightPage >= app.scrollHeight) clipHeader.height = app.heightPage+((app.heightPage - app.scrollHeight)/app.heightPage)*200-200;
			//clipHeaderBlue.force = s;


			projects[i].offestY = t;
		}
	}
	app.onresizepage = ()=>{
		workCardHeight = (3*app.heightPage)/4.4-20;
		mainBlock.style()
			.add("paddingTop", ((3*app.heightPage)/4.4-20)/4+"px")
			.add("marginBottom", -((3*app.heightPage)/4.4-20)/4+"px")
		projects.forEach((p)=>{
			p.dom.style().add("height", workCardHeight+"px");
			let w = app.widthPage>=1300? 1200 : app.widthPage-100;
			p.bgWrp.style()
				.add("width", w+"px")
				.add("height", (app.heightPage/2.2)+"px")
		});
		/*projects.forEach((p)=>{
			p.dom
		});*/


		
	}
	app.onresizepage();

	var frame = (timestamp)=>{
		var timePassed = timestamp - startAnimationFrame;

		let realLocalScrollSpeed = app.speedScroll*(+app.scrollDirection*2-1);//>=3? 0.25 : 1;

		localScrollSpeed += (realLocalScrollSpeed - localScrollSpeed)*(0.1);
		if(Math.abs(realLocalScrollSpeed - localScrollSpeed) < 0.01) localScrollSpeed = realLocalScrollSpeed;

		for(var i=selectWork<2? 0 : selectWork-2; i<(selectWork+2>=projects.length? projects.length : selectWork+2); i++){
			if(projects[i]) projects[i].dom.style().add("transform", "translate3D("+0+"px,"+projects[i].offestY/**localScrollSpeed*/+"px,0px)");
		}

		if(app.heightPage >= app.scrollHeight){
			clipHeader.force = localScrollSpeed*150;
			clipHeader.update();
		}

		
		

		startAnimationFrame = timestamp;
		requestAnimationFrame(frame);
	}
	frame();
}

function workCard(data){
	this.offestY = 0;
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