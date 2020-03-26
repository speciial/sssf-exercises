"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const db = require("./database/db");

const stationRoute = require("./routes/stationRoute");
const connectionRoute = require("./routes/connectionRoute");
const authRoute = require("./routes/authRoute");

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use("/station", stationRoute);

app.use("/connection", connectionRoute);

app.use("/auth", authRoute);

db.on("connected", () => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
});
