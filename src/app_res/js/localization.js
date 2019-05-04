var Loc = {};

function Localization(lang){
	var onloadEvent = function(){};
	var onerrorEvent = function(){};

	this.onload = function(onloadFunc){
		onloadEvent = onloadFunc;
		return this;
	}.bind(this);
	this.onerror = function(onerrorFunc){
		onerrorEvent = onerrorFunc;
		return this;
	}.bind(this);

	window["localeListener"] = (locale)=>{
		Loc = locale;
		console.log(Loc["success-load-locale-message"])
		onloadEvent();
	}

	loadDictonary(lang);

	function loadDictonary(l){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "app_res/locale/"+l.toUpperCase()+".js");	

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if(xhr.status == 200) {
					done();
					eval(xhr.responseText);
				}else{
					error()
				}
				
			}	
		}

		function done(){
			
		}

		function error(){
			console.log("Not find vocabulary '"+l+"'. Try set 'EN' vocabulary");
			loadDictonary("EN");
			if(l == "EN") onerrorEvent();
		}

		xhr.send();
	}
}