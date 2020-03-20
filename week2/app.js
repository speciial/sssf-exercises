'use strict';
const express = require('express');
const app = express();
const port = 3000;

const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute');


app.use('/cat', catRouter);

app.use('/user', userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
