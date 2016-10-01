'use strict';
const Cookies = require('cookies');
const request = require('request');
const encoder = require('../../util/encoder');

module.exports = {
	index: (req, res) => {
		res.render('pages/register');
	},
	post: (req, res) => {
		const cookies = new Cookies(req, res);
		const email = req.body.email;
		const password = req.body.password;
		const secret = req.body.secret;
		if(secret === 'kensentme') {
			request(`http://localhost:2001/user/create/${email}/${password}`, () => {
				cookies.set('playerId', encoder.encode(email));
				res.redirect('/');
			});
		} else {
			res.redirect('/user/register');
		}
	}
};