const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController");
const authenticateMW = require("../middlewares/authenticateMid");
const authorizeMW = require("../middlewares/authorizeMid");

<<<<<<< HEAD
// 1)
router.post("/createAuthor", authorController.createAuthor);

//2)
router.post("/login", authorController.loginAuthor);

//3)
router.post("/blogs", authenticateMW.mid1, blogsController.createBlogs);

//4)
router.get("/blogs", authenticateMW.mid1, blogsController.getBlogs);

//5)
router.put(
  "/blogs/:blogId",
  authorizeMW.authrAuth,
  blogsController.updateBlogs
);

//6)
router.delete(
  "/blogs/:blogId",
  authorizeMW.authrAuth,
  blogsController.deletedBlogs
);

// 7)
router.delete(
  "/blogs",
  authenticateMW.mid1,
  blogsController.deletedUsingQueryParams
);

module.exports = router;
=======
/// controllers///
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware=  require("../middlewares/commonMiddlewares")

/// Requested APIs///
router.post("/authors", authorController.createAuthor)
router.post("/blogs",middleware.mid1,middleware.mid2,blogController.createBlog)
router.get("/blogs",middleware.mid1,blogController.getBlogs)
router.put("/blogs/:blogId",middleware.mid1,middleware.mid2, blogController.updateBlog)
router.delete('/blogs/:blogId',middleware.mid1,middleware.mid2,blogController.deleteBlog)
router.delete('/blogs',middleware.mid1,blogController.blogDeleteQuery)
router.post("/login", authorController.logInAuthor)

///routers ///
module.exports = router;
>>>>>>> 44e8884cec84aa773f59eb99310dccabcd5cabf0
