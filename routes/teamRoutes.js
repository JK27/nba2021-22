const express = require("express");
const teamController = require("./../controllers/teamController");
const playerRouter = require("./playerRoutes");

/////////////////////////////////////////////////////////// TEAM ROUTES
const router = express.Router({mergeParams: true});

router.route('/').get(teamController.getAllTeams)


module.exports = router;
