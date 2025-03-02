const { validationResult } = require("express-validator");
const pool = require("../config/pool");
const passport = require("passport");

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
        await pool.query("INSERT INTO users (username, password, firstname, lastname) VALUES($1,$2,$3,$4)", [username, password, firstName, lastName]);
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
        
    })
}

exports.getLogout = (req, res) => {
    req.logout((error) => {
        if(error) {
            return next(error);
        }
        req.session.destroy(() => {
            res.redirect("/");
        })
    })
}