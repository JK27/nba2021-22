const Team = require("./../models/teamModel");
const APIFeatures = require('./../utils/apiFeatures')

/////////////////////////////////////////////////////////// ROUTE HANDLERS
/////////////////////////////////////// GET ALL TEAMS
exports.getAllTeams = async (req, res) => {
	try {
		// DOES => Executes the query.
		// NOTE => Chaining methods is possible because after calling each method, we always return 'this'.
		const features = new APIFeatures(Team.find(), req.query).filter().sort().limitFields().paginate();
		const teams = await features.query;

		// DOES => Sends the response.
		res.status(200).json({
			status: "success",
			results: teams.length,
			data: {
				teams,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

/////////////////////////////////////// GET TEAM BY ID
exports.getTeamById = async (req, res) => {
	try {
		const team = await Team.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				team,
			},
		});
	} catch (err) {
		return res.status(404).json({
			status: "fail",
			message: "Invalid team id.",
		});
	}
};

exports.getTeamStats = async (req, res) => {
	try {
		const stats = await Team.aggregate([
			{
				$match: {}
			},
			{
				$group: {
					_id: '$division',
					olderTeam: {$min: '$founded'},
					newerTeam: {$max: '$founded'},
				}
			},
			{
				$sort: {olderTeam: 1}
			}
		])

		console.log(stats)

		res.status(200).json({
			status: "success",
			data: {
				stats,
			}
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
}
/*
********************************** CODE TO GET PLAYERS INFO
exports.getPlayerInfo = async (req, res) => {
	try {
		const playersInfo = await Team.aggregate([
			{
				$unwind: {
					path: "$players",
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$match: {"name": 'Celtics'}
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
						$first: "$players.jersey_number"
					}
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
							_id: "$id.playerId",
							name: "$player_name",
							number: "$jersey_number"
						}
					}
				}
			}
		])
		console.log(playersInfo)
		res.status(200).json({
			status: "success",
			data: {
				playersInfo,
			}
		});
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
}
*/
