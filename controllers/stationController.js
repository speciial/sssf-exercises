"use strict";
const stationModel = require("../models/station");

const conncetionModel = require("../models/connection");
const conncetionTypeModel = require("../models/connectiontype");
const currentTypeModel = require("../models/currenttype");
const levelModel = require("../models/level");

const station_list_get = async (req, res) => {
    var start = 0;
    var limit = 10;

    if (req.query.start !== undefined) {
        start = parseInt(req.query.start);
    }
    if (req.query.limit !== undefined) {
        limit = parseInt(req.query.limit);
    }

    if (
        req.query.topRight !== undefined &&
        req.query.bottomLeft !== undefined
    ) {
        const topRight = JSON.parse(req.query.topRight);
        const bottomLeft = JSON.parse(req.query.bottomLeft);

        const polygon = {
            type: "Polygon",
            coordinates: [
                [
                    [bottomLeft.lng, topRight.lat],
                    [topRight.lng, topRight.lat],
                    [topRight.lng, bottomLeft.lat],
                    [bottomLeft.lng, bottomLeft.lat],
                    [bottomLeft.lng, topRight.lat]
                ]
            ]
        };

        const stations = await stationModel
            .find({
                Location: {
                    $geoWithin: {
                        $geometry: polygon
                    }
                }
            })
            .skip(start)
            .limit(limit)
            .populate({
                path: "Connections",
                populate: [
                    { path: "ConnectionTypeID" },
                    { path: "LevelID" },
                    { path: "CurrentTypeID" }
                ]
            });
        res.send(stations);
    } else {
        const stations = await stationModel
            .find()
            .skip(start)
            .limit(limit)
            .populate({
                path: "Connections",
                populate: [
                    { path: "ConnectionTypeID" },
                    { path: "LevelID" },
                    { path: "CurrentTypeID" }
                ]
            });
        res.send(stations);
    }
};

const station_get = async (req, res) => {
    const station = await stationModel.findById(req.params.id).populate({
        path: "Connections",
        populate: [
            { path: "ConnectionTypeID" },
            { path: "LevelID" },
            { path: "CurrentTypeID" }
        ]
    });
    res.send(station);
};

const station_post = async (req, res) => {
    const post = await stationModel.create(req.body);
    res.status(200).send(`Station with id ${post._id} was created`);
};

const station_put = async (req, res) => {
    const put = await stationModel.updateOne(req.body);
    res.status(200).send(`Station with id ${req.body._id} was updated`);
};

const station_delete = async (req, res) => {
    const del = await stationModel.deleteOne({_id: req.params.id});
    res.status(200).send(`Station with id ${req.params.id} was deleted`);
}

module.exports = {
    station_list_get,
    station_get,
    station_post,
    station_put,
    station_delete
};
