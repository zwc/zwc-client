'use strict';
const app = require('./src/express');
app.listen(3000, () => {
	console.log('frontend up');
});