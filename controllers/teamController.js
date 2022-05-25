const Team = require("./../models/teamModel");
const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync")
const AppError = require("./../utils/appError")

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
	const team = await Team.findById(req.params.id, (err) => {
		// DOES => If there is no team whose ID matches the one passed in the query parameter, returns 404 error.
		if (err) {
			next(new AppError("No team found with that ID", 404));
			return;
		}
		// NOTE => Need to .clone() to avoid error of Query already executed.
	}).clone().populate({
		// DOES => Populates the field players with the player's info selected, based on the player's ObjectId.
		path: "players",
		select: "full_name primary_position jersey_number -_id"
	});

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



