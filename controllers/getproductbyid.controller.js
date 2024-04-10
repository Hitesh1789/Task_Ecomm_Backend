





const get_productid = require("../models/product.model")


exports.getProductById = async (req, res) => {

    try {
        // Extract the categoryId parameter from the URI
        const productId = req.params.productId;

        // Check if categoryId is provided
        if (!productId) {
            return res.status(400).send({ 
                message : 'Category ID is required' 
            });
        }

        // fetch data from a database
        const product = await get_productid.findOne({ _id: productId });

        if(!product){
            return res.status(404).send({
                message : 'Please enter a valid category id'
            });
        }

        res.status(200).send(product);
    }
    
    catch (error) {
        console.error('Error while fetching data from database:', error);
        res.status(500).send({ message: 'Error while fetching data from database' });
    }
}