// server.js
"use strict";
require("dotenv").config();

const express = require("express");
const graphqlHTTP = require("express-graphql");
const gqlSchema = require("./schema/schema");

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const db = require("./db/db");
const authRoute = require("./routes/authRoute");
const passport = require("./utils/passport");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

app.use(cors());

const checkAuth = (req, res) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            throw new Error("User not authenticated!");
        }
    })(req, res);
};

app.use("/auth", authRoute);

app.use("/graphql", (req, res) => {
    graphqlHTTP({
        schema: gqlSchema,
        graphiql: true,
        context: { req, res, checkAuth },
    })(req, res);
});

db.on("connected", () => {
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
    if (process.env.NODE_ENV === "production") {
        require("./production")(app, process.env.PORT);
    } else {
        require("./localhost")(
            app,
            process.env.HTTPS_PORT,
            process.env.HTTP_PORT
        );
    }
});

/*
    Audit result: 
    λ npm audit

                       === npm audit security report ===

    found 0 vulnerabilities
     in 387 scanned packages
 */
