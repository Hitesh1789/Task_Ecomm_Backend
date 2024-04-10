const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user_model = require("./models/user.model");

app.use(express.json()) // Convert json to jsobject


//Connection with database
mongoose.connect('mongodb://localhost:27017/ecomm_db2',
{ useNewUrlParser: true, useUnifiedTopology: true }
);


const db = mongoose.connection;

db.on("error", () => {
  console.log("Error in connection");
});

db.once("open", () =>{
  console.log("Connected to database");
  init();
});

//Create the admin user at the starting of the app
//if not admin is already present 
async function init(){
  try{
    const user = await user_model.findOne({userId : 'admin'})

    if(user){
      console.log("Admin is alraedy present " , user)
      return
    }
  }
  
  catch(err){
    console.log("Error while reading data",err);
  }

  try{
    user = await user_model.create({
      userName: "Ram",
      userId: "admin",
      email: "hiteshmehandiratta@gmail.com",
      userType: "Admin", 
      password: bcrypt.hashSync("Ecommerce", 8)
    })
    
    console.log("Admin created .", user)
  }
  
  catch(err){
    console.log("Error while creating admin",err);
  }
}

//connect routes with server
require("./routes/auth.route")(app)    //autentication and return access-token valid for 10 minutes
require("./routes/product.route")(app)  //create product
require("./routes/getproduct.route")(app)  //get all products
require("./routes/productid.route")(app)   //get product by Id
require("./routes/putproduct.route")(app)   //update product by Id
require("./routes/deleteproduct.route")(app)  //delete product by Id
require("./routes/addcart.route")(app)  //add product to cart by productid , userid , quantity and cost
require("./routes/getcartbyid.route")(app)  //get cart by cartid 
require("./routes/deletefromcart.route")(app)  //remove product by cartid and productid

//Creating a server
app.listen(3000, () => {
  console.log("Server is started at port number : 3000 ");
});