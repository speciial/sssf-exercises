const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel");

const login = (req, res) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Something went wrong",
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.redirect("/chat.html");
        });
    })(req, res);
};

const register = async (req, res) => {
    const { username, password, password2 } = req.body;
    let errors = [];

    if (!username || !password || !password2) {
        errors.push({ msg: "All fields must be filled in!" });
    }

    if (password !== password2) {
        errors.push({ msg: "Passwords do not match!" });
    }

    if (errors.length > 0) {
        console.log("something went wrong");
        res.send(errors);
    } else {
        try {
            const userCheck = await userModel.findOne({ username: username });
            if (userCheck) {
                errors.push({ msg: "Username already exists" });
                res.send(errors);
            } else {
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = new userModel({
                    username: username,
                    password: hashedPassword,
                });
                await newUser.save();
                res.redirect(301, "/index.html");
            }
        } catch (error) {
            res.send(error);
        }
    }
};

module.exports = {
    login,
    register,
};
