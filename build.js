var rimraf = require('rimraf');
var ncp = require('ncp').ncp;
var ClosureCompiler = require('google-closure-compiler').compiler;

console.log("Strat release build");
clearPath(()=>{
	copyFiles(()=>{
		minifyJS(()=>{
			minifyLang(()=>{
				clearTrash(()=>{
					console.log("Done build!")				
				})			
			})
		})
	})
})


function clearPath(callback) {
	console.log("Clear release path");

	rimraf("release/!(*.html)", {}, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log("Done!");
		callback();
	});
}

function copyFiles(callback) {
	console.log("Copy files to release");

	ncp.limit = 16;

	ncp("src/", "release/", {
		filter: (name)=>{
			return (!name.match("[.](js)") || name.match("lang..*js")) && !name.match("[.](html)");
		}
	}, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log("Done!");
		callback();
	});
}

function minifyJS(callback) {
	console.log("Minify JS");
	 
	var closureCompilerJS = new ClosureCompiler({
		js: ["src/app_res/js/**.js", "!**boot.js"],
	    compilation_level: 'ADVANCED',
	    js_output_file: 'release/app_res/app.js',
	    debug: false,
		charset: 'UTF-8',
	    define: 'DEBUG=false'
	});

	var closureCompilerBootJS = new ClosureCompiler({
		js: ["src/app_res/js/boot.js"],
	    compilation_level: 'ADVANCED',
	    js_output_file: 'release/app_res/start.js',
	    debug: false,
		charset: 'UTF-8',
	    define: 'DEBUG=false'
	});

	closureCompilerJS.run((exitCode, stdOut, stdErr) => {
		if(exitCode) console.log(exitCode, stdOut, stdErr)
		closureCompilerBootJS.run((exitCode, stdOut, stdErr) => {
			if(exitCode) console.log(exitCode, stdOut, stdErr)
			console.log("Done!");
			callback();
		});
	});
}

function minifyLang(callback) {
	console.log("Minify Locale");

	var langArr = ["RU", "EN"];
	minifyLang(0);

	function minifyLang(i){
		var closureCompiler = new ClosureCompiler({
			js: 'src/app_res/locale/'+langArr[i]+'.js',
		    compilation_level: 'ADVANCED',//'ADVANCED',
		    debug: false,
		    charset: 'UTF-8',
		    js_output_file: 'release/app_res/locale/'+langArr[i]+'.js'
		});

		closureCompiler.run((exitCode, stdOut, stdErr) => {
			if(exitCode) console.log(exitCode, stdOut, stdErr)
			if(i+1 >= langArr.length){
				console.log("Done!");
				callback();
			}
			else minifyLang(i+1);
		});
	}	
}

function clearTrash(callback) {
	console.log("Clear trash");

	rimraf("release/app_res/js", {}, function (err) {
		if (err) {
			return console.error(err);
		}
		console.log("Done!");
		callback();
	});
}