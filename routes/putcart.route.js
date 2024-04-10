
const put_cart = require("../controllers/putcart.controller")
const middleware = require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.put("/ecomm/api/v1/cart/:cartId",[middleware.verifyToken],put_cart.put_productbyId)
}