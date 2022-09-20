const Player = require("./../models/playerModel");
// const Team = require("./../models/teamModel");
// const APIFeatures = require("./../utils/apiFeatures")
// const catchAsync = require("./../utils/catchAsync")
const factory = require("./handlerFactory");



/////////////////////////////////////////////////////////// GET ALL PLAYERS 
exports.getAllPlayers = factory.getAll(Player)

/////////////////////////////////////////////////////////// GET PLAYER BY ID
exports.getPlayerById = factory.getOne(Player);

