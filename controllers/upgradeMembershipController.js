const { validationResult } = require("express-validator");
const pool = require("../config/pool");

exports.getUpgradeMembership = async (req, res) => {
    res.render("upgradeMembership", {
        errors: []
    });
};

exports.postUpgradeMembership = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("upgradeMembership", {
            errors: errors.array()
        })
    }

    const { id } = req.user;
    try {
        await pool.query("UPDATE users SET membership_status = 'member' WHERE id = $1", [id]);
        return res.redirect("/");
    } catch (error) {
        return next(error);
    }

};