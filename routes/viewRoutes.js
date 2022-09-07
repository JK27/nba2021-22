const express = require("express");
const viewsController = require("../controllers/viewsController")

const router = express.Router();

router.get("/", viewsController.getAllTeams)
router.get("/team/:slug", viewsController.getTeam)


module.exports = router