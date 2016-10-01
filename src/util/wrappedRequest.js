'use strict';
const H = require('highland');
const request = require('request');

const wrappedRequest = H.wrapCallback((params, callback) => {
	const jar = request.jar();
	const cookie = request.cookie(`session=${params.playerId}`);
	jar.setCookie(cookie, params.url);
	request({ url: params.url, jar, json: true }, (err, body, data) => { callback(err, data); });
});

module.exports = wrappedRequest;