exports.getRegister = (req, res) => {
    res.render("register");
}

exports.postRegister = (req, res) => {
    res.send("Post Register Success !");
}

exports.getLogin = (req, res) => {
    res.render("login");
}

exports.postLogin = (req, res) => {
    res.send("Post login success");
}
