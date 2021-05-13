const mongoose = require('mongoose');

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
