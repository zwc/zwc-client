'use strict';
const Cookies = require('cookies');
const encoder = require('../util/encoder');

// Store values in res.locals to get them into handlebars without having to assign them in each template
module.exports = (req, res, next) => {
	const cookies = new Cookies(req, res);
	const playerId = encoder.decode(cookies.get('playerId'));
	const gameId = encoder.decode(cookies.get('gameId'));
	res.locals.playerId = playerId;
	res.locals.session = gameId;
	next();
};