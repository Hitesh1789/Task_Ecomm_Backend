
const mongoose = require("mongoose");


//store information about biodegradable alternatives, including product descriptions, material composition, performance specifications, pricing, and inventory levels.
const productSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    materialComposition : {
        type : String,
        required : true
    },
    performanceSpecs : {
        type : String,
        required : true
    },
    pricing : {
        type : Number,
        required : true
    },
    inventaryLevels : {
        type : Number,
        required : true
    }

},{timestamps:true , versionKey:false})

module.exports = mongoose.model("Product",productSchema)