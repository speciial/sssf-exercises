"use strict";
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stationSchema = new Schema({
    Location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    Connections: [{ type: Schema.Types.ObjectId, ref: "Connection" }],
    Title: String,
    AddressLine1: String,
    Town: String,
    StateOrProvince: String,
    Postcode: String
});

module.exports = mongoose.model("Station", stationSchema);