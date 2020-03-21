'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const upload = multer();
const port = 3000;

const catRouter = require('./routes/catRoute');
const userRouter = require('./routes/userRoute');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/cat', catRouter);

app.use('/user', userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
