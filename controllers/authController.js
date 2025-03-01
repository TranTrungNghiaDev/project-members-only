const {validationResult} = require("express-validator")

exports.getRegister = (req, res) => {
    res.render("register", {
        errors: []
    });
}

exports.postRegister = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render("register", {
            errors: errors.array()
        })
    }
    
    res.render("home", {username: req.body.username});
}

exports.getLogin = (req, res) => {
    res.render("login");
}

exports.postLogin = (req, res) => {
    res.send("Post login success");
}
