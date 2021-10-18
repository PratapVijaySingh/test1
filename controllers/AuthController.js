const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// User model
//const Joi = require('@hapi/joi');
//const { registerSchema, loginSchema } = require('../utils/userValidations');
const bcryptSalt=12

const userAuth = passport.authenticate("jwt", { session: false });


const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("You do not have authorization")
    : next();

exports.isAuth = (req,res,next) => {
  const sessUser = req.session.user;
  if(sessUser) {
      next();
  }
  else {
      err = res.status(401).json("You Need to Be Logged in to do this. Access Denied ")
      return err;
  }
};





exports.authChecker = (req, res) => {
  const sessUser = req.session.user;
  if (sessUser) {
    return res.json(sessUser);
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};



module.exports = {
  userAuth,checkRole
}