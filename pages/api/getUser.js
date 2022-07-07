import mongoose from "mongoose";
import connectDB from "../../middleware/mongoose"
import User from "../../models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if(req.method == "POST"){
        let token = req.body.token;
        let user = jwt.verify(token,process.env.SECRET_KEY);
        let dbuser = await User.findOne({email: user.email})
        const {username,email,address} = dbuser;
        res.status(200).json({username,email,address});
    }
    else{
        res.status(400).json({error: "error"});
    }
}
