const express = require("express");
const viewsController = require("../controllers/viewsController")

const router = express.Router();

router.get("/", viewsController.getOverview)
// router.get("/team", viewsController.getTeam)
router.get("/team/:slug", viewsController.getTeam)

module.exports = router