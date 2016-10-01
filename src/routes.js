'use strict';
const index = require('./routes/index');
const login = require('./routes/user/login');
const logout = require('./routes/user/logout');
const register = require('./routes/user/register');
const game = require('./routes/game');

module.exports = (app) => {
	app.get('/', index.index);

	// User
	app.get('/user/register', register.index);
	app.post('/user/register', register.post);
	app.get('/user/login', login.index);
	app.post('/user/login', login.post);
	app.get('/user/logout', logout.index);

	// Game
	app.get('/game/create', game.create);
	app.get('/game/list', game.list);
	app.get('/game/status/:gameId', game.status);
};