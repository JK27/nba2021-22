const Team = require("./../models/teamModel");
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")

/////////////////////////////////////////////////////////// ROUTE HANDLERS
/////////////////////////////////////// GET ALL TEAMS
exports.getAllTeams = catchAsync(async (req, res, next) => {
	// DOES => Executes the query.
	// NOTE => Chaining methods is possible because after calling each method, we always return "this".
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
});

/////////////////////////////////////// GET TEAM BY ID
exports.getTeamById = catchAsync(async (req, res, next) => {
	const team = await Team.findById(req.params.id);
	res.status(200).json({
		status: "success",
		data: {
			team,
		},
	});
});

/////////////////////////////////////// GET TEAM STATS
exports.getTeamStats = catchAsync(async (req, res, next) => {
	const stats = await Team.aggregate([
		{
			$match: {}
		},
		{
			$group: {
				_id: "$division",
				olderTeam: {$min: "$founded"},
				newerTeam: {$max: "$founded"},
			}
		},
		{
			$addFields: {division: "$_id"}
		},
		{
			$sort: {division: 1}
		},
		{
			$project: {
				_id: 0
			}
		}
	])

	res.status(200).json({
		status: "success",
		data: {
			stats,
		}
	});
})



