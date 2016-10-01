'use strict';
const H = require('highland');
const Cookies = require('cookies');
const request = require('../util/request');
const encoder = require('../util/encoder');

const civs = require('../services/civs');
const cities = require('../services/cities');
const units = require('../services/units');
const techs = require('../services/techs');
const games = require('../services/games');

//http://localhost:2002/unit/move/:gameId/:unitId/:relX/:relY
module.exports = {
	move: (req, res) => {
		const gameId = res.locals.gameId;
		const url  = `http://localhost:2002/unit/move/${gameId}/${req.params.unitId}/${req.params.x}/${req.params.y}`;
		request(res.locals.playerId, url, (err, data) => {
			res.redirect('/game');
		});
	},
	found: (req, res) => {
		const gameId = res.locals.gameId;
		const url  = `http://localhost:2003/city/found/${gameId}/${req.params.unitId}`;
		request(res.locals.playerId, url, (err, data) => {
			console.log('!', err, data);
			res.redirect('/game');
		});
	}
};