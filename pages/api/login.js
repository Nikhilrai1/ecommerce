import connectDB from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    try {
        if (req.method == "POST") {
            let user = await User.findOne({ email: req.body.email });
            let dectyptPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
            if (user) {
                if (req.body.email == user.email && req.body.password == dectyptPassword) {
                    var token = jwt.sign({ email: user.email, password: user.password }, process.env.SECRET_KEY);
                    return res.status(200).json({ success: "success", token });
                }
            }
            return res.status(404).json("Sorry Invalid Credentials");
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