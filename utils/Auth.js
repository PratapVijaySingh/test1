const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const mongoose = require('mongoose');

const signUp = aync((req, role, res) => {



    const {name,lastname, username, email, password, role} = req.body;
    console.log(` ${name}, ${lastname}, ${username}, ${email}, ${password}, ${role} `);
  
    if (!username || !email || !name || !lastname || !email || !password ||!role) {
      res.status(400).json({ errorMessage: 'All fields are mandatory. Please provide your username, name,role email and password.' });
  
      return;
    }
    console.log(" beforregex");
  
    // make sure passwords are strong:
  
    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    console.log(" beforuser");
    User.create({
      username,
      password: hashPass,
      lastname,
      email,
      role,
      name
  
    })
    .then((user) => {
      res.status(200).json({ "message": "User is created" });
      
    })
    .catch(error => {
      console.log(error.keyPattern.email);
      
      if(error.code==11000){
       if(error.keyPattern.email==1){
        res.status(400).json({ errorMessage: 'email already exist' });
       }else{
      res.status(400).json({ errorMessage: 'username already exist' });}
      }
    })
  })