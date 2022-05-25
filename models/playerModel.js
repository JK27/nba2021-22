const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  status: String,
  full_name: String,
  first_name: String,
  last_name: String,
  abbr_name: String,
  height: Number,
  weight: Number,
  position: String,
  primary_position: String,
  jersey_number: String,
  experience: String,
  college: String,
  high_school: String,
  birth_place: String,
  birthdate: String,
  rookie_year: Number,
  draft: {
    team_id: String,
    year: Number,
    round: String,
    pick: String,
  },
  team_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team'
  },
});

/////////////////////////////////////////////////////////// QUERY MIDDLEWARE
// DOES => Populates the field players with the player's info selected, based on the player's ObjectId.
// playerSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'team_id',
//     // select: 
//   });
//   next();
// })

const Player = mongoose.model('Player', playerSchema);

module.exports = Player