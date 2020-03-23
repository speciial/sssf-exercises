"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtraactJWT = passportJWT.ExtractJwt;

const userModel = require("../models/userModel");

// local strategy for username password login
passport.use(
    new Strategy(
        { usernameField: "username", passwordField: "password" },
        (username, password, done) => {
            try {
                const user = userModel.getUserLogin(username);
                console.log("Local strategy", user); // result is binary row
                if (user === undefined) {
                    return done(null, false, { message: "Incorrect email." });
                }
                if (user.password !== password) {
                    return done(null, false, {
                        message: "Incorrect password."
                    });
                }
                return done(
                    null,
                    { ...user },
                    { message: "Logged In Successfully" }
                ); // use spread syntax to create shallow copy to get rid of binary row type
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtraactJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey:
                "v-QRYzEa7FwqngUj5_8Q1fbF1In7n9FeiJxN6F3m0tdskqwR0u9H4_pWmmbAzXddz_6AQBYhCVahYUQ03cgldyV6kwZ5NhuzGAvInMdCaxGAZw7B7ezG_3aR-iLsleZp_Sk8i6teeJHY3fI5xeh6Xppme2-jebcLfsSBSWxiWzc"
        },
        (jwtPayload, done) => {
            try {
                const user = userModel.getUserID(jwtPayload.id);

                if (user === undefined) {
                    return done(null, false, { message: "Incorrect id" });
                }

                return done(
                    null,
                    { ...user },
                    { message: "Logged in Successfully" }
                );
            } catch (err) {
                return done(err);
            }
        }
    )
);

module.exports = passport;
