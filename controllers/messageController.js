const pool = require("../config/pool");

exports.getAddNewMessage = (req, res) => {    
    res.render("addNewMessage");
}

exports.postAddNewMessage = async (req, res, next) => {
    try {
        const {newMessage} = req.body;
        const title = req.user.username;
        const id = req.user.id;

        await pool.query(`
            INSERT INTO messages (title, text, user_id)
            VALUES ($1, $2,$3)`, [title, newMessage, id]);
            
        return res.redirect("/");
    } catch (error) {
        return next(error);
    }
    
}

exports.postDeleteMessage = async (req, res, next) => {
    const {id} = req.params;
    try {
        await pool.query
        (`
            DELETE FROM messages 
            WHERE id = $1`,
            [id]
        );
        return res.redirect("/");

    } catch (error) {
        next(error);
    }
}