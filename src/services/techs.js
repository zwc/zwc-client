'use strict';
const H = require('highland');
const wrappedRequest = require('../util/wrappedRequest');
const url = `http://localhost:2005/tech`;
// list: http://localhost:2005/tech/list/:gameId

module.exports = {
	list: (playerId, gameId) => {
		return H([{ playerId, url: `${url}/list/${gameId}`}])
			.flatMap(wrappedRequest)
			.map(data => ({ techs: data }))
	},
	available: (playerId, gameId) => {
		return H([{ playerId, url: `${url}/available/${gameId}`}])
			.flatMap(wrappedRequest)
			.map(data => ({ available: data }))
	}
};