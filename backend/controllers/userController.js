import {User} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        const user =await User.findOne({email});
        if(user) return res.status(409).json({message:"User is already exist, you can login", success:false});
        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new User({name, email, password: hashedPassword});
        const savedUser = await userModel.save();
        res.status(201).json({message:"Signup successfully", savedUser, success:true})
    } catch (error) {
        res.status(500).json({message:"Internal server error", success:false})
    }
}

export const login = async (req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(403).json({message:"Auth failed email or password is wrong", success:false});

        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual) return res.status(403).json({message:"Auth failed email or password is wrong", success:false});

        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({message:"Login Successfully", jwtToken, name: user.name, email, success:true});

    } catch (error) {
        res.status(500).json({message:"Internal server error", success:false})
    }
}