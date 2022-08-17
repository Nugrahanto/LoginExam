import Users from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

export const getUsers = async(req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'username', 'email']
    });
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
}

export const getUsersById = async(req, res)=>{
  try {
      const response = await Users.findOne({
          where:{
              id : req.params.id
          }
      });
      res.json(response);
  } catch (error) {
      console.log(error.message);
  }
}

export const Register = async(req, res) => {
  const { username, email, password, confPassword } = req.body;
  const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
  if(!passwordValidator.test(password)){
    return res.status(400).json({msg: "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!"});
  } else if(password !== confPassword) {
    return res.status(400).json({msg: "Password didn't match"});
  } else {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      await Users.create({
        username: username,
        email: email,
        password: hashPassword
      });
      res.json({msg: "Registration Success"});
    } catch (error) {
      console.log(error.message);
    }
  }
}

export const Login = async(req, res) => {
  try {
    const user = await Users.findAll({
      where:{
        email: req.body.email
      }
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({msg: "Incorrect Password"});
    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s'
    });
    const refreshToken = jwt.sign({userId, username, email}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });
    await Users.update({refresh_token:refreshToken},{
      where:{
        id: userId
      }
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({msg: "Email not found"});
  }
}

export const Logout = async(req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(204);
  } else {
    const user = await Users.findAll({
      where: {
        refresh_token: refreshToken
      }
    });
    if (!user[0]) {
      return res.sendStatus(204);
    } else {
      const userId = user[0].id;
      await Users.update({refresh_token: null}, {
        where: {
          id: userId
        }
      });
      res.clearCookie('refreshToken');
      return res.sendStatus(200);
    }
  }
}

export const updateUser = async(req, res)=>{
  const user = await Users.findOne({
      where:{
          id : req.params.id
      }
  });
  if(!user) return res.status(404).json({msg: "No Data Found"});
  
  const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
  const password = req.body.password;
  if(!passwordValidator.test(password)){
    return res.status(400).json({msg: "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!"});
  } 
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
      await Users.update({password: hashPassword},{
          where:{
              id: req.params.id
          }
      });
      res.status(200).json({msg: "Password Updated Successfuly"});
  } catch (error) {
      console.log(error.message);
  }
}

export const forgotPassword = async(req, res)=>{
  const user = await Users.findOne({
      where:{
          email : req.body.email
      }
  });
  if (!user){
    return res.status(400).json({msg: "No Email Found"});
  } else {
    return res.status(200).json({msg: "Email sent"});
  }
}

export const resetPassword = async(req, res)=>{
  // const user = await Users.findOne({
  //   where:{
  //       id : req.params.id
  //   }
  // });
  // if(!user) return res.status(404).json({msg: "No Data Found"});

  const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/;
  const password = req.body.password;
  const confPassword = req.body.confPassword;
  if(!passwordValidator.test(password)){
    return res.status(400).json({msg: "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!"});
  } else if(password !== confPassword) {
    return res.status(400).json({msg: "Password didn't match"});
  } else {
    res.status(200).json({msg: "Password Reset Successfuly"});
  }
  
  // const salt = await bcrypt.genSalt();
  // const hashPassword = await bcrypt.hash(password, salt);

  // try {
  //     await Users.update({password: hashPassword},{
  //         where:{
  //             id: req.params.id
  //         }
  //     });
  //     res.status(200).json({msg: "Password Updated Successfuly"});
  // } catch (error) {
  //     console.log(error.message);
  // }
}