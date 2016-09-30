'use strict';
const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('<html><body>test</body></html>');
});

app.listen(3000);
