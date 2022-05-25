const Player = require("./../models/playerModel");
const Team = require("./../models/teamModel");
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")
const factory = require("./handlerFactory");



/////////////////////////////////////////////////////////// GET ALL PLAYERS 
exports.getAllPlayers = factory.getAll(Player)

/////////////////////////////////////////////////////////// GET PLAYER BY ID
exports.getPlayerById = factory.getOne(Player, {
  // DOES => Populates the field players with the player's info selected, based on the player's ObjectId.
  path: "team_id",
  select: "name -_id",
});

