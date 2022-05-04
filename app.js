const express = require("express");
const morgan = require("morgan");

/////////////////////////////////////////////////////////// ROUTERS
const teamRouter = require("./routes/teamRoutes");

const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

/////////////////////////////////////////////////////////// MIDDLEWARES
app.use(morgan("dev"));
app.use((req, res, next) => {
	console.log("Hello from the middleware 👋");
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

/*
///////////////////////////// Code needed if using RapidAPI instead of database
// const options = {
// 	method: "GET",
// 	url: "https://api-nba-v1.p.rapidapi.com/teams",
// 	headers: {
// 		"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
// 		"X-RapidAPI-Key": "9e7bd6f898msh93d50de1ac10b7dp1cb292jsn27f20eb487a9",
// 	},
// };

// axios
// 	.request(options)
// 	.then(() => {
// 		console.log("DB connection successful ✅");
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});
*/

app.use("/api/v1/teams", teamRouter);

module.exports = app;
