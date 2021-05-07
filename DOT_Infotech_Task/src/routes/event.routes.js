const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
// Consents changes
router.post("/", eventController.changeConsents);
module.exports = router;
