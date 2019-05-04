var static = require('node-static');
 
//
// Create a node-static server instance to serve the './public' folder
//
var version = "./src";
process.argv.forEach(function (val, index, array) {
	if(index == 2)
		switch (val) {
			case "-release":
				version = "./release";
				break;
			case "-dev":
				version = "./src";
				break;
			default:
				version = "./src";
				break;
		}
});



var serve = new static.Server(version);

 
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        serve.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) {
                serve.serveFile('/not-found.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(8080);
console.log("Run "+version)