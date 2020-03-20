"use strict";
const express = require("express");
const catRouter = express.Router();

catRouter.get("/:id?", (req, res) => {
  const catID = req.params.id;
  res.send("You requested a cat whose id is " + catID);
});

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
