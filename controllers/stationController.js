'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
  res.send('With this endpoint you can get stations');
};

const station_get = async (req, res) => {
  res.send('With this endpoint you can get one station');
};

const station_post = (req, res) => {
  res.send('With this endpoint you can add stations');
};

const station_put = (req, res) => {
    res.send('With this endpoint you can update stations');
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_put
};
