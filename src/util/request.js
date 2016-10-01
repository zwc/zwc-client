'use strict';
const request = require('request');
const jar = request.jar();

module.exports = (playerId, url, callback) => {
	const cookie = request.cookie(`session=${playerId}`);
	jar.setCookie(cookie, url);
	request({ url, jar, json: true }, (err, body, data) => {
		callback(err, data);
	});
};