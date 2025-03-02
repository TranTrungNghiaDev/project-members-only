const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {validateRegiter} = require("../middleware/validation");

router.get("/register", authController.getRegister);
router.post("/register" , validateRegiter ,authController.postRegister);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);
module.exports = router;