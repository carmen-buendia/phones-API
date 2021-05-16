const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    manufactured:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    imageFileName:{
        type: Object,
        required: true
    },
    screen:{
        type: String,
        required: true
    },
    processor: {
        type: String,
        required: true,
    },
    ram: {
        type: String,
        required: true,
    },
    checked:{
        type: Boolean,
        default: false
    },
    sold:{
        type: Number,
        default: 0
    }
}, {
    timestamps: true 
})


const model = mongoose.model("Products", productSchema)
module.exports = model;