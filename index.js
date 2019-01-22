var worksList 			= [
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
var scrollTimeout 		= null;
var scrollbar 			= null;
var scrollDelta 		= 1;
var scrl 				= 0;
var scrlD 				= 1;
var scrlDN 				= 1;
var selectWork 			= 0;
var tweaking 			= false;
var distableNextTweak	= false;
var mouse 				= {X: 0, Y: 0, XForce: 0, YForce: 0}
var mouseForceSmooth 	= {XForce: 0, YForce: 0}
var halfScreenSizeX 	= document.documentElement.clientWidth*0.5;
var halfScreenSizeY 	= document.documentElement.clientHeight*0.5;
var workCardHalfHeight 	= 220;

//Listeners
window.onmousemove = function(e){
	mouse.X = e.clientX - halfScreenSizeX;
	mouse.Y = e.clientY - halfScreenSizeY;
	mouse.XForce = mouse.X/halfScreenSizeX;
	mouse.YForce = mouse.Y/halfScreenSizeY;
}

function update(){
	if(Math.abs(Math.abs(scrollDelta)-scrl) < 1) scrl = Math.abs(scrollDelta);
	else scrl += (Math.abs(scrollDelta)-scrl)*(Math.abs(scrollDelta) > 25? 0.1 : 0.012);

	scrlDN = 1/((scrl < 22? 0 : scrl-22)+1);	

	if(Math.abs(scrlDN-scrlD) < 0.05) scrlD = scrlDN;
	else scrlD += (scrlDN-scrlD)*(scrlDN < 0.6? 0.6 : 0.05);

	if(scrlD < 0.2){
		if(!tweaking) tweaking = true;
	}else{
		if(tweaking){
			if(scrollbar.offset.y < halfScreenSizeY)
				scrollbar.scrollTo(0, 0, 600);
			else{			
				if(scrollbar.offset.y > scrollbar.limit.y-halfScreenSizeY) scrollbar.scrollTo(0, scrollbar.limit.y, 600);
				else scrollbar.scrollTo(0, -halfScreenSizeY + worksList[selectWork].element.offsetTop + workCardHalfHeight, 600);
			}
			if(distableNextTweak){
				distableNextTweak = false;
				scrl = Math.abs(scrollDelta);
				scrlDN = 1/((scrl < 22? 0 : scrl-22)+1);
				scrlD = scrlDN;
			}
			tweaking = false;
		}
	}

	if(Math.abs(mouse.XForce - mouseForceSmooth.XForce) < 0.05) mouseForceSmooth.XForce = mouse.XForce; 
	else mouseForceSmooth.XForce += (mouse.XForce - mouseForceSmooth.XForce)*(Math.abs(mouse.XForce) < 0.6? 0.6 : 0.05);

	if(Math.abs(mouse.YForce - mouseForceSmooth.YForce) < 0.05) mouseForceSmooth.YForce = mouse.YForce; 
	else mouseForceSmooth.YForce += (mouse.YForce - mouseForceSmooth.YForce)*(Math.abs(mouse.YForce) < 0.6? 0.6 : 0.05);


	for(var i=selectWork<2? 0 : selectWork-2; i<(selectWork+2>=worksList.length? worksList.length : selectWork+2); i++){
		var offsetTop = worksList[i].element.offsetTop+workCardHalfHeight;

		var t = 0 ;

		if(offsetTop-scrollbar.offset.y-halfScreenSizeY > 0){
			t = offsetTop-(scrollbar.offset.y+halfScreenSizeY*1.4);
		}else{
			t = (scrollbar.offset.y+halfScreenSizeY*0.6)-offsetTop;
		}

		var s = (1-Transition.bound(t/(halfScreenSizeY*0.6), 0, 1))*0.2*Transition.quartic.ease(distableNextTweak? 1 : scrlD)+0.8;
		
		if(offsetTop - scrollbar.offset.y - halfScreenSizeY > 0){
			t = offsetTop-(scrollbar.offset.y+halfScreenSizeY);
		}else{
			t = (scrollbar.offset.y+halfScreenSizeY)-offsetTop;
		}

		var t = 1 - Transition.bound(t/halfScreenSizeY, 0, 1);

		if(Math.abs(scrollbar.offset.y+halfScreenSizeY - worksList[selectWork].element.offsetTop - workCardHalfHeight) > 
		   Math.abs(scrollbar.offset.y+halfScreenSizeY - offsetTop)){
			selectWork = i;
		}

		//var xOffset = Transition.cubic.ease(t*0.7+0.3)*Transition.quadratic.easeOut(Math.abs(mouseForceSmooth.XForce))*(mouseForceSmooth.XForce > 0? 1 : -1)*10;
		t = t * (scrollbar.offset.y+halfScreenSizeY - offsetTop)/*+Transition.cubic.ease(t*0.7+0.3)*Transition.quadratic.easeOut(Math.abs(mouseForceSmooth.YForce))*(mouseForceSmooth.YForce > 0? 1 : -1)*10*/;

		worksList[i].element.style.transform = "scale("+s+") translate3D("+/*xOffset*/0+"px,"+t+"px,0px)";
	}

	requestAnimationFrame(update)
}

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

		update();
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
												.addEvent("onclick", function(e){
													e.preventDefault();
													e.stopPropagation();
													distableNextTweak = true;
													scrollbar.scrollTo(0, -halfScreenSizeY + worksList[0].element.offsetTop + workCardHalfHeight, 600);
												})
										)
										.append(
											new UI("a", {attr:[{key: "href", value: "resume.pdf"}, {key: "target", value: "_blank"}], class: "link-resume", content: Loc.link_resume})
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
	
	
}