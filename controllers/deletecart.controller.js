const cart_model = require("../models/cart.model");
const product_model =require("../models/product.model")

exports.removefromCart = async (req, res) => {
  // Read the cartId from url
  const cartId = req.params.cartId;
  const productId = req.params.productId;

  if (!cartId) {
    return res.status(400).send({ message: "Please provide cartId" });
  }

  if(!productId){
    return res.status(400).send({ message: "Please provide productId" });
  }

  try {
    const cart = await cart_model.findOne({ _id: cartId });

    if (!cart) {
      return res.status(404).send({ message: "Please provide a valid cardId." });
    }

    const product = await product_model.findOne({_id : productId})

    if (!product) {
        return res.status(404).send({ message: "Please provide a valid productId." });
      }
  } 
  
  catch (err) {
    console.log("Error while fetching data.");
    return res.status(500).send({ message: "Error while fetching data." });
  }

  try {

    //filter out the item with a given productId
    cart.items = cart.items.filter((item) => {
      return item.productId != productId;
    });

    //save the updated cart
    await cart.save();

    return res.status(200).send(cart)

  } 
  
  catch (err) {
    console.log("Error while deleting data.");
    return res.status(500).send({ message: "Error while deleting data." });
  }
};
