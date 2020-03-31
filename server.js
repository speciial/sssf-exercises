// server.js
"use strict";
require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const gqlSchema = require("./schema/schema");

const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db/db");
const authRoute = require("./routes/authRoute");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// dummy function to check authentication (irl: e.g. passport-jwt)
const checkAuth = (req, res) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if(err || !user) {
            throw new Error("User not authenticated!");
        }
    })(req, res);
};

app.use("/auth", authRoute);

app.use("/graphql", (req, res) => {
    graphqlHTTP({
        schema: gqlSchema,
        graphiql: true,
        context: { req, res, checkAuth }
    })(req, res);
});

db.on("connected", () => {
    app.listen(3000);
});
