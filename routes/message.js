const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const {ensureAuthenticated} = require("../middleware/authMiddleware");

router.get("/", ensureAuthenticated ,messageController.getAddNewMessage);
router.post("/", messageController.postAddNewMessage);

module.exports = router;