const { validationResult } = require("express-validator");
const pool = require("../config/pool");
const passport = require("passport");
const bcryptjs = require("bcryptjs");

exports.getRegister = (req, res) => {
    res.render("register", {
        errors: []
    });
}

exports.postRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("register", {
            errors: errors.array()
        })
    }

    try {
        const { username, password, firstName, lastName } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);
        await pool.query("INSERT INTO users (username, password, firstname, lastname) VALUES($1,$2,$3,$4)", [username, hashedPassword, firstName, lastName]);
        res.render("home", { username: req.body.username });
    } catch (error) {
        console.log("Register error: ", error);
        res.status(500).render("register", {
            errors: [{ msg: "An error occurred. Please try again" }]
        })
    }

}

exports.getLogin = (req, res) => {
    res.render("login", { errors: [] });
}

exports.postLogin = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if(error) {
           return next(error);
        }
        if(!user) {
            return res.render("login", {errors: [{msg: "Username or Password is not correct"}]});
        }
        req.logIn(user, (error) => {
            if(error) {
                return next(error);
            }
            return res.redirect("/");
        })
    })(req, res,next);
}

exports.getLogout = (req, res, next) => {
    req.logOut((error) => {
        if(error) {
            return next(error);
        }
        res.redirect("/");
    })
}