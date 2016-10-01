'use strict';
const sha1 = require('sha1');
const salt = 'xBW;7rR_-kmFA4rmj8aU3wZCRW6wvF:=';

module.exports = {
	encode: (value) => {
		const pair = sha1(value + salt);
		return `${value}|${pair}`;
	},
	decode: (value) => {
		if(typeof value === 'string') {
			const split = value.split('|');
			if (sha1(split[0] + salt) === split[1]) {
				return split[0];
			}
		}
		return;
	}
};