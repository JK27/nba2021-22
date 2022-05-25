const express = require("express");
const teamController = require("./../controllers/teamController");
const playerRouter = require("./playerRoutes");

/////////////////////////////////////////////////////////// TEAM ROUTES
const router = express.Router();

router.use("/:teamId/players", playerRouter)

router.route('/').get(teamController.getAllTeams)
router.route('/:id').get(teamController.getTeamById)

module.exports = router;
