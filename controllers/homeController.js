exports.getHome = (req, res) => {
    if(req.isAuthenticated()) {
       return res.render("home", {username: req.user.username});
    }
    res.render("home", {username: ""});
}