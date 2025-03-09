const pool = require("../config/pool");

exports.getHome = async (req, res, next) => {

    try {
        const result = await pool.query(`SELECT * FROM messages`);

        if (req.isAuthenticated()) {
            return res.render("home", {
                user: req.user,
                messages: result.rows
            });
        }

        return res.render("home", { user: null, messages: result.rows });
    } catch (error) {
        return next(error)
    }

}