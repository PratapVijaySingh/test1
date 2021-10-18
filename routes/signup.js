const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const bcryptSalt     = 10;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const axios = require('axios');
const {userAuth, checkRole} = require("../controllers/AuthController")

app.post('/user/signup',  (req, res, next) => {

  const {name,lastname, username, email, password, role} = req.body;

  if (!username || !email || !name || !lastname  || !password ||!role) {
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
    console.log("emailthen")
    res.status(200).json({ "message": "User is created" });
    
  })
  .catch(error => { 

    console.log("emailcatch")

    console.log(error.keyPattern.email);
    
    if(error.code==11000){
     if(error.keyPattern.email==1){
      res.status(400).json({ error: 'email already exist' });
     }else{
    res.status(400).json({ error: 'username already exist' });}
    }
  })
});
 

app.post('/signupmail', (req,res,next)=>{
  let { username, password, email, role, lastname } = req.body;

  console.log(`${username} ${password} ${email} ${role} `);

  
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'loganpaul8075@gmail.com',
      pass: 'logan@entrpnr'
    }
  });
  transporter.sendMail({
    from: '"Ticket sysem " <logan@project.com>',
    to: email, 
    subject: ` logingegevens & ${role}`, 
    html: `<b>hi ${username}
    <br>
    Your password is ${password}</b>
    <br>
    vriendelijk Groetjes
    Emtrpnr
    
    
    `
  })
  .then(info =>      res.status(200).json({ message: 'email is recieved' })
  )
  .catch(error => console.log(error));
});

app.get('/userdata', userAuth, checkRole(["superadmin"]), function(req, res, next) {
  User.find({})
    .then((users)=> {
      res.status(200).json(users);
    })
    .catch((error)=> {
      console.log(error);
    })
});

app.get('/accountedit/:id', userAuth, checkRole(["superadmin"]), (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  User.findById(req.params.id)
    .then((response) => {
      
      res.status(200).json({response, message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      console.log(err)
      res.json(err);
    })
})

app.post('/userupdate/:id',(req, response, next) => {
  const {name,lastname, username, email, password, role} = req.body;

  if (!username || !email || !name || !lastname  || !password ||!role) {
    res.status(400).json({ errorMessage: 'All fields are mandatory. Please provide your username, name,role email and password.' });
    return;
  }
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  User
    .findByIdAndUpdate(req.params.id,{
      username,
      password: hashPass,
      lastname,
      email,
      role,
      name

    })
    .then((user) => {
      console.log("emailthen userupdated")
      res.status(200).json({ "message": "User is updated" });
      
    })
    .catch(error => { 
  
      console.log("emailcatch")
  
      
     
    })
});

app.delete('/user/:id', userAuth, checkRole(["superadmin"]), (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("then")
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      console.log(err)
      res.json(err);
    })
})
module.exports = app;