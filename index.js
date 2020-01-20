const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const app = express();

console.log('Starting Server...');

const isRelease = process.env.RELEASE === "prod";

console.log('Deploy:', isRelease? 'release' : 'develop');

const sslKeys = process.env.SSL_KEYS && JSON.parse(process.env.SSL_KEYS);

console.log('HTTPS:', sslKeys? 'on' : 'off');

const port = isRelease? (sslKeys? 443 : 80) : 3000;

console.log('Port:', port);

const options = sslKeys && {
    key: fs.readFileSync(sslKeys.key, 'utf8'),
    cert: fs.readFileSync(sslKeys.cert, 'utf8'),
};
const server = isRelease? https.createServer(options, app) : http.createServer(app);

try {
	app
		.set('view engine', 'ejs')
		.use('/app_res', express.static(path.join(__dirname, '/app_res')))
		.use('/.well-known', express.static(path.join(__dirname, '/.well-known')))
		.get('/*', (req, res) => {
			res.sendFile(path.join(__dirname, '/index.html'));
		});

	server
		.listen(port, () => {
			console.log('Starting successfull');
		});
} catch(e) {
	console.log('Error start server', e);
}		