(function(){
	var rootPage = "resources/pages/";
	var path = "main_page/";

	window.EngineStates = {
		LocLoad: false,
		ErrorLocLoad: false,
	}
	window.EngineListeners = {
		LocLoad: null,
		ErrorLocLoad: null,
	}

	//Load localization dictionary
	window.LocLoad = function(lang, success, error){
		var dictionary = document.createElement("script");
		dictionary.setAttribute("src", "lang_"+lang.toUpperCase()+".js")
		document.head.appendChild(dictionary);
		dictionary.onload = function(){
			console.log("Succes load dictionary: "+lang);
			window.EngineStates.LocLoad = true;
			if(window.EngineListeners.LocLoad) window.EngineListeners.LocLoad();
			if(success) success();
		}
		dictionary.onerror = function(){
			console.log("Error load dictionary: "+lang);
			window.EngineStates.ErrorLocLoad = true;
			if(window.EngineListeners.ErrorLocLoad) window.EngineListeners.ErrorLocLoad();
			if(error) error();
		}
	};

	//Localization dictionary
	window.Loc = null;
})()