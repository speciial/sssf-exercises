"use strict";
const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
  destination : function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + suffix);
  }
});
const upload = multer({storage: storage});
const catRouter = express.Router();

const catController = require('../controllers/catController');

catRouter.get('/', catController.cat_list_get);

catRouter.get("/:id", catController.cat_get);

catRouter.post("/", upload.single('cat'), (req, res) => {
  res.send("With this endpoint you can add cats.");
});

catRouter.put("/", (req, res) => {
  res.send("With this endpoint you can edit cats.");
});

catRouter.delete("/", (req, res) => {
  res.send("With this endpoint you can delete cats");
});

module.exports = catRouter;
