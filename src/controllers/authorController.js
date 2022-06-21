const authorModel = require("../models/authorModel");
const validator = require("validator");

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
        return res.status(400).send({ status: false, msg: "Please enter valid email" })
  
      const checkEmail = await authorModel.findOne({ email: emailData });
      if (checkEmail)
        return res.status(400).send({ status: false, msg: "This email already exists" });
  
      const titleData = body.title;
      if(!titleData)
      return  res.status(400).send({ status: false, msg: "Provide title" });
  
      if (titleData) {
        if (titleData == "Mr" || titleData == "Mrs" || titleData == "Miss") {
  
          const authorCreation = await authorModel.create(body);
          return res.status(201).send({ status: true, data: authorCreation });
        }
        else
          return res.status(400).send({ status: false, msg: "Please choose title from Mr, Mrs and Miss " });
      }
    }
    catch (err) {
      res.status(500).send({ status: false, Error: err.message });
    }
  };
  module.exports.createAuthor = createAuthor;