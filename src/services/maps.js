'use strict';
const H = require('highland');
const _ = require('lodash');
const wrappedRequest = require('../util/wrappedRequest');
const url = `http://localhost:2004/map`;

// list: http://localhost:2004/map/local/:gameId

module.exports = {
	local: (playerId, gameId) => {
		// TODO: switch back to "local" when local is working
		return H([{ playerId, url: `${url}/show/${gameId}`}])
			.flatMap(wrappedRequest)
			.map(map => {
				const tiles = [];
				for(let r=0;r<=10;r++) {
					tiles.push([]);
					const odd = r % 2 === 0;
					for(let c=0; c < (odd ? 14 : 13); c++) {
						tiles[r].push(_.find(map, { x: c, y: r}) || { x: c, y: r })
					}
				}
				return {
					local: tiles
				}
			})
	}
};