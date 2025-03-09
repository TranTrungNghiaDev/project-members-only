const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool");
const bcryptjs = require("bcryptjs");

// Add passport strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    // Chechk username exist or not
    try {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length <= 0) {
            return done(null, false, { message: "Username doesn't exist" });
        }
        const user = result.rows[0];

        // Check password match or not
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return done(null, false, {message: "Password is not correct"});
        }

        done(null, user);

    } catch (error) {
        done(error);
    }


}));

// Save user info into session
passport.serializeUser((user, done) => {
    done(null, user.id);
})

// Get user from session
passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = result.rows[0];
        if(!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
    
})