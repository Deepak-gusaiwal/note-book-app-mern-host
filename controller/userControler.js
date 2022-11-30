let userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

//======================================================>Function 1 Signup the user<===============================================
exports.Signup = Signup = async (req, res) => {
  let { name, email, password, cpassword } = req.body;
  let success = false;

  //express validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array(), success });
  }
  //   ////////////////////////////////// using trycatch because from here we communicating with the DB
  try {
    // check whether the use is already exists or not
    let checkExistence = await userModel.findOne({ email });
    if (checkExistence) {
      return res.status(400).json({ msg: "user is already exists", success });
    }
    // check whether the password and cpassword is same or not
    if (password !== cpassword) {
      return res.status(400).json({ msg: "password does'nt match", success });
    }

    //hashing the password and cpassword using bcrypt js
    let salt = await bcrypt.genSalt(10);
    let passwordHash = await bcrypt.hash(password, salt);
    let cpasswordHash = await bcrypt.hash(cpassword, salt);
    //Saving the User in The DB
    let user = await userModel({
      name,
      email,
      password: passwordHash,
      cpassword: cpasswordHash,
    });
    user = await user.save();
    const userId = user.id;

    //  Generating Auth Token
    const authToken = jwt.sign(userId, process.env.SECRETKEY);
    success = true;
   return res.status(200).json({msg:"you have Signup successfully", authToken, success });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "internal server error on Signup", success, error });
  }
};

//======================================================>Function 2 Login the user<===============================================
exports.Login = Login = async (req, res) => {
  let { email, password } = req.body;
  let success = false;

  //express validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array(), success });
  }
  //   ////////////////////////////////// using trycatch because from here we communicating with the DB
  try {
    // check whether the use is exists or not
    let user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "user is not exists with this email id", success });
    }
    // checking the password is right ornot
    const comparePassword = await bcrypt.compare(password,user.password);
    if(!comparePassword){
      return res
      .status(400)
      .json({ msg: "Please Provide correct credentials", success });
    }

    let userId = user.id;

    //    Generating Auth Token
    const authToken = jwt.sign(userId, process.env.SECRETKEY);
    success = true;
   return res.status(200).json({ msg:"you have login successfully",authToken, success });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "internal server error on Login", success, error });
  }
};

//======================================================>Function 3 GEt the user Details<============================================
exports.GetUser = GetUser = async (req, res) => {
  let success = false;
  let userId = req.payload.userId;
  //   ////////////////////////////////// using trycatch because from here we communicating with the DB
  try {
    let user = await userModel
      .findOne({ _id: userId })
      .select({ password: 0, cpassword: 0 });
    success = true;
    return res.status(200).json({ user, success });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "internal server error on GetUser", success, error });
  }
};
