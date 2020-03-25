"use strict";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const connectiontypeSchema = new Schema({
    FormalName: String,
    Title: String
});

module.exports = mongoose.model("ConnectionType", connectiontypeSchema);
