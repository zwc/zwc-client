'use strict';
const H = require('highland');
const Cookies = require('cookies');
const request = require('../util/request');
const encoder = require('../util/encoder');

const civs = require('../services/civs');
const cities = require('../services/cities');
const techs = require('../services/techs');

//http://localhost:2002/unit/move/:gameId/:unitId/:relX/:relY
module.exports = {
	start: (req, res) => {
		const gameId = res.locals.gameId;
		const url  = `http://localhost:2005/tech/start/${gameId}/${req.params.tech}`;
		request(res.locals.playerId, url, (err, data) => {
			res.redirect('/game');
		});
	}
};