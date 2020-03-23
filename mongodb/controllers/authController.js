"use strict";
const jwt = require("jsonwebtoken");
const passport = require("passport");

const login = (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something went wrong',
                user: user
            });
        }
        req.login(user, { session: false }, err => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, "v-QRYzEa7FwqngUj5_8Q1fbF1In7n9FeiJxN6F3m0tdskqwR0u9H4_pWmmbAzXddz_6AQBYhCVahYUQ03cgldyV6kwZ5NhuzGAvInMdCaxGAZw7B7ezG_3aR-iLsleZp_Sk8i6teeJHY3fI5xeh6Xppme2-jebcLfsSBSWxiWzc");
            return res.json({ user, token });
        });
    })(req, res);
};

module.exports = {
    login
};
