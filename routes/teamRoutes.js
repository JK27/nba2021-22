const express = require("express");
const teamController = require("./../controllers/teamController");

/////////////////////////////////////////////////////////// TEAM ROUTES
const router = express.Router();

router.param("ref", (req, res, next, val) => {
	console.log(`Team ref is: ${val}`);
	next();
});

router.get("/", teamController.getAllTeams);
router.get("/:ref", teamController.getTeamById);

module.exports = router;
