'use strict';
const Cookies = require('cookies');
const request = require('request');
const encoder = require('../../util/encoder');

module.exports = {
	index: (req, res) => {
		res.clearCookie('playerId');
		res.redirect('/');
	}
};
