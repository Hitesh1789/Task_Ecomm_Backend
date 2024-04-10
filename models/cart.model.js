
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId :{
        type : String,
        required : true,
        ref : 'user'  //reference to users collection
    },
    items :[
        {
            productId : {
                type : String,
                ref : 'product',   //reference to users collection
                required : true
            },
            quantity : {
                type : Number,
                required : true,
                default : 1
            }
        }
    ],
    cost : {
        type : Number,
        required : true
    }
},{timestamps:true , versionKey : false})

module.exports = mongoose.model("Cart",cartSchema)