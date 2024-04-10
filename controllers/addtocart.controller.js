
const cart_model = require("../models/cart.model")

exports.addtoCart = async (req,res)=>{
    
    //read the request body

    const cart_obj = {
        userId : req.body.userId,
        items : req.body.items,
        cost : req.body.cost
    }

    try {
        //Insert in cart (database collection)
        const cart = await cart_model.create(cart_obj);
        
        return res.status(200).send(cart)

    } catch (err) {
        console.log("Error while adding to cart",err);
        return res.status(500).send({
            message : 'Error while adding to cart'
        })
    }
}