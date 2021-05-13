const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

require("./database/index");
const getPhonesRoutes = require('./controllers/phonesController');

//middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// routes
app.use(function (req, res, next) {
  req.db = db;
  next();
});
app.use('/phones', getPhonesRoutes)


//Settings
app.set("port", process.env.PORT || 5000);

app.listen("5000", function () {
  console.log("Server started at: 5000");
});

module.exports = app;
