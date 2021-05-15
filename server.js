const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

// routes  
app.use(require("./database/index"));
app.use(require('./controllers/phonesController'));

//use this to show the image you have in node js server to client (react js)
app.use('/uploads', express.static('uploads'));

//Settings
app.set("port", process.env.PORT || 5000);

app.listen("5000", function () {
  console.log("Server started at: 5000");
});

module.exports = app;
