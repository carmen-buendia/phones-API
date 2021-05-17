require('dotenv').config();
const router = require('express').Router();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose');
const path = require('path');


//middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true
}));

// routes  
app.use('/api', require('./routes/productsRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/uploadRoutes'));
app.use('/api', require('./routes/userRoutes'));
// app.use('/api', require('./routes/paymentRoutes'))


// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


//listen port
const PORT = process.env.PORT || 5001
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})

module.exports = app;
