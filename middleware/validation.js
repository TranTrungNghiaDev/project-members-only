const {body} = require("express-validator");
const pool = require("../config/pool");

const validateRegiter = [
    body("username")
    .trim()
    .isLength({min: 4, max: 16}).withMessage("Username must contain at least 4 to 16 characters")
    .isAlphanumeric().withMessage("Username only contains characters and numbers")
    .custom(async (value) => {
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [value]);
        if (result.rows.length > 0) {
            throw new Error("This username has been taken. Please choose another one");
        }
        return true;
    }),

    body("password")
    .trim()
    .isLength({min: 4, max: 16}).withMessage("Password must contain at least 4 to 16 characters")
    .matches(/\d/).withMessage("Password must contains at least one number")
    .matches(/\w/).withMessage("Password must contain at least one character"),

    body("confirmPassword")
    .trim()
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Password does not match")
        }
        return true;
    })
];

module.exports = {validateRegiter};
