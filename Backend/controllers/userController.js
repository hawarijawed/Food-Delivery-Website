import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { configDotenv } from "dotenv";
configDotenv();

//Loging user
const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.body;

        //Check if user exists or not
        const userExist = await userModel.findOne({email});
        //console.log(userExist);
        
        if(!userExist){
            return res.json({success:false, message:"User does not exist"});
        }

        const isMatched = await bcrypt.compare(password, userExist.password);
        
        if(!isMatched){
            return res.json({success:false, message:"Invalid Credentials"});
        }

        const token = createToken(userExist._id);
        res.json({success:true,token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET);
}
const registerUser = async (req, res) =>{
    const {name, email, password} = req.body;    
    try {
        //Checking if user exists or not
        const isExist = await userModel.findOne({email});
        if(isExist){
            return res.json({success:false, message:"User already exist"});
        }

        //validating emails and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter a valid email"});
        }
        
        //Checking password length
        if(password.length < 8){
            return res.json({success:false, message:"Enter at least 8 length password"});
        }

        //hashin user password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name, 
            email, 
            password:hashedPassword
        })

        //Saving user in db
        const user = await newUser.save();
        //console.log(user);
        
        //Creating token for user
        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        
        res.json({success:false, message:error});
    }
}

export {loginUser, registerUser};