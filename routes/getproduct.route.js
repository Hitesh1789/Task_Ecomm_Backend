

//GET localhost:3000/ecomm/api/v1/products [Logged in User]
const getcategory_controller = require("../controllers/getproduct.controller")
const verifyuserToken = require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.get("/ecomm/api/v1/products",[verifyuserToken.verifyToken], getcategory_controller.showProducts)
}