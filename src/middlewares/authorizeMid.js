const author = require("../models/authorModel");
const Blogs = require("../models/blogsModel");
var jwt = require("jsonwebtoken");

let authrAuth = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    let authordata = jwt.verify(token, "functionUpgroupnumber12");

    console.log(authordata);
    if (!authordata) {
      return res.status(404).send({ status: true, msg: "token is not valid" });
    }
    console.log(authordata);

    let blogId = req.params.blogId;
    let requestedAuthorId = req.query.authorId;

    if (blogId) {
      let validBlog = await Blogs.findById(blogId);
      requestedAuthorId = validBlog.authorId;     
    }

    console.log(requestedAuthorId);

    if (authordata.authorId != requestedAuthorId) {
      return res.status(403).send({ status: false, msg: "Not Valid Author" });
    }  //authorisation

    next();
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

module.exports = { authrAuth };