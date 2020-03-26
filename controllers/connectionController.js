"use strict";
const connectionModel = require("../models/connection");

const conncetionTypeModel = require("../models/connectiontype");
const currentTypeModel = require("../models/currenttype");
const levelModel = require("../models/level");

const connection_list_get = async (req, res) => {
    var start = 0;
    var limit = 10;

    if (req.query.start !== undefined) {
        start = parseInt(req.query.start);
    }
    if (req.query.limit !== undefined) {
        limit = parseInt(req.query.limit);
    }

    const connections = await connectionModel
        .find()
        .skip(start)
        .limit(limit)
        .populate([
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
        ]);
    res.send(connections);
};

const connection_get = async (req, res) => {
    const connection = await connectionModel
        .findById(req.params.id)
        .populate([
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
        ]);
    res.send(connection);
};

const connection_post = async (req, res) => {
    const post = await connectionModel.create(req.body);
    res.status(200).send(`connection with id ${post._id} was created`);
};

const connection_put = async (req, res) => {
    const put = await connectionModel.updateOne(req.body);
    res.status(200).send(`connection with id ${req.body._id} was updated`);
};

const connection_delete = async (req, res) => {
    const del = await connectionModel.deleteOne({ _id: req.params.id });
    res.status(200).send(`connection with id ${req.params.id} was deleted`);
};

module.exports = {
    connection_list_get,
    connection_get,
    connection_post,
    connection_put,
    connection_delete
};
