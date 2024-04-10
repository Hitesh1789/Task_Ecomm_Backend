
const deletebyId = require("../controllers/deletecart.controller")
const middleware = require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.delete("/ecomm/api/v1/cart/:cardId/:productId",[middleware.verifyToken], deletebyId.removefromCart)
}