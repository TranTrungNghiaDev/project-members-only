const {body} = require("express-validator");

const validateRegiter = [
    body("username")
    .trim()
    .isLength({min: 4, max: 16}).withMessage("Username must contain at least 4 to 16 characters")
    .isAlphanumeric().withMessage("Username only contains characters and numbers"),

    body("password")
    .trim()
    .isLength({min: 4, max: 16}).withMessage("Password must contain at least 4 to 16 characters")
    .matches(/\d/).withMessage("Password must contains at least one number")
    .matches(/\w/).withMessage("Password must contain at least one character"),

    body("confirm-password")
    .trim()
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Password does not match")
        }
        return true;
    })
];

module.exports = {validateRegiter};
