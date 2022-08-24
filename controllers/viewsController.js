const APIFeatures = require("./../utils/apiFeatures")
const Team = require("../models/teamModel");
const catchAsync = require("../utils/catchAsync")


/////////////////////////////////////////////////////////// GET OVERVIEW
exports.getOverview = async (req, res, next) => {
  // DOES => Get team data from collection
  const teams = await Team.find()

  res.set(
    "Content-Security-Policy",
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
  );
  res.status(200).render("overview", {
    title: "All teams",
    teams
  })
}


///////////////////////////////////////////////////////////////////////////
exports.getConference = async (req, res, next) => {
  // DOES => Get team data from collection
  const teams = await Team.find({conference: req.params.conference})
  console.log(teams)

  res.set(
    "Content-Security-Policy",
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
  );
  res.status(200).render("overview", {
    title: `${req.params.conference} Conference`,
    teams
  })
}


/////////////////////////////////////////////////////////// GET TEAM
exports.getTeam = catchAsync(async (req, res) => {
  // DOES => Gets data for the requested team.
  const team = await Team.findOne({slug: req.params.slug}).populate({
    path: "players",
    fields: "full_name primary_position jersey_number -_id"
  })

  res.set("Content-Security-Policy",
    "default-src 'self' https://*.mapbox.com ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;");
  res.status(200).render("team", {
    title: `${team.market} ${team.name}`,
    team
  })
})