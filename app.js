const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet")
const cors = require("cors");

const AppError = require("./utils/appError")
const golbalErrorHandler = require("./controllers/errorController")

/////////////////////////////////////////////////////////// ROUTERS
const teamRouter = require("./routes/teamRoutes");
const playerRouter = require("./routes/playerRoutes");
const viewRouter = require("./routes/viewRoutes");

const app = express();

/////////////////////////////////////////////////////////// PUG SETUP
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"))

/////////////////////////////////////////////////////////// GLOBAL MIDDLEWARES
//////////////////////////////////////////// IMPLEMENT CORS
app.use(cors());
//////////////////////////////////////////// STATIC FILES
// DOES => Serves static files from the specified path.
app.use(express.static(path.join(__dirname, "public")));
//////////////////////////////////////////// HELMET
// DOES => Sets security HTTP headers.
app.use(helmet({
	contentSecurityPolicy: {
		useDefaults: false,
		directives: {
			defaultSrc: ["'self'", "data:", "blob:", "https:", "ws:"],
			baseUri: ["'self'"],
			fontSrc: ["'self'", "https:", "data:"],
			scriptSrc: [
				"'self'",
				"https:",
				"http:",
				"blob:",
				"https://*.mapbox.com",
				"https://*.cloudflare.com",
				"https://cdn.jsdelivr.net/npm/chart.js",
			],
			frameSrc: ["'self'"],
			objectSrc: ["'none'"],
			styleSrc: ["'self'", "https:", "'unsafe-inline'"],
			workerSrc: [
				"'self'",
				"data:",
				"blob:",
				"https://*.tiles.mapbox.com",
				"https://api.mapbox.com",
				"https://events.mapbox.com",
			],
			childSrc: ["'self'", "blob:"],
			imgSrc: ["'self'", "data:", "blob:"],
			formAction: ["'self'"],
			connectSrc: [
				"'self'",
				"data:",
				"blob:",
				"https://*.mapbox.com",
				"https://*.cloudflare.com/",
				"https://bundle.js:*",
				"ws://127.0.0.1:*/",
				"https://jk21-nba-dashboard.azurewebsites.net/",
			],
		},
	},
}))

//////////////////////////////////////////// MORGAN
// DOES => Only uses Morgan for logging purposes when on development.
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
//////////////////////////////////////////// RATE LIMITER
// DOES => Rate limiter only will allow a maximum of 1000 request per hour coming from the same IP address.
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from the same IP address. Please try again in one hour."
});

app.use("/api/", limiter);

//////////////////////////////////////////// BODY PARSER
// DOES => Reads data from the body into req.body.
app.use(express.json({
	limit: "10kb"
}));

/////////////////////////////////////////////////////////// ROUTE HANDLERS
app.use("/", viewRouter);
app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/players", playerRouter);

// DOES => Catches all unhandled errors for invalid routes
app.all("*", (req, res, next) => {
	next(new AppError(`Cannot find ${req.originalUrl}`, 404));
})

/////////////////////////////////////////////////////////// ERROR HANDLERS
app.use(golbalErrorHandler)

module.exports = app;
