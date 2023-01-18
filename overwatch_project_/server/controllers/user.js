import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req,res) => {
    //fetch values
    const {email, password} = req.body;

    try {
        //search for exisiting user
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({message: "User does not exist"});
        }

        //check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return res.status(404).json({message: "Password incorrect"});

        }

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"});
        res.status(200).json({result: existingUser, token});

    }catch(error){
        res.status(500).json({message: "Something went wrong"});
    }
}

export const signup = async (req,res) => {
    //fetch values
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    try {
        //check for exisiting user
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(404).json({message: "User already exist"});
        }

        //check if password = confirmPasword
        if(password !== confirmPassword){
            return res.status(404).json({message: "Passwords dont match"});

        }

        const hashedPassword = await bcrypt.hash(password, 12);

        //create user
        const result = await User.create({email, password : hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"});
        res.status(200).json({result, token});


    }catch(error){
        res.status(500).json({message: "Something went wrong"});
    }

}