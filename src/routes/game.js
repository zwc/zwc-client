'use strict';
const request = require('../util/request');

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
		res.render('pages/game/status');
	}
};