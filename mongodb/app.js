"use strict";
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const catRouter = require("./routes/catRoute");
const userRouter = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const passport = require("./utils/pass");
const db = require("./models/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/cat", passport.authenticate("jwt", { session: false }), catRouter);

app.use("/user", passport.authenticate("jwt", { session: false }), userRouter);

app.use("/auth", authRoute);

db.on('connected', () => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
