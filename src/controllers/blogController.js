const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const mongoose = require("mongoose");

///create blog///
const createBlog = async function (req, res) {
  try {
    const blogData = req.body;

    const authorId = blogData.authorId;
    const findAuthor = await authorModel.findById({ _id: authorId });
    if (!findAuthor)
      return res.status(400).send({ status: false, msg: "Author not found" });

    const titleData = blogData.title;
    if (!titleData)
      return res.status(400).send({ status: false, msg: "provide title" });

    const categoryData = blogData.category;
    if (!categoryData)
      return res.status(400).send({ status: false, msg: "select category" });

    const bodyData = blogData.body;
    if (!bodyData)
      return res
        .status(400)
        .send({ status: false, msg: "enter something in body" });
    if (blogData.isPublished === false) {
      const blogCreation = await blogModel.create(blogData);
      return res.status(201).send({ status: true, data: blogCreation });
    } else {
      blogData.publishedAt = Date.now();
      const blogCreation = await blogModel.create(blogData);
      return res.status(201).send({ status: true, data: blogCreation });
    }
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};
module.exports.createBlog = createBlog;
