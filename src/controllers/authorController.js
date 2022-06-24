const authorModel = require("../models/authorModel");
<<<<<<< HEAD
const validator = require("email-validator");
const jwt = require("jsonwebtoken");


const isvalid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isvalidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

const isValidTitle=function(title){
  return ["Mr", "Mrs", "Miss"].indexOf (title) != -1
}

///////////////////////////////////////////////////1Createauthor//////////////////////////////////////////////////////////////////////////

const createAuthor = async function (req, res) {
  try {

    let requiredBody=req.body;
    if(!isvalidRequestBody(requiredBody)){
      return res.status(400).send({status :false, msg:"please provide author details"})
    }

    let { fname, lname, title, email, password } = req.body;

    if(!isvalid(fname)){
      return res.status(400).send({status : false , msg :"firstname is required"})
    }


    if(!isvalid(lname)){
      return res.status(400).send({status : false , msg :"lastname is required"})
    }

    
    if(!isvalid(title)){
      return res.status(400).send({status : false , msg :"title is required"})
    }
    
    if(!isvalid(email)){
      return res.status(400).send({status : false , msg :"email is required"})
    }

    
    if(!isvalid(password)){
      return res.status(400).send({status : false , msg :"password is required"})
    }
    let validEmailFormat = await validator.validate(email);
    if (!validEmailFormat) {
      return res.status(400).send({ status: false, msg: "Invalid Email" });
    }

    let validEmail = await authorModel.findOne({ email: email });

    if (validEmail) {
      return res
        .status(409)
        .send({ status: false, msg: `${email} Email Already Exists` });
    }

    let dataAuthor = await authorModel.create({
      fname,
      lname,
      title,
      email,
      password,
    });
    console.log("done");
    return res.status(201).send({ status: true, data: dataAuthor });
=======
const validator = require("validator");
const jwt = require("jsonwebtoken")
////Create Author///
const createAuthor = async function (req, res) {
  try {
    const body = req.body;

    const fnameData = body.fname;
    if (!fnameData)
      return res.status(400).send({ status: false, msg: "Provide first name" });

    const lnameData = body.lname;
    if (!lnameData)
      return res.status(400).send({ status: false, msg: "Provide last name" });

    const passwordData = body.password;
    if (!passwordData)
      return res.status(400).send({ status: false, msg: "Provide password" });

    const emailData = body.email;
    if (!emailData)
      return res.status(400).send({ status: false, msg: "Provide email" });

    const validEmail = validator.isEmail(emailData);
    if (validEmail === false)
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid email" });

    const checkEmail = await authorModel.findOne({ email: emailData });
    if (checkEmail)
      return res
        .status(400)
        .send({ status: false, msg: "This email already exists" });

    const titleData = body.title;
    if (!titleData)
      return res.status(400).send({ status: false, msg: "Provide title" });

    if (titleData) {
      if (titleData == "Mr" || titleData == "Mrs" || titleData == "Miss") {
        const authorCreation = await authorModel.create(body);
        return res.status(201).send({ status: true, data: authorCreation });
      } else
        return res
          .status(400)
          .send({
            status: false,
            msg: "Please choose title from Mr, Mrs and Miss ",
          });
    }
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  } 
};

///Login//
const logInAuthor = async function (req, res) {
  try {
    
    const email = req.body.email;
    if (!email) {
      return res.status(400).send({ status: false, msg: "please provide  email" });
    }
    const password = req.body.password;
    if (!password) {
      return res.status(400).send({ status: false, msg: "please provide  password" });
    }

    const validEmail = validator.isEmail(emailData);
    if (validEmail === false)
      return res.status(400).send({ status: false, msg: "Please enter valid email" });

    const validAuthor = await authorModel.findOne({
      email: email,
      password: password,
    });

    if (!validAuthor) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter valid email and password" });
    }

    let token = jwt.sign(
      { authorId: validAuthor._id.toString() }, //converting validAuthor object to string
      "functionUpgroupnumber12"
    );

    return res.status(201).send({ status: true, msg: token });
>>>>>>> 44e8884cec84aa773f59eb99310dccabcd5cabf0
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};
<<<<<<< HEAD
///////////////////////////////////////////////////2authorlogin//////////////////////////////////////////////////////////////////////////

const loginAuthor = async function (req, res) {

try{
  let requiredBody=req.body;
  if(!isvalidRequestBody(requiredBody)){
    return res.send({status :false, msg:"please provide author details"})
  }

  let { email, password } = req.body;

  if(!isvalid(email)){
    return res.status(400).send({status : false , msg :"email is required"})
  }

  if(!isvalid(password)){
    return res.status(400).send({status : false , msg :"password is required"})
  }


 

  let validEmailFormat = validator.validate(email);
  if (!validEmailFormat) {
    return res.status(400).send({ status: false, msg: "Invalid Email" });
  }

  let validAuthor = await authorModel.findOne({
    email: email,
    password: password,
  });

  if (!validAuthor) {
    return res
      .status(400)
      .send({ status: false, msg: "Please enter valid email and password" });
  }

  let token = jwt.sign(
    { authorId: validAuthor._id.toString() },//converting validAuthor object to string 
    "functionUpgroupnumber12"
  );

  return res.status(200).send({ status: true, msg: token });
}catch (err) {
  return res.status(500).send({ status: false, err: err.message });
}
};


module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;

//find one return object(empty=false)  & find return array(empty=true)
=======
/// export APIs ///
module.exports.createAuthor = createAuthor;
module.exports.logInAuthor = logInAuthor;
>>>>>>> 44e8884cec84aa773f59eb99310dccabcd5cabf0
