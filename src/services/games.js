'use strict';
const H = require('highland');
const wrappedRequest = require('../util/wrappedRequest');
const url = `http://localhost:2000/game`;
// list: http://localhost:2000/game/status/:gameId

module.exports = {
	status: (playerId, gameId) => {
		return H([{ playerId, url: `${url}/status/${gameId}`}])
			.flatMap(wrappedRequest)
			.map(data => ({ status: data }))
	}
};