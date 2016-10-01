'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const moment = require('moment');
const expressApp = express();
const bodyParser = require('body-parser');
const compress = require('compression');
const encoder = require('./util/encoder');
const sessionMiddleware = require('./middleware/session');

expressApp.disable('x-powered-by');
expressApp.use(compress());
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: false }));

const hbs = exphbs.create({
	defaultLayout: 'default',
	partialsDir: [
		__dirname + '/../views/partials'
	],
	helpers: {
		moment: (value) => {
			return moment(value).format('YYYY-MM-DD');
		},
		time: (value) => {
			return moment().to(value);
		},
		ifCond: (v1, v2, options) => {
			if(v1 === v2) {
				return options.fn(this);
			}
			return options.inverse(this);
		},
		ifExists: (v1, v2, options) => {
			if(v1.find((x) => { return x === v2})) {
				return options.fn(this);
			}
			return options.inverse(this);
		}
	}
});

expressApp.engine('handlebars', hbs.engine);

expressApp.use(express.static('public'));
expressApp.use(sessionMiddleware);

expressApp.set('view engine', 'handlebars');
expressApp.set('views', __dirname + '/../views');

// add routes
require('./routes.js')(expressApp);

module.exports = expressApp;
