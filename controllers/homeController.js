exports.getHome = (req, res) => {
    res.render("home", {username: ""});
}