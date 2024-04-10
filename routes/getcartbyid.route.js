
// GET /ecomm/api/v1/cart/:cartId [Logged in User]	
const getCart = require("../controllers/getcart.controller")
const verifyuserToken = require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.get("/ecomm/api/v1/cart/:cartId",[verifyuserToken.verifyToken],getCart.showCart)
}