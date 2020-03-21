"use strict";
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
    users.forEach((user) => {
        delete user.password;
    });
    res.json(users);
};

const user_get = (req, res) => {
    const userID = parseInt(req.params.id);
    res.send(users.filter((user) => {
        if(user.id == userID) {
            delete user.password;
            return true;
        }
    }));
}

module.exports = {
    user_list_get,
    user_get,
};