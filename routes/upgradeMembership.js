const express = require("express");
const router = express.Router();
const upgradeMembershipController = require("../controllers/upgradeMembershipController");
const {validateMembership} = require("../middleware/validation");

router.get("/", upgradeMembershipController.getUpgradeMembership);
router.post("/", validateMembership ,upgradeMembershipController.postUpgradeMembership);

module.exports = router;