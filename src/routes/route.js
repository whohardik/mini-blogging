const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogsController = require("../controllers/blogsController");
const authenticateMW = require("../middlewares/authenticateMid");
const authorizeMW = require("../middlewares/authorizeMid");

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


///routers ///
module.exports = router;
