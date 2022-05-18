const Player = require("./../models/playerModel");
const Team = require("./../models/teamModel");
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")



/////////////////////////////////////////////////////////// GET ALL PLAYERS 
exports.getAllPlayers = catchAsync(async (req, res) => {
  // DOES => Executes the query.
  // NOTE => Chaining methods is possible because after calling each method, we always return "this".
  const features = new APIFeatures(Player.find(), req.query).filter().sort().limitFields().paginate();
  const players = await features.query;

  // DOES => Sends the response.
  res.status(200).json({
    status: "success",
    results: players.length,
    data: {
      players,
    },
  });
});

/////////////////////////////////////////////////////////// GET PLAYER BY ID
exports.getPlayerById = catchAsync(async (req, res, next) => {
  const player = await Player.findById(req.params.id, (err) => {
    // DOES => If there is no team whose ID matches the one passed in the query parameter, returns 404 error.
    if (err) {
      next(new AppError('No player found with that ID', 404));
      return;
    }
  }).clone();

  res.status(200).json({
    status: "success",
    data: {
      player,
    },
  });
})

/////////////////////////////////////////////////////////// GET PLAYERS INFO
exports.getPlayerInfo = catchAsync(async (req, res) => {
  const playersInfo = await Team.aggregate([
    {
      $unwind: {
        path: "$players",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {"name": req.params.team}
    },
    {
      $group: {
        _id: {
          _id: "$id",
          playerId: "$players.id"
        },
        name: {
          $first: "$name"
        },
        player_name: {
          $first: "$players.full_name"
        },
        jersey_number: {
          $first: "$players.jersey_number",
        },
        birthdate: {
          $first: "$players.birthdate"
        },
      }
    },

    {
      $group: {
        _id: "$id.id",
        name: {
          $first: "$name"
        },
        players: {
          $push: {
            name: "$player_name",
            number: {$toInt: "$jersey_number"},
            birthdate: "$birthdate",
            // birthdate: {
            // 	$dateFromString: {
            // 		dateString: "$birthdate",
            // 	}
            // }
          },
        }
      },
    },
  ])
  res.status(200).json({
    status: "success",
    data: {
      playersInfo,
    }
  });
})