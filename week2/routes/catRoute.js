"use strict";
// catRoute
const express = require("express");
const router = express.Router();

// NOTE: putting a ? after the parameter makes it optional
router.get("/:id?", (req, res) => {
  res.send("You reqested a cat whose id is " + req.params.id);
});

router.put("/", (req, res) => {
  res.send("With this endpoint you can edit cats");
});

router.post("/", (req, res) => {
  res.send("With this endpoint you can add cats.");
});

router.delete("/", (req, res) => {
  res.send("With this endpoint you can delete cats.");
});

module.exports = router;