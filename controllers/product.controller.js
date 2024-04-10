

//Controller to create new category by admin
// POST localhost:3000/ecomm/api/v1/products

const product_model = require("../models/product.model")

exports.createNewProduct = async (req,res) =>{

    //Read the request body
    const prod_obj={
        description : req.body.description,
        materialComposition : req.body.materialComposition,
        performanceSpecs : req.body.performanceSpecs,
        pricing : req.body.pricing,
        inventaryLevels : req.body.inventaryLevels
    }
    try {
        //Insert into mongodb
        const product = await product_model.create(prod_obj);
    
        //Return the product object
        return res.status(200).send(product)
        
    } 
    
    catch (err) {
        console.log("Error while inserting to database",err);
        return res.status(500).send({message : "Error while inserting product to database."})
    }
}