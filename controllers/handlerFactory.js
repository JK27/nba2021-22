const APIFeatures = require("./../utils/apiFeatures")
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");


/////////////////////////////////////////////////////////// GET ALL
exports.getAll = Model => catchAsync(async (req, res, next) => {
  // DOES => 'filter' is used to find only players for the team matching the teamId in the params. It works as if it was 'getPlayerByTeamId'.
  let filter = {}
  if (req.params.teamId) filter = {team_id: req.params.teamId}

  // DOES => Executes the query.
  // NOTE => Chaining methods is possible because after calling each method, we always return "this".
  const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();
  const doc = await features.query;

  // DOES => Sends the response.
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  });
});



/////////////////////////////////////////////////////////// GET ONE
exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);
  if (populateOptions) query = query.populate(populateOptions);

  const doc = await query;
  // DOES => If there is no doc whose ID matches the one passed in the query parameter, returns 404 error.
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});