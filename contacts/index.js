//Application entry point
preRender();

LocLoad("RU", function(){
	render();
});

//Page open
function preRender(){

}

//All resources are loaded
function render(){
	var wrp = new UI("div", {content: Loc.test, text: true});
	document.getElementById("resize-wrapper").appendChild(wrp.getHTML());
}