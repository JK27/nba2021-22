const Team = require("./../models/teamModel");
const catchAsync = require("./../utils/catchAsync")
const factory = require("./handlerFactory");

/////////////////////////////////////////////////////////// ROUTE HANDLERS
/////////////////////////////////////// GET ALL TEAMS
exports.getAllTeams = factory.getAll(Team)

/////////////////////////////////////// GET TEAM BY ID
exports.getTeamById = factory.getOne(Team, {
	// DOES => Populates the field players with the player's info selected, based on the player's ObjectId.
	path: "players",
	select: "full_name primary_position jersey_number -_id"
})

