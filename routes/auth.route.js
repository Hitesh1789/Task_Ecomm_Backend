
//POST 127.0.0.1:3000/ecomm/api/v1/auth/signup

const auth_controller = require("../controllers/auth.controller.js")
const auth_middleware = require("../middlewares/auth.middleware.js")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[auth_middleware.verifySignUpBody], auth_controller.signup)
    
    //route for POST 127.0.0.1:3000/ecomm/api/v1/auth/signin
    app.post("/ecomm/api/v1/auth/signin",[auth_middleware.verifySignInBody],auth_controller.signin)
    
    
}