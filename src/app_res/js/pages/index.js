window.renderPage = ()=>{
	console.log("Render page");
	app.body.append(UI.create("h1").content("Page is load"));
}