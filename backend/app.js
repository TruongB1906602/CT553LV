const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv")
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({
        path:"./config/.env"
    })}

// Route imports
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const cart = require("./routes/WishListRoute");

app.use("/api/v2",product);

app.use("/api/v2",user);

app.use("/api/v2",order);

app.use("/api/v2",payment);

app.use("/api/v2",cart);
app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res) =>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app