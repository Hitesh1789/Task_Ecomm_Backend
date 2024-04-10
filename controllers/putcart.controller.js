


const put_cart = require("../models/cart.model")

exports.put_productbyId = async (req, res) => {

    //extract product id from URI
    const cartId = req.params.cartId;

    try {
        if (!cartId) {
            return res.status(400).send({
                message: "Please provide cartId"
            });
        }

        //fetch data from database if it is valid id
        const cart = await put_product.findOne({ _id: cartId });

        if (!cart) {
            return res.status(404).send({
                message: 'Please enter a valid cart id'
            });
        }


    }
    catch(err){
        console.log("Error while fetching data",err)
        return res.status(500).send({ message: 'Error while fetching data' });
    }

    try{
        const updatedcart = await put_cart.findByIdAndUpdate(cartId, req.body, { new: true });
        res.status(200).send(updatedcart);
    }
        
    catch (err) {
        console.log("Error while updating data",err)
        return res.status(500).send({ message: 'Error while  updating data' });
    }
}