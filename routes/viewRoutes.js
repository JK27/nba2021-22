const express = require("express");
const viewsController = require("../controllers/viewsController")

const router = express.Router();

router.get("/", viewsController.getOverview)
router.get("/team/:slug", viewsController.getTeam)
router.get("/:conference", viewsController.getConference)

module.exports = router