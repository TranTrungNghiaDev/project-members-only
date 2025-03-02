exports.getHome = (req, res) => {
    let username;
    if(req.isAuthenticated()) {
        username = req.user.username;
    }
    else {
        username = "";
    }
    res.render("home", {username});
}