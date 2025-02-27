const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Add middle hadle form data
app.use(express.urlencoded({extended: true}));

// Routes
const homeRouter = require("./routes/home");
app.use("/", homeRouter);
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

app.listen(3000, () => {
    console.log("Your app is running on PORT 3000");
} )