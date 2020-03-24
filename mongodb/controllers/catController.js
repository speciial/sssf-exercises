"use strict";
const catModel = require("../models/catModel");

const cat_list_get = async (req, res) => {
    res.json(await catModel.find());
};

const cat_get = async (req, res) => {
    res.send(await catModel.findById(req.params.id));
};

const cat_get_query = async (req, res) => {
    console.log(req.query);
    res.send(
        await catModel
            .find()
            .where("gender")
            .equals(req.query.gender)
            .where("age")
            .gt(req.query.age)
            .where("weight")
            .gt(req.query.weight)
    );
};

const cat_post = async (req, res) => {
    const cat = await catModel.create({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        color: req.body.color,
        weight: req.body.weight
    });
    // TODO: error handling?
    res.send(`Cat ${cat} created!`);
};

const cat_put = async (req, res) => {
    const updatedCat = await catModel.updateOne(
        { _id: req.params.id },
        {
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            color: req.body.color,
            weight: req.body.weight
        }
    );
    res.status(200).send(
        `Sucessfully updated ${updatedCat.nModified} cat info!`
    );
};

const cat_delete = async (req, res) => {
    const deletedCat = await blog.deleteOne({ _id: req.params.id });
    res.send(`Deleted ${deletedCat.deletedCount} cats`);
};

module.exports = {
    cat_list_get,
    cat_get,
    cat_post,
    cat_put,
    cat_delete,
    cat_get_query
};
