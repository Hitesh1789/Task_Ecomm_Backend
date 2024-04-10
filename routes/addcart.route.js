
const addtocart = require("../controllers/addtocart.controller")
const middleware = require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/cart" , [middleware.verifyToken] , addtocart.addtoCart)
}