

const cart_model = require("../models/cart.model")

exports.showCart = async (req,res)=>{
    
    try {
        // Extract the cartId parameter from the URI
        const cartId = req.params.cartId;

        // Check if cartId is provided
        if (!cartId) {
            return res.status(400).send({ 
                message : 'Cart ID is required' 
            });
        }

        // fetch data from a database collection cart
        const cart = await cart_model.findOne({ _id: cart });

        if(!cart){
            return res.status(404).send({
                message : 'Please enter a valid cart id'
            });
        }

        res.status(200).send(cart);
    }
    
    catch (error) {
        console.error('Error while fetching data from database:', error);
        res.status(500).send({ message: 'Error while fetching data from database' });
    }
    
}