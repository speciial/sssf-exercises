"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtraactJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const user = await userModel.findOne({ email: username });
            console.log("Local strategy", user); // result is binary row
            if (user === undefined) {
                return done(null, false, { message: "Incorrect email." });
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return done(null, false, {
                    message: "Incorrect password.",
                });
            }
            delete user.password;
            return done(
                null,
                { ...user },
                { message: "Logged In Successfully" }
            ); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    })
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtraactJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await userModel.findById(jwtPayload.id);

                if (user === undefined) {
                    return done(null, false, { message: "Incorrect id" });
                }
                delete user.password;
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
