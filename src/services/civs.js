'use strict';
const H = require('highland');
const wrappedRequest = require('../util/wrappedRequest');
const url = `http://localhost:2008/civ`;
// list: http://localhost:2008/civ/list/c538e446-0aa0-4e53-bc35-e393eae8b3fc

module.exports = {
	list: (playerId, gameId) => {
		return H([{ playerId, url: `${url}/list/${gameId}`}])
			.flatMap(wrappedRequest)
			.map(data => ({ civs: data }))
	}
};