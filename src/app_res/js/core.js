window["render"] = ()=>{
	new Localization(navigator.language.substring(3))
		.onload(window.renderPage)
		.onerror(function(){
			console.error("Error set language");
		});
}
if(window["awitRender"]) window["awitRender"]();