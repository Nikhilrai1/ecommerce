import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
    try {
        if (req.method == "POST") {
            const {username,email,password} = req.body;
            let user = new User({username,email,password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()});
            let saveUser = await user.save();
            res.status(201).json("Success");
        }
        else {
            res.status(403).json("This method is not valid");
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error");
    }
}

export default connectDB(handler)