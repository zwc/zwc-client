'use strict';
const Cookies = require('cookies');
const request = require('request');
const encoder = require('../../util/encoder');

module.exports = {
	index: (req, res) => {
		res.render('pages/login');
	},
	post: (req, res) => {
		const cookies = new Cookies(req, res);
		const email = req.body.email;
		const password = req.body.password;
		const secret = req.body.secret;
		const url = `http://localhost:2001/user/login/${email}/${password}`;
		request({ url, json: true }, (err, body, data) => {
			console.log(data);
			if(data.success) {
				cookies.set('playerId', encoder.encode(email));
				res.redirect('/');
			} else {
				res.redirect('/user/login');
			}
		});
	}
};
