const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const {ensureAuthenticated} = require("../middleware/authMiddleware");

router.get("/addNewMessage", ensureAuthenticated ,messageController.getAddNewMessage);
router.post("/addNewMessage", messageController.postAddNewMessage);

router.post("/deleteMessage/:id", messageController.postDeleteMessage);

module.exports = router;