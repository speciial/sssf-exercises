"use strict";
const express = require("express");
const catRouter = express.Router();

const catController = require("../controllers/catController");

catRouter
    .route("/")
    .get(catController.cat_list_get)
//    .get(catController.cat_get_query)
    .post(catController.cat_post);

catRouter
    .route("/:id")
    .get(catController.cat_get)
    .put(catController.cat_put)
    .delete(catController.cat_delete);


module.exports = catRouter;
