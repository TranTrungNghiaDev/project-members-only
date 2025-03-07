exports.getHome = (req, res) => {
    if(req.isAuthenticated()) {
       return res.render("home", {
        username: req.user.username,
        membership_status: req.user.membership_status
    });
    }
    
    res.render("home", {username: ""});
}