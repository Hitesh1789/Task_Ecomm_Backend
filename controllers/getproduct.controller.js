
const product_model = require("../models/product.model")

exports.showProducts = async (req,res)=>{
    
    //Showing all products
    
    try{
        const Products = await product_model.find()
        res.status(200).send(Products)
    }

    catch(err){
        console.log("Error while  fetching data from database. ",err)
        res.status(500).send({
            message : "Error while fectching data from database."
        })
    }
    
}