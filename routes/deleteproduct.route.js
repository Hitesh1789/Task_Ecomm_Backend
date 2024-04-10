
const delete_product = require("../controllers/deleteproduct.controller");
const middleware = require("../middlewares/auth.middleware");

module.exports = (app)=>{
    app.delete("/ecomm/api/v1/products/:productId",[middleware.verifyToken , middleware.isAdmin],delete_product.deleteProductbyId);
}

