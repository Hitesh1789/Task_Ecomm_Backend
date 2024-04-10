
// GET /ecomm/api/v1/categories/:categoryId [Logged in User]	
const getProduct_Id = require("../controllers/getproductbyid.controller")
const verifyuserToken = require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.get("/ecomm/api/v1/products/:productId",[verifyuserToken.verifyToken],getProduct_Id.getProductById)
}