
const product_model = require("../models/product.model")

exports.deleteProductbyId = async (req,res)=>{
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
        const product = await product_model.findOne({ _id: productId });

        if(!product){
            return res.status(404).send({
                message : 'Please enter a valid category id'
            });
        }
        
    }
    
    catch (error) {
        console.error('Error while fetching data from database:', error);
        return res.status(500).send({ message: 'Error while fetching data from database' });
    }

    
    try {
        const result = await product_model.deleteOne({ _id: productId });
        if (result.deletedCount == 0) {
            return res.status(500).send({ message: 'Error while deleting product' });
        }
        return res.status(200).send({ message: "Product deleted successfully" });

    } 
    
    catch (err) {
        console.log("Error while deleting category:", err);
        return res.status(500).send({ message: 'Error while deleting product' });
    }
}