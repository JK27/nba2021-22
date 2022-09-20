const APIFeatures = require("./../utils/apiFeatures")
const Team = require("../models/teamModel");
const catchAsync = require("../utils/catchAsync")



/////////////////////////////////////////////////////////// GET OVERVIEW
exports.getAllTeams = catchAsync(async (req, res, next) => {
  // DOES => Get team data from collection
  // let teams = await Team.find()

  // DOES => 'filter' is used to find only players for the team matching the teamId in the params. It works as if it was 'getPlayerByTeamId'.
  let filter = {}
  // DOES => Executes the query.
  // NOTE => Chaining methods is possible because after calling each method, we always return "this".
  const features = new APIFeatures(Team.find(filter), req.query).filter().sort().limitFields().paginate();
  const teams = await features.query;
  console.log(`${teams.length} results found`)

  res.set(
    "Content-Security-Policy",
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
  );
  res.status(200).render("overview", {
    title: "2021/22 Season",
    teams
  })
})

/////////////////////////////////////////////////////////// GET TEAM
exports.getTeam = catchAsync(async (req, res) => {
  // DOES => Gets data for the requested team.
  const team = await Team.findOne({slug: req.params.slug}).populate({
    path: "players",
  })

  res.set("Content-Security-Policy",
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;");
  res.status(200).render("team", {
    title: `${team.market} ${team.name}`,
    team
  })
})

