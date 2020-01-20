var server = require('express');
var app = server();
var path = require('path')

app
	.set('view engine', 'ejs')
	.use('/app_res', server.static(path.join(__dirname, '/app_res')))
	.use('/.well-known', server.static(path.join(__dirname, '/.well-known')))
	.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, '/index.html'));
	})
	/*.get('*', function(req, res){
		res.redirect("/");
	})*/
	.listen(process.env.RELEASE === "production" && 80 || 3000, () => {

		console.log('Start on port:', process.env.RELEASE === "production" && 80 || 3000);

		if(process.env.RELEASE === "production"){
			console.log('Is production release');
		}
	});