const express = require("express");
const morgan = require("morgan");

/////////////////////////////////////////////////////////// ROUTERS
const teamRouter = require("./routes/teamRoutes");
const playerRouter = require("./routes/playerRoutes");

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

/////////////////////////////////////////////////////////// MIDDLEWARES
// DOES => Only uses Morgan for logging purposes when on development.
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/players", playerRouter);

module.exports = app;
