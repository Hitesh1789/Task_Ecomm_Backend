


const put_controllerid = require("../controllers/putproduct.controller");
const auth_middleware = require("../middlewares/auth.middleware")

module.exports = (app)=>{
    app.put("/ecomm/api/v1/products/:productId",[auth_middleware.verifyToken , auth_middleware.isAdmin], put_controllerid.put_productbyId)
}