

//I need to write the controller or logic to register a user

const bcrypt = require("bcrypt")
const usermodel = require("../models/user.model")
const jsonwebtoken = require("jsonwebtoken")

exports.signup = async (request, response) => {
    //Logic to create the user 

    //1.Read the request body
    const request_body = request.body

    //2.Insert the request in the users collection in mongoDB
    const userObj = {
        userName: request_body.userName,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await usermodel.create(userObj)

        //Return the user

        const res_obj = {
            userName: user_created.userName,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }

        response.status(201).send(res_obj)

    } catch (err) {
        console.log("Error while registering the user ", err)
        response.status(500).send({
            message: "Some error while regsitering the user "
        })
    }
    //3.Return the response back to the user

}


exports.signin = async (req, res) => {

    //Check if the user is present in the system
    const user = await usermodel.findOne({ userId: req.body.userId })

    if (user == null) {
        return res.status(400).send({
            message: "userId passed is not valid userId"
        })
    }

    //Check if the password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Wrong password entered"
        })
    }

    //using jwt we will create the access token with a given TTL(Time To Live) and return it 
    const token = jsonwebtoken.sign({id : user.userId}, "This is my secret" ,{expiresIn : 600})

    res.status(200).send({
        userName : user.userName,
        userId : user.userId,
        email : user.email,
        userType  : user.userType,
        accessToken : token 
    })

}