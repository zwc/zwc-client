'use strict';
const H = require('highland');
const wrappedRequest = require('../util/wrappedRequest');
const url = `http://localhost:2003/city`;
// list: http://localhost:2003/city/list/c538e446-0aa0-4e53-bc35-e393eae8b3fc

module.exports = {
	list: (playerId, gameId) => {
		return H([{ playerId, url: `${url}/list/${gameId}`}])
			.flatMap(wrappedRequest)
	}
};