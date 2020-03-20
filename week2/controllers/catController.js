"use strict";
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
    res.json(cats);
};

const cat_get = (req, res) => {
    const catID = parseInt(req.params.id);
    res.send(cats.filter((cat) => {
        return cat.id == catID;
    }));
};

module.exports = {
    cat_list_get,
    cat_get,
};
