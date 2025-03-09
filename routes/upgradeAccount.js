const express = require("express");
const router = express.Router();
const upgradeAccountController = require("../controllers/upgradeAccountController");
const {validateMembership} = require("../middleware/validationMiddleware");
const {validateAdmin} = require("../middleware/validationMiddleware");

router.get("/membership", upgradeAccountController.getUpgradeMembership);
router.post("/membership", validateMembership ,upgradeAccountController.postUpgradeMembership);

router.get("/admin", upgradeAccountController.getUpgradeToAdmin);
router.post("/admin", validateAdmin ,upgradeAccountController.postUpgradeToAdmin);

module.exports = router;