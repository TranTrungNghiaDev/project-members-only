const pool = require("../config/pool");

exports.getHome = async (req, res, next) => {

    try {
        if (req.isAuthenticated()) {
            const userId = req.user.id;
            const result = await pool.query(`
                SELECT * FROM messages
                WHERE user_id != $1
                `, [userId]);

            return res.render("home", {
                username: req.user.username,
                membership_status: req.user.membership_status,
                messages: result.rows
            });
        }

        const result = await pool.query(`SELECT * FROM messages`);
            
        res.render("home", { username: "", messages: result.rows });
    } catch (error) {
        return next(error)
    }

}