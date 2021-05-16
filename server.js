const router = require('express').Router()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');


//middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/phonesShopDatabase', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));

    mongoose.Promise = global.Promise;

let db;

// routes  
// app.use(database);
// app.use(require('./controllers/phonesController'));
app.use('/api', require('./routes/productsRoutes'))

//use this to show the image you have in node js server to client (react js)
app.use('/uploads', express.static('uploads'));

//Settings
app.set("port", process.env.PORT || 5000);

app.listen("5000", function () {
  console.log("Server started at: 5000");
});

module.exports = app;
