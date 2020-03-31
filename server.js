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
const passport = require("./utils/passport");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

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

/*

mutation {
  addStation(
    Connections: [
      {
        ConnectionTypeID: "5e39eecac5598269fdad81c4",
        CurrentTypeID: "5e39ef4a6921476aaf62404b",
        LevelID: "5e39edf7bb7ae768f05cf2bd",
        Quantity: 1
      }
    ],
    Postcode: "21643",
    Title: "Super Awsome Station",
    AddressLine1: "Cool Street",
    StateOrProvince: "Nice Area",
    Town: "Mega Town",
    Location: {
      coordinates: [23.759752345156244, 60.8080445316381]
    }
  )
  {
    id
    AddressLine1
    Town
  }
}

 */