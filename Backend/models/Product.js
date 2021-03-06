const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageName:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true
    }

});


module.exports = mongoose.model("Products", ProductSchema);
