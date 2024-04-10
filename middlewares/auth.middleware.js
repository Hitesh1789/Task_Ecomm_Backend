



const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")

//Create the middleware that will check if the request body is correct and proper

const verifySignUpBody = async (req, res, next) => {
    try {
        //Check for the userName 
        if (!req.body.userName) {
            return res.status(400).send({
                messsage: " Failed ! userName was not provided in request body "
            })
        }

        //Check for the userId
        if (!req.body.userId) {
            return res.status(400).send({
                messsage: " Failed ! userId was not provided in request body "
            })
        }

        //Check for the email
        if (!req.body.email) {
            return res.status(400).send({
                messsage: " Failed ! email was not provided in request body "
            })
        }

        //Check for the password
        if (!req.body.password) {
            return res.status(400).send({
                messsage: " Failed ! password was not provided in request body "
            })
        }

        //Check if the user with the same userId is already present
        const user = await user_model.findOne({ userId: req.body.userId })
        if (user) {
            return res.status(400).send({
                messsage: " Failed ! user with the same userId already present "
            })
        }


        next()
    }

    catch (err) {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            messsage: "Error while validating the request body"
        })
    }
}

const verifySignInBody = (req, res, next) => {

    if (!req.body.userId) {
        return res.status(400).send({
            messsage: "userId is not provided "
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            messsage: "password is not provided "
        })
    }

    next()
}




const verifyToken = (req, res, next) => {
    //Check if the token is present in the header or if token is passed or not  
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            messsage: "No token found : Unauthorized"
        })
    }

    //If it's the valid token
    jwt.verify(token, "This is my secret", async (err, decoded) => {
        if (err) {
            return res.status(401).send({
                messsage: "Unauthorized ! "
            })
        }

        const user = await user_model.findOne({ userId: decoded.id })
        if (!user) {
            return res.status(400).send({
                message: "Unauthorized , this user for this token doesn't exist "
            })
        }

        //Move to next step if valid user

        //set the user info in request body
        req.user = user
        next()


    })


}

const isAdmin = (req, res, next) => {
    const user = req.user
    if (user && user.userType == "Admin") {
        next()
    } else {
        return res.status(403).send({
            message: "Only Admin users are allowed to access this endpoint"
        })
    }
} 

module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
}