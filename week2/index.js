'use strict';
const express = require('express');
const app = express();
const port = 3000;
const catRoute = require('./routes/catRoute');

app.use('/cat', catRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
