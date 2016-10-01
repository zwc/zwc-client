'use strict';
const H = require('highland');
const Cookies = require('cookies');
const request = require('../util/request');
const encoder = require('../util/encoder');

const maps = require('../services/maps');
const civs = require('../services/civs');
const cities = require('../services/cities');
const units = require('../services/units');
const techs = require('../services/techs');
const games = require('../services/games');

module.exports = {
	create: (req, res) => {
		const url  = `http://localhost:2000/game/create`;
		request(res.locals.playerId, url, (err, data) => {
			res.redirect('/game/list');
		});
	},
	list: (req, res) => {
		const url  = `http://localhost:2000/game/list`;
		request(res.locals.playerId, url, (err, data) => {
			const open = data.filter(game => game.data.state === 'setup');
			const progress = data.filter(game => game.data.state === 'started');
			res.render('pages/game/list', {
				open, progress
			});
		});
	},
	status: (req, res) => {
		const playerId = res.locals.playerId;
		const gameId = req.params.gameId;

		H([
			civs.list(playerId, gameId),
			games.status(playerId, gameId)
		])
			.merge()
			.reduce1(Object.assign)
			.apply(data => {
				res.render('pages/game/status', { data, gameId: req.params.gameId });
			});
	},
	play: (req, res) => {
		const gameId = req.params.gameId;
		const cookies = new Cookies(req, res);
		cookies.set('gameId', encoder.encode(gameId));
		res.redirect('/game');
	},
	pick: (req, res) => {
		const gameId = req.params.gameId;
		const civ = req.params.civ;
		const url  = `http://localhost:2000/game/option/${gameId}/civ/${civ}`;
		request(res.locals.playerId, url, (err, data) => {
			res.redirect(`/game/status/${gameId}`);
		});
	},
	ready: (req, res) => {
		const gameId = req.params.gameId;
		const civ = req.params.civ;
		const url  = `http://localhost:2000/game/option/${gameId}/ready/true`;
		request(res.locals.playerId, url, (err, data) => {
			res.redirect(`/game/status/${gameId}`);
		});
	},
	join: (req, res) => {
		const gameId = req.params.gameId;
		const url  = `http://localhost:2000/game/join/${gameId}`;
		request(res.locals.playerId, url, (err, data) => {
			res.redirect(`/game/status/${gameId}`);
		});
	},
	start: (req, res) => {
		const gameId = req.params.gameId;
		const url  = `http://localhost:1337/engine/lobby/${gameId}`;
		const cookies = new Cookies(req, res);
		cookies.set('gameId', encoder.encode(gameId));
		request(res.locals.playerId, url, (err, data) => {
			res.redirect(`/game`);
		});
	},
	index: (req, res) => {
		const playerId = res.locals.playerId;
		const gameId = res.locals.gameId;

		H([
			maps.local(playerId, gameId),
			cities.list(playerId, gameId),
			techs.list(playerId, gameId),
			techs.available(playerId, gameId),
			units.list(playerId, gameId),
			games.status(playerId, gameId)
		])
			.merge()
			.reduce1(Object.assign)
			.apply(data => {
				data.units.forEach(unit => {
					const x = unit.data.x;
					const y = unit.data.y;
					data.local[y][x].unit = unit.data;
				});
				data.cities.forEach(city => {
					const x = city.x;
					const y = city.y;
					data.local[y][x].city = city;
				});

				res.render('pages/game', data);
			});
	}
};