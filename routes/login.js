const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');
var ConnectRoles = require('connect-roles');
const jwt = require("jsonwebtoken");

// var user = new ConnectRoles({
//     failureHandler: function (req, res, action) {
//       // optional function to customise code that runs when
//       // user fails authorisation
//       var accept = req.headers.accept || '';
//       res.status(403);
//       if (~accept.indexOf('html')) {
//         res.render('access-denied', {action: action});
//       } else {
//         res.send('Access Denied - You don\'t have permission to: ' + action);
//       }
//     }
//   });


app.post('/user/login',  (req, res, next) => {
    const { usernameOrEmail, password } = req.body;

    if (usernameOrEmail === '' || password === '') {
        res.status(401).json({ errorMessage: 'Gebruikernaam en/of wachtwoord is niet juist.' });
        return;
    }

   

    User.findOne({$or: [{username: usernameOrEmail}, {email: usernameOrEmail}]})
    .then(user => {
        if (!user) {
            res.status(400).json({ errorMessage: 'Email/username is not registered. Try with another or register.' });
            return;
        } 
        (bcrypt.compare(password, user.password))   
         .then((isMatch) => {
          if (!isMatch) return res.status(400).json("Incorrect Email or Password");
  
          const sessUser = { id: user.id, name: user.name, email: user.email,role:user.role };
          //req.session.user = sessUser; // Auto saves session data in mongo store
          // We will check the role
          console.log("role"+user.role);
    if (user.role !== "admin" && user.role !== "superadmin" && user.role !== "user" ) {
      return res.status(403).json({
        message: "You Dont have Proper Role to Access the portal",
        success: false
      });
    }
  
    const jwt = require("jsonwebtoken");
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      },
      "SECRET",
      { expiresIn: "2h" } //2h
    );
  
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };
  
    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
        });
      
    })
    .catch(error => next(error));

   



});




module.exports = app;