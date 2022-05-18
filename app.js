const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError")
const golbalErrorHandler = require("./controllers/errorController")

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

/////////////////////////////////////////////////////////// ROUTE HANDLERS
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/players", playerRouter);

// DOES => Catches all unhandled errors for invalid routes
app.all('*', (req, res, next) => {
	next(new AppError(`Cannot find ${req.originalUrl}`, 404));
})

/////////////////////////////////////////////////////////// ERROR HANDLERS
app.use(golbalErrorHandler)

module.exports = app;
