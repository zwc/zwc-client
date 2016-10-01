'use strict';
const H = require('highland');
const wrappedRequest = require('../util/wrappedRequest');
const url = `http://localhost:2002/unit`;
// list: http://localhost:2002/unit/list/:gameId

module.exports = {
	list: (playerId, gameId) => {
		return H([{ playerId, url: `${url}/list/${gameId}`}])
			.flatMap(wrappedRequest)
			.map(data => ({ units: data }))
	}
};