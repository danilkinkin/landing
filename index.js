var worksList = [
	{name: "ClockTab", path: "clockTab"},
	{name: "Sky Cube", path: "sky-cube"},
	{name: "ClockTab", path: "clockTab"},
	{name: "Sky Cube", path: "sky-cube"},
	{name: "ClockTab", path: "clockTab"},
	{name: "Sky Cube", path: "sky-cube"},
	{name: "ClockTab", path: "clockTab"},
	{name: "Sky Cube", path: "sky-cube"},
	{name: "ClockTab", path: "clockTab"},
	{name: "Sky Cube", path: "sky-cube"},
	{name: "ClockTab", path: "clockTab"},
	{name: "Sky Cube", path: "sky-cube"}
];
var scrollTimeout;
var scrollbar;
var scrollDelta = 1;


//Application entry point
preRender();

LocLoad("RU", function(){
	render(function(){
		scrollbar = window.Scrollbar;
		scrollbar.use(window.OverscrollPlugin)
		scrollbar = scrollbar.init(document.getElementById("resize-wrapper"), {
			damping: 0.08,
			alwaysShowTracks: true
		});
		var scollOffset = 0;
		scrollbar.addListener((status) => {
			/*if(~scrollFreezePos){
				scrollbar.setPosition(0, scrollFreezePos);
				return;
			}*/
			scrollDelta = status.offset.y-scollOffset;
			scollOffset = status.offset.y;
			if(scrollTimeout) clearTimeout(scrollTimeout);
			else document.body.classList.add("show-scroll");
			scrollTimeout = setTimeout(function(){
				document.body.classList.remove("show-scroll");
				scrollTimeout = null;
			}, 700);
		});

		window.onmousemove = function(e){
			mouse.X = e.clientX - document.documentElement.clientWidth*0.5;
			mouse.Y = e.clientY - document.documentElement.clientHeight*0.5;
			mouse.XForce = mouse.X/(document.documentElement.clientWidth*0.5);
			mouse.YForce = mouse.Y/(document.documentElement.clientHeight*0.5);
		}

		listeners();
	});

});


function preRender(){
	//logoAnim(render);
	//render();
}

function render(endRender){
	var works = new UI("div", {class: "main-page__works"});
	for(var i=0; i<worksList.length; i++){
		worksList[i].element = new UI("div", {class: "works__work-card", content: worksList[i].name});
		works.append(worksList[i].element);
		worksList[i].element = worksList[i].element.getHTML();
	}
	var wrp = new UI("div", {class: "main-page"})
		.append(
			new UI("div", {class: "main-page__cover-wrp"})
				.append(
					new UI("div", {class: "main-page__cover"})
						.append(
							new UI("div", {class: "main-page__cover_ahead"})
								.append(
									new UI("h1", {content: "Danilkinkin"})
								)
								.append(
									new UI("h2", {content: Loc.slogan})
								)
						)
						.append(
							new UI("p", {content: Loc.salutation_part_1+" <span id='my-age'>19</span> "+Loc.salutation_part_2, contentHTML: true})
						)
						.append(
							new UI("div", {class: "main-page__cover_link-block"})
								.append(
									new UI("div", {class: "link-block__links"})
										.append(
											new UI("a", {attr:{key: "href", value: "../contacts/index.html"}, class: "link-contacts", content: Loc.link_contacts})
										)
										.append(
											new UI("a", {attr:{key: "href", value: ""}, class: "link-works", content: Loc.link_works})
										)
										.append(
											new UI("a", {attr:{key: "href", value: ""}, class: "link-resume", content: Loc.link_resume})
										)
								)
								.append(
									new UI("a", {attr:{key: "href", value: "mailto:hello@danilkinkin.com"}, class: "link-mail", content: "hello@danilkinkin.com"})
								)
						)
				)
				.append(
					new UI("div")
				)			
		)
		.append(works)
		.append(new UI("div", {class: "main-page__footer"})
			.append(new UI("div", {class: "main-page__footer_title", content: "Danilkinkin"}))
			.append(new UI("div", {class: "main-page__footer_copy", content: "Danilkinkin 2018"}))
		)
	document.getElementById("resize-wrapper").appendChild(wrp.getHTML());
	if(endRender) endRender();
}

function logoAnim(callback){
	var logo = new UI("canvas")
		.class("logo-loader")
		.addAttribute("width", "178")
		.addAttribute("height", "245");
	document.getElementById("resize-wrapper").appendChild(logo.getHTML());

	var canvas 	= logo.getHTML();
	var ctx 	= canvas.getContext('2d');
	var time 	= 0;
	var start 	= performance.now();

	function animate(timeNow) {
		time = (timeNow - start)*0.0004;
		canvas.width = canvas.width;
		drawCircle(Transition.cubic.ease(time));
		if(time > 0.5)
			drawLine(Transition.cubic.ease(time*2-1));	
		if(time < 1) requestAnimationFrame(animate);
		else if(callback) callback(logo);
	}
	requestAnimationFrame(animate);

	function drawCircle(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = "rgb(16,115,221)";
		ctx.beginPath();
		ctx.arc(178/2, 245/2, 178/2-10, Math.PI*0.5*(t-1), Math.PI*0.5*(t*5-1));
		ctx.stroke();
	}

	function drawLine(t){
		ctx.lineWidth = 20;
		ctx.strokeStyle = "rgb(16,115,221)";
		ctx.beginPath();
		ctx.moveTo(39.5, 243);
		ctx.lineTo(31*t+39.5, 241*(1-t)+2);
		ctx.stroke();	
	}
}
var scrl = 0;
var scrlD = 1;
var scrlDN = 1;
var selectWork = 0;
var tweaking = false;
var mouse = {X: 0, Y: 0, XForce: 0, YForce: 0}
var mouseSmooth = {X: 0, Y: 0, XForce: 0, YForce: 0}
function listeners(){
	/*if(scrollbar.offset.y-worksBlock.offsetTop+110 > 0){
		if(!isAheadVisible){
			document.body.classList.add("fixed-header");
			document.body.appendChild(document.getElementById("ahead"))
			isAheadVisible = true;
		}
	}else{
		if(isAheadVisible){
			document.body.classList.remove("fixed-header");
			document.getElementById("main-frame").appendChild(document.getElementById("ahead"))
			isAheadVisible = false;
		}		
	}
	if(scrollbar.offset.y < document.documentElement.clientHeight-document.documentElement.clientHeight*0.5-110){
		worksLink.style.opacity = 
		resumeLink.style.opacity = 1-(scrollbar.offset.y)/(document.documentElement.clientHeight-document.documentElement.clientHeight*0.5-110);
	}else{
		worksLink.style.opacity = 
		resumeLink.style.opacity = 0;
	}*/
	scrl += (Math.abs(scrollDelta)-scrl)*(Math.abs(scrollDelta) > 25? 0.1 : 0.012);
	scrlDN = 1/((scrl < 22? 0 : scrl-22)+1);
	if(scrlD < 0.2){
		if(!tweaking){
			tweaking = true;
			//console.log("tweaking!");
		}
	}else{
		if(tweaking){
			//console.log("no tweaking! - B");
			scrollbar.scrollTo(0, -document.documentElement.clientHeight*0.5 + worksList[selectWork].element.offsetTop + worksList[selectWork].element.clientHeight*0.5, 600);
			tweaking = false;
		}
	}
	scrlD += (scrlDN-scrlD)*(scrlDN < 0.6? 0.6 : 0.05);
	mouseSmooth.XForce += (mouse.XForce - mouseSmooth.XForce)*(Math.abs(mouse.XForce) < 0.6? 0.6 : 0.05);
	mouseSmooth.YForce += (mouse.YForce - mouseSmooth.YForce)*(Math.abs(mouse.YForce) < 0.6? 0.6 : 0.05);
	//scrlDN = scrlD;
	//console.log(scrlD)
	//scrlD = Transition.quartic.ease(scrlD);
	//console.log(scrl)

	//scrollbar.offset.y = -document.documentElement.clientHeight*0.5 + worksList[selectWork].element.offsetTop + worksList[selectWork].element.clientHeight*0.5

	for(var i=0; i<worksList.length; i++){
		//scrollbar.offset.y + document.documentElement.clientHeight*0.5 - worksList[i].element.offsetTop - elemHeight*0.5
		var offsetTop = worksList[i].element.offsetTop+worksList[i].element.clientHeight*0.5;

		var t1 = offsetTop-(scrollbar.offset.y+document.documentElement.clientHeight*0.7);
		t1 = t1/(document.documentElement.clientHeight*0.3);
		t1 = t1>0? t1 : 0;
		t1 = t1<1? t1 : 1;

		var t2 = (scrollbar.offset.y+document.documentElement.clientHeight*0.3)-offsetTop;
		t2 = t2/(document.documentElement.clientHeight*0.3);
		t2 = t2>0? t2 : 0;
		t2 = t2<1? t2 : 1;

		//console.log(Math.abs(scrollDelta) < 22? 0 : Math.abs(scrollDelta)-22)
		
		//l = Transition.quintic.easeOut(l);
		var s = (1-Math.max(t1, t2))*0.2*Transition.quartic.ease(scrlD)+0.8;
		
		t1 = offsetTop-(scrollbar.offset.y+document.documentElement.clientHeight*0.5);
		t1 = t1/(document.documentElement.clientHeight*0.5);
		t1 = t1>0? t1 : 0;
		t1 = t1<1? t1 : 1;

		t2 = (scrollbar.offset.y+document.documentElement.clientHeight*0.5)-offsetTop;
		t2 = t2/(document.documentElement.clientHeight*0.5);
		t2 = t2>0? t2 : 0;
		t2 = t2<1? t2 : 1;

		var t = 1 - Math.max(t1, t2);// * Math.max(t1, t2);

		//works[i].element.style.zIndex = Math.floor(s);
		worksList[i].element.setAttribute("offset", scrollbar.offset.y+document.documentElement.clientHeight*0.5 - offsetTop);
		if(Math.abs(scrollbar.offset.y+document.documentElement.clientHeight*0.5 - worksList[selectWork].element.offsetTop - worksList[selectWork].element.clientHeight*0.5) > 
		   Math.abs(scrollbar.offset.y+document.documentElement.clientHeight*0.5 - worksList[i].element.offsetTop - worksList[i].element.clientHeight*0.5)){
			selectWork = i;
			//console.log(i);
			//console.log(scrollbar.offset.y)
		}
		var xOffset = Transition.cubic.ease(t*0.7+0.3)*Transition.quadratic.easeOut(Math.abs(mouseSmooth.XForce))*(mouseSmooth.XForce > 0? 1 : -1)*10;
		t = t * (scrollbar.offset.y+document.documentElement.clientHeight*0.5 - offsetTop)+Transition.cubic.ease(t*0.7+0.3)*Transition.quadratic.easeOut(Math.abs(mouseSmooth.YForce))*(mouseSmooth.YForce > 0? 1 : -1)*10;

		worksList[i].element.style.transform = "scale("+s+") translateY("+t+"px) translateX("+xOffset+"px)";
	}

	requestAnimationFrame(listeners)
}