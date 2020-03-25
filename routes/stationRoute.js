"use strict";
const express = require("express");
const router = express.Router();

const passport = require("../utils/passport");

const stationController = require("../controllers/stationController");

router.get("/", stationController.station_list_get);

router.get("/:id", stationController.station_get);

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    stationController.station_post
);

router.put(
    "/",
    passport.authenticate("jwt", { session: false }),
    stationController.station_put
);

module.exports = router;
