const express = require('express');

const router = express.Router();

const authorController = require("../controllers/authorController")

const blogController = require("../controllers/blogController")


router.get("/test-me", function (req, res) {

    res.send("My first ever api!")

})

/// Requested APIs///
router.post("/authors", authorController.createAuthor)
router.post("/blogs", blogController.createBlog)
router.get("/blogs",blogController.getBlogs)
router.put("/blogs/:blogId", blogController.updateBlog)
router.delete('/blogs/:blogId',blogController.deleteBlog)
router.delete('/blogs',blogController.blogDeleteQuery)

module.exports = router;