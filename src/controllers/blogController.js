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
////GET BLOGS////////
const getBlogs = async function (req, res) {
  try {
    const queryDetails = req.query;

    if (Object.keys(queryDetails).length == 0) {
      const getBlog = await blogModel.find({
        isDeleted: false,
        isPublished: true,
      });

      if (getBlog.length != 0)
        return res.status(200).send({ status: true, data: getBlog });

      if (getBlog.length == 0)
        return res.status(404).send({ status: false, msg: "No blog found" });
    }

    queryDetails.isDeleted = false;
    queryDetails.isPublished = true;

    // check validaion of authorId//
    const authorId = queryDetails.authorId;
    if (authorId) {
      if (!mongoose.Types.ObjectId.isValid(authorId)) {
        return res
          .status(400)
          .send({ status: false, msg: "Input valid authorId" });
      }
    }

    const specificBlogs = await blogModel.find(queryDetails);
    if (specificBlogs.length != 0)
      return res.status(200).send({ status: true, data: specificBlogs });

    if (specificBlogs.length == 0)
      return res
        .status(404)
        .send({ status: false, msg: "No blog Info  found" });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
///update blog///
const updateBlog = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const isBlogIdExist = await blogModel.findById(blogId);

    if (isBlogIdExist) {
      if (isBlogIdExist.isDeleted === false) {
        if (isBlogIdExist.isPublished === false) {
          const updatedDate = await blogModel.findOneAndUpdate(
            { _id: blogId },
            { $set: { isPublished: true, publishedAt: Date.now() } }
          );
        }
        const data = req.body;

        const updatedBlog = await blogModel.findOneAndUpdate(
          { _id: blogId },
          { ...data },
          { new: true }
        );
        return res.status(200).send({ status: true, data: updatedBlog });
      } else {
        return res
          .status(404)
          .send({ status: false, msg: "Blog does not Exist" });
      }
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "Blog ID does not Exist" });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//DELETE BLOG///
const deleteBlog = async function (req, res) {
  try {
    const blogId = req.params.blogId;
    const checkBlog = await blogModel.findById(blogId);

    if (checkBlog.isDeleted === true)
      return res
        .status(404)
        .send({ status: false, msg: "No blogs with this Id" });

    const deletingBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { isDeleted: true, deletedAt: Date.now() }
    );
    res.status(200).send({ status: true, msg: "Blog is deleted" });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

///Delete Blog by query//
const blogDeleteQuery = async function (req, res) {
  try {
    const data = req.query;

    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, msg: "add queries" });

    if (data) {
      const deleteBlog = await blogModel.updateMany(data, {
        $set: { isDeleted: true },
      });
      return res.status(200).send({ status: true, msg: "blog is deleted" });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};
///Module exports///
module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.blogDeleteQuery = blogDeleteQuery;
