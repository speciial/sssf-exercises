"use strict";
const express = require('express');
const catRouter = express.Router();

const catController = require('../controllers/catController');

catRouter.get('/', catController.cat_list_get);

catRouter.get("/:id", catController.cat_get);

catRouter.post("/", (req, res) => {
  res.send("With this endpoint you can add cats.");
});

catRouter.put("/", (req, res) => {
  res.send("With this endpoint you can edit cats.");
});

catRouter.delete("/", (req, res) => {
  res.send("With this endpoint you can delete cats");
});

module.exports = catRouter;
