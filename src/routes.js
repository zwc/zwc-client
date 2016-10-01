'use strict';
const index = require('./routes/index');
const login = require('./routes/user/login');
const logout = require('./routes/user/logout');
const register = require('./routes/user/register');
const settings = require('./routes/user/settings');
const game = require('./routes/game');
const unit = require('./routes/unit');
const tech = require('./routes/tech');

module.exports = (app) => {
	app.get('/', index.index);

	// User
	app.get('/user/register', register.index);
	app.post('/user/register', register.post);
	app.get('/user/login', login.index);
	app.post('/user/login', login.post);
	app.get('/user/settings', settings);
	app.get('/user/logout', logout.index);

	// Game
	app.get('/game', game.index);
	app.get('/game/play/:gameId', game.play);
	app.get('/game/create', game.create);
	app.get('/game/list', game.list);
	app.get('/game/status/:gameId', game.status);
	app.get('/game/pick/:gameId/:civ', game.pick);
	app.get('/game/join/:gameId', game.join);
	app.get('/game/ready/:gameId', game.ready);
	app.get('/game/start/:gameId', game.start);

	// Unit
	app.get('/unit/move/:unitId/:x/:y', unit.move);
	app.get('/unit/found/:unitId', unit.found);

	// Tech
	app.get('/tech/start/:tech', tech.start);
};