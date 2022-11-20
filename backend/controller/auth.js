import User from '../model/auth.js';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const register=async (req,res)=>{
    const {name,email,password,confirmPassword}=req.body;
    try{
    const user=await User.findOne({email});
    //checking if user already exists
    if (user) return res.status(400).send(`user with email ${email} already exists`);
    //checking if password and confirm password is same
    if (password!==confirmPassword) return  res.status(400).send('password and confirm password must be same');
    //hashing pasword
    const hashedPassword=await bcrypt.hash(password,10);
    //creating and saving user
    const newUser=await new User({name,email,password:hashedPassword}).save();
    //genrating auth token
    const token=jwt.sign({id:newUser._id},process.env.SECRET_AUTH_KEY);

    res.json({success:true,token})
    }
    catch(error){
        console.log(error)
        res.status(400).send( error.message)
    }
}

export const login=async (req,res)=>{
    const {email,password,confirmPassword}=req.body;
    try{
    const user=await User.findOne({email});
    //checking if user already exists
    if (!user) return res.status(400).send({success:false,error:`invalid username or password`});
    //checking if password and confirm password is same
    if (password!==confirmPassword) return  res.status(400).send({success:false,error:'password and confirm password must be same'});
    //validating password
    const isCorrectPasword=await bcrypt.compare(password,user.password);
    if (!isCorrectPasword) return res.status(400).send({success:false,error:`invalid username or password`});
    //generating auth token
    const token=jwt.sign({id:user._id},process.env.SECRET_AUTH_KEY);

    res.json({success:true,token,user:{name:user.name,email:user.email}});
    }
    catch(error){
        console.log(error)
        res.status(400).send( error.message)
    }
}