const Team = require("./../models/teamModel");
const catchAsync = require("./../utils/catchAsync")
const factory = require("./handlerFactory");

/////////////////////////////////////////////////////////// ROUTE HANDLERS
/////////////////////////////////////// GET ALL TEAMS
exports.getAllTeams = factory.getAll(Team)

/////////////////////////////////////// GET TEAM BY ID
exports.getTeamById = factory.getOne(Team)

