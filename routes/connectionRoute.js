"use strict";
const express = require("express");
const router = express.Router();

const passport = require("../utils/passport");

const connectionController = require("../controllers/connectionController");

router.get("/", connectionController.connection_list_get);

router.get("/:id", connectionController.connection_get);

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    connectionController.connection_post
);

router.put(
    "/",
    passport.authenticate("jwt", { session: false }),
    connectionController.connection_put
);

router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    connectionController.connection_delete
);

module.exports = router;