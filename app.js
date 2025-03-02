const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
require("./config/passportConfig");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Add middle hadle form data
app.use(express.urlencoded({extended: true}));
// Use session
app.use(session({secret: "secret", resave: false, saveUninitialized: false}));
// Use parsport
app.use(passport.initialize());
app.use(passport.session());

// Routes
const homeRouter = require("./routes/home");
app.use("/", homeRouter);
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

app.listen(3000, () => {
    console.log("Your app is running on PORT 3000");
} )

app.use((req, res, next) => {
    const error = new Error("Page not found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
})