

const put_product = require("../models/product.model")

exports.put_productbyId = async (req, res) => {

    //extract product id from URI
    const productId = req.params.productId;

    try {
        if (!productId) {
            return res.status(400).send({
                message: "Please provide productId"
            });
        }

        //fetch data from database if it is valid id
        const product = await put_product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).send({
                message: 'Please enter a valid product id'
            });
        }


    }
    catch(err){
        console.log("Error while fetching data",err)
        return res.status(500).send({ message: 'Error while fetching data' });
    }

    try{
        const updatedproduct = await put_product.findByIdAndUpdate(productId, req.body, { new: true });
        res.status(200).send(updatedproduct);
    }
        
    catch (err) {
        console.log("Error while updating data",err)
        return res.status(500).send({ message: 'Error while  updating data' });
    }
}