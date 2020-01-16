var server = require('express');
var app = server();
var path = require('path')

app
	.set('view engine', 'ejs')
	.use('/app_res', server.static(path.join(__dirname, '/app_res')))
	.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '/index.html'));
	})
	/*.get('*', function(req, res){
		res.redirect("/");
	})*/
	.listen(3000, function () {
		console.log('Start on port 3000');
	});