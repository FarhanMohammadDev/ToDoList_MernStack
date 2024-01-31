import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

import {User,validateRegisterUser,validateLoginUser} from "../models/User.js"

/**
 * @desc Register new user  
 * @route /api/auth/register
 * @method POST
 * @access public
*/
// router.post("/register",userController.user_store_post)
router.post("/register", async(req,res)=>{
    const {error} = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    let newUser = await User.findOne({email:req.body.email});
    if (newUser) {
        return res.status(400).json({message: "this user already registred"});
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt)
    newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    })
    const result = await newUser.save();

    const token = jwt.sign({
        id: newUser._id,
         username:newUser.username,
         isAdmin: newUser.isAdmin
        },"secretKey1234",{
        expiresIn:"1h"
        }
    );
    // eslint-disable-next-line no-unused-vars
    const {password ,  ...other} = result._doc;
    res.status(201).json({...other , token});
})



/**
 * @desc Login user  
 * @route /api/auth/login
 * @method POST
 * @access public
*/
// router.post("/login",userController.user_store_post)
router.post("/login",async(req,res)=>{
    const {error} = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }

    let user = await User.findOne({email:req.body.email});
    if (!user) {
        return res.status(400).json({message: "Invalid Email Or Password"});
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({message: "Invalid Email Or Password"});
    }

    const token = jwt.sign({
        id: user._id,
         username:user.username,
         isAmin: user.isAdmin
        },"secretKey1234",{
        expiresIn:"1h"

        }
    );
    // eslint-disable-next-line no-unused-vars
    const {password,  ...other} = user._doc;
    res.status(200).json({...other , token});
})
export {router} ;