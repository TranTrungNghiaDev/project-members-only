const {validationResult} = require("express-validator");
const pool = require("../config/pool");

exports.getUpgradeMembership = (req, res) => {
    res.render("upgradeMembership", {
        errors: []
    });
};

exports.postUpgradeMembership = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render("upgradeMembership", {
            errors: errors.array()
        })
    }
    
    const {id} = req.user;
    await pool.query("UPDATE users SET membership_status = 'member' WHERE id = $1", [id]);
    res.render("home", {username: req.user.username, membership_status: req.user.membership_status});
};