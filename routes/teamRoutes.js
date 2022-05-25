const express = require("express");
const teamController = require("./../controllers/teamController");
const playerRouter = require("./playerRoutes");

/////////////////////////////////////////////////////////// TEAM ROUTES
const router = express.Router();

router.use("/:teamId/players", playerRouter)

router.route('/').get(teamController.getAllTeams)
router.route('/:id').get(teamController.getTeamById)
router.route('/team-info').get(teamController.getTeamStats)

// router.get("/", teamController.getAllTeams);
// router.get("/:id", teamController.getTeamById);
// router.get("/team-info", teamController.getTeamStats);


module.exports = router;
