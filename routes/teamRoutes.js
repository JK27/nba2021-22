const express = require("express");
const teamController = require("./../controllers/teamController");

/////////////////////////////////////////////////////////// TEAM ROUTES
const router = express.Router();

router.param("id", (req, res, next, val) => {
	console.log(`Team id is: ${val}`);
	next();
});

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);

module.exports = router;
